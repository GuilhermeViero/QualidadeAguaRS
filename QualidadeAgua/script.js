let map; // Declara a variável do mapa fora da função para que seja acessível globalmente
let markers = []; // Array para armazenar os marcadores

// Função para calcular a distância entre duas coordenadas usando a fórmula de Haversine
function haversineDistance(coords1, coords2) {
    function toRad(x) {
        return x * Math.PI / 180;
    }

    var lat1 = coords1[0];
    var lon1 = coords1[1];
    var lat2 = coords2[0];
    var lon2 = coords2[1];

    var R = 6371; // Raio da Terra em km
    var x1 = lat2 - lat1;
    var dLat = toRad(x1);
    var x2 = lon2 - lon1;
    var dLon = toRad(x2);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    return d;
}

// Função para obter o bairro e a cidade a partir das coordenadas
function getAddress(lat, lon, callback) {
    var url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            var address = data.address;
            var bairro = address.suburb || address.neighbourhood || '';
            var cidade = address.city || address.town || address.village || '';
            callback(bairro, cidade);
        })
        .catch(error => {
            console.error('Erro ao obter o endereço:', error);
            callback('', '');
        });
}

// Função para inicializar o mapa na página de Adicionar Informações
function initMapAddInfo() {
    map = L.map('mapa').setView([-30.0346, -51.2177], 10); // Centraliza o mapa em Porto Alegre, RS

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var marker;

    map.on('click', function (e) {
        if (marker) {
            map.removeLayer(marker);
        }
        marker = L.marker(e.latlng).addTo(map);
        document.getElementById('latitude').value = e.latlng.lat;
        document.getElementById('longitude').value = e.latlng.lng;

        getAddress(e.latlng.lat, e.latlng.lng, function(bairro, cidade) {
            document.getElementById('bairro').value = bairro;
            document.getElementById('cidade').value = cidade;
        });
    });

    document.getElementById('addInfoForm').addEventListener('submit', function (e) {
        e.preventDefault();
        var formData = new FormData(this);
        var data = Object.fromEntries(formData);
        var existingData = JSON.parse(localStorage.getItem('waterQualityData')) || [];
        var newPoint = [parseFloat(data.latitude), parseFloat(data.longitude)];
        var merged = false;

        existingData.forEach(function (item) {
            var existingPoint = [parseFloat(item.latitude), parseFloat(item.longitude)];
            if (haversineDistance(newPoint, existingPoint) <= 50) {
                if (!item.data) {
                    item.data = [];
                }
                item.data.push(data);
                merged = true;
            }
        });

        if (!merged) {
            data = {
                latitude: data.latitude,
                longitude: data.longitude,
                bairro: data.bairro,
                cidade: data.cidade,
                data: [data]
            };
            existingData.push(data);
        }

        localStorage.setItem('waterQualityData', JSON.stringify(existingData));
        alert('Informações adicionadas com sucesso!');
        this.reset();
        if (marker) {
            map.removeLayer(marker);
        }
    });
}

// Função para inicializar o mapa na página de Visualizar Informações
function initMapViewInfo() {
    map = L.map('mapa').setView([-30.0346, -51.2177], 10); // Centraliza o mapa em Porto Alegre, RS

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var data = JSON.parse(localStorage.getItem('waterQualityData')) || [];
    data.forEach(function (item) {
        var marker = L.marker([item.latitude, item.longitude]).addTo(map);
        markers.push(marker); // Adiciona o marcador ao array de marcadores
        var popupContent = item.data.map(d => `
            <b>Data dos testes:</b> ${d.data}<br>
            <b>Água própria para banho:</b> ${d.balneabilidade}<br>
            <b>pH:</b> ${d.ph}<br>
            <b>Oxigênio Dissolvido (OD):</b> ${d.od} mg/L<br>
            <b>Demanda Bioquímica de Oxigênio (DBO):</b> ${d.dbo} mg/L<br>
            <b>Nitrogênio Total:</b> ${d.nitrogenio} mg/L<br>
            <b>Fósforo Total:</b> ${d.fosforo} mg/L<br>
            <b>Metais Pesados:</b> ${d.metais}<br>
            <b>Sólidos Suspensos Totais (SST):</b> ${d.sst} mg/L<br>
            <b>Coliformes Fecais e E. Coli:</b> ${d.coliformes} UFC/100 mL<br>
            <b>Salinidade:</b> ${d.salinidade} ‰<br>
            <b>Bairro:</b> ${d.bairro}<br>
            <b>Cidade:</b> ${d.cidade}
        `).join('<br><hr><br>');
        marker.bindPopup(popupContent);
    });

    populateTable(data);
}

function populateTable(data) {
    var tableBody = document.getElementById('data-table');
    tableBody.innerHTML = ''; // Limpa a tabela

    data.forEach(function (item) {
        item.data.forEach(function (d) {
            var row = document.createElement('tr');
            row.innerHTML = `
                <td>${d.data}</td>
                <td>${d.balneabilidade}</td>
                <td>${d.ph}</td>
                <td>${d.od}</td>
                <td>${d.dbo}</td>
                <td>${d.nitrogenio}</td>
                <td>${d.fosforo}</td>
                <td>${d.metais}</td>
                <td>${d.sst}</td>
                <td>${d.coliformes}</td>
                <td>${d.salinidade}</td>
                <td>${d.bairro}</td>
                <td>${d.cidade}</td>
            `;

            row.addEventListener('click', function () {
                map.setView([item.latitude, item.longitude], 13);
                var marker = L.marker([item.latitude, item.longitude]).addTo(map);
                var popupContent = item.data.map(d => `
                    <b>Data dos testes:</b> ${d.data}<br>
                    <b>Água própria para banho:</b> ${d.balneabilidade}<br>
                    <b>pH:</b> ${d.ph}<br>
                    <b>Oxigênio Dissolvido (OD):</b> ${d.od} mg/L<br>
                    <b>Demanda Bioquímica de Oxigênio (DBO):</b> ${d.dbo} mg/L<br>
                    <b>Nitrogênio Total:</b> ${d.nitrogenio} mg/L<br>
                    <b>Fósforo Total:</b> ${d.fosforo} mg/L<br>
                    <b>Metais Pesados:</b> ${d.metais}<br>
                    <b>Sólidos Suspensos Totais (SST):</b> ${d.sst} mg/L<br>
                    <b>Coliformes Fecais e E. Coli:</b> ${d.coliformes} UFC/100 mL<br>
                    <b>Salinidade:</b> ${d.salinidade} ‰<br>
                    <b>Bairro:</b> ${d.bairro}<br>
                    <b>Cidade:</b> ${d.cidade}
                `).join('<br><hr><br>');
                marker.bindPopup(popupContent).openPopup();
            });

            tableBody.appendChild(row);
        });
    });
}

function filterData() {
    var startDate = document.getElementById('startDate').value;
    var endDate = document.getElementById('endDate').value;
    var data = JSON.parse(localStorage.getItem('waterQualityData')) || [];

    if (startDate) {
        data = data.filter(item => item.data.some(d => new Date(d.data) >= new Date(startDate)));
    }

    if (endDate) {
        data = data.filter(item => item.data.some(d => new Date(d.data) <= new Date(endDate)));
    }

    // Limpa os marcadores existentes no mapa
    markers.forEach(marker => map.removeLayer(marker));
    markers = []; // Limpa o array de marcadores

    populateTable(data); // Atualiza a tabela com os dados filtrados

    // Adiciona novos marcadores com base nos dados filtrados
    data.forEach(function (item) {
        var marker = L.marker([item.latitude, item.longitude]).addTo(map);
        markers.push(marker); // Adiciona o marcador ao array de marcadores
        var popupContent = item.data.map(d => `
            <b>Data dos testes:</b> ${d.data}<br>
            <b>Água própria para banho:</b> ${d.balneabilidade}<br>
            <b>pH:</b> ${d.ph}<br>
            <b>Oxigênio Dissolvido (OD):</b> ${d.od} mg/L<br>
            <b>Demanda Bioquímica de Oxigênio (DBO):</b> ${d.dbo} mg/L<br>
            <b>Nitrogênio Total:</b> ${d.nitrogenio} mg/L<br>
            <b>Fósforo Total:</b> ${d.fosforo} mg/L<br>
            <b>Metais Pesados:</b> ${d.metais}<br>
            <b>Sólidos Suspensos Totais (SST):</b> ${d.sst} mg/L<br>
            <b>Coliformes Fecais e E. Coli:</b> ${d.coliformes} UFC/100 mL<br>
            <b>Salinidade:</b> ${d.salinidade} ‰<br>
            <b>Bairro:</b> ${d.bairro}<br>
            <b>Cidade:</b> ${d.cidade}
        `).join('<br><hr><br>');
        marker.bindPopup(popupContent);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('mapa')) {
        if (document.getElementById('addInfoForm')) {
            initMapAddInfo();
        } else {
            initMapViewInfo();
        }
    }
});

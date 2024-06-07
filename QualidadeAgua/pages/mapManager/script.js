import qualityCalculator from "../../calcQuality.js";

let map; // Declara a variável do mapa fora da função para que seja acessível globalmente
let markers = []; // Array para armazenar os marcadores


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

    map.on('click', function (e) {
        if (markers[0] != null) {
            map.removeLayer(markers[0]);
            markers.pop();
        }
        markers.push(L.marker(e.latlng).addTo(map));
        document.getElementById('latitude').value = e.latlng.lat;
        document.getElementById('longitude').value = e.latlng.lng;

        getAddress(e.latlng.lat, e.latlng.lng, function(bairro, cidade) {
            document.getElementById('bairro').value = bairro;
            document.getElementById('cidade').value = cidade;
        });

        document.getElementById('addInfoForm').addEventListener('submit', () => {
            cleanMap();
        });
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
        const mostRecentData = item.data[item.data.length - 1];
        var popupContent = `
            <b>Data dos testes:</b> ${mostRecentData.data}<br>
            <b>Balneabilidade:</b> ${qualityCalculator.calcBalneability(mostRecentData.coliformes)}<br>
            <b>IQA:</b> ${qualityCalculator.calcIQA(mostRecentData.iqa)}<br>
            <b>pH:</b> ${mostRecentData.ph}<br>
            <b>Oxigênio Dissolvido (OD):</b> ${mostRecentData.od} mg/L<br>
            <b>Demanda Bioquímica de Oxigênio (DBO):</b> ${mostRecentData.dbo} mg/L<br>
            <b>Nitrogênio Total:</b> ${mostRecentData.nitrogenio} mg/L<br>
            <b>Fósforo Total:</b> ${mostRecentData.fosforo} mg/L<br>
            <b>Metais Pesados:</b> ${mostRecentData.metais}<br>
            <b>Sólidos Suspensos Totais (SST):</b> ${mostRecentData.sst} mg/L<br>
            <b>Coliformes Fecais e E. Coli:</b> ${mostRecentData.coliformes} UFC/100 mL<br>
            <b>Salinidade:</b> ${mostRecentData.salinidade} ‰<br>
            <b>Bairro:</b> ${mostRecentData.bairro}<br>
            <b>Cidade:</b> ${mostRecentData.cidade}
        `;
        marker.bindPopup(popupContent);
    });
}

const cleanMap = () => {
    if (map && markers) {
        markers.forEach(marker => map.removeLayer(marker));
    }
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

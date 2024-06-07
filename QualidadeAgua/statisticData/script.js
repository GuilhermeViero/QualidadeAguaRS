import qualityCalculator from "../calcQuality.js";

function populateTable(data) {
    var tableBody = document.getElementById('data-table');
    tableBody.innerHTML = ''; // Limpa a tabela

    data.forEach(function (item) {
        item.data.forEach(function (d) {
            var row = document.createElement('tr');
            row.innerHTML = `
                <td>${d.data}</td>
                <td>${qualityCalculator.calcBalneability(d.coliformes)}</td>
                <td>${d.iqa}</td>
                <td>${d.coliformes}</td>
                <td>${d.ph}</td>
                <td>${d.od}</td>
                <td>${d.dbo}</td>
                <td>${d.nitrogenio}</td>
                <td>${d.fosforo}</td>
                <td>${d.metais}</td>
                <td>${d.sst}</td>
                <td>${d.salinidade}</td>
                <td>${d.bairro}</td>
                <td>${d.cidade}</td>
            `;

            // row.addEventListener('click', function () {
            //     map.setView([item.latitude, item.longitude], 13);
            //     var marker = L.marker([item.latitude, item.longitude]).addTo(map);
            //     var popupContent = item.data.map(d => `
            //         <b>Data dos testes:</b> ${d.data}<br>
            //         <b>Água própria para banho:</b> ${d.balneabilidade}<br>
            //         <b>pH:</b> ${d.ph}<br>
            //         <b>Oxigênio Dissolvido (OD):</b> ${d.od} mg/L<br>
            //         <b>Demanda Bioquímica de Oxigênio (DBO):</b> ${d.dbo} mg/L<br>
            //         <b>Nitrogênio Total:</b> ${d.nitrogenio} mg/L<br>
            //         <b>Fósforo Total:</b> ${d.fosforo} mg/L<br>
            //         <b>Metais Pesados:</b> ${d.metais}<br>
            //         <b>Sólidos Suspensos Totais (SST):</b> ${d.sst} mg/L<br>
            //         <b>Coliformes Fecais e E. Coli:</b> ${d.coliformes} UFC/100 mL<br>
            //         <b>Salinidade:</b> ${d.salinidade} ‰<br>
            //         <b>Bairro:</b> ${d.bairro}<br>
            //         <b>Cidade:</b> ${d.cidade}
            //     `).join('<br><hr><br>');
            //     marker.bindPopup(popupContent).openPopup();
            // });

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
    // markers.forEach(marker => map.removeLayer(marker));
    // markers = []; // Limpa o array de marcadores

    populateTable(data); // Atualiza a tabela com os dados filtrados

    // Adiciona novos marcadores com base nos dados filtrados
    // data.forEach(function (item) {
    //     var marker = L.marker([item.latitude, item.longitude]).addTo(map);
    //     markers.push(marker); // Adiciona o marcador ao array de marcadores
    //     var popupContent = item.data.map(d => `
    //         <b>Data dos testes:</b> ${d.data}<br>
    //         <b>Água própria para banho:</b> ${d.balneabilidade}<br>
    //         <b>pH:</b> ${d.ph}<br>
    //         <b>Oxigênio Dissolvido (OD):</b> ${d.od} mg/L<br>
    //         <b>Demanda Bioquímica de Oxigênio (DBO):</b> ${d.dbo} mg/L<br>
    //         <b>Nitrogênio Total:</b> ${d.nitrogenio} mg/L<br>
    //         <b>Fósforo Total:</b> ${d.fosforo} mg/L<br>
    //         <b>Metais Pesados:</b> ${d.metais}<br>
    //         <b>Sólidos Suspensos Totais (SST):</b> ${d.sst} mg/L<br>
    //         <b>Coliformes Fecais e E. Coli:</b> ${d.coliformes} UFC/100 mL<br>
    //         <b>Salinidade:</b> ${d.salinidade} ‰<br>
    //         <b>Bairro:</b> ${d.bairro}<br>
    //         <b>Cidade:</b> ${d.cidade}
    //     `).join('<br><hr><br>');
    //     marker.bindPopup(popupContent);
    // });
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('btnFilter').addEventListener('click', filterData);
});

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

const initForm = () => {
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
    });
}

document.addEventListener('DOMContentLoaded',  () => {
    initForm();
});


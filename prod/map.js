$(document).ready(() => {
    // INIT MAP
    let mymap = L.map('lines_map').setView([45.188529, 5.724524], 13);

    // FIRST MAP LAYERS
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);
});
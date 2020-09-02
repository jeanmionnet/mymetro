// CATEGORIES TRANSPORT
const tram_section = $('#tram_section');
let chrono_section = $("#chrono");
let proximo_section = $("#proximo");
let flexo_section = $("#flexo");
let transisere_section = $("#transisere");
let tougo_section = $("#tougo");
let pays_voironnais_section = $("#pays_voironnais");
let scolaire_section = $("#scolaire");
let tad_section = $("#tad");
let snc_section = $("#snc");

// INIT MAP
let mymap = L.map('lines_map').setView([45.188529, 5.724524], 13);

// FIRST MAP LAYER
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

// RECUPERE TOUTES LES LIGNES DE LA REGION
const lines = () => $.ajax({
    url: 'http://data.metromobilite.fr/api/routers/default/index/routes',
    type: "GET",
    dataType: "json",
}).done((data) => {

    // POUR CHAQUE ELEMENT TROUVE, LES GENERE EN HTML
    for (const item of data) {
        // DONNEES ELEMENTS
        const name = item.shortName;
        const type = item.type;
        const mode = item.mode; 
        const color = item.color;
        const text_color= item.textColor;
        const id = item.id;

        // ELEMENTS HTML
        let circle = document.createElement('div');
        circle.id = id;
        let line = document.createElement('p');

        // TRAMS
        if (mode === "TRAM") {
            if (type === "TRAM") {
                tram_section.append(circle);
                circle.append(line);
                circle.className = 'circle';
                circle.style.backgroundColor = `#${color}`;
                circle.style.color = `#${text_color}`;
                circle.style.borderRadius = "50%";
                line.innerText = `${name}`;
            }
        } else // BUS OU TRAINS
        {
            if (type === "CHRONO") {
            // CHRONO BUS
                chrono_section.append(circle);
                circle.append(line);
                circle.className = 'circle';
                circle.style.backgroundColor = `#${color}`;
                circle.style.color = `#${text_color}`;
                circle.style.borderRadius = "50%";
                line.innerText = `${name}`;
            } else if (type === "PROXIMO") {
            // PROXIMO BUS
                proximo_section.append(circle);
                circle.append(line);
                circle.className = 'circle';
                circle.style.backgroundColor = `#${color}`;
                circle.style.color = `#${text_color}`;
                circle.style.borderRadius = "25%";
                line.innerText = `${name}`;
            } else if (type === "FLEXO") {
            // FLEXO BUS
                flexo_section.append(circle);
                circle.append(line);
                circle.className = 'circle';
                circle.style.backgroundColor = `#${color}`;
                circle.style.color = `#${text_color}`;
                circle.style.borderRadius = "25%";
                line.innerText = `${name}`;
            } else if (type === "C38") {
            // BUS TRANSISERES
                transisere_section.append(circle);
                circle.append(line);
                circle.className = 'circle';
                circle.style.backgroundColor = `#${color}`;
                circle.style.color = `#${text_color}`;
                circle.style.borderRadius = "10px";
                line.innerText = `${name}`;
            } else if (type === "Structurantes" 
            || type === "Secondaires") {
            // BUS TOUGO
                tougo_section.append(circle);
                circle.append(line);
                circle.className = 'circle';
                circle.style.backgroundColor = `#${color}`;
                circle.style.color = `#${text_color}`;
                circle.style.borderRadius = "10px";
                line.innerText = `${name}`;
            } else if (type === "Urbaines" 
            || type === "Interurbaines") {
            // BUS PAYS VOIRONNAIS
                pays_voironnais_section.append(circle);
                circle.append(line);
                circle.className = 'circle';
                circle.style.backgroundColor = `#${color}`;
                circle.style.color = `#${text_color}`;
                circle.style.borderRadius = "10px";
                line.innerText = `${name}`;
            } else if (type === "TAD") {
            // BUS A LA DEMANDE
                tad_section.append(circle);
                circle.append(line);
                circle.className = 'circle';
                circle.style.backgroundColor = `#${color}`;
                circle.style.color = `#${text_color}`;
                circle.style.borderRadius = "25%";
                line.innerText = `${name}`;
            }
        }
        // RECUPERE L'ID AU CLIC
        $(circle).click(() => {
            localStorage.setItem('line_id', id);
            localStorage.setItem('line_name', name);
            localStorage.setItem('mode', mode);
            localStorage.setItem('color', color);
        })
    }; 
}).fail((error) => {
    console.warn('FAILLLLL');
    console.log(error);
})

// Lance la recherche des lignes au démarrage & initialise la map
$(document).ready(() => {
    lines()
});

// JSON OBJECT
const lines_obj = {};
const markers_obj = {};
let geo;

// LINE SELECTION
$(document).on('click', '.circle', function () {
    $(this).toggleClass('actived_line');

    // RECUPERE LE TRACE DE LA LIGNE
    $.ajax({
        url: `http://data.metromobilite.fr/api/lines/json?types=ligne&codes=${this.id}`,
        type: "GET",
        dataType: "json",
    }).done((data) => {
        const color = `rgb(${data.features[0].properties.COULEUR})`;
        const id = this.id;

        geo = L.geoJSON(data, {
            style: function (feature) {
                return {
                    color: color,
                    weight: 4,
                    opacity: 0.75
                };
        }
        }).bindPopup(function (layer) {
            return layer.feature.properties.description;
        })

        if (!lines_obj[data.features[0].properties.CODE]) {
            lines_obj[data.features[0].properties.CODE] = geo;
            lines_obj[data.features[0].properties.CODE].addTo(mymap);
            // ARRÊTS

        } else {
            lines_obj[data.features[0].properties.CODE].removeFrom(mymap);
            lines_obj[data.features[0].properties.CODE] = undefined;
            // ARRÊTS
            
        }
    }).fail((error) => {
        console.warn('FAILLLLL');
        console.log(error);
    })

    // RECUPERE LES ARRETS
    $.ajax({
        url: `http://data.metromobilite.fr/api/ficheHoraires/json?route=${this.id}`,
        type: "GET",
        dataType: "json",
    }).done((data) => {
        for (let m = 0; m < data[0].arrets.length; ++m) {
            L.marker([data[0].arrets[m].lat, data[0].arrets[m].lon]).addTo(mymap)
            .bindPopup(`${data[0].arrets[m].stopName}`)
            .openPopup();
        }
    }).fail((error) => {
        console.warn('FAILLLLL');
        console.log(error);
    })
});

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
        let circle = document.createElement('a');
        $(circle).attr({
            'href': './line_details.html',
            'alt': `${mode} ${name}`
        });
        let line = document.createElement('p'); // Format à changer - PHASE TEST

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
        })
    }; 
}).fail((error) => {
    console.warn('FAILLLLL');
    console.log(error);
})

// Lance la recherche des lignes au démarrage
$(document).ready = lines();
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
        console.log(item);
        let circle = document.createElement('div');
        let line = document.createElement('a'); // Format à changer - PHASE TEST
        let name = item.shortName;
        let type = item.type;

        // TRAMS
        if (item.mode === "TRAM") {
            if (type === "TRAM") {
                tram_section.append(circle);
                circle.append(line);
                circle.className = 'circle';
                circle.style.backgroundColor = `#${item.color}`;
                circle.style.color = `#${item.textColor}`;
                circle.style.borderRadius = "50%";
                line.innerText = `${name}`;
            }
        } else // BUS OU TRAINS
        {
            if (type === "TRAM") {
                tram_section.append(circle);
                circle.append(line);
                circle.className = 'circle';
                circle.style.backgroundColor = `#${item.color}`;
                circle.style.color = `#${item.textColor}`;
                circle.style.borderRadius = "50%";
                line.innerText = `${name}`;
            } else if (type === "CHRONO") {
            // CHRONO BUS
                chrono_section.append(circle);
                circle.append(line);
                circle.className = 'circle';
                circle.style.backgroundColor = `#${item.color}`;
                circle.style.color = `#${item.textColor}`;
                circle.style.borderRadius = "50%";
                line.innerText = `${name}`;
            } else if (type === "PROXIMO") {
            // PROXIMO BUS
                proximo_section.append(circle);
                circle.append(line);
                circle.className = 'circle';
                circle.style.backgroundColor = `#${item.color}`;
                circle.style.color = `#${item.textColor}`;
                circle.style.borderRadius = "25%";
                line.innerText = `${name}`;
            } else if (type === "FLEXO") {
            // FLEXO BUS
                flexo_section.append(circle);
                circle.append(line);
                circle.className = 'circle';
                circle.style.backgroundColor = `#${item.color}`;
                circle.style.color = `#${item.textColor}`;
                circle.style.borderRadius = "25%";
                line.innerText = `${name}`;
            } else if (type === "C38") {
            // BUS TRANSISERES
                transisere_section.append(circle);
                circle.append(line);
                circle.className = 'circle';
                circle.style.backgroundColor = `#${item.color}`;
                circle.style.color = `#${item.textColor}`;
                circle.style.borderRadius = "10px";
                circle.style.width = "150px";
                line.innerText = `${name}`;
            } else if (type === "Structurantes" 
            || type === "Secondaires") {
            // BUS TOUGO
                tougo_section.append(circle);
                circle.append(line);
                circle.className = 'circle';
                circle.style.backgroundColor = `#${item.color}`;
                circle.style.color = `#${item.textColor}`;
                circle.style.borderRadius = "10px";
                circle.style.width = "150px";
                line.innerText = `${name}`;
            } else if (type === "Urbaines" 
            || type === "Interurbaines") {
            // BUS PAYS VOIRONNAIS
                pays_voironnais_section.append(circle);
                circle.append(line);
                circle.className = 'circle';
                circle.style.backgroundColor = `#${item.color}`;
                circle.style.color = `#${item.textColor}`;
            circle.style.borderRadius = "10px";
                circle.style.width = "150px";
                line.innerText = `${name}`;
            } else if (type === "SCOL") {
            // BUS SCOLAIRES
                scolaire_section.append(circle);
                circle.append(line);
                circle.className = 'circle';
                circle.style.backgroundColor = `#${item.color}`;
                circle.style.color = `#${item.textColor}`;
                circle.style.borderRadius = "25%";
                line.innerText = `${name}`;
            } else if (type === "TAD") {
            // BUS A LA DEMANDE
                tad_section.append(circle);
                circle.append(line);
                circle.className = 'circle';
                circle.style.backgroundColor = `#${item.color}`;
                circle.style.color = `#${item.textColor}`;
                circle.style.borderRadius = "25%";
                line.innerText = `${name}`;
            } else if (type === "SNC") {
            // TRAINS
                snc_section.append(circle);
                circle.append(line);
                circle.className = 'circle';
                circle.style.backgroundColor = `#${item.color}`;
                circle.style.color = `#${item.textColor}`;
                circle.style.borderRadius = "25%";
                line.innerText = `${name}`;
            }
        }
    }; 
}).fail((error) => {
    console.warn('FAILLLLL');
    console.log(error);
})

// Lance la recherche des lignes au démarrage
window.onload = lines();
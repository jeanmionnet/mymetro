// CATEGORIES TRANSPORT
const fav_box = $('#fav_box');
const fav_list = localStorage.getItem('fav');

// ENLEVE LE TEXTE SI IL Y A DU CONTENU
console.log(fav_box.is(':empty'));

// RECUPERE TOUTES LES LIGNES DE LA REGION
const fav = () => $.ajax({
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

        if (fav_list.includes(id)) {

        // ELEMENTS HTML
        let circle = document.createElement('a');
        $(circle).attr({
            'href': './line_details.html',
            'alt': `${mode} ${name}`
        });
        circle.id = id;
        let line = document.createElement('p');

        // TRAMS
        if (mode === "TRAM") {
            if (type === "TRAM") {
                fav_box.append(circle);
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
                fav_box.append(circle);
                circle.append(line);
                circle.className = 'circle';
                circle.style.backgroundColor = `#${color}`;
                circle.style.color = `#${text_color}`;
                circle.style.borderRadius = "50%";
                line.innerText = `${name}`;
            } else if (type === "PROXIMO") {
            // PROXIMO BUS
                fav_box.append(circle);
                circle.append(line);
                circle.className = 'circle';
                circle.style.backgroundColor = `#${color}`;
                circle.style.color = `#${text_color}`;
                circle.style.borderRadius = "25%";
                line.innerText = `${name}`;
            } else if (type === "FLEXO") {
            // FLEXO BUS
                fav_box.append(circle);
                circle.append(line);
                circle.className = 'circle';
                circle.style.backgroundColor = `#${color}`;
                circle.style.color = `#${text_color}`;
                circle.style.borderRadius = "25%";
                line.innerText = `${name}`;
            } else if (type === "C38") {
            // BUS TRANSISERES
                fav_box.append(circle);
                circle.append(line);
                circle.className = 'circle';
                circle.style.backgroundColor = `#${color}`;
                circle.style.color = `#${text_color}`;
                circle.style.borderRadius = "10px";
                line.innerText = `${name}`;
            } else if (type === "Structurantes" 
            || type === "Secondaires") {
            // BUS TOUGO
                fav_box.append(circle);
                circle.append(line);
                circle.className = 'circle';
                circle.style.backgroundColor = `#${color}`;
                circle.style.color = `#${text_color}`;
                circle.style.borderRadius = "10px";
                line.innerText = `${name}`;
            } else if (type === "Urbaines" 
            || type === "Interurbaines") {
            // BUS PAYS VOIRONNAIS
                fav_box.append(circle);
                circle.append(line);
                circle.className = 'circle';
                circle.style.backgroundColor = `#${color}`;
                circle.style.color = `#${text_color}`;
                circle.style.borderRadius = "10px";
                line.innerText = `${name}`;
            } else if (type === "TAD") {
            // BUS A LA DEMANDE
                fav_box.append(circle);
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
        }
    }; 
}).fail((error) => {
    console.warn('FAILLLLL');
    console.log(error);
})

// Lance la recherche des lignes au démarrage
$(document).ready = fav();
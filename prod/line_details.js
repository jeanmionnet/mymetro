
// IDENTIFIANT DE LA LIGNE SELECTIONNEE
const id = localStorage.getItem('line_id');
// CHANGE L'ID POUR LE FETCH DES EVENEMENTS ROUTIERS
let id_rework = [];
for (const char of id) {
    if (char !== ':') {
        id_rework.push(char);
    } else {
        id_rework.push('_');
    }
}
id_rework = id_rework.join('');

// TITRE PAGE
document.title = `myMétro - Ligne ${localStorage.getItem('line_name')}`;

// MODE TRANSPORT
const type = localStorage.getItem('mode');

// MODE SVG
let svg = '';
if (type === "TRAM") {
    svg = '<svg height="32" width="32" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 426.667 426.667" style="enable-background:new 0 0 426.667 426.667;" xml:space="preserve"><path fill="#fff" d="M234.56,64.32L250.667,32H320V0H106.667v32H208l-16.213,32.32C125.013,66.347,64,79.68,64,138.667V318.72    c0,30.827,25.28,56.64,55.253,63.467L85.333,416v10.667h47.573L175.573,384H256l42.667,42.667h42.667V416l-32-32h-1.707    c36.053,0,55.04-29.333,55.04-65.28V138.667C362.667,79.04,306.987,66.133,234.56,64.32z M213.333,352c-17.707,0-32-14.293-32-32    s14.293-32,32-32s32,14.293,32,32S231.04,352,213.333,352z M320,256H106.667V149.333H320V256z"/></svg>';
} else {
    svg = '<svg height="32" width="32" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 405.333 405.333" style="enable-background:new 0 0 405.333 405.333;" xml:space="preserve"><path fill="#fff" d="M202.667,0C108.373,0,32,10.667,32,85.333v213.333c0,18.88,8.32,35.627,21.333,47.36V384    c0,11.733,9.6,21.333,21.333,21.333H96c11.84,0,21.333-9.6,21.333-21.333v-21.333H288V384c0,11.733,9.493,21.333,21.333,21.333    h21.333c11.733,0,21.333-9.6,21.333-21.333v-37.973c13.013-11.733,21.333-28.48,21.333-47.36V85.333    C373.333,10.667,296.96,0,202.667,0z M106.667,320c-17.707,0-32-14.293-32-32s14.293-32,32-32s32,14.293,32,32    S124.373,320,106.667,320z M298.667,320c-17.707,0-32-14.293-32-32s14.293-32,32-32s32,14.293,32,32S316.373,320,298.667,320z M330.667,192h-256V85.333h256V192z"/></svg>';
}

// FAV
const fav_true = `Ajouter aux favoris <svg id="fav_svg" height="32" width="32" viewBox="0 -28 512.00002 512" xmlns="http://www.w3.org/2000/svg"><path fill="#77D353" d="m471.382812 44.578125c-26.503906-28.746094-62.871093-44.578125-102.410156-44.578125-29.554687 0-56.621094 9.34375-80.449218 27.769531-12.023438 9.300781-22.917969 20.679688-32.523438 33.960938-9.601562-13.277344-20.5-24.660157-32.527344-33.960938-23.824218-18.425781-50.890625-27.769531-80.445312-27.769531-39.539063 0-75.910156 15.832031-102.414063 44.578125-26.1875 28.410156-40.613281 67.222656-40.613281 109.292969 0 43.300781 16.136719 82.9375 50.78125 124.742187 30.992188 37.394531 75.535156 75.355469 127.117188 119.3125 17.613281 15.011719 37.578124 32.027344 58.308593 50.152344 5.476563 4.796875 12.503907 7.4375 19.792969 7.4375 7.285156 0 14.316406-2.640625 19.785156-7.429687 20.730469-18.128907 40.707032-35.152344 58.328125-50.171876 51.574219-43.949218 96.117188-81.90625 127.109375-119.304687 34.644532-41.800781 50.777344-81.4375 50.777344-124.742187 0-42.066407-14.425781-80.878907-40.617188-109.289063zm0 0"/></svg>`;
const fav_false = `Ajouter aux favoris <svg id="fav_svg" height="32" width="32" viewBox="0 -28 512.001 512" xmlns="http://www.w3.org/2000/svg"><path fill="#77D353" d="m256 455.515625c-7.289062 0-14.316406-2.640625-19.792969-7.4375-20.683593-18.085937-40.625-35.082031-58.21875-50.074219l-.089843-.078125c-51.582032-43.957031-96.125-81.917969-127.117188-119.3125-34.644531-41.804687-50.78125-81.441406-50.78125-124.742187 0-42.070313 14.425781-80.882813 40.617188-109.292969 26.503906-28.746094 62.871093-44.578125 102.414062-44.578125 29.554688 0 56.621094 9.34375 80.445312 27.769531 12.023438 9.300781 22.921876 20.683594 32.523438 33.960938 9.605469-13.277344 20.5-24.660157 32.527344-33.960938 23.824218-18.425781 50.890625-27.769531 80.445312-27.769531 39.539063 0 75.910156 15.832031 102.414063 44.578125 26.191406 28.410156 40.613281 67.222656 40.613281 109.292969 0 43.300781-16.132812 82.9375-50.777344 124.738281-30.992187 37.398437-75.53125 75.355469-127.105468 119.308594-17.625 15.015625-37.597657 32.039062-58.328126 50.167969-5.472656 4.789062-12.503906 7.429687-19.789062 7.429687zm-112.96875-425.523437c-31.066406 0-59.605469 12.398437-80.367188 34.914062-21.070312 22.855469-32.675781 54.449219-32.675781 88.964844 0 36.417968 13.535157 68.988281 43.882813 105.605468 29.332031 35.394532 72.960937 72.574219 123.476562 115.625l.09375.078126c17.660156 15.050781 37.679688 32.113281 58.515625 50.332031 20.960938-18.253907 41.011719-35.34375 58.707031-50.417969 50.511719-43.050781 94.136719-80.222656 123.46875-115.617188 30.34375-36.617187 43.878907-69.1875 43.878907-105.605468 0-34.515625-11.605469-66.109375-32.675781-88.964844-20.757813-22.515625-49.300782-34.914062-80.363282-34.914062-22.757812 0-43.652344 7.234374-62.101562 21.5-16.441406 12.71875-27.894532 28.796874-34.609375 40.046874-3.453125 5.785157-9.53125 9.238282-16.261719 9.238282s-12.808594-3.453125-16.261719-9.238282c-6.710937-11.25-18.164062-27.328124-34.609375-40.046874-18.449218-14.265626-39.34375-21.5-62.097656-21.5zm0 0"/></svg>`;
let fav_obj;
let fav = false;

// VERIFIE SI LE TABLEAU DES FAVORIS EXISTE DEJA
if (localStorage.getItem('fav') === null) {
    fav_obj = {
        list: [],
    }
    console.log('Création de la liste');
    console.log(fav_obj);
} else {
    fav_obj = JSON.parse(localStorage.getItem('fav'));

    if (fav_obj.list.includes(id)) {
        $('#fav_svg').html(fav_true);
        fav = true;
    }
}

$('#fav_svg').click(() => {
    if (fav === false) {
        $('#fav_svg').html(fav_true);
        if (!fav_obj.list.includes(id)) {
            fav_obj.list.push(id);
            localStorage.setItem('fav', JSON.stringify(fav_obj));
        }
        fav = true;
    } else {
        $('#fav_svg').html(fav_false);
        let index = fav_obj.list.indexOf(id);
        fav_obj.list.splice(index, 1);
        console.log(id);
        localStorage.setItem('fav', JSON.stringify(fav_obj))
        fav = false;
    }
})

// SENS DE LA LIGNE & BOUTON SWAP
let direction = 0;
const swap_btn = $('#swap');

// PREV & NEXT
let time = '';
const prev = $('#prev');
const next = $('#next');

// NOM DE LA LIGNE & NB D'ARRÊTS
const line = $('#line');
const nb_arrets = $('#nb_arrets');

// TIMELINE POUR ITINERAIRES & HORAIRES
const depart = $('#from');
const arrivee = $('#to');
const timeline = $('.timeline');

// CHANGE LES SECONDES EN HEURE
function s_to_hm(s) {
    s += 7200;
    let h = Math.floor(s/3600); // AJOUTE DEUX HEURES POUR SE METTRE AU NIVEAU DE L'API
    s -= h*3600;
    let m = Math.floor(s/60);
    s -= m*60;
    return h+"h"+(m < 10 ? '0'+m : m);
}

// RECUPERE LES DETAILS D'UNE LIGNE EN PARTICULIER
const line_details = () => $.ajax({
    url: `http://data.metromobilite.fr/api/ficheHoraires/json?route=${id}&time=${time}`,
    type: "GET",
    dataType: "json",
}).done((data) => {
    // REFRESH
    timeline.html('');
    $('tbody').html('');

    // NOM DE LA LIGNE
    line.html(`${svg}  Ligne ${localStorage.getItem('line_name')}`);
    line.css('text-shadow', `3px 2px 1px #${localStorage.getItem('color')}`);
    // LISTE DES ARRETS
    const trip = data[direction].arrets;
    // GENERATE TIMELINE
    const from = trip[0].stopName;
    const to = trip[trip.length - 1].stopName;
    // HTML
    depart.html(`${from}`);
    arrivee.html(`${to}`);

    for (let i = 0; i < trip.length; i++) {
        // GENERE LE NOMBRE D'ARRÊTS
        nb_arrets.html(`Nombre d'arrêts : <span class="muted">${i + 1}</span>`);

        // GENERE LE BLOC "ARRET"
        let entry = document.createElement('div');
        entry.className = 'entry';
        timeline.append(entry);

        // AJOUTE LES ARRETS AU TABLEAU DES HORAIRES
        let block = document.createElement('tr');
        $('tbody').append(block);
        let arret = document.createElement('td');
        block.append(arret);
        arret.innerHTML = `${trip[i].stopName}`;

        // AJOUTE LES HORAIRES CORRESPONDANTS
        for (let j = 0; j < trip[i].trips.length; ++j) {
            let hour = document.createElement('td');
            block.append(hour);
            if (trip[i].trips[j] === '|') {
                hour.innerHTML = '|';
            } else {
                hour.innerHTML = `${s_to_hm(trip[i].trips[j])}`;
            }
        }

        // GENERE LA PARTIE "HORAIRE"
        let title = document.createElement('div');
        title.className = 'title';
        entry.append(title);

        // GENERE LE NOM DE L'ARRET CORRESPONDANT
        let body = document.createElement('div');
        body.classList = 'body';
        entry.append(body);
        let stop = document.createElement('p');
        body.append(stop);
        stop.innerText = `${trip[i].stopName}`;
    }

    // CHANGE LES HORAIRES
    // PRECEDENT
    prev.one('click', () => {
        time = `${data[0].prevTime}`;
        line_details();
    })
    // SUIVANT
    next.one('click', () => {
        time = `${data[0].nextTime}`;

        line_details();
    })
}).fail((error) => {
    console.warn('FAILLLLL');
    console.log(error);
})

// RECUPERE LES DONNES DYNAMIQUES DE LA LIGNE EN QUESTION
const line_event = () => $.ajax({
    url: `https://data.metromobilite.fr/api/dyn/ligne/json`,
    type: "GET",
    dataType: "json",
}).done((data) => {
    for (obj in data) {
        if (obj === id_rework) {
            // RECUPERE LES DONNES LES PLUS RECENTES
            let status = data[obj][data[obj].length - 1].nsv_id;
            switch (status) {
                case 0:
                    $("#status").html('Statut : <span class="muted">non communiqué</span>');
                    break;
                case 1:
                    $("#status").html('<span class="bold">Statut</span> : <span class="muted">Service normal</span>');
                    break;
                case 2:
                    $("#status").html('<span class="bold">Statut</span> : service perturbé');
                    break;
                case 3:
                    $("#status").html('<span class="bold">Statut</span> : service très perturbé');
                    break;
                case 5:
                    $("#status").html('<span class="bold">Statut</span> : Hors horaire de service');
                    break;
            }
        };
    }
}).fail((error) => {
    console.warn('FAILLLLL');
    console.log(error);
})

// FONCTION CHANGEMENT DIRECTION
const swap_direction = () => {
    // CHANGE LA DIRECTION DE LA LIGNE
    if (direction === 0) {
        direction = 1;
    } else {
        direction = 0;
    }

    // APPELLE LA FONCTION AVEC LA NOUVELLE DIRECTION
    line_details();
}

// CHANGE LA DIRECTION AU CLIC
swap_btn.click(swap_direction);

// LANCE LES FONCTIONS AU DEMARRAGE
$(document).ready(() => {
   line_details();
   line_event();
})

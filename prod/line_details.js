
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

// MODE TRANSPORT
const type = localStorage.getItem('mode');

// MODE SVG
let svg = '';
if (type === "TRAM") {
    svg = '<svg height="32" width="32" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 426.667 426.667" style="enable-background:new 0 0 426.667 426.667;" xml:space="preserve"><path fill="#fff" d="M234.56,64.32L250.667,32H320V0H106.667v32H208l-16.213,32.32C125.013,66.347,64,79.68,64,138.667V318.72    c0,30.827,25.28,56.64,55.253,63.467L85.333,416v10.667h47.573L175.573,384H256l42.667,42.667h42.667V416l-32-32h-1.707    c36.053,0,55.04-29.333,55.04-65.28V138.667C362.667,79.04,306.987,66.133,234.56,64.32z M213.333,352c-17.707,0-32-14.293-32-32    s14.293-32,32-32s32,14.293,32,32S231.04,352,213.333,352z M320,256H106.667V149.333H320V256z"/></svg>';
} else {
    svg = '<svg height="32" width="32" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 405.333 405.333" style="enable-background:new 0 0 405.333 405.333;" xml:space="preserve"><path fill="#fff" d="M202.667,0C108.373,0,32,10.667,32,85.333v213.333c0,18.88,8.32,35.627,21.333,47.36V384    c0,11.733,9.6,21.333,21.333,21.333H96c11.84,0,21.333-9.6,21.333-21.333v-21.333H288V384c0,11.733,9.493,21.333,21.333,21.333    h21.333c11.733,0,21.333-9.6,21.333-21.333v-37.973c13.013-11.733,21.333-28.48,21.333-47.36V85.333    C373.333,10.667,296.96,0,202.667,0z M106.667,320c-17.707,0-32-14.293-32-32s14.293-32,32-32s32,14.293,32,32    S124.373,320,106.667,320z M298.667,320c-17.707,0-32-14.293-32-32s14.293-32,32-32s32,14.293,32,32S316.373,320,298.667,320z M330.667,192h-256V85.333h256V192z"/></svg>';
}

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

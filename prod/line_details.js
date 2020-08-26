// DATE (AJUSTE POUR L'HEURE LOCALE)
let date = new Date();
let timestamp = date.getTime() + 7200000;

// IDENTIFIANT DE LA LIGNE SELECTIONNEE
const id = localStorage.getItem('line_id');

// SENS DE LA LIGNE & BOUTON SWAP
let direction = 0;
const swap_btn = $('#swap');

// NOM DE LA LIGNE
const line = $('#line');

// TIMELINE POUR ITINERAIRES & HORAIRES
const depart = $('#from');
const arrivee = $('#to');
const timeline = $('.timeline');

// RECUPERE LES DETAILS D'UNE LIGNE EN PARTICULIER
const line_details = () => $.ajax({
    url: `http://data.metromobilite.fr/api/ficheHoraires/json?route=${id}`,
    type: "GET",
    dataType: "json",
}).done((data) => {
    // REFRESH
    timeline.html('');
    // NOM DE LA LIGNE
    line.html(`coucou`);
    // LISTE DES ARRETS
    const trip = data[direction].arrets;
    // GENERATE TIMELINE
    const from = trip[0].stopName;
    const to = trip[trip.length - 1].stopName;
    // HTML
    depart.html(`${from}`);
    arrivee.html(`${to}`);

    for (let i = 0; i < trip.length; i++) {
        // HEURE DE PASSAGE
        let schedule = trip[i].trips[0];
        schedule = new Date((schedule + 7200) * 1000).toISOString().substr(11, 5);

        // GENERE LE BLOC "ARRET"
        let entry = document.createElement('div');
        entry.className = 'entry';
        timeline.append(entry);

        // GENERE LA PARTIE "HORAIRE"
        let title = document.createElement('div');
        title.className = 'title';
        entry.append(title);
        let schedule_box = document.createElement('h3');
        title.append(schedule_box);
        schedule_box.innerText = `${schedule}`;

        // GENERE LE NOM DE L'ARRET CORRESPONDANT
        let body = document.createElement('div');
        body.classList = 'body';
        entry.append(body);
        let stop = document.createElement('p');
        body.append(stop);
        stop.innerText = `${trip[i].stopName}`;
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



$(document).ready = line_details();
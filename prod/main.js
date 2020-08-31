// ICONE BURGER & MODAL
const open_icon = $('#open_menu');
const close_icon = $('#close_menu');
const modal_menu = $('#modal_menu');

// BANNIERE INFO & INDICES
const info = $('#info');
const road = $('#road_traffic');
const transports = $('#transports_traffic');

// OUVRIR MENU
open_icon.click(() => {
    open_icon.addClass('not_display');
    close_icon.toggleClass('display');
    modal_menu.addClass('display');
})

// FERMER MENU
close_icon.click(() => {
    open_icon.toggleClass('not_display');
    close_icon.removeClass('display');
    modal_menu.removeClass('display');
})

// RECUPERE L'INDICE DE TRAFIC ROUTIER (ROUTES)
const tr_indice = () => $.ajax({
    url: 'http://data.metromobilite.fr/api/dyn/indiceTr/json',
    type: "GET",
    dataType: "json",
}).done((data) => {
    let i = '';
    // CHANGE LA COULEUR DE L'ICONE SUIVANT L'ETAT DU TRAFIC
    switch(data.IR1[1].indice) {
        case 0:
            road.attr('fill', '#7F7F7F');
            i = "Non communiqué";
            break;
        case 1:
            road.attr('fill', '#77D353');
            i = "Trafic routier fluide";
            break;
        case 2:
            road.attr('fill', '#ffff00');
            i = "Trafic routier alenti"
            break;
        case 3:
            road.attr('fill', '#ffa500');
            i = "Trafic routier embouteillé";
            break;
        case 5:
            road.attr('fill', '#ff0000');
            i = "Trafic routier fermé";
            break;
        default:
            road.attr('fill', '#7F7F7F');
            i = "Non communiqué";
            break;
    }
    $('#road_traffic_title').html(i);
}).fail((error) => {
    console.warn('FAILLLLL');
    console.log(error);
})

// RECUPERE L'INDICE DE TRAFIC ROUTIER (TRANSPORTS EN COMMUN)
const tc_indice = () => $.ajax({
    url: 'http://data.metromobilite.fr/api/dyn/indiceTc/json',
    type: "GET",
    dataType: "json",
}).done((data) => {
    let i = '';
    // CHANGE LA COULEUR DE L'ICONE SUIVANT L'ETAT DU TRAFIC
    switch(data.ITC1[data.ITC1.length - 1].indice) {
        case 0:
            transports.attr('fill', '#7F7F7F');
            i = "Non communiqué";
            break;
        case 1:
            transports.attr('fill', '#77D353');
            i = "Trafic transports en commun fluide";
            break;
        case 2:
            transports.attr('fill', '#ffff00');
            i = "Trafic transports en commun ralenti";
            break;
        case 3:
            transports.attr('fill', '#ffa500');
            i = "Trafic transports en commun embouteillé";
            break;
        case 4:
            transports.attr('fill', '#ff0000');
            i = "Trafic transports en commun fermé";
            break;
        default:
            transports.attr('fill', '#7F7F7F');
            i = "Non communiqué";
            break;
    }
    $('#transports_traffic_title').html(i);
}).fail((error) => {
    console.warn('FAILLLLL');
    console.log(error);
})

// RECUPERE L'INDICE ATMOSPHERIQUE
const atmo_indice = () => $.ajax({
    url: 'http://data.metromobilite.fr/api/dyn/indiceAtmoFull/json',
    type: "GET",
    dataType: "json",
}).done((data) => {
}).fail((error) => {
    console.warn('FAILLLLL');
    console.log(error);
})

// RECUPERE LES EVENEMENTS
const events = () => $.ajax({
    url: 'http://data.metromobilite.fr/api/dyn/evtTC/json',
    type: "GET",
    dataType: "json",
}).done((data) => {
}).fail((error) => {
    console.warn('FAILLLLL');
    console.log(error);
})

// AFFICHE LA BANNIERE 
$(document).ready(() => {
    setTimeout(() => {
        info.toggleClass('display_info');
    }, 2000)
    setInterval(() => {
        info.toggleClass('display_info')
    }, 20000)
});

// LANCE LES FETCHS AU DEMARRAGE
$(document).ready(() => {
    tr_indice();
    tc_indice();
    atmo_indice();
    events();
})

// const grenoble_view = '[45.1669, 5.7175], 10.8';
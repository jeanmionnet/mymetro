// ICONE BURGER & MODAL
const open_icon = $('#open_menu');
const close_icon = $('#close_menu');
const modal_menu = $('#modal_menu');

// BANNIERE INFO
const info = $('#info');

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

// AFFICHE LA BANNIERE
$(document).ready(() => {
    setTimeout(() => {
        info.toggleClass('display_info');
    }, 2000)
    setInterval(() => {
        info.toggleClass('display_info')
    }, 20000)
});
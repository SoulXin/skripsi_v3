import $ from 'jquery' 

$(document).ready(function () {
    $('.sub-menu').slideToggle(); // => Awal reload dia ketutup

    $('.sub-btn').click(function(){
        $(this).next('.sub-menu').slideToggle();
        $(this).find('.dropdown').toggleClass('rotate');
    });
});
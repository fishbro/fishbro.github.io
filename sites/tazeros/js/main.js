$(document).ready(() => {
    $('.menu-opener').on('click', (e) => {
        $('body').toggleClass('side-open');

        return false;
    });

    $(document).mouseup((e) => {
        let obj = $('.navbar');
        if (!obj.is(e.target) && obj.has(e.target).length === 0 && !$('.menu-opener').is(e.target)) {
            $('body').removeClass('side-open');
        }
    });

    $('li.nav-item.dropdown span').on('click', (e) => {
        let el = $(e.currentTarget);
        
        el.toggleClass('opened');
    });

    let sticky_offset = $('.sticky-wrapper').offset().top;
    $('.sticky-wrapper').parent().height($('.sticky-wrapper').height());

    $(window).on('scroll', (e) => {
        let el = $('.sticky-wrapper');

        if($(window).scrollTop() > sticky_offset){
            $('body').addClass('sticky');
        }else{
            $('body').removeClass('sticky');
        }
    });
});
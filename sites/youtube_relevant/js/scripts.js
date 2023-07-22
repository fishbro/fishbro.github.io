$(document).ready(function(){
    if($('.google-like-carousel').length){
        $('.google-like-carousel').owlCarousel({
            center: true,
            items:2,
            loop:true,
            margin:15,
            smartSpeed: 700,
            thumbs: false,
            thumbImage: false,
            dots: false,
            // autoplay: true,
            lazyLoad: true,
            nav: true,
            navText: ['',''],
            responsive: {
                0:{
                    items:1.2,
                    margin:10,
                },
                768:{
                    items:1.4
                },
                992:{
                    items:1.4
                },
                1080:{
                    items:1.6
                },
                1170:{
                    items:1.8
                },
                1280:{
                    items:2
                }
            }
        });
    }
    if($('.top-reklama-na-youtube .arrow').length){
        $('.top-reklama-na-youtube .arrow').click(function(){
            var destination = $('.body-reklama-na-youtube').offset().top;
            $('html').animate({ scrollTop: destination }, 800);
            return false;
        });
    }

    if($('.vertical-sl').length){
        $('.vertical-sl').owlCarousel({
            loop: true,
            autoplay: true,
            items: 1,
            touchDrag: false,
            mouseDrag: false,
            nav: false,
            dots: false,
            autoplayTimeout: 1500,
            animateOut: 'slideOutUp',
            animateIn: 'slideInUp'
        });
    }

    $('.fancybox').fancybox();
});

var lastScrollTop = 0;
var _rowCount;
//var fullpageActive = false;

/* function GetURLParameter(sParam){
	var sPageURL = window.location.search.substring(1);
	console.log(sPageURL);
	var sURLVariables = sPageURL.split('&');
	for (var i = 0; i < sURLVariables.length; i++){
		var sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] == sParam){
			return sParameterName[1];
		}
	}
} */
		$(document).ready(function(){
			$('.tool-item').hover(function(){
				var helptext = $(this).attr('data')
				$('.tooltip-block').addClass('hbrr');
				$('.tooltip-block').html(helptext).show();
				$('.tooltip-block').offset({top:$(this).offset().top,left:$(this).offset().left+$(this).width()+5}).css('border',$(this).data('color'));;
			},function(){
				$('.tooltip-block').hide();
				$('.tooltip-block.hbrr').removeClass('hbrr');
			});
		});

$(document).ready(function(){




	$(".pricing-content:eq(1) .serv-row").each(function(key, value) {
		//console.log(key);
		//console.log($(".serv-row:nth-ch:eq("+key+")").index());
		//$(".serv-row:eq("+key+")").index();
		//console.log('.pricing-content .serv-row:nth-child('+(key + 2)+')');
/* 		if (key == 0) {
			return true;
		} */
		$('.pricing-content .serv-row:nth-child('+(key + 2)+')').equalHeights();
	});

	if($(window).width() < '993') {
			$('.pricing-panel .pricing-content').hide();
			$a = $('.pricing-panel .tarif-header');
			$a.on('click', function(event) {
			  event.preventDefault();
			  $a.not(this).next().slideUp(500);
			  $(this).next().slideToggle(500);
			  /* $('.tarif-header').addClass('close'); */
			});
	}

$("ol").each(function() {
	if ($(this).attr("start")){
		var $val = $(this).attr("start");
		$val = $val - 1;
		$val = 'item '+ $val;
		$(this).css('counter-reset', $val);
	}
});

	if(device.mobile() == true){
		$('#video').hide();
		$('.video-fon').hide();
	}


	if(getCookie("windowDesktopMode") == 'true'){
		switchToDestktopMode();
	}
	$('.btn-full-version').on('click', function() {
		if(getCookie("windowDesktopMode") == 'true'){
			switchToNormalMode();
		} else {
			switchToDestktopMode();
		}
		return false;
	})
	function switchToDestktopMode() {
		$('.btn-full-version').text('Мобильная версия');
		$('head meta[name="viewport"]').remove();
		$('head link[href="/bitrix/templates/relevant/css/media.css"]').remove();
		document.cookie = "windowDesktopMode=true";
		$('html').addClass('desktopMode');
		$(window).trigger('resize');
		setTimeout(function() {
			$(window).trigger('resize');
		}, 100);
		setTimeout(function() {
			$(window).trigger('resize');
		}, 200);
		setTimeout(function() {
			$(window).trigger('resize');
		}, 300);
		setTimeout(function() {
			$(window).trigger('resize');
		}, 400);
	};

	function switchToNormalMode() {
		$('.btn-full-version').text('Полная версия');
		$('head').append('<meta name="viewport" content="width=device-width">');
		$('head').append('<link rel="stylesheet" href="/bitrix/templates/relevant/css/media.css" type="text/css">');
		document.cookie = "windowDesktopMode=false";
		$('html').removeClass('desktopMode');
		$(window).trigger('resize');
		setTimeout(function() {
			$(window).trigger('resize');
		}, 100);
		setTimeout(function() {
			$(window).trigger('resize');
		}, 200);
		setTimeout(function() {
			$(window).trigger('resize');
		}, 300);
		setTimeout(function() {
			$(window).trigger('resize');
		}, 400);
	}
	function getCookie(name) {
		var matches = document.cookie.match(new RegExp(
			"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURIComponent(matches[1]) : false;
	}

	/* Добавление серой подложки для секции Вернуться назад в Блоге */
	var tildaLastbgColor = $('#allrecords div.r').last().attr('data-bg-color');
	if(tildaLastbgColor == '#f0f0f0'){
		$('section.back-section').addClass('gray-section');
	}

	/* END */

	if($('body').width() > 750){
		$("input.phone").size() ? $("input.phone").mask("+7 (999) 999-99-99") : null;
	}
	$('input[id^="TIME_CALL"]').size() ? $('input[id^="TIME_CALL"]').mask("с 99:99 до 99:99") : null;
	/*if($('html').hasClass('mobile')){
		if ($(window).innerWidth() <= 640) {
			$('head').append('<meta name="viewport" content="width=640">');
		}
	}*/
	// var api = $("#menu").mmenu({
	// 	navbar:{
	// 		title:'Меню'
	// 	},
	// 	"extensions": [
    //       "effect-menu-zoom",
    //       "pagedim-black",
    //       "border-none"
    //    ],
    //    "offCanvas": {
    //       "position": "right"
    //    },
    //    "counters": true
	// }).data('mmenu');
	// api.bind('opened', function(){
	// 	$('.burger').addClass('active');
	// })
	// api.bind('closed', function(){
	// 	$('.burger').removeClass('active');
	// })


	$('.portfolio-section .tab-control a').click(function(){
		$(this).closest('.tabset').find('.portfolio-list .hide').removeClass('hide');
	});

	$('a.expanded-form').click(function(){
		$(this).toggleClass('opened');
		$('.brif-form.question-form .row[id^="error_HIDE_"]').toggleClass("show");
		if($(this).hasClass('opened')) {
			$(this).text("Скрыть расширенную форму");
		}
		else {
			$(this).text("Перейти к расширенной форме");
		}
		return false;
	});


	$('.show-more').click(function(){
		$(this).toggleClass('opened').toggleClass('closed').prev().slideToggle(500);
		if($(this).hasClass('opened')) {
			$(this).html(sulge);
		}
		else {
			$(this).html(ava);
		}
	});

	// 26.07.2016 start
	if($('.object-lesson-holder .item-title').size()){
		$('.object-lesson-holder .item-title').matchHeight();
	}
	if($('.about-list').size()){
		$('.about-list .title').matchHeight();
		$('.about-list > li').matchHeight();
	}
	// $('.object-lesson-holder .img-holder img').click(function(){
	// 	$(this).closest('.object-lesson-holder').find('.img-holder').removeClass('open');
	// 	$(this).closest('.img-holder').addClass('open');
	// });
	// $('.object-lesson-holder .close').click(function(){
	// 	var _this = $(this);
	// 	_this.closest('.img-holder').removeClass('open');
	// 	_this.closest('.img-holder').css('overflow', 'hidden');
	// 	setTimeout(function() {
	// 		_this.closest('.img-holder').css('overflow', 'visible');
	// 	}, 500);
	// });
	// $(document).click(function(event) {
	// 	if ($(event.target).closest('.object-lesson-holder .img-holder').length) return;
	// 	$('.object-lesson-holder .img-holder').removeClass('open');
	// 	event.stopPropagation();
	// });


/* 	if($('.fullpage-item').size()){
		$('.fullpage-item .img-holder').each(function(){
			$(this).css('background-image', function(){
				return 'url(' + $(this).find('img').attr('src') + ')';
			});
		});
	}; */



	// 26.07.2016 end



	ieFix();
	function ieFix() {
		var version = detectIE();
		if(version){
			$('body').addClass('edge-fix');
		}
		function detectIE() {
			var ua = window.navigator.userAgent;
			var msie = ua.indexOf('MSIE ');
			if (msie > 0) {
				return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
			}
			var trident = ua.indexOf('Trident/');
			if (trident > 0) {
				var rv = ua.indexOf('rv:');
				return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
			}
			var edge = ua.indexOf('Edge/');
			if (edge > 0) {
				return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
			}
			return false;
		}
	};




	// $('.burger').click(function(){
	// 	$('#header').toggleClass('open-menu');
	// 	return false;
	// })

	$('.fancy').fancybox();
	$('.fancy-full').fancybox({
		fitToView: false,
		maxWidth: '100%'
	});

	$('.ya-slider .slide-list').bxSlider({
		pager: false
	});
	$('.slider .title span').click(function(){
		if ($('body').width() < 1201) {
			if ($(this).closest('li').hasClass('opened')) {
				$('.slider li').removeClass('opened');
			} else {
				$('.slider li').removeClass('opened');
				$(this).closest('li').addClass('opened');
			}
		}
	});
	$('.expanded-list a').click(function(){
		$(this).closest('.expanded-list').find('li').removeClass('active')
		$(this).closest('li').addClass('active')
		return false;
	})
	$('.service-items .inner').matchHeight();
	$('.service-list7 .inner').matchHeight();
	$('.project-list .img-holder').matchHeight();
	$('.clients-list .logo-holder').matchHeight();
	//$('.service-list a').matchHeight();
	$('.filter-list > li').matchHeight();
	$('.clients-list > li .inner-wrapper').matchHeight();
	$('.project-list .img-holder').css('line-height', function(){
		var _temp = $(this).css('height');
		return _temp;
	});
	$('.clients-list .logo-holder').css('line-height', function(){
		var _temp = $(this).css('height');
		return _temp;
	});
	$('.content-item-list .ico-holder').matchHeight();
	$('.service-list2 a').click(function(){
		$(this).closest('li').toggleClass('open');
		return false;
	});
	$(document).click(function(event) {
		if ($(event.target).closest('#nav, .burger').length) return;
		// $('#header').removeClass('open-menu');
		event.stopPropagation();
	});
	$('.scroll-btn').click(function(){
		elementClick = $(this).attr("href");
		destination = $(elementClick).offset().top;
		$('html, body').stop().animate({
			scrollTop: $(elementClick).offset().top
		}, 1000);
		return false;
	});
	$('#header.hidden').hide();
	$('#header.hidden').removeClass('hidden');
	$('.step-list2 li').click(function(){
		$(this).closest('.step-list2').find('.expanded').slideUp(300);
		$(this).closest('.step-list2').find('li').removeClass('active');
		$(this).closest('li').addClass('active');
		$(this).closest('li').find('.expanded').slideDown(300);
	})




	$('.sale-item').each(function(){
		if($(this).hasClass('active')) {} else {
			$(this).removeClass('active');
			$(this).find('.expanded').slideUp();
		}
		$(window).trigger('resize');
	})
	$('.sale-item .title').click(function(){
		if($(this).closest('.sale-item').hasClass('active')){
			$(this).closest('.sale-item-list').find('.sale-item').removeClass('active');
			$(this).closest('.sale-item-list').find('.sale-item .expanded').slideUp();
		} else {
			$(this).closest('.sale-item-list').find('.sale-item').removeClass('active');
			$(this).closest('.sale-item-list').find('.sale-item .expanded').slideUp();
			$(this).closest('.sale-item').addClass('active');
			$(this).closest('.sale-item').find('.expanded').slideToggle();
		}
		$(window).trigger('resize');
		return false;
	})


	$('.filter-controls a').click(function(){
		$(this).closest('.filter-controls').find('li').removeClass('active');
		$(this).closest('li').addClass('active');
		var _filter = $(this).closest('li').attr('data-filter');
		$(this).closest('.portfolio-section').find('.filter-list li').removeClass('hide')
		if(_filter != 'all'){
			$(this).closest('.portfolio-section').find('.filter-list li').each(function(){
				if($(this).hasClass(_filter)){} else {
					$(this).addClass('hide');
				};
			});
		};
		$(this).closest('.portfolio-section').find('.filter-list').attr('data-value', function(){
			var _rows = 2;
			return _rows;
		});

		initPortfolioList();





		var _listHeight = $(this).closest('.portfolio-section').find('.filter-list').outerHeight();
		var _itemsHeight = $(this).closest('.portfolio-section').find('.filter-list > li').eq(0).outerHeight();

		var _colCount = 0;
		var _listTop = $(this).closest('.portfolio-section').find('.filter-list').offset().top;
		$(this).closest('.portfolio-section').find('.filter-list > li').each(function(){
			if($(this).hasClass('hide')){} else {
				var _thisTop = $(this).offset().top;
				if(_listTop == _thisTop){
					_colCount++;
				}
			}
		})


		var _items = 0
		$(this).closest('.portfolio-section').find('.filter-list > li').each(function(){
			if($(this).hasClass('hide')){} else {
				_items++;
			}
		})
		var _rows = _items/_colCount;
		_rows = Math.ceil(_rows);


		_itemsHeight = _itemsHeight * _rows;


		if(_itemsHeight == _listHeight){
			$(this).closest('.portfolio-section').find('.center-btn-holder').addClass('hide');
		} else {
			$(this).closest('.portfolio-section').find('.center-btn-holder').removeClass('hide');
		}







		return false;
	});

	/*
	$('.portfolio-section .center-btn-holder a').click(function(){
		$(this).closest('.portfolio-section').find('.filter-list').attr('data-value', function(){
			var _newVal = $(this).attr('data-value');
			_newVal++;
			return _newVal;
		});
		initPortfolioList();


		var _listHeight = $(this).closest('.portfolio-section').find('.filter-list').outerHeight();
		var _itemsHeight = $(this).closest('.portfolio-section').find('.filter-list > li').eq(0).outerHeight();

		var _colCount = 0;
		var _listTop = $(this).closest('.portfolio-section').find('.filter-list').offset().top;
		$(this).closest('.portfolio-section').find('.filter-list > li').each(function(){
			if($(this).hasClass('hide')){} else {
				var _thisTop = $(this).offset().top;
				if(_listTop == _thisTop){
					_colCount++;
				}
			}
		})

		var _rows = $(this).closest('.portfolio-section').find('.filter-list > li').length/_colCount;

		_itemsHeight = _itemsHeight * _rows;

		if(_itemsHeight == _listHeight){
			$(this).closest('.portfolio-section').find('.center-btn-holder').addClass('hide');
		}

		return false;
	});
	*/

	scrollToTop();
	$(document).find('text:contains("Highcharts.com")').remove();

	initFunctions();
});


function selectCity(city){
 	$.get(location.href,
		{
			CITY: city,
			ajax: 'Y'
		},
		function(data){
			var $data = $(data);
			$('#ajax-body').html($data);
			initFunctions(true);
		}
	);
};

function initFunctions(ajax){
	initIntroSlider();
	initProductSlider();
	initCharts();
	initTabs();
	initProductImg();
	initPopups();

	setTimeout(function(){
		$('#wrapper').removeClass('load');
		$('#menu').removeClass('onLoad');
	}, 200);
	if ( $('.section').size() ) {

		$('.section').each(function(){

			if ($(this).offset().top < $(window).scrollTop()+$(window).height()/2) {
				$(this).addClass('active');
			};
		});
	};
	initHeader();
	if(ajax != true){
		fullpageInit();
	}else{
		if($('#fullpage').size()){
			$.fn.fullpage.destroy('all');
		}
		fullpageInit();
	}
	promoGora();
}


function fullpageInit(){
	if($('#fullpage').size()){
		if($('body').width() > 750){
			$('#fullpage').fullpage({
				'verticalCentered': false,
				'css3': true,
				sectionSelector: '.fullpage-item',
				scrollingSpeed: 500
			});
			//fullpageActive = true;
		} else if($('#fullpage').fullpage() != '') {
			$('#fullpage').fullpage.destroy('all');
			//fullpageActive = false;
		};
	};


	if($('.fullpage-item').size()){
		$('.fullpage-item .img-holder').each(function(){
			$(this).css('background-image', function(){
				return 'url(' + $(this).find('img').attr('src') + ')';
			});
		});
	};
}

var _fullpage = false;
$(window).resize(function(){
	if($('#fullpage').size()){
		if($('body').width() > 750){
			if(!_fullpage) {} else {
				$('#fullpage').fullpage({
					'verticalCentered': false,
					'css3': true,
					sectionSelector: '> li'
				});
			};
		} else {
			if(_fullpage){
				$.fn.fullpage.destroy('all');
			}
		};
	};
});


$('.scroll-btn').click(function(){
	if($('html').hasClass('fp-enabled')){
		$.fn.fullpage.moveTo(1);
	}
});

function promoGora(){
	function vivusInit(){
		if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) return false;
		var index_0 = new Vivus('LAYER_1', {
			type: 'async',
			duration: 200,
			start: 'manual'
		}, function() {
			$('.svg').removeClass('-active');
			$(this.el).closest('.svg').addClass('-active');
		});

		index_0.play();
	}

	if($('html').hasClass('tablet')){
		if($("#LAYER_1").size()){
			vivusInit();
		}
	}else{
		$('html').mousemove(function(){
			if($("#LAYER_1").size()){
				$('html').unbind('mousemove');
				vivusInit();
			}
		});
	}
}

function initPortfolioList(){
	$('.portfolio-list').each(function(){
		_rowCount = $(this).data('value');
		var _colCount = 0;
		var _listTop = $(this).offset().top;
		$(this).find('li').each(function(){
			if($(this).hasClass('hide')){} else {
				var _thisTop = $(this).offset().top;
				if(_listTop == _thisTop){
					_colCount++;
				}
			}
		})
	});
};

function initPortfolioList(){
	$('.portfolio-list-main').each(function(){
		_rowCount = $(this).data('value');
		var _colCount = 0;
		var _listTop = $(this).offset().top;
		$(this).find('li').each(function(){
			if($(this).hasClass('hide')){} else {
				var _thisTop = $(this).offset().top;
				if(_listTop == _thisTop){
					_colCount++;
				}
			}
		})
	});
};

function initPopups(){
	$('body')
		.popup({
			"opener":".open-popup-city",
			"popup_holder":"#popup-city",
			"popup":".popup",
			"close_btn":".close-popup"
		})
		.popup({
			"opener":".open-popup-check-city",
			"popup_holder":"#popup-check-city",
			"popup":".popup",
			"close_btn":".close-popup"
		})
		.popup({
			"opener":".open-popup-contact",
			"popup_holder":"#popup-contact",
			"popup":".popup",
			"close_btn":".close-popup",
			"close": function (){
						$('#f_feedback_FID1').css("display","block");
						$('#popup-success-message').remove();}
		})
		.popup({
			"opener":".open-popup-callback",
			"popup_holder":"#popup-callback",
			"popup":".popup",
			"close_btn":".close-popup",
			"close": function (){
						$('#f_feedback_FID2').css("display","block");
						$('#popup-success-message').remove();}
		})
		.popup({
			"opener":".open-popup-question",
			"popup_holder":"#popup-question",
			"popup":".popup",
			"close_btn":".close-popup"
		})
		.popup({
			"opener":".open-popup-success-order",
			"popup_holder":"#popup-success-order",
			"popup":".popup",
			"close_btn":".close-popup"
		})
}

$(window).scroll(function(){
	if ( $('.section').size() ) {
		$('.section').each(function(){
			if($(this).hasClass('.phone-section')){
				if ($(this).offset().top < $(window).scrollTop()+$(window).height()/2) {
					$(this).addClass('active');
				};
			}else{
				if ($(this).offset().top < $(window).scrollTop()+$(window).height()) {
					$(this).addClass('active');
				};
			}
		});
	};
	initHeader();
});

$(window).load(function(){
	initServiceList();
	initProductHeight();
	initcallBackkSection();
	initServiceHeight();
	initICaseSlider();
	initServiceSlider();
	initHeader();
	initQuestionPopup();
	initPortfolioList();
	if ( $('.section').size() ) {
		$('.section').each(function(){
			if ($(this).offset().top < $(window).scrollTop()+$(window).height()/2) {
				$(this).addClass('active');
			};
		});
	};
	setTimeout(function(){
		$('#wrapper').removeClass('load');
		$('#menu').removeClass('onLoad');
	}, 200)
	setTimeout(function(){
		$('#header').slideDown();
	}, 2200)
})

$(window).resize(function(){
	initServiceHeight();
	initProductHeight();
	initICaseSlider();
	initServiceList();
	initQuestionPopup();
	initcallBackkSection();
	initProductSlider();
	initIntroSlider();
	initHeader();
	initServiceSlider();
	// $('#header').removeClass('open-menu');
	//CheckScrollToTop();
})


/* Функция работала с багами
function initHeader(){
	var _top = $(window).scrollTop();
	if (_top > $('#header').outerHeight()) {
		$('#header').addClass('fixed');
		//$('.header-inner').css('top', '-9999px');
	} else {
		if (_top == 0) {
			$('#header').removeClass('fixed');
		};
	}
	if (lastScrollTop > _top) {
		$('#header').addClass('show');
		//$('.header-inner').css('top', _top);
	} else if (lastScrollTop < _top) {
		$('#header').removeClass('show');
		//$('.header-inner').css('top', '-9999px');
	};
	lastScrollTop = _top;
}
*/
function initHeader(){
	var _top = $(window).scrollTop();
	if (_top > $('#header').outerHeight()) {
		$('#header').addClass('fixed');
	} else {
		if (_top == 0) {
			$('#header').removeClass('fixed');
		};
	}
	if (lastScrollTop > _top) {
		if (_top > 0) {
			$('#header').addClass('show');
		} else {
			$('#header').removeClass('show');
		}
	} else if (lastScrollTop < _top) {
		$('#header').removeClass('show');
	};
	lastScrollTop = _top;
}




function initQuestionPopup(){
	if ($('body').width() < 801) {
		if($('.question-form').hasClass('swapped')){} else {
			$('#popup-question .popup').append($('.question-form'));
			$('.question-form').addClass('swapped');
		}
	} else {
		if($('.question-form').hasClass('swapped')){
			$('.question-form-holder').append($('.question-form'));
			$('#popup-question .close-popup').trigger('click');
			$('.question-form').removeClass('swapped');
		}
	}
}


//включаем-выключаем слайдер
 var _productSlider;
var sliders2 = new Array();
function initProductSlider(){
	if ($('body').width() > 640) {
		if ($('#wrapper').hasClass('slider-load')) {
			$.each(sliders2, function(i, _productSlider) {
				_productSlider.destroySlider();
			});
			$('#wrapper').removeClass('slider-load');
			$('.product-list > li').css('width', '700px');
			$('.portfolio-list-main > li').css('width', '700px');
		}
	} else {
		if ($('#wrapper').hasClass('slider-load')) {} else {
			$('.product-list').each(function(i, slider2){
				sliders2[i] = $(slider2).bxSlider({
					controls: false
				});
			})
			$('.portfolio-list-main').each(function(i, slider2){
				sliders2[i] = $(slider2).bxSlider({
					controls: false
				});
			})
			$('#wrapper').addClass('slider-load');
		}
	}
}

var _serviceSlider;
var sliders4 = new Array();
function initServiceSlider(){
	var slider = $('.service-list');
	if(slider.hasClass('noslide') == false){
		if ($('body').width() > 860) {
			if ($('#wrapper').hasClass('slider-load2')) {
				$.each(sliders4, function(i, _serviceSlider) {
					_serviceSlider.destroySlider();
				});
				$('#wrapper').removeClass('slider-load2');
				slider.children('li').css('width', '700px');
			}
		} else {
			if ($('#wrapper').hasClass('slider-load2')) {} else {
				slider.each(function(i, slider4){
					sliders4[i] = $(slider4).bxSlider({
						controls: false
					});
				})
				$('#wrapper').addClass('slider-load2');
			}
		}
	}
}

setTimeout(function() {
$('.page-slider .slide-list').bxSlider();
}, 1000 * 2);

/* $('.default-slider .slide-list').bxSlider(); */

//console.log(sliders4);


var _introSlider;
var sliders = new Array();
function initIntroSlider(){
	if ($('body').width() > 300) {
		if ($('#wrapper').hasClass('intro-slider-load')) {} else {
			$('.slider .slide-list').each(function(i, slider){
				sliders[i] = $(slider).bxSlider({
					pager: false
				});
			})
		}
		$('#wrapper').addClass('intro-slider-load');
	} /*else {
		if ($('#wrapper').hasClass('intro-slider-load')) {
			$.each(sliders, function(i, _introSlider) {
				_introSlider.destroySlider();
			});
		};
		$('#wrapper').removeClass('intro-slider-load');
	}*/
}

var _caseSlider;
var sliders3 = new Array();
function initICaseSlider(){
	//if ($(window).width() > 860) {
		if ($('.case-column').hasClass('slider-load')) {} else {
			$('.case-slider .slide-list').each(function(i, slider){
				sliders3[i] = $(slider).bxSlider();
			})
		}
		$('.case-column').addClass('slider-load');
/* 	} else {
 		if ($('.case-column').hasClass('slider-load')) {
			$.each(sliders3, function(i, _caseSlider) {
				_caseSlider.destroySlider();
			});
			$('.case-column').removeClass('slider-load');
		};
		$('.case-column').removeClass('slider-load');
	} */
}

function initcallBackkSection(){
	if($('body').width() < 1021){
		if ($('.callback-section').hasClass('swap')) {} else {
			$('.callback-section .inner').append(function(){
				var _cont = $(this).find('.manager');
				return _cont;
			});
			$('.callback-section .inner').prepend(function(){
				var _cont = $(this).find('.content');
				return _cont;
			});
			$('.callback-section').addClass('swap');
		}
	} else {
		if ($('.callback-section').hasClass('swap')) {
			$('.callback-section .inner').append(function(){
				var _cont = $(this).find('.content');
				return _cont;
			});
			$('.callback-section .inner').prepend(function(){
				var _cont = $(this).find('.manager');
				return _cont;
			});
			$('.callback-section').removeClass('swap');
		}
	}
}

function initProductImg(){
	$('.product-list').each(function(){
		$(this).find('> li').each(function(){
			var _src = $(this).find('.img-holder > img').attr('src');
			_src = 'url(' + _src + ')'
			$(this).find('.img-holder').css('background-image', _src)
		})
	})
}

function initProductHeight(){
	$('.product-list').each(function(){
		var _maxHeight = 0;
		$(this).find('> li').each(function(){
			$(this).find('.description').height('auto');
		})
		$(this).find('> li').each(function(){
			var _thisHeight = $(this).find('.description').height();
			if (_thisHeight > _maxHeight) {
				_maxHeight = _thisHeight;
			};
		})
		$(this).find('> li').each(function(){
			$(this).find('.description').height(_maxHeight);
		})
	})
}


function initServiceHeight(){
	var serviceList = $('.service-list');
	var width = 0;
	if(serviceList.hasClass('noslide') == false){
		width = 860;
	}
	if ($('body').width() > width) {
		if (serviceList.hasClass('height')) {} else{
			serviceList.find('li > *:first-child').matchHeight();
			serviceList.addClass('height');
		}
	} else {
		if (serviceList.hasClass('height')) {
			serviceList.find('li > *:first-child').css('height', 'auto');
			serviceList.removeClass('height');
		}
	}
}
function initServiceList(){
	if($('.case-slider').size()){
		if ($('body').width() < 1150) {
			if ( $('.service-list').hasClass('inserted') ) {} else {
				$('.service-list').insertAfter('.case-slider');
				$('.service-list').addClass('inserted');
			};
		} else {
			if ( $('.service-list').hasClass('inserted') ) {
				$.each(sliders4, function(i, _serviceSlider) {
					_serviceSlider.destroySlider();
				});
				$('.service-list').insertAfter('.scheme-list');
				$('.service-list').removeClass('inserted');
			};
		};
	};
};

function initCharts(){

	$('#chart-adv-mob').highcharts({
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie'
		},
		title: false,
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.0f}%</b>'
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: false
				},
				showInLegend: true
			}
		},
		series: [{
			name: 'Доля от всех пользователей интернета за месяц',
			colorByPoint: true,
			data: [{
				name: 'Только с компьютеров',
				color: '#FF2122',
				y: 29
			}, {
				name: 'С компьютеров и мобильных устройств',
				color: '#FFD967',
				y: 52
			}, {
				name: 'Только с мобильных устройств',
				color: '#688FF6',
				y: 19
			}]
		}]
	});

	var countCharts = $('.adv-mob-section-2 .page-slider ul.slide-list').children().length;
	//console.log(countCharts);

	$('#chart-adv-mob-1').highcharts({
        chart: {
            type: 'column',
			events: {
                load: function () {
					if(countCharts > 0){
						countCharts --;
						/* console.log(countCharts); */
					}else{
						/* console.log("ready"); */
					}
				}
			}
        },
        title: false,
        subtitle: false,
        xAxis: {
            categories: [
                'Все',
                '20-29 лет',
                '30-39 лет',
                '40-55 лет'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Аудитория интернета (%)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.0f}%</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Есть смартфон',
            data: [75, 80, 75, 64],
			color: '#FF2122'

        }, {
            name: 'Покупали со смартфона',
            data: [29, 41, 29, 17],
			color: '#688FF6'
        }]
    });

 	$('#chart-adv-mob-2').highcharts({
        chart: {
            type: 'column',
			events: {
                load: function () {
					if(countCharts > 0){
						countCharts --;
						/* console.log(countCharts); */
					}else{
						/* console.log("ready"); */
					}
				}
			}
        },
        title: false,
        subtitle: false,
        xAxis: {
            categories: [
                'Москва',
                'Города 800+',
                'Города 500+',
                'Города 100+'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Аудитория интернета (%)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.0f}%</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Есть смартфон',
            data: [78, 76, 77, 71],
			color: '#FF2122'
        }, {
            name: 'Покупали со смартфона',
            data: [33, 27, 29, 27],
			color: '#688FF6'
        }]
    });


	$('#chart-search-engine').highcharts({
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie'
		},
		legend: {
			labelFormat: '{name}: <b>{percentage:.1f}%</b>'
		},
		title: false,
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: false
				},
				showInLegend: true
			}
		},
		series: [{
			name: 'Популярность',
			colorByPoint: true,
			data: [{
				name: 'Яндекс',
				color: '#FF2122',
				y: 46.62
			}, {
				name: 'Google',
				color: '#4486F7',
				y: 48.11
			}, {
				name: 'Mail.ru',
				color: '#3169A2',
				y: 3.49
			}, {
				name: 'Рамблер',
				color: '#373538',
				y: 0.48
			}, {
				name: 'Bing',
				color: '#FEB900',
				y: 0.31
			}]
		}]
	});


	$(function () {
		$('#chart1').highcharts({
			chart: {
				type: 'areaspline'
			},
			title: {
				text: 'Посещаемость сайта www.sregionsnab.ru'
			},
	 //       legend: {
	 //           layout: 'vertical',
	 //           align: 'left',
	 //           verticalAlign: 'top',
	 //           x: 150,
	 //           y: 100,
	 //           floating: true,
	 //           borderWidth: 1,
	 //           backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
	 //       },
			xAxis: {
				categories: [
				'01.01.2013',
				'01.06.2013',
				'01.11.2013',
				'01.04.2014',
				'01.09.2014',
				'01.02.2015',
				'01.07.2015',
				'01.12.2015',
				'01.04.2016',
				'01.07.2016'
				],
			},
			yAxis: {
				title: {
					text: 'Количество посетителей'
				}
			},
			tooltip: {
				shared: true,
				valueSuffix: ' посетителей'
			},
			credits: {
				enabled: false
			},
			plotOptions: {
				areaspline: {
					fillOpacity: 0.5
				}
			},
			series: [{
				name: 'www.sregionsnab.ru',
				data: [2567,
					3919,
					7289,
					9289,
					10180,
					7729,
					11617,
					6807,
					11382,
					13718
					]
			}]
		});
	});

	$('#chart2').highcharts({
			chart: {
				type: 'areaspline'
			},
			title: {
				text: 'Посещаемость сайта www.tyre63.ru'
			},
	 //       legend: {
	 //           layout: 'vertical',
	 //           align: 'left',
	 //           verticalAlign: 'top',
	 //           x: 150,
	 //           y: 100,
	 //           floating: true,
	 //           borderWidth: 1,
	 //           backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
	 //       },
			xAxis: {
				categories: [
	'01.04.2013',
	'01.09.2013',
	'01.02.2014',
	'01.07.2014',
	'01.05.2015',
	'01.10.2015',
	'01.03.2016',
	'01.07.2016'

				],
			},
			yAxis: {
				title: {
					text: 'Количество посетителей'
				}
			},
			tooltip: {
				shared: true,
				valueSuffix: ' посетителей'
			},
			credits: {
				enabled: false
			},
			plotOptions: {
				areaspline: {
					fillOpacity: 0.5
				}
			},
			series: [{
				name: 'www.tyre63.ru',
				data: [2589,
					4648,
					8314,
					9576,
					7412,
					13381,
					22511,
					10296
					]
			}]
	});

	$('#chart3').highcharts({
			chart: {
				type: 'areaspline'
			},
			title: {
				text: 'Посещаемость сайта www.novtecas.ru'
			},
	 //       legend: {
	 //           layout: 'vertical',
	 //           align: 'left',
	 //           verticalAlign: 'top',
	 //           x: 150,
	 //           y: 100,
	 //           floating: true,
	 //           borderWidth: 1,
	 //           backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
	 //       },
			xAxis: {
				categories: [
	'01.11.15',
	'01.02.16',
	'01.03.16',
	'01.05.16',
	'01.07.16'

	],
			},
			yAxis: {
				title: {
					text: 'Количество посетителей'
				}
			},
			tooltip: {
				shared: true,
				valueSuffix: ' посетителей'
			},
			credits: {
				enabled: false
			},
			plotOptions: {
				areaspline: {
					fillOpacity: 0.5
				}
			},
			series: [{
				name: 'www.novtecas.ru',
				data: [1247,
					1088,
					1765,
					3679,
					6482

					]
			}]
    });

	$('#chart4').highcharts({
        chart: {
            type: 'areaspline'
        },
        title: {
            text: 'Посещаемость сайта www.gastello63.ru'
        },
 //       legend: {
 //           layout: 'vertical',
 //           align: 'left',
 //           verticalAlign: 'top',
 //           x: 150,
 //           y: 100,
 //           floating: true,
 //           borderWidth: 1,
 //           backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
 //       },
        xAxis: {
            categories: [
'01.08.13',
'01.10.13',
'01.12.13',
'01.02.14',
'01.04.14',
'01.06.14',
'01.08.14'
            ],
        },
        yAxis: {
            title: {
                text: 'Количество посетителей'
            }
        },
        tooltip: {
            shared: true,
            valueSuffix: ' посетителей'
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5
            }
        },
        series: [{
            name: 'www.gastello63.ru',
            data: [5517,6817,7999,6990,8500,10000,13521]
        }]
    });

    $('#chart5').highcharts({
        chart: {
            type: 'areaspline'
        },
        title: {
            text: 'Посещаемость сайта www.fusiontech.ru'
        },
 //       legend: {
 //           layout: 'vertical',
 //           align: 'left',
 //           verticalAlign: 'top',
 //           x: 150,
 //           y: 100,
 //           floating: true,
 //           borderWidth: 1,
 //           backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
 //       },
        xAxis: {
            categories: [
'01.05.14',
'01.11.14',
'01.03.15',
'01.08.15',
'01.01.16',
'01.07.16'],
        },
        yAxis: {
            title: {
                text: 'Количество посетителей'
            }
        },
        tooltip: {
            shared: true,
            valueSuffix: ' посетителей'
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5
            }
        },
        series: [{
            name: 'www.fusiontech.ru',
            data: [16271,
32606,
42934,
37949,
43281,
47306
]
        }]
    });

    $('#chart6').highcharts({
        chart: {
            type: 'areaspline'
        },
        title: {
            text: 'Посещаемость сайта www.afence.ru'
        },
 //       legend: {
 //           layout: 'vertical',
 //           align: 'left',
 //           verticalAlign: 'top',
 //           x: 150,
 //           y: 100,
 //           floating: true,
 //           borderWidth: 1,
 //           backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
 //       },
        xAxis: {
            categories: [
	'01.09.13',
  '01.10.13',
  '01.11.13',
  '01.12.13',
  '01.01.14',
  '01.02.14',
  '01.03.14'
            ],
        },
        yAxis: {
            title: {
                text: 'Количество посетителей'
            }
        },
        tooltip: {
            shared: true,
            valueSuffix: ' посетителей'
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5
            }
        },
        series: [{
            name: 'www.afence.ru',
            data: [265, 320, 400, 200, 580, 1400, 1548]
        }]
    });

    $('#chart7').highcharts({
        chart: {
            type: 'areaspline'
        },
        title: {
            text: 'Посещаемость сайта www.pol360.ru '
        },
 //       legend: {
 //           layout: 'vertical',
 //           align: 'left',
 //           verticalAlign: 'top',
 //           x: 150,
 //           y: 100,
 //           floating: true,
 //           borderWidth: 1,
 //           backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
 //       },
        xAxis: {
            categories: [
'01.02.13',
'01.06.13',
'01.12.13',
'01.05.14',
'01.10.14',
'01.04.15',
'01.08.15',
'01.01.16',
'01.04.16',
'01.07.16'

            ],
        },
        yAxis: {
            title: {
                text: 'Количество посетителей'
            }
        },
        tooltip: {
            shared: true,
            valueSuffix: ' посетителей'
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5
            }
        },
        series: [{
            name: 'www.pol360.ru',
            data: [938,
4384,
6562,
6540,
7026,
7432,
7161,
6494,
7809,
9708
]
        }]
    });

    $('#chart8').highcharts({
        chart: {
            type: 'areaspline'
        },
        title: {
            text: 'Посещаемость сайта www.remonstr.ru'
        },
 //       legend: {
 //           layout: 'vertical',
 //           align: 'left',
 //           verticalAlign: 'top',
 //           x: 150,
 //           y: 100,
 //           floating: true,
 //           borderWidth: 1,
 //           backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
 //       },
        xAxis: {
            categories: [
'01.11.15',
'01.02.16',
'01.03.16',
'01.05.16',
'01.07.16'
],
        },
        yAxis: {
            title: {
                text: 'Количество посетителей'
            }
        },
        tooltip: {
            shared: true,
            valueSuffix: ' посетителей'
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5
            }
        },
        series: [{
            name: 'www.remonstr.ru',
            data: [434,
7130,
11072,
13824,
14241


]
        }]
    });

    $('#chart9').highcharts({
        chart: {
            type: 'areaspline'
        },
        title: {
            text: 'Посещаемость сайта www.mirpolovspb.ru'
        },
 //       legend: {
 //           layout: 'vertical',
 //           align: 'left',
 //           verticalAlign: 'top',
 //           x: 150,
 //           y: 100,
 //           floating: true,
 //           borderWidth: 1,
 //           backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
 //       },
        xAxis: {
            categories: [
'01.10.15',
'01.12.15',
'01.03.16',
'01.07.16'
],
        },
        yAxis: {
            title: {
                text: 'Количество посетителей'
            }
        },
        tooltip: {
            shared: true,
            valueSuffix: ' посетителей'
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5
            }
        },
        series: [{
            name: 'www.mirpolovspb.ru',
            data: [2,
513,
1476,
3408
]
        }]
    });

    $('#chart10').highcharts({
        chart: {
            type: 'areaspline'
        },
        title: {
            text: 'Посещаемость сайта www.dom-na-prirode.ru'
        },
 //       legend: {
 //           layout: 'vertical',
 //           align: 'left',
 //           verticalAlign: 'top',
 //           x: 150,
 //           y: 100,
 //           floating: true,
 //           borderWidth: 1,
 //           backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
 //       },
        xAxis: {
            categories: [
'01.11.09',
'01.06.10',
'01.12.10',
'01.05.11',
'01.11.11',
'01.04.12',
'01.11.12',
'01.03.13',
'01.06.13',
'01.11.13',
'01.04.14',
'01.10.14',
'01.03.15',
'01.07.15',
'01.11.15',
'01.03.16',
'01.07.16'
],
        },
        yAxis: {
            title: {
                text: 'Количество посетителей'
            }
        },
        tooltip: {
            shared: true,
            valueSuffix: ' посетителей'
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5
            }
        },
        series: [{
            name: 'www.dom-na-prirode.ru',
            data: [25,
2607,
3011,
4084,
5909,
6709,
7904,
8412,
26916,
11983,
16284,
13569,
13359,
42219,
18855,
16478,
45955
]
        }]
    });

    $('#chart11').highcharts({
        chart: {
            type: 'areaspline'
        },
        title: {
            text: 'Посещаемость сайта www.teplye-besedy.ru'
        },
 //       legend: {
 //           layout: 'vertical',
 //           align: 'left',
 //           verticalAlign: 'top',
 //           x: 150,
 //           y: 100,
 //           floating: true,
 //           borderWidth: 1,
 //           backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
 //       },
        xAxis: {
            categories: [
'01.04.16',
'01.05.16',
'01.06.16',
'01.07.16'
],
        },
        yAxis: {
            title: {
                text: 'Количество посетителей'
            }
        },
        tooltip: {
            shared: true,
            valueSuffix: ' посетителей'
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5
            }
        },
        series: [{
            name: 'www.teplye-besedy.ru',
            data: [0,
567,
1274,
2812
]
        }]
    });
}

$.fn.popup = function(o){
		var o = $.extend({
			"opener":".call-back a",
			"popup_holder":"#call-popup",
			"popup":".popup",
			"close_btn":".btn-close",
			"close":function(){},
			"beforeOpen": function(popup) {
			 $(popup).css({
				'left': 0,
				'top': 0
			 }).hide();
		}
	},o);
	return this.each(function(){
		var container=$(this),
		opener=$(o.opener,container),
		popup_holder=$(o.popup_holder,container),
		popup=$(o.popup,popup_holder),
		close=$(o.close_btn,popup),
		bg=$('.bg',popup_holder);
		popup.css('margin',0);
		opener.click(function(e){
			o.beforeOpen.apply(this,[popup_holder]);
			popup_holder.css('left',0);
			popup_holder.fadeIn(400);
			alignPopup();
			bgResize();
			e.preventDefault();
		});
		function alignPopup(){
			var deviceAgent = navigator.userAgent.toLowerCase();
			var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/i);
			if(agentID){
				if(popup.outerHeight()>window.innerHeight){
					popup.css({'top':$(window).scrollTop(),'left': ((window.innerWidth - popup.outerWidth())/2) + $(window).scrollLeft()});
				return false;
				}
				popup.css({
					'top': ((window.innerHeight-popup.outerHeight())/2) + $(window).scrollTop(),
					'left': ((window.innerWidth - popup.outerWidth())/2) + $(window).scrollLeft()
				});
				} else {
					if(popup.outerHeight()>$(window).outerHeight()){
						popup.css({'top':$(window).scrollTop(),'left': (($(window).width() - popup.outerWidth())/2) + $(window).scrollLeft()});
						return false;
					}
				popup.css({
					'top': (($(window).height()-popup.outerHeight())/2) + $(window).scrollTop(),
					'left': (($(window).width() - popup.outerWidth())/2) + $(window).scrollLeft()
				});
			}
		}
		function bgResize(){
			var _w=$(window).width(),
			_h=$(document).height();
			bg.css({"height":_h,"width":_w+$(window).scrollLeft()});
		}
		$(window).resize(function(){
			if(popup_holder.is(":visible")){
				bgResize();
				alignPopup();
			}
		});
		if(popup_holder.is(":visible")){
			bgResize();
			alignPopup();
		}
		close.add(bg).click(function(e){
			var closeEl=this;
			popup_holder.fadeOut(400,function(){
				o.close.apply(closeEl,[popup_holder]);
			});
			e.preventDefault();
		});
		$('body').keydown(function(e){
			if(e.keyCode=='27'){
				popup_holder.fadeOut(400);
			}
		})
	});
};


function initTabs(){
	$('.tabset .tab-control a').on('click', function(){
		var thisHold = $(this).closest(".tabset");
		var _ind = $(this).closest('li').index();
		thisHold.find('.tab-body').children(".tab").removeClass('active');
		thisHold.find('.tab-body').children("div.tab:eq("+_ind+")").addClass('active');
		$(this).closest("ul").find(".active").removeClass("active");
		$(this).parent().addClass("active");
		return false;
	});
	$('.tabset .tab-control label').on('click', function(){
		var thisHold = $(this).closest(".tabset");
		var _ind = $(this).closest('li').index();
		thisHold.find('.tab-body').children(".tab").removeClass('active');
		thisHold.find('.tab-body').children("div.tab:eq("+_ind+")").addClass('active');
		$(this).closest("ul").find("li.active").removeClass("active");
		$(this).parent().addClass("active");
	});

	var hash = window.location.hash;
	var tabLink = $('.tabset li a[href='+ hash +']');
	if(tabLink.length > 0){
		/* console.log(tabLink); */
		setTimeout(function(){
			tabLink.trigger( "click" );
		}, 100);
	}

};

function scrollToTop(){
	var _isScrolling = false;
	// Append Button
	$('body').append($('<a />').addClass('scroll-to-top ' + 'ROUND_COLOR' + ' ' + 'PADDING').attr({'href': '#', 'id': 'scrollToTop'}));
	$('#scrollToTop').click(function(e){
		e.preventDefault();
		$('body, html').animate({scrollTop : 0}, 500);
		return false;
	});
	// Show/Hide Button on Window Scroll event.
	// $(window).scroll(function(){
	// 	if(!_isScrolling) {
	// 		_isScrolling = true;
	// 		var bottom = 23,
	// 			scrollVal = $(window).scrollTop(),
	// 			windowHeight = $(window).height(),
	// 			footerOffset = $('#footer').offset().top + $('#footer').outerHeight(); //блок у которого нужно остановиться
	// 		if(scrollVal > 150){
	// 			$('#scrollToTop').stop(true, true).addClass('visible');
	// 			_isScrolling = false;
	// 		}
	// 		else{
	// 			$('#scrollToTop').stop(true, true).removeClass('visible');
	// 			_isScrolling = false;
	// 		}
	// 		if(scrollVal + windowHeight > footerOffset){
	// 			$('#scrollToTop').css('bottom', bottom + scrollVal + windowHeight - footerOffset);
	// 		}
	// 		else if(parseInt($('#scrollToTop').css('bottom')) > bottom){
	// 			$('#scrollToTop').css('bottom', bottom);
	// 		}
	// 	}
	// });
}

$(document).ready(function(){
	$('.slider4').bxSlider({
	    minSlides: 1,
	    moveSlides: 1,
	    touchEnabled: true,
	    swipeThreshold: 50,
	    slideMargin: 20
	});
	$('.slider-goroda').bxSlider({
	    minSlides: 1,
	    moveSlides: 1,
	    touchEnabled: true,
	    swipeThreshold: 50,
	});

	// ooooh... responsive bx_slider
	var $portfolio_slider;
	function buildSliderConfiguration() {
	    var windowWidth = $(window).width();
	    var numberOfVisibleSlides;
	    if (windowWidth < 601) {
	        numberOfVisibleSlides = 1;
	    }else if (windowWidth < 769) {
	        numberOfVisibleSlides = 2;
	    }else{
	        numberOfVisibleSlides = 3;
	    }
	    return {
	        slideWidth: 300,
	        moveSlides: 3,
	        touchEnabled: true,
	        swipeThreshold: 50,
	        pager: false,
	        minSlides: numberOfVisibleSlides,
	        maxSlides: numberOfVisibleSlides
	    };
	}
	function configureSlider() {
	    var config = buildSliderConfiguration();
	    if ($portfolio_slider && $portfolio_slider.reloadSlider) {
	        $portfolio_slider.reloadSlider(config);
	    }else{
	        $portfolio_slider = $('.portfolio-list.portfolio-slider').bxSlider(config);
	    }
	}
	$(window).on("orientationchange resize", configureSlider);
	configureSlider();

	$('.footer-list .section-title i').click(function(){
		title = $(this).parents('.section-title');
		if(!$(title).hasClass('active')){
			$(title).addClass('active').nextUntil('.section-title').slideDown();
		}else{
			$(title).removeClass('active').nextUntil('.section-title').slideUp();
		}
	});
});


/* device.js 0.1.58 */
/*
(function(){var a,b,c,d,e,f,g,h,i,j;a=window.device,window.device={},c=window.document.documentElement,j=window.navigator.userAgent.toLowerCase(),device.ios=function(){return device.iphone()||device.ipod()||device.ipad()},device.iphone=function(){return d("iphone")},device.ipod=function(){return d("ipod")},device.ipad=function(){return d("ipad")},device.android=function(){return d("android")},device.androidPhone=function(){return device.android()&&d("mobile")},device.androidTablet=function(){return device.android()&&!d("mobile")},device.blackberry=function(){return d("blackberry")||d("bb10")||d("rim")},device.blackberryPhone=function(){return device.blackberry()&&!d("tablet")},device.blackberryTablet=function(){return device.blackberry()&&d("tablet")},device.windows=function(){return d("windows")},device.windowsPhone=function(){return device.windows()&&d("phone")},device.windowsTablet=function(){return device.windows()&&d("touch")},device.fxos=function(){return d("(mobile; rv:")||d("(tablet; rv:")},device.fxosPhone=function(){return device.fxos()&&d("mobile")},device.fxosTablet=function(){return device.fxos()&&d("tablet")},device.mobile=function(){return device.androidPhone()||device.iphone()||device.ipod()||device.windowsPhone()||device.blackberryPhone()||device.fxosPhone()},device.tablet=function(){return device.ipad()||device.androidTablet()||device.blackberryTablet()||device.windowsTablet()||device.fxosTablet()},device.portrait=function(){return 90!==Math.abs(window.orientation)},device.landscape=function(){return 90===Math.abs(window.orientation)},device.noConflict=function(){return window.device=a,this},d=function(a){return-1!==j.indexOf(a)},f=function(a){var b;return b=new RegExp(a,"i"),c.className.match(b)},b=function(a){return f(a)?void 0:c.className+=" "+a},h=function(a){return f(a)?c.className=c.className.replace(a,""):void 0},device.ios()?device.ipad()?b("ios ipad tablet"):device.iphone()?b("ios iphone mobile"):device.ipod()&&b("ios ipod mobile"):device.android()?device.androidTablet()?b("android tablet"):b("android mobile"):device.blackberry()?device.blackberryTablet()?b("blackberry tablet"):b("blackberry mobile"):device.windows()?device.windowsTablet()?b("windows tablet"):device.windowsPhone()?b("windows mobile"):b("desktop"):device.fxos()?device.fxosTablet()?b("fxos tablet"):b("fxos mobile"):b("desktop"),e=function(){return device.landscape()?(h("portrait"),b("landscape")):(h("landscape"),b("portrait"))},i="onorientationchange"in window,g=i?"orientationchange":"resize",window.addEventListener?window.addEventListener(g,e,!1):window.attachEvent?window.attachEvent(g,e):window[g]=e,e()}).call(this);
*/

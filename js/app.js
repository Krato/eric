// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();


$.fn.slideFadeToggle  = function(speed, easing, callback) {
        return this.animate({opacity: 'toggle', height: 'toggle'}, speed, easing, callback);
}; 

var insideWrapper = false;





/**
 * Navigation menu
 */
jQuery('document').ready(function () {
	var trigger = jQuery('#hamburger'),
		isClosed = false;

	trigger.click(function () {
		burgerTime();
	});

	function burgerTime() {
		if (isClosed === true) {
			trigger.removeClass('is-open');
			trigger.addClass('is-closed');
			isClosed = false;
		} else {
			trigger.removeClass('is-closed');
			trigger.addClass('is-open');
			isClosed = true;
		}

		jQuery("#nav").slideFadeToggle("1000");
        if(insideWrapper == true){
            if(isClosed == true){
                $("#nav-container").addClass("black-nav");
            } else {
                $("#nav-container").removeClass("black-nav");
            }
            $(".burguer-line").addClass("burguer-fill");
        }
        
	}

	

    var waypoints = $('.no-pad').waypoint({
        handler: function(direction) {
            if(direction === 'up'){
                insideWrapper = false;
                $("#nav-container").removeClass("black-nav");
                $(".burguer-line").removeClass("burguer-fill");
            }
            if(direction === 'down'){
                insideWrapper = true;
                if($('#nav').is(':visible')){
                    $("#nav-container").addClass("black-nav");
                } else {
                    $(".burguer-line").addClass("burguer-fill");
                }
            }
            
        },
        offset: "15%"
    });
 
    jQuery(".module").addClass("hide-first").viewportChecker({
        classToAdd: "fadded-in animated fadeInLeft"
        //repeat: true
    });

     /*
    $('.').bind('inview', function (event, visible) {
        if (visible == true) {
            $("#nav-container").removeClass("black-nav");
        } 

    });
*/



    $(".progresbar-container").each(function( index ) {

        var widthTotal = $(this).find(".progress-b").width(),
            iniPercent = $(this).find(".percent").data('total'),
            widthFinal = ((widthTotal * iniPercent) / 100).toFixed(0);
        $(this).find('.progress-bar').on('elementResize', function(event) {
            elem = $(this),
            width = elem.width();
            var total = ((width * iniPercent) / widthFinal).toFixed(0) + "%";
            $(this).find(".percent").data('percent', total);
            $(this).find(".percent").attr('data-percent', total);

        });
    });
    
    
    /**
     * Portfolio
     */
           

    var swiper = new Swiper('.swiper-container', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: 30,
        loop: true
    });


});



/**
 * Sliders
 */

jQuery('.hi-slider').flexslider({
    slideshow: 'fade'
});

	/**
	 * Sliders full screen
	 */
	
	// Adjust slide height for .slider-fullscreen sliders

    jQuery('.slider-fullscreen .slides li').each(function () {
        if (jQuery('.top-bar').is(':visible')) {
            var slideHeight = jQuery(window).height() - jQuery('.top-bar').outerHeight() + 10;
            jQuery(this).css('height', slideHeight);


        } else {
            jQuery(this).css('height', jQuery(window).height());
        }
    });

    jQuery(window).resize(function () {
        jQuery('.slider-fullscreen .slides li').each(function () {
            if (jQuery('.top-bar').is(':visible')) {
                var slideHeight = jQuery(window).height() - jQuery('.top-bar').outerHeight();
                //console.log(slideHeight);
                jQuery(this).css('height', slideHeight + '!important');


            } else {
                jQuery(this).css('height', jQuery(window).height());
            }
        });
    });

    jQuery('.slides li').each(function () {

        // Append background-image <img>'s as li item CSS background for better responsive performance

        if (jQuery(this).children('.background-image').length) {
            var imgSrc = jQuery(this).children('.background-image').attr('src');
            jQuery(this).css('background', 'url("' + imgSrc + '")');
            jQuery(this).children('.background-image').hide();
            jQuery(this).css('background-position', '50% 0%');
            // Check if the slider has a color scheme attached, if so, apply it to the slider nav

        }

        // Center Slide Content vertically

        if (jQuery('.overlay-nav').length && !jQuery('nav').hasClass('nav-transparent')) {
            jQuery(this).children('.slide-content').css('padding-top', (jQuery(this).height() / 2) - (jQuery(this).children('.slide-content').height() / 2) + jQuery('.overlay-nav').height());
        } else {
            jQuery(this).children('.slide-content').css('padding-top', (jQuery(this).height() / 2) - (jQuery(this).children('.slide-content').height() / 2));
        }

    });

    jQuery(window).resize(function () {

        jQuery('.slides li').each(function () {
            if (jQuery('.overlay-nav').length && !jQuery('nav').hasClass('nav-transparent')) {
                jQuery(this).children('.slide-content').css('padding-top', (jQuery(this).height() / 2) - (jQuery(this).children('.slide-content').height() / 2) + jQuery('.overlay-nav').height());
            } else {
                jQuery(this).children('.slide-content').css('padding-top', (jQuery(this).height() / 2) - (jQuery(this).children('.slide-content').height() / 2));
            }

        });
    });


    /**
	 * Parallax Scripts
	 */

    var isFirefox = typeof InstallTrigger !== 'undefined';
    var isIE = /*@cc_on!@*/ false || !!document.documentMode;
    var isChrome = !!window.chrome;
    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    var prefix;

    if (isFirefox) {
        prefix = '-moz-';
    } else if (isIE) {

    } else if (isChrome || isSafari) {
        prefix = '-webkit-';
    }

    jQuery('.main-container section:first-child').addClass('first-child');

    jQuery('.parallax-background').each(function () {

        if (jQuery(this).closest('section').hasClass('first-child') && !jQuery(this).closest('section').hasClass('slider-fullscreen')) {
            jQuery(this).attr('data-top', prefix + 'transform: translate3d(0px,0px, 0px)');
            jQuery(this).attr('data-top-bottom', prefix + 'transform: translate3d(0px,200px, 0px)');

        } else {

            jQuery(this).attr('data-bottom-top', prefix + 'transform: translate3d(0px,-200px, 0px)');
            jQuery(this).attr('data-center', prefix + 'transform: translate3d(0px,0px, 0px)');
            jQuery(this).attr('data-top-bottom', prefix + 'transform: translate3d(0px,200px, 0px)');

        }

    });


    if (!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
        skrollr.init({
            forceHeight: false
        });
    }


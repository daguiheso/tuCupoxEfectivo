/*
Theme Name: Murun - Responsive App Landing Page Template
Desciption: Murun is a responsive App landing template. It’s one page, clean and modern design. Murun is built with latest HTML5, CSS3 and Bootstrap 3+. The clean and unique design will amaze you. Whatever you are browsing from mobile tablet or desktop/laptop, the Murun will be fit all screen sizes. Murun has everything you need to launch your site!
Theme URI: http://www.codingle.com/murtaxa/themeforest/murun_demo
Author Name: Murtaxa
Author URI: http://www.codingle.com
Version: 1.0

Murun Scripts
*/
(function($){ "use strict";

    $(window).on('load', function() {
        $('body').addClass('loaded');
    });

/*******************/
/** Sticky Header **/
/*******************/
	$(function() {
		var header = $("#header"),
			yOffset = 0,
			triggerPoint = 10;
		$(window).on( 'scroll', function() {
			yOffset = $(window).scrollTop();

			if (yOffset >= triggerPoint) {
				header.addClass("fixed-top");
			} else {
				header.removeClass("fixed-top");
			}

		});
	});

/*****************/
/** Typing text **/
/*****************/

    $(".typing").typed({
        strings: [
            "todas las tarjetas de crédito",
            "bonos",
            "cheques",
            "Facil , Rapido y Seguro"
        ],
        typeSpeed:100,
        backDelay:2000,
        loop:true
    });
/*************************/
/** Screenshot carousel **/
/*************************/

        function getSlide() {
            var wW = $(window).width();
            if (wW < 601) {
                return 1;
            }
            return 3;
        }

        var mySwiper = $('.screen-carousel').swiper({

            mode:'horizontal',
            loop: true,
            speed: 1000,
            autoplay: 1000,
            effect: 'coverflow',
            slidesPerView: getSlide(),
            grabCursor: true,
            pagination: '.screen-pagination',
            paginationClickable: true,
            nextButton: '.arrow-right',
            prevButton: '.arrow-left',
            keyboardControl: true,
            coverflow: {
                rotate: 0,
                stretch: 90,
                depth: 200,
                modifier: 1,
                slideShadows : true
            }
        });

/*************************************/
/** Initialize smoothescroll plugin **/
/*************************************/
	smoothScroll.init({
		offset: 60
	});
/*******************/
/** Swipbox Active **/
/*******************/
	$( '.lightbox' ).swipebox();

/*******************/
/** Wow Settings **/
/*******************/
    var wow = new WOW( {
        mobile: false,
        offset: 0
    });
    wow.init();

/*******************/
/** Subscribe Form **/
/*******************/
    $('.subs-btn').on('click', function (event) {
        event.preventDefault();
        var name_attr = [];
        var values = [];
        var fs_process = "";
        if($(this).closest("section").attr('id') !== undefined)
        {
            var section_id = $(this).closest("section").attr('id');
        }else{
            var section_id = $(this).closest("footer").attr('id');
        }
        $('#' + section_id).find('form').find('button').text('loading...');
        $('#' + section_id).find('form input').each(
            function (index) {

                if ($(this).is('[data-email="required"]')) {
                    var required_val = $(this).val();
                    if (required_val != '') {
                        name_attr.push($(this).attr('name'));
                        values.push($(this).val());
                        fs_process = true;
                    } else {
                        $('#' + section_id).find('form').find('button').text('Send');
                        $(this).addClass('fs-input-error');
                        fs_process = false;
                    }
                }

                if (!$(this).is('[data-email="required"]')) {
                    name_attr.push($(this).attr('name'));
                    values.push($(this).val());
                }

            });

        if (fs_process)
        {
            localStorage.setItem('fs-section',section_id);
            $.post("mail/process.php", {
                data: { input_name: name_attr,values:values,section_id:section_id},
                type: "POST",
            }, function (data) {
                $('#loading').remove();
                var fs_form_output = '';
                if(data)
                {
                    if(data.type == "fs-message")
                    {
                       $('#error-msg').remove();
                       $('#success-msg').remove();
                       var fs_form_output = '<div id="success-msg" class="padding-15 mt-15 bdrs-3" style="border: 1px solid green; color: green;">'+data.text+'</div>';
                         $('#' + section_id).find('form').find('button').text('Success');
                    }else if (data.type == "fs_error") {
                        $('#' + section_id).find('form').find('button').text('Send');
                        $('#success-msg').remove();
                        $('#error-msg').remove();
                        var fs_form_output = '<div id="error-msg" class="padding-15 mt-15 bdrs-3" style="border: 1px solid red; color: red;">'+data.text+'</div>';
                    }else{
                        var fs_form_output = '';
                    }
                }

                if(fs_form_output != '')
                {
                    var section_id = localStorage.getItem('fs-section');
                    $('#'+section_id).find('form').after(fs_form_output);
                }
                $('#' + section_id).find('form input').each(function (index) {
                    $(this).val('');
                    $(this).removeClass('fs-input-error');
                });

                setTimeout(function(){
                    $('#success-msg').fadeOut();
                    $('#success-msg').remove();
                    $('#error-msg').fadeOut();
                    $('#error-msg').remove();
                    $(this).submit();
                    $('#' + section_id).find('form').find('button').text('Send');
                 },5000);
                localStorage.removeItem('fs_section');
            }, 'json');
        }

        $('#' + section_id).find('form input').each(function (index) {
            $(this).keypress(function () {
                $(this).removeClass('fs_input_error');
            });
        });

        $('#' + section_id).find('form input').each(function (index) {
            if ($(this).is(":focus")) {
                $(this).removeClass('fs_input_error');
            }
        });

    });

/*******************/
/** Scroll To Top **/
/*******************/
    $(window).on( 'scroll', function () {
        if ($(this).scrollTop() > 600) {
            $('#scroll-top').fadeIn();
        } else {
            $('#scroll-top').fadeOut();
        }
    });

})(jQuery);

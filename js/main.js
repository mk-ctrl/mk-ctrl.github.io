(function ($) {
    "use strict";
    var cfg = {
            defAnimation: "fadeInUp",
            scrollDuration: 800,
            statsDuration: 4000
        },
        $WIN = $(window);
    var ssPreloader = function () {
        $WIN.on('load', function () {
            $('html, body').animate({
                scrollTop: 0
            }, 'normal');
            $("#loader").fadeOut("slow", function () {
                $("#preloader").delay(300).fadeOut("slow");
            });
        });
    };
    var ssFitVids = function () {
        $(".fluid-video-wrapper").fitVids();
    };
    var ssMasonryFolio = function () {
        var containerBricks = $('.bricks-wrapper');
        containerBricks.imagesLoaded(function () {
            containerBricks.masonry({
                itemSelector: '.brick',
                resize: true
            });
        });
    };
    var ssLightGallery = function () {
        $('#folio-wrap').lightGallery({
            showThumbByDefault: false,
            hash: false,
            selector: ".item-wrap"
        });
    };
    var ssMenuOnScrolldown = function () {
        var menuTrigger = $('#header-menu-trigger');
        $WIN.on('scroll', function () {
            if ($WIN.scrollTop() > 150) {
                menuTrigger.addClass('opaque');
            } else {
                menuTrigger.removeClass('opaque');
            }
        });
    };
    var ssOffCanvas = function () {
        var menuTrigger = $('#header-menu-trigger'),
            nav = $('#menu-nav-wrap'),
            closeButton = nav.find('.close-button'),
            siteBody = $('body'),
            mainContents = $('section, footer');
        menuTrigger.on('click', function (e) {
            e.preventDefault();
            menuTrigger.toggleClass('is-clicked');
            siteBody.toggleClass('menu-is-open');
        });
        closeButton.on('click', function (e) {
            e.preventDefault();
            menuTrigger.trigger('click');
        });
        siteBody.on('click', function (e) {
            if (!$(e.target).is('#menu-nav-wrap, #header-menu-trigger, #header-menu-trigger span')) {
                menuTrigger.removeClass('is-clicked');
                siteBody.removeClass('menu-is-open');
            }
        });
    };
    var ssSmoothScroll = function () {
        $('.smoothscroll').on('click', function (e) {
            var target = this.hash,
                $target = $(target);
            e.preventDefault();
            e.stopPropagation();
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, cfg.scrollDuration, 'swing').promise().done(function () {
                if ($('body').hasClass('menu-is-open')) {
                    $('#header-menu-trigger').trigger('click');
                }
                window.location.hash = target;
            });
        });
    };
    var ssPlaceholder = function () {
        $('input, textarea, select').placeholder();
    };
    var ssStatCounter = function () {
        var statSection = $("#stats"),
            stats = $(".stat-count");
        statSection.waypoint({
            handler: function (direction) {
                if (direction === "down") {
                    stats.each(function () {
                        var $this = $(this);
                        $({
                            Counter: 0
                        }).animate({
                            Counter: $this.text()
                        }, {
                            duration: cfg.statsDuration,
                            easing: 'swing',
                            step: function (curValue) {
                                $this.text(Math.ceil(curValue));
                            }
                        });
                    });
                }
                this.destroy();
            },
            offset: "90%"
        });
    };
    var ssAlertBoxes = function () {
        $('.alert-box').on('click', '.close', function () {
            $(this).parent().fadeOut(500);
        });
    };
    var ssAnimations = function () {
        if (!$("html").hasClass('no-cssanimations')) {
            $('.animate-this').waypoint({
                handler: function (direction) {
                    var defAnimationEfx = cfg.defAnimation;
                    if (direction === 'down' && !$(this.element).hasClass('animated')) {
                        $(this.element).addClass('item-animate');
                        setTimeout(function () {
                            $('body .animate-this.item-animate').each(function (ctr) {
                                var el = $(this),
                                    animationEfx = el.data('animate') || null;
                                if (!animationEfx) {
                                    animationEfx = defAnimationEfx;
                                }
                                setTimeout(function () {
                                    el.addClass(animationEfx + ' animated');
                                    el.removeClass('item-animate');
                                }, ctr * 50);
                            });
                        }, 100);
                    }
                    this.destroy();
                },
                offset: '95%'
            });
        }
    };
    var ssIntroAnimation = function () {
        $WIN.on('load', function () {
            if (!$("html").hasClass('no-cssanimations')) {
                setTimeout(function () {
                    $('.animate-intro').each(function (ctr) {
                        var el = $(this),
                            animationEfx = el.data('animate') || null;
                        if (!animationEfx) {
                            animationEfx = cfg.defAnimation;
                        }
                        setTimeout(function () {
                            el.addClass(animationEfx + ' animated');
                        }, ctr * 300);
                    });
                }, 100);
            }
        });
    };
    var ssContactForm = function () {
        $('#contactForm').validate({
            submitHandler: function (form) {
                var sLoader = $('#submit-loader');
                $.ajax({
                    type: "POST",
                    url: "https://usebasin.com/f/c18ad4f38d4d",
                    data: $(form).serialize(),
                    beforeSend: function () {
                        sLoader.fadeIn();
                    },
                    success: function (msg) {
                        if (msg == 'OK') {
                            sLoader.fadeOut();
                            $('#message-warning').hide();
                            $('#contactForm').fadeOut();
                            $('#message-success').fadeIn();
                        } else {
                            sLoader.fadeOut();
                            $('#message-warning').html(msg);
                            $('#message-warning').fadeIn();
                        }
                    },
                    error: function () {
                        sLoader.fadeOut();
                        $('#message-warning').html("Something went wrong. Please try again.");
                        $('#message-warning').fadeIn();
                    }
                });
            }
        });
    };
    var ssBackToTop = function () {
        var pxShow = 500,
            fadeInTime = 400,
            fadeOutTime = 400,
            scrollSpeed = 300,
            goTopButton = $("#go-top")
        $(window).on('scroll', function () {
            if ($(window).scrollTop() >= pxShow) {
                goTopButton.fadeIn(fadeInTime);
            } else {
                goTopButton.fadeOut(fadeOutTime);
            }
        });
    };
    (function ssInit() {
        ssPreloader();
        ssFitVids();
        ssMasonryFolio();
        ssLightGallery();
        ssMenuOnScrolldown();
        ssOffCanvas();
        ssSmoothScroll();
        ssPlaceholder();
        ssStatCounter();
        ssAlertBoxes();
        ssAnimations();
        ssIntroAnimation();
        ssContactForm();
        ssBackToTop();
    })();
})(jQuery);
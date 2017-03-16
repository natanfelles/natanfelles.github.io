---
layout: null
---
/*!
 * @author Natan Felles <natanfelles@gmail.com>
 */
var hello = ' _   _       _                _____    _ _           \n'
    +'| \\ | | __ _| |_ __ _ _ __   |  ___|__| | | ___  ___ \n'
    +'|  \\| |/ _` | __/ _` | \'_ \\  | |_ / _ \\ | |/ _ \\/ __|\n'
    +'| |\\  | (_| | || (_| | | | | |  _|  __/ | |  __/\\__ \\\n'
    +'|_| \\_|\\__,_|\\__\\__,_|_| |_| |_|  \\___|_|_|\\___||___/\n';
console.log(hello);

$(document).ready(function () {

    /* Auto-detect panel status */
    if (window.location.hash && window.location.hash == '#show') {
        $('.panel-cover').addClass('panel-cover--collapsed');
    }

    if ((window.location.pathname !== '{{ site.baseurl }}' && window.location.pathname !== '/') && window.location.pathname !== '{{ site.baseurl }}/index.html') {
        $('.panel-cover').addClass('panel-cover--collapsed');
    }

    /* Panel action buttons */
    $('a.blog-button').click(function (e) {
        var panelCover = $('.panel-cover');
        var currentWidth = panelCover.width();
        if (panelCover.hasClass('panel-cover--collapsed')) {
            panelCover.removeClass('panel-cover--collapsed');
            $('.content-wrapper').removeClass('animated slideInRight');
            panelCover
                .css('max-width', '100%')
                .animate({'max-width': '100%', 'width': '100%'});
        } else {
            panelCover.addClass('panel-cover--collapsed');
            if (currentWidth < 960) {
                $('.content-wrapper').addClass('animated slideInRight');
            } else {
                panelCover
                    .css('max-width', currentWidth)
                    .animate({'max-width': '530px', 'width': '40%'});
            }
        }
    });

    $('.btn-mobile-menu').click(function () {
        $('.navigation-wrapper').toggleClass('visible animated bounceInDown');
        $('.btn-mobile-menu__icon').toggleClass('icon-list icon-x-circle animated fadeIn');
    });

    $('.navigation-wrapper .blog-button').click(function () {
        $('.navigation-wrapper').toggleClass('visible');
        $('.btn-mobile-menu__icon').toggleClass('icon-list icon-x-circle animated fadeIn');
    });

    /* Header Links */
    var anchorForId = function (id) {
        var anchor = document.createElement('a');
        anchor.className = 'header-link';
        anchor.href = '#' + id;
        anchor.innerHTML = '<i class="icon icon-link"></i>';
        return anchor;
    };

    var linkifyAnchors = function (level, containingElement) {
        var headers = containingElement.getElementsByTagName('h' + level);
        for (var h = 0; h < headers.length; h++) {
            var header = headers[h];

            if (typeof header.id !== 'undefined' && header.id !== "") {
                header.appendChild(anchorForId(header.id));
            }
        }
    };

    document.onreadystatechange = function () {
        if (this.readyState === 'complete') {
            var contentBlock = document.getElementsByClassName('post')[0];
            if (!contentBlock) {
                return;
            }
            for (var level = 1; level <= 6; level++) {
                linkifyAnchors(level, contentBlock);
            }
        }
    };

    /* Contact Form */
    $('#contact_form').submit(function (){
        var data = $(this).serialize();
        $.ajax({
                url: '//formspree.io/{{ site.author.email }}',
                method: 'POST',
                data: data,
                dataType: 'json'
        });
        console.log(data);
        return false;
    });

    /* To Top Button */
    $('#toTop').click(function (e) {
        $('body,html').animate({scrollTop: 0}, 800);
        e.preventDefault();
    });

});

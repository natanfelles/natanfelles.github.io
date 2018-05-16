/*!
 * @author Natan Felles <natanfelles@gmail.com>
 */

var hello = ' _   _       _                _____    _ _           \n' +
    '| \\ | | __ _| |_ __ _ _ __   |  ___|__| | | ___  ___ \n' +
    '|  \\| |/ _` | __/ _` | \'_ \\  | |_ / _ \\ | |/ _ \\/ __|\n' +
    '| |\\  | (_| | || (_| | | | | |  _|  __/ | |  __/\\__ \\\n' +
    '|_| \\_|\\__,_|\\__\\__,_|_| |_| |_|  \\___|_|_|\\___||___/\n\n' +
    'natanfelles.github.io\n\n';
console.log(hello);

console.log('>> Hello, hacker!!! Use msg("Your name", "Your email", "Your message") and let\'s talk about a better world.');

function msg(name, email, message) {
    $.post('//formspree.io/natanfelles@gmail.com', {
        name: name,
        email: email,
        message: message
    }).done(function () {
        console.log('>> Message successful sent. I will try to reply for you.');
    }).fail(function () {
        console.log('>> Message could not be sent now. Try again.');
    });
    return 88;
}

/* Hero */
function hero() {
    $('#hero').parent().css({
        padding: 0
    });
    $('#hero').css({
        width: $('.panel-hero').innerWidth(),
        minHeight: window.innerHeight,
        paddingTop: (window.innerHeight - $('#hero').innerHeight()) * 0.4
    }).show();
}

function setupHero() {
    if (window.location.pathname != '/') {
        $('.panel-hero').css({
            width: $('.panel-hero').parent().innerWidth(),
            left: $('.panel-hero').parent().position().left + 'px'
        });
        $('.content').css({
            minHeight: window.innerHeight
        });
        if (window.innerWidth < 1200) {
            $('#hero').parent().hide();
            $('.content').removeClass('col-md-7').addClass('col-md-12');
            $('header').show();
            $('body').css({
                paddingTop: 30
            });
        } else {
            $('#hero').parent().show();
            $('.content').removeClass('col-md-12').addClass('col-md-7');
            $('header').hide();
            $('body').css({
                paddingTop: 0
            });
            hero();
        }
    } else {
        $('.panel-hero').css({
            width: window.innerWidth
        });
        hero();
    }
}

/* Header Links */
function headerLinks() {
    $('#post :header').each(function() {
        $(this).append('<a class="header-link" href="#' + this.id + '"><i class="fa fa-link"></i></a>');
    });
}

/* Search */
function search(query, page) {

    var searchTerms = encodeURIComponent(query);

    var startIndex = 1;
    if (page > 1) {
        startIndex = page * 10 - 10 + 1;
    }

    var cx = $('meta[name="google-cse-cx"]').attr('content');
    var key = $('meta[name="google-api-key"]').attr('content');

    /* https://www.googleapis.com/customsearch/v1?q={searchTerms}&num={count?}&start={startIndex?}&lr={language?}&safe={safe?}&cx={cx?}&cref={cref?}&sort={sort?}&filter={filter?}&gl={gl?}&cr={cr?}&googlehost={googleHost?}&c2coff={disableCnTwTranslation?}&hq={hq?}&hl={hl?}&siteSearch={siteSearch?}&siteSearchFilter={siteSearchFilter?}&exactTerms={exactTerms?}&excludeTerms={excludeTerms?}&linkSite={linkSite?}&orTerms={orTerms?}&relatedSite={relatedSite?}&dateRestrict={dateRestrict?}&lowRange={lowRange?}&highRange={highRange?}&searchType={searchType}&fileType={fileType?}&rights={rights?}&imgSize={imgSize?}&imgType={imgType?}&imgColorType={imgColorType?}&imgDominantColor={imgDominantColor?}&alt=json */
    var url = 'https://www.googleapis.com/customsearch/v1?q=' + searchTerms +
        '&start=' + startIndex +
        '&cx=' + cx +
        '&key=' + key +
        '&num=10&alt=json';

    $.getJSON(url, function(data, status) {
        if (status == 'success') {
            var results = [];
            $(data.items).each(function(k, v) {
                results[k] = {
                    url: v.link,
                    title: v.title,
                    description: v.snippet
                };
            });
            var html_results = '';
            $.each(results, function(k, v) {
                html_results += '<a href="' + v.url + '" class="list-group-item">' +
                    '<h4 class="list-group-item-heading">' + v.title + '</h4>' +
                    '<p class="list-group-item-text">' + v.description + '</p>' +
                    '</a>';
            });
            $('.sr-results').html(html_results);

            var benchmark = {
                count_results: data.searchInformation.totalResults,
                runtime: data.searchInformation.formattedSearchTime
            };
            $('.sr-benchmark').html(benchmark.count_results + ' resultados em ' + benchmark.runtime + ' segundos');

            var pages = {
                total: Math.ceil(benchmark.count_results / 10),
                current: page
            };
            pagination(pages.current, pages.total, searchTerms);

        }
    }).fail(function(a, b) {
        $('.sr-results').html('<div class="alert alert-danger"><i class="fa fa-exclamation-circle"></i> Pesquisa não pode ser realizada no momento. Tente novamente mais tarde.</div>');
    });
}

/* Pagination */
function pagination(current, total, query) {
    var p = $('.sr-pages .pagination');

    var num_links = 8;

    if ($(window).width() < 800) {
        num_links = 2;
    }

    if (total < 2 || current > total) {
        p.html('');
        return false;
    }

    var pagination = '';
    var start = (current - num_links > 0) ? current - (num_links - 1) : 1;
    var end = (current + num_links < total) ? current + num_links : total;

    if (total > 1 && current > 1) {
        pagination += '<li><a data-page="' + (current - 1) + '">&laquo;</a></li>';
    }

    for (var i = start - 1; i <= end; i++) {
        if (i >= 1) {
            if (current == i) {

                pagination += '<li class="active"><span>' + current + '</span></li>';
            } else {
                /*other pages*/
                pagination += '<li><a data-page="' + i + '">' + i + '</a></li>';
            }
        }
    }

    if (current < total) {
        pagination += '<li><a data-page="' + (current + 1) + '">&raquo;</a></li>';
    }

    p.html(pagination);

    p.children().children().click(function() {
        search(query, $(this).attr('data-page'));
        return false;
    });
}

$('#service_type').html($('#service_type-content').html());

$('select[id="service"]').change(function() {
    var id = $(this).children(':selected').data('service');
    var sv_all = $('#service-all').html();
    var sv_specific = $('#service-' + id).html();
    if (sv_all || sv_specific) {
        var opt = (sv_all ? sv_all : '') + (sv_specific ? sv_specific : '');
        $('#service-options').html(opt);
        $('#service-confirm').show();
        $('[data-toggle="popover"]').popover({
            container: 'body',
            placement: 'top',
            trigger: 'focus',
        });
    } else {
        $('#service-confirm').hide();
    }
    $('#service-form').children('.alert').hide();
});

/* Service Form */
if ($('#service-form').length){
    $('#service-form').submit(function() {
        $(this).validator('update');
        $('[name="_replyto"]').val($('[name="E-mail"]').val());
        $('[name="_subject"]').val('Solicitação de Serviço · ' + $('[name="Tipo de Serviço"]').val());
    }).validator().on('submit', function(e) {
        var alert = $(this).children('.alert');

        if (!e.isDefaultPrevented()) {
            $.ajax({
                url: $(this).attr('action'),
                method: 'POST',
                data: $(this).serialize() + '&IP=' + getIP(),
                dataType: 'json'
            }).done(function(a) {
                alert
                    .addClass('alert-success')
                    .html('<strong><i class="fa fa-check-circle"></i> Solicitação enviada com sucesso!</strong><br> Logo você receberá uma resposta em seu e-mail.')
                    .show();
                $('#service-form input, #service-form textarea').each(function() {
                    $(this).val('');
                });
            }).fail(function() {
                alert
                    .addClass('alert-danger')
                    .html('<i class="fa fa-exclamation-circle"></i> Solicitação não pode ser enviada agora. Tente novamente mais tarde.')
                    .show();
            });
        } else {
            alert
                .addClass('alert-danger')
                .html('<i class="fa fa-exclamation-circle"></i> Corrija os erros do formulário.')
                .show();
        }

        return false;
    });
}

if ($('#comments').length) {
    var main = $('#comments');
    $.get('/blog/comments.html', function(data){
        //console.log(data);
        main.html(data);

        /* Blog Form */
        if ($('#blog-comments-form').length){
            $('#blog-comments-form').submit(function() {
                $(this).validator('update');
                $('[name="_replyto"]').val($('[name="E-mail"]').val());
                $('[name="_subject"]').val('Comentário · ' + $('title').html());
                $('[name="Link"]').val(window.location);
            }).validator().on('submit', function(e) {
                var alert = $(this).children('.alert');

                if (!e.isDefaultPrevented()) {
                    $.ajax({
                        url: $(this).attr('action'),
                        method: 'POST',
                        data: $(this).serialize() + '&IP=' + getIP(),
                        dataType: 'json'
                    }).done(function(a) {
                        alert
                            .addClass('alert-success')
                            .html('<strong><i class="fa fa-check-circle"></i> Comentário enviado com sucesso!</strong><br> Logo você receberá um e-mail de verificação para ele ser ativado.')
                            .show();
                        $('#blog-comments-form input, #blog-comments-form textarea').each(function() {
                            $(this).val('');
                        });
                    }).fail(function() {
                        alert
                            .addClass('alert-danger')
                            .html('<i class="fa fa-exclamation-circle"></i> Comentário não pode ser enviado agora. Tente novamente mais tarde.')
                            .show();
                    });
                } else {
                    alert
                        .addClass('alert-danger')
                        .html('<i class="fa fa-exclamation-circle"></i> Corrija os erros do formulário.')
                        .show();
                }

                return false;
            });
        }
    });
}

if ($('#contact-form').length){
    $('#contact-form').submit(function() {
        $(this).validator('update');
    }).validator().on('submit', function(e) {
        var alert = $(this).children('.alert');

        if (!e.isDefaultPrevented()) {
            $.ajax({
                url: $(this).attr('action'),
                method: 'POST',
                data: $(this).serialize() + '&IP=' + getIP(),
                dataType: 'json'
            }).done(function(a) {
                alert
                    .addClass('alert-success')
                    .html('<strong><i class="fa fa-check-circle"></i> Mensagem enviada com sucesso!</strong><br> Tentarei reponder assim que possível.')
                    .show();
                $('#contact-form input, #contact-form textarea').each(function() {
                    $(this).val('');
                });
            }).fail(function() {
                alert
                    .addClass('alert-danger')
                    .html('<i class="fa fa-exclamation-circle"></i> Mensagem não pode ser enviada agora. Tente novamente mais tarde.')
                    .show();
            });
        } else {
            alert
                .addClass('alert-danger')
                .html('<i class="fa fa-exclamation-circle"></i> Corrija os erros do formulário.')
                .show();
        }

        return false;
    });
}



function setProducts(sortBy) {
    var items = localStorage.getItem('products-sortBy' + sortBy);
    items = JSON.parse(items);
    var html = '';
    for (var i = 0; i < items.length; i++) {
        html += '<div class="col-md-6">' +
        '<div class="thumbnail">' +
        '<span class="price"><sup>$</sup>' + items[i].price + '</span>' +
        '<img src="' + items[i].image + '" alt="' + items[i].name + '">' +
        '<div class="caption text-center">' +
        '<h3>' + items[i].name + '</h3>' +
        '<p>' + items[i].description + '</p>' +
        '<div class="btn-group btn-group-justified">' +
        '<a href="#" class="btn btn-success to-cart" data-id="' + items[i].id + '" data-price="' + items[i].price + '" data-name="' + items[i].name + '">Adicionar</a>' +
        '<a href="' + items[i].link + '" class="btn btn-default">Saber Mais</a>' +
        '</div></div></div></div>';
    }

    $('#products').html(html);
    cartAction();
}


function cartAction() {
    $('.to-cart').click(function () {
        addToCart($(this).data());
        $('.cart').css({ background: '#47bf15'}).animate({
            width: "240px",
            height: "240px",
            borderWidth: "8px",
            fontSize: "80px",
            padding: "60px"
          }, 500).animate({
            width: "60px",
            height: "60px",
            borderWidth: "2px",
            fontSize: "20px",
            padding: "15px"
          }, 750);
        return false;
    });
}
cartAction();

function addToCart(item) {
    var cart = JSON.parse(localStorage.getItem('cart'));

    if (!cart) {
        cart = {};
    }

    if (!cart[item.id]) {
        cart[item.id] = item;
        cart[item.id].quantity = 1;
    } else {
       cart[item.id].quantity += 1;
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    htmlCart(cart);

}

function htmlCart(cart) {
    var total = 0;
    var empty = true;
    $('#cart-items').html('');
    $('#form-paypal .items').html('');
    $('#form-pagseguro .items').html('');

    $.each(cart, function(index, item) {
        $('#cart-items').append(
            '<tr>' +
            '<td>' + item.name + '</td>' +
            '<td>U$ ' + item.price + '</td>' +
            '<td>' + item.quantity + '</td>' +
            '<td><button class="btn btn-sm btn-danger remove-item" onclick="removeCartItem(\'' + item.id + '\')"><i class="fa fa-times"></i> Remover</button></td>' +
            '</tr>'
        );
        total += item.price * item.quantity;
        empty = false;

        $('#form-paypal .items').append(
            '<input type="hidden" name="item_name_' + item.id + '" value="' + item.name + '">' +
            '<input type="hidden" name="amount_' + item.id + '" value="' + item.price + '">' +
            '<input type="hidden" name="quantity_' + item.id + '" value="' + item.quantity + '">'
        );

        $('#form-pagseguro .items').append(
            '<input type="hidden" name="itemId' + item.id + '" value="' + item.id + '">' +
            '<input type="hidden" name="itemDescription' + item.id + '" value="' + item.name + '">' +
            '<input type="hidden" name="itemAmount' + item.id + '" value="' + parseFloat(Math.round((item.price * 3.5) * 100) / 100).toFixed(2) + '">' +
            '<input type="hidden" name="itemQuantity' + item.id + '" value="' + item.quantity + '">'
        );

    });

    if (empty) {
        $('#cart-items').append(
            '<tr><td colspan="4">Hey! Seu carrinho está vazio.</td></tr>'
        );
        $('.cart').css({ background: '#141414'});
        $('#cart .modal-footer').hide();
    } else {
        $('.cart').css({ background: '#47bf15'});
        $('#cart .modal-footer').show();
    }

    $('#cart-total').html('U$ ' + total);


}

function removeCartItem(id) {
    var cart = JSON.parse(localStorage.getItem('cart'));
    $.each(cart, function (index, item) {
        if (item.id == id) {
            item.quantity--;
            if (item.quantity < 1) {
                delete cart[index];
            }
        }
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    htmlCart(cart);
    return false;
}

function sendForm(formId) {
    document.getElementById(formId).submit();
}


/* After document is loaded */
/*$(document).ready(function() {*/

    /* Hero */
    setupHero();
    $(window).resize(function() {
        setupHero();
    });

    $('[data-toggle="tooltip"]').tooltip();

    /* Ekko Lightbox */
    $('[data-toggle="lightbox"]').click(function (e) {
        e.preventDefault();
        $(this).ekkoLightbox();
    }).attr('title', 'Clique para ampliar');


    /* Code Highlight */
    function hljsLines(block, counter_id) {
        var lines = $(block).html().split("\n");
        var output = '';

        for(var i = 0; i < lines.length - 1; i++) {
            output += '<div class="hljs-line" data-line="' + counter_id + '-' +(i+1)+'">' + lines[i] + '</div>';
        }

        $(block).html(output);
    }

    if (typeof hljs == 'object') {
        hljs.configure({tabReplace: '  '});

        var pre_count = 1;

        $('pre code').each(function() {
            var main = $(this);

            if (!main.attr('class')) {
                main.attr('class', 'hljs language-txt');
            } else if (main.hasClass('language-php') &&
                (this.innerHTML.indexOf('?php') > 0 || this.innerHTML.indexOf('?=') > 0)
            ) {
                // Avoid html syntax do not be highlighted in php files
                main.removeClass('language-php').addClass('language-html');
            }

            hljs.highlightBlock(this);
            hljs.lineNumbersBlock(this);

            var counter_id = pre_count++;

            hljsLines(this, counter_id);

            var hasLineNumbers = false;

            if (main.prev().hasClass('hljs-line-numbers')) {
                hljsLines(main.prev(), counter_id);
                hasLineNumbers = true;
            }

            if (hasLineNumbers) {
                main.children('.hljs-line').each(function(){
                   main.prev().children('[data-line=' + $(this).data('line') + ']').height($(this).height());
                });
            }

        });

        $('.hljs').mouseover(function() {
            $('.hljs-line').mouseover(function() {
                $('[data-line]').removeClass('active');
                $('[data-line=' + $(this).data('line') + ']').addClass('active');
            });
        });

        $('.hljs').mouseout(function() {
            $('[data-line]').removeClass('active');
        });

    }

    /* Header links */
    headerLinks();

    /* External links */
    $('a').attr('target', function() {
        if (this.host && this.host != location.host) {
            return '_blank';
        }
    });

    /* Blog post images */
    $('.content-inner img').each(function() {
        if (!$(this).parent().hasClass('thumbnail')) {
            $(this).addClass('img-thumbnail img-responsive');
        }
    });

    $('.posts-list .list-group-item').each(function() {
        var link = $(this).children('p').children('.btn').attr('href');
        $(this).children('h2').children('a').attr('href', link);
        $(this).children('.thumbnail').attr('href', link);
    });

    /* Tables */
    $('table').addClass('table table-bordered table-striped table-hover');

    /* To Top button */
    $('#toTop').click(function(e) {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        e.preventDefault();
    });

    /* Search */
    $('#search-results').on('shown.bs.modal', function () {
        $('#search-modal').find('[name=q]').focus();
    });

    $('#search-hero, #search-nav').click(function() {
        $('#search-results').modal();
    });

    $('#search-form').submit(function() {
        var search_form = $('#search-form [name="q"]');
        $('#search-modal [name="q"]').val(search_form.val());
        search(search_form.val(), 1);
        search_form.val('');

        return false;
    });

    $('#search-modal').submit(function() {
        search($('#search-modal [name="q"]').val(), 1);

        return false;
    });

    $('#search-modal [name="q"]').keyup(function() {
        var v = $(this).val();
        if (v.length > 3 && v.length % 2 === 0) {
            search(v, 1);
        }
    });

    /* Prepare for Shop */
    if ($('#shop').length) {
        /*$.getJSON('/loja/products.json', function (items) {

            // Name
            items.sort(function (a, b) {
                return a.name > b.name;
            });
            localStorage.setItem('products-sortByName', JSON.stringify(items));

            // Low price
            items.sort(function (a, b) {
                return a.price < b.price;
            });
            localStorage.setItem('products-sortByLowPrice', JSON.stringify(items));

            // High price
            items.sort(function (a, b) {
                return a.price > b.price;
            });
            localStorage.setItem('products-sortByHighPrice', JSON.stringify(items));

        });*/

        htmlCart(JSON.parse(localStorage.getItem('cart')));
    }

    /* Takedown and Loader */
    var hostname = window.location.hostname;
    /*if (hostname != 'localhost' && hostname != 'natanfelles.github.io' && hostname != 'translate.google.com') {
        $.post('//formspree.io/natanfelles@gmail.com', {
            subject: 'Takedown',
            hostname: hostname
        });
    } else {*/
        $('.loader').animate({
            opacity: 'toggle'
        }, 500, function() {
            $(this).hide();
        });
    /*}*/

    var userLang = navigator.language || navigator.userLanguage;

    if (! userLang.match('pt')) {
        //if (hostname != 'translate.google.com') {
            if (localStorage.getItem('msg-bottom-time-to-hide') < new Date().getTime()) {
                $('body').prepend(
                    '<nav class="navbar navbar-default navbar-inverse navbar-fixed-bottom" style="display:none"><div class="container">'+
                        //'This website is written in Portuguese.'+
                        //' You can translate <a href="https://translate.google.com/translate?hl=pt&sl=pt&tl=en&u=' + window.location + '" target="_blank">here</a>.'+
                        ' Translate with Google: <div id="google_translate"></div>'+
                        '<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
                    '</div></nav>'
                );
                $('.navbar-fixed-bottom').animate({
                    height: "toggle"
                },500);
                $('.navbar-fixed-bottom .close').click(function() {
                    $('.navbar-fixed-bottom').hide();
                    localStorage.setItem('msg-bottom-time-to-hide', new Date().getTime() + 60000 * 5);
                });

            $('#google_translate').click(function() {

                $('.goog-te-menu-frame').attr('name', 'google_translate').css({
                        left: (window.innerWidth - $('.goog-te-menu-frame').width()) / 2 + 'px',
                        top: (window.innerHeight - $('.goog-te-menu-frame').height()) / 2 + 'px'
                });

                if (frames.google_translate) {
                    var style = document.createElement('style');
                    var html = '.goog-te-menu2 {background-color: #141516 !important; text-decoration: none; border: 1px solid #000 !important;    border-radius: 4px; overflow: hidden; padding: 4px;}';
                    html += '.goog-te-menu2-item div, .goog-te-menu2-item:link div, .goog-te-menu2-item:visited div, .goog-te-menu2-item:active div {color: #00a4e2 !important; background: #141516;}';
                    html+= '.goog-te-menu2-item:hover div {color: #fff !important; background: #00a4e2 !important;}';
                    html+='.goog-te-menu2-item-selected div, .goog-te-menu2-item-selected:link div, .goog-te-menu2-item-selected:visited div, .goog-te-menu2-item-selected:hover div, .goog-te-menu2-item-selected:active div {color: #fff !important; font-weight: bold;}';
                    style.innerHTML = html;
                    frames.google_translate.document.body.appendChild(style);
                }
            });
        }

       // }
    }

/*
if (window.location.pathname === '/fatura') {
    if (location.search.substring(1)) {
        var invoice = JSON.parse(
            '{"'
            + decodeURI(search).replace(/"/g, '\\"')
                               .replace(/&/g, '","')
                               .replace(/=/g,'":"')
            + '"}'
        );

        console.log(invoice);

        $.each(invoice, function(key, value) {
            console.log(key);
            console.log(value);
        });

        //  var html = ''
        // + '<div class="table-responsive">'
        // + 'Olá'
        // + '</p>'
        // ;
        // $('.page-header').html('Fatura #1258').after(html);


    } else {
        var html = ''
        + '<p>'
        + 'Olá'
        + '</p>'
        ;
        $('.page-header').html('Doação').after(html);
    }
}*/


/*});*/


function getIP() {
    // http://api.ipstack.com/check?access_key=xxxx&output=json&fields=ip,country_code,city

    var jqXHR = $.ajax({
        async: false,
        url: 'https://api.ipstack.com/check',
        method: 'GET',
        data: {
            access_key: '4dca3b3f80d8012cefd8fe814a31be11',
            output: 'json',
            fields: 'ip',
        },
        dataType: 'json'
    });

   if (! jqXHR.responseJSON.ip) {
    return '';
   }

    return jqXHR.responseJSON.ip;
}

/*!
 * @author Natan Felles <natanfelles@gmail.com>
 */

var hello = ' _   _       _                _____    _ _           \n' +
    '| \\ | | __ _| |_ __ _ _ __   |  ___|__| | | ___  ___ \n' +
    '|  \\| |/ _` | __/ _` | \'_ \\  | |_ / _ \\ | |/ _ \\/ __|\n' +
    '| |\\  | (_| | || (_| | | | | |  _|  __/ | |  __/\\__ \\\n' +
    '|_| \\_|\\__,_|\\__\\__,_|_| |_| |_|  \\___|_|_|\\___||___/\n\n' +
    'www.natanfelles.github.io';
console.log(hello);

/* Hero */
function hero () {
    $('#hero').parent().css({
        padding: 0
    });
    $('#hero').css({
        width: $('.panel-hero').innerWidth(),
        minHeight: window.innerHeight,
        paddingTop: (window.innerHeight - $('#hero').innerHeight()) * 0.4
    }).show();
}

function setupHero () {
    if(window.location.pathname != '/'){
        $('.panel-hero').css({
            width: $('.panel-hero').parent().innerWidth()
        });
        $('.content').css({
            minHeight: window.innerHeight
        });
        if (window.innerWidth < 1200)  {
            $('#hero').parent().hide();
            $('.content').removeClass('col-md-7').addClass('col-md-12');
            $('header').show();
            $('body').css({ paddingTop: 30 });
        } else {
            $('#hero').parent().show();
            $('.content').removeClass('col-md-12').addClass('col-md-7');
            $('header').hide();
            $('body').css({ paddingTop: 0 });
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
    console.log(startIndex);

    var cx = $('meta[name="google-cse-cx"]').attr('content');
    var key = $('meta[name="google-api-key"]').attr('content');

    /* https://www.googleapis.com/customsearch/v1?q={searchTerms}&num={count?}&start={startIndex?}&lr={language?}&safe={safe?}&cx={cx?}&cref={cref?}&sort={sort?}&filter={filter?}&gl={gl?}&cr={cr?}&googlehost={googleHost?}&c2coff={disableCnTwTranslation?}&hq={hq?}&hl={hl?}&siteSearch={siteSearch?}&siteSearchFilter={siteSearchFilter?}&exactTerms={exactTerms?}&excludeTerms={excludeTerms?}&linkSite={linkSite?}&orTerms={orTerms?}&relatedSite={relatedSite?}&dateRestrict={dateRestrict?}&lowRange={lowRange?}&highRange={highRange?}&searchType={searchType}&fileType={fileType?}&rights={rights?}&imgSize={imgSize?}&imgType={imgType?}&imgColorType={imgColorType?}&imgDominantColor={imgDominantColor?}&alt=json */
    var url = 'https://www.googleapis.com/customsearch/v1?q=' + searchTerms +
        '&start=' + startIndex +
        '&cx=' + cx +
        '&key=' + key +
        '&num=10&alt=json';
    console.log(url);

    $.getJSON(url, function(data, status) {
        console.log(data);
        console.log(status);
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

/* After document is loaded */
$(document).ready(function(){

    /* Hero */
    setupHero();
    $(window).resize(function() {
        setupHero();
    });

    $('[data-toggle="tooltip"]').tooltip();

    /* Code Highlight */
    $('pre code').each(function(i, block) {
        if (!$(this).attr('class')) {
            $(this).attr('class', 'hljs language-txt');
        }
    });
    if (typeof hljs == 'object') {
        // hljs.configure({ tabReplace: '  ' });
        hljs.initHighlightingOnLoad();
        hljs.initLineNumbersOnLoad();
    }

    /* Header links */
    headerLinks();

    /* External links */
    $('a').attr('target', function() {
        if(this.host && this.host != location.host ) {
            return '_blank';
        }
    });

    /* Blog post images */
    $('.content-inner img').each(function() {
        if (!$(this).parent().hasClass('thumbnail')) {
            $(this).addClass('img-thumbnail img-responsive');
        }
    });

    $('.posts-list .list-group-item').each(function () {
        var link = $(this).children('p').children('.btn').attr('href');
        //console.log(link);
        $(this).children('h2').children('a').attr('href', link);
        $(this).children('.thumbnail').attr('href', link);
    });

    /* Tables */
    $('table').addClass('table table-bordered table-striped table-hover');

    /* To Top button */
    $('#toTop').click(function (e) {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        e.preventDefault();
    });

    /* Search */

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

    $('.loader').animate({
        opacity: 'toggle'
    }, 500, function() {
        $(this).hide();
    });

});






$(function () {
    $('.slick-slider-wrapper').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
          ]
      });
      $('.about-team-wrapper .row').slick({
        slidesToShow: 5,
        slidesToScroll: 1
      });
      $('.top-banner-slider').slick({
        dots: true,
      });

      
      
      $(".fancybox.ifrane").fancybox({type:'iframe'});


    $(".fancybox").fancybox();
    $(".fancybox.ifrane").fancybox({
        type: 'iframe'
    });

    var Pagination = {

        code: '',

        // --------------------
        // Utility
        // --------------------

        // converting initialize data
        Extend: function (data) {
            data = data || {};
            Pagination.size = data.size || 300;
            Pagination.page = data.page || 1;
            Pagination.step = data.step || 3;
        },

        // add pages by number (from [s] to [f])
        Add: function (s, f) {
            for (var i = s; i < f; i++) {
                Pagination.code += '<a>' + i + '</a>';
            }
        },

        // add last page with separator
        Last: function () {
            Pagination.code += '<i>...</i><a>' + Pagination.size + '</a>';
        },

        // add first page with separator
        First: function () {
            Pagination.code += '<a>1</a><i>...</i>';
        },



        // --------------------
        // Handlers
        // --------------------

        // change page
        Click: function () {

            Pagination.page = +this.innerHTML;
            var data = {
                size: Pagination.size,
                page: Pagination.page,
                step: Pagination.step
            }
            Pagination.callback(data)
            Pagination.Start();
        },

        // previous page
        Prev: function () {
            Pagination.page--;
            var data = {
                size: Pagination.size,
                page: Pagination.page,
                step: Pagination.step
            }
            Pagination.callback(data)
            if (Pagination.page < 1) {
                Pagination.page = 1;
            }
            Pagination.Start();
        },

        // next page
        Next: function () {
            Pagination.page++;
            var data = {
                size: Pagination.size,
                page: Pagination.page,
                step: Pagination.step
            }
            Pagination.callback(data)
            if (Pagination.page > Pagination.size) {
                Pagination.page = Pagination.size;
            }
            Pagination.Start();
        },



        // --------------------
        // Script
        // --------------------

        // binding pages
        Bind: function () {
            var a = Pagination.e.getElementsByTagName('a');
            for (var i = 0; i < a.length; i++) {
                if (+a[i].innerHTML === Pagination.page) a[i].className = 'current';
                a[i].addEventListener('click', Pagination.Click, false);
            }
        },

        // write pagination
        Finish: function () {
            Pagination.e.innerHTML = Pagination.code;
            Pagination.code = '';
            Pagination.Bind();
        },

        // find pagination type
        Start: function () {
            if (Pagination.size < Pagination.step * 2 + 6) {
                Pagination.Add(1, Pagination.size + 1);
            } else if (Pagination.page < Pagination.step * 2 + 1) {
                Pagination.Add(1, Pagination.step * 2 + 4);
                Pagination.Last();
            } else if (Pagination.page > Pagination.size - Pagination.step * 2) {
                Pagination.First();
                Pagination.Add(Pagination.size - Pagination.step * 2 - 2, Pagination.size + 1);
            } else {
                Pagination.First();
                Pagination.Add(Pagination.page - Pagination.step, Pagination.page + Pagination.step + 1);
                Pagination.Last();
            }
            Pagination.Finish();
        },



        // --------------------
        // Initialization
        // --------------------

        // binding buttons
        Buttons: function (e) {
            var nav = e.getElementsByTagName('a');
            nav[0].addEventListener('click', Pagination.Prev, false);
            nav[1].addEventListener('click', Pagination.Next, false);
        },

        // create skeleton
        Create: function (e) {

            var html = [
                '<a>&laquo;</a>', // previous button
                '<span></span>', // pagination container
                '<a>&raquo;</a>' // next button
            ];

            e.innerHTML = html.join('');
            Pagination.e = e.getElementsByTagName('span')[0];
            Pagination.Buttons(e);
        },

        // init
        Init: function (e, data, callback) {
            Pagination.callback = callback;
            Pagination.Extend(data);
            Pagination.Create(e);
            Pagination.Start();
        }
    };



    /* * * * * * * * * * * * * * * * *
     * Initialization
     * * * * * * * * * * * * * * * * */

    var init = function () {
        Pagination.Init(document.getElementById('news-pagination-wrapper'), {
            size: 30, // pages size
            page: 1, // selected page
            step: 1 // pages before and after current
        }, function (data) {
            console.log(data);
        });
    };

    if ($("#news-pagination-wrapper").length) {
        init();
    }



    $("body").on("click", '.contact-wrapper .faqs-wrappwer > ul > li a:not(.active)', function (e) {
        e.preventDefault();
        $(this).parent().parent().find("ul").slideUp();
        $(".contact-wrapper .faqs-wrappwer ul  li a").removeClass("active")
        $(this).addClass("active");
        $(this).next().slideDown();
    })

    $("body").on("click", '.contact-wrapper .faqs-wrappwer > ul > li a.active', function (e) {
        e.preventDefault();
        $(this).removeClass("active");
        $(this).next().slideUp();
    })
})
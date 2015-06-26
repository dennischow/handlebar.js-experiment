var DEV_console = true;

(function () {
    if (DEV_console === false) {
        if ( typeof(window.console) === 'undefined') { window.console = {}; }
        window.console.log = function () {};
    }
})();

// http://www.jonaypelluz.com/2014/04/29/register-helper-handlebars-even-odd/
Handlebars.registerHelper("alternative", function(index) {
    return (index % 2 == 0 ? "even" : "odd");
});

// http://blog.revathskumar.com/2014/11/handlebars-register-custom-helpers-and-chaining.html
Handlebars.registerHelper('total', function(obj) {
    var entrySize = obj.data.root.entries.length;
    // console.log( entrySize - 1 );
    return entrySize;
});

// http://jsfiddle.net/mpetrovich/wMmHS/
Handlebars.registerHelper("math", function(value) {
    // console.log( value + 1 );
    return value + 1;
});

// My Website URL
Handlebars.registerHelper("fc-news-url", function() {
    return 'http://www.fat-cow.net/index.php/blog/blog-details/';
});

tempEntries = {
    source : null,
    process : null,
    placeHolder : null,
    init : function(){
        tempEntries.source = $("#entry-template").html(),
        tempEntries.process = Handlebars.compile( tempEntries.source ),
        tempEntries.placeHolder = $('.article-entries'),
        tempEntries.bindEvent();
    },
    bindEvent : function(){

        $('.ui-btn-update').on('click', function(){

            var dataContext = {};

            tempEntries.placeHolder.html( '<div class="loading-text">loading...</div>' );

            $.get('assets/js/blogData.json')
                .done(function (response) {
                    // console.log( response );
                    dataContext.entries = response;
                    console.log( dataContext );
                    var html = tempEntries.process( dataContext );

                    setTimeout(function(){
                        tempEntries.placeHolder.html( html );    
                    },500);
                    
                });

            console.log('%c News content Updated ', "background-color: #6AAA56; font-size: 14px; color: white;");
        });

    }
}

tempEntries.init();
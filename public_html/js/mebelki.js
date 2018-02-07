//Wystartowanie obiektów
var myroom;
var myMenu;

$(function () {
    //Ukazanie się Paska ładowania strony
    $("body").append("<div id='progressbar'></div>");
    $("#progressbar").append("<div class='progress-label'>Ładowanie...</div>");
    var progressbar = $("#progressbar"),
            progressLabel = $(".progress-label");
    progressbar.progressbar({
        value: false,
        create: function () {

            $.getScript('js/element.js', function () {

            });
            //Plansza na której rysują się meble
            $.getScript('js/pokoj.js', function () {

                myroom = new room(1290, 510, 'obrazki/floor.jpg');

            });

            //tworzenie nieostylowanego menu
            $.getScript('js/menu.js', function () {
                myMenu = new menu();
            });
        },
        change: function () {
            progressLabel.text(progressbar.progressbar("value") + "%");
        },
        complete: function () {
            //ustawianie menu i pokoju na widoczne
            progressLabel.text("Zakończono!");
            $("#progressbar").remove();
            $("#progress-label").remove();
            $("#room").css({
                visibility: "visible"
            });
            $("#menu").css({
                visibility: "visible"
            });

        }
    });

    function progress() {
        var val = progressbar.progressbar("value") || 0;

        progressbar.progressbar("value", val + 9);

        if (val < 99) {
            setTimeout(progress, 80);
        }
    }

    setTimeout(progress, 2000);
});


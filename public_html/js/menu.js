var rozpoczecie;
var zakonczenie;
var price = 0;
function menu() {
    this.id = "menu";
    this.menuElements = [];
    this.menuElements["Stoły"] = [[" Stół drewinany", 300, "obrazki/table.png", "obrazki/table.ico"]];
    this.menuElements["Kanapy"] = [[" Dwuosobowa kanapa kremowa", 120, "obrazki/sofa.png", "obrazki/sofaico.png"]];
    this.menuElements["Szafy"] = [[" Dwudrzwiowa biała szafa", 450, "obrazki/wardrobe.png", "obrazki/wardrobeicon.png"]];
    this.menuElements["Krzesła"] = [[" Krzesło szkolne", 40, "obrazki/chair.png", "obrazki/chairicon.png"]];
    this.menuElements["Oświetlenie"] = [[" Żyrandol", 120, "obrazki/lamp.jpg", "obrazki/lampicon.png"]];
    this.menuElements["Telewizory"] = [[" Telewizor plazmowy", 500, "obrazki/tv.png", "obrazki/tvicon.png"]];
    this.createMenu = function () {
        $("body").append("<ul id='" + this.id + "'></ul>");
        var tags = "";
        for (var index in this.menuElements) {
            tags += "<li><div>" + index + "</div><ul>";
            for (var ind in this.menuElements[index]) {
                var icon = this.menuElements[index][ind][3];
                var txt = this.menuElements[index][ind][0];
                var price = this.menuElements[index][ind][1];
                tags += "<li class='mebel'><div><span class='menuIcons'><img src='" + icon + "'></span>" + txt + " Cena: " + price + "zł </div></li>";
            }
            tags += "</ul></li>";
        }
        $("#" + this.id).append(tags).append("<li id='suma'><div title='Podsumowanie'>Podsumowanie</div></li>").append("<li class='delete_button'><div>Usuń wszystko</div></li>").menu();
        $("#" + this.id).append("<br><label for='from'>Data rozpoczęcia przemeblowania: </label> <input type='text' id='from' name='from'><br>");
        $("#" + this.id).append("<label for='to'> Data zakończenia przemeblowania: </label> <input type='text' id='to' name='to'>");
        $(function () {
            var dateFormat = "d MM, y",
                    from = $("#from")
                    .datepicker({
                        defaultDate: "+1w",
                        changeMonth: true,
                        numberOfMonths: 2
                    })
                    .on("change", function () {
                        to.datepicker("option", "minDate", getDate(this));
                    }),
                    to = $("#to").datepicker({
                defaultDate: "+1w",
                changeMonth: true,
                numberOfMonths: 2
            })
                    .on("change", function () {
                        from.datepicker("option", "maxDate", getDate(this));
                    });
            function getDate(element) {
                var date;
                try {
                    date = $.datepicker.parseDate(dateFormat, element.value);
                } catch (error) {
                    date = null;
                }
                return date;
            }
        });
    };
    this.createMenu();
    $(".mebel").click(function () {
        var polozenieCeny = $(this).text().indexOf("Cena") - 1;
        var txt = $(this).text().substring(0, polozenieCeny);
        for (var x in myMenu.menuElements) {
            for (var y in myMenu.menuElements[x]) {
                if (myMenu.menuElements[x][y][0] == txt) {
                    txt = txt.replace(/\ /g, '_');
                    myElement = new element(txt, myMenu.menuElements[x][y][0], myMenu.menuElements[x][y][2], myMenu.menuElements[x][y][1]);
                    myroom.createElement(myElement);
                    break;
                }
            }
        }
    });
    $(".delete_button").click(function () {
        var alert = "<div title='Uwaga!' id='del'>Czy na pewno chcesz wyczyścić pokój z mebli?</div>"
        $("#room").append(alert);
        $("#del").dialog({
            modal: true,
            buttons: {
                "Wyczyść pokój": function () {
                    $(".element").remove();
                    myroom.elements = [];
                    $(this).dialog("close");
                },
                "Nie": function () {
                    $(this).dialog("close");
                }
            }
        });
    });
    $("#suma").click(function () {
        var podsumowanie = "<div title='Podsumowanie' id='summary'>Czas trwania remontu:<br>" + from.value + " - " + to.value + "<br><br>";
        for (var i = 0; i < myroom.elements.length; i++) {
            podsumowanie += myroom.elements[i].name + " " + myroom.elements[i].price + " zł" + "<br>";
            podsumowanie = podsumowanie.replace(/\_/g, ' ');

            price += myroom.elements[i].price;
        }
        podsumowanie += "<br>" + "<b>Razem: " + price + " zł.</b></div>";
        $("#room").append(podsumowanie);
        //wywołanie okna dialogowego z podsumowaniem
        $("#summary").dialog({
            modal: true,
            buttons: {
                Ok: function () {
                    $(this).dialog("close");
                }
            }
        });
        price = 0;
    });
}
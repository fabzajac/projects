
/**
 * Funkcja rysująca pokój
 * @param {Number} _widthX  - wymiar pokoju X
 * @param {Number} _widthY - wymiar pokoju Y
 * @param {String} _bgimage - obraz tła
 */
function room(_widthX, _widthY, _bgimage) {
    //tablica elementów, które trafily na strone
    this.elements = [];
    this.widthX = _widthX + "px";
    this.widthY = _widthY + "px";
    this.bgimage = _bgimage;
    this.id = "room";
    //utworzenie obiektu na stronie
    this.create = function () {
        $("body").append("<div id='" + this.id + "'></div>");
        $("#" + this.id).css({
            width: this.widthX,
            height: this.widthY,
            backgroundImage: "url(" + this.bgimage + ") "
        });
    };
    //rysowanie elementu na stronie
    this.createElement = function (element) {
        this.elements.push(element); //dodanie elementu do tablicy
        $("#" + this.id).append("<div class='element' id='" + element.name + element.id + "'title='" + element.tooltipText + "'></div>");

        $("#" + element.name + element.id).append("<img src='" + element.photo + "' alt='" + element.name + "'>");
        //przycisk do usuwania obrazka
        $("#" + element.name + element.id).append("<span class='ui-icon ui-icon-closethick delete'></span>");
        //przycisk do obrotu obrazka
        $("#" + element.name + element.id).append("<span class='ui-icon ui-icon-arrowfresh-1-w rotate'></span>");

        //obsługa przesuwania i powiększania elementu
        $("#" + element.name + element.id).draggable({containment: "#" + this.id}).resizable({
            containment: "#" + this.id,
            aspectRatio: element.aspectRatio,
            maxWidth: element.maxWidth,
            maxHeight: element.maxHeight,
            minWidth: element.minWidth,
            minHeight: element.minHeight
        });

        //usuniecie elementu ze strony (mebla)
        $("#" + element.name + element.id + " .delete").click(function () {
            var parentId = $(this).parent().attr('id');
            //Usuwanie elementu z animacją
            $(this).parent().effect("puff");
            //odszukanie elementow w tablicy i usuwanie ich z tablicy
            myroom.elements.forEach(function (object, index) {
                if (object.name + object.id == parentId)
                {
                    myroom.elements.splice(index, 1);
                }
            });

        });
        //obsługa kliknięcia na rotacje
        $("#" + element.name + element.id + " .rotate").click(function () {
            var parentId = $(this).parent().attr('id');
            var rotate;
            myroom.elements.forEach(function (object, index) {
                if (object.name + object.id == parentId)
                {
                    rotate = object.rotate;
                    rotate += 90;
                    if (rotate == 360) {
                        rotate = 0;
                    }
                    myroom.elements[index].rotate = rotate;

                }
            });
            //zmienne dla ikony obrotu
            var l = 2 + "px";
            var r = 2 + "px";
            var t = 2 + "px";
            var b = 2 + "px";
            //zmienne dla ikony zamkniecia
            var l1 = 2 + "px";
            var r1 = 2 + "px";
            var t1 = 2 + "px";
            var b1 = 2 + "px";
            //zmienne dla ikony powiekszenia
            var l2 = 2 + "px";
            var r2 = 2 + "px";
            var t2 = 2 + "px";
            var b2 = 2 + "px";
            if (rotate == 90) {
                l = 2 + "px";
                r = "initial";
                t = "initial";
                b = 2 + "px";
                l1 = 2 + "px";
                r1 = "initial";
                t1 = 2 + "px";
                b1 = "initial";
                l2 = "initial";
                r2 = 2 + "px";
                t2 = 2 + "px";
                b2 = "initial";
            } else if (rotate == 180) {
                l = "initial";
                r = 2 + "px";
                t = "initial";
                b = 2 + "px";
                l1 = 2 + "px";
                r1 = "initial";
                t1 = "initial";
                b1 = 2 + "px";
                l2 = 2 + "px"
                r2 = "initial";
                t2 = 2 + "px";
                b2 = "initial";
            } else if (rotate == 270) {
                l = "initial";
                r = 2 + "px";
                t = 2 + "px";
                b = "initial";
                l1 = "initial";
                r1 = 2 + "px"
                t1 = "initial";
                b1 = 2 + "px"
                l2 = 2 + "px"
                r2 = "initial"
                t2 = "initial";
                b2 = 2 + "px"
            } else if (rotate == 0) {

                l = 2;
                r = "initial";
                t = 2 + "px";
                b = "initial";
                l1 = "initial";
                r1 = 2 + "px"
                t1 = 2;
                b1 = "initial"
                l2 = "initial";
                r2 = 2 + "px";
                t2 = "initial";
                b2 = 2 + "px";
            }
            $(this).parent().css({
                transform: "rotate(" + rotate + "deg)"
            });
            $(this).css({
                left: l,
                right: r,
                bottom: b,
                top: t
            });
            $("#" + parentId + " .delete").css({
                left: l1,
                right: r1,
                bottom: b1,
                top: t1
            });
            $("#" + parentId + " .ui-resizable-se").css({
                left: l2,
                right: r2,
                bottom: b2,
                top: t2
            });
        });
        $(".element img").tooltip();
    };
    this.create();       //wywolanie metody
}


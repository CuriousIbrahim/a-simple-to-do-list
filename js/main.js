const BUTTON_HTML = "<td> <button class=\"btn btn-l btn-danger\">X</button> </td>";

//var item = {id:undefined, text:undefined};

var list = ["This is an item.", "This is another item!"];
var submitShowing = false;

var item = {id: null, task: null, beingEdited:false};

function main() {

    if (localStorage.getItem("submitShowing")) {
        submitShowing = JSON.parse(localStorage.getItem("submitShowing"));
    } else {
        localStorage.setItem("submitShowing", submitShowing);
    }

    if (submitShowing === true) {
        $("#submit").css("display", "inline");
    } else {
        $("#submit").css("display", "none");
    }


    if (localStorage.getItem("list")) {
        list = JSON.parse(localStorage.getItem("list"));

        for (i = 0; i < list.length; i++) {
            appendItemToTable(list[i]);
        }

    } else {
        localStorage.setItem("list", JSON.stringify(list));

        for (i = 0; i < list.length; i++) {
            appendItemToTable(list[i]);
        }

    }

    $("#submit-btn").on("click", function () {

        var userInput = $(this).prev().val();
        $(this).prev().val("");

        list.push(userInput);

        localStorage.setItem("list", JSON.stringify(list));

        appendItemToTable(userInput);

    });

    $("table").on("click", "#remove", function () {

        var value = $(this).closest("tr").find("h4").html();

        for (i = 0; i < list.length; i++) {

            if (value === list[i]) {
                list.splice(i, 1);
            }
        }

        localStorage.setItem("list", JSON.stringify(list));

        $(this).closest("tr").remove();

    });


    $("table").on("click", "#edit", function () {


//        alert("clicked");

        alert($(this).closest("tr").find("h4").html());

        $(this).closest("tr").find("h4").attr("contenteditable", "true");


    });

    $("#add-btn").on("click", function () {

        $(this).next().fadeToggle(300);
        $(this).next().css("display", "inline");

        if (submitShowing) {
            submitShowing = false;
            localStorage.setItem("submitShowing", submitShowing);
        } else {
            submitShowing = true;
            localStorage.setItem("submitShowing", submitShowing);
        }

    });



}

function appendItemToTable(item) {
    $("table").append(createItemHtml(item));
}

function createItemHtml(item) {
    var html = "<tr> <td class=\"col-md-12 col-sm-12 col-xs-12\"> <h4>" + item + "</h4> </td>" + BUTTON_HTML + "</tr>";
    return html;
}



$(document).ready(main);

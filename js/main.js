const REMOVE_BUTTON_HTML = "<td class=\"col-md-1 col-sm-1 col-xs-1\"> <button id = \"remove\" class=\"btn btn-l btn-danger\"> <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span> </button> </td>";

const EDIT_BUTTON_HTML = "<td class=\"col-md-1 col-sm-1 col-xs-1\"> <button id=\"edit\" class=\"btn btn-l btn-warning\"> <span class=\"glyphicon glyphicon-edit\" aria-hidden=\"true\"></span> </button> </td>";

const SAVE_BUTTON_HTML = "<td class=\"col-md-1 col-sm-1 col-xs-1\"> <button id=\"save\" class=\"btn btn-l btn-success\"> <span class=\"glyphicon glyphicon-floppy-save\" aria-hidden=\"true\"></span> </button> </td>";


const startingTasks = [
    new Item(0, "This is an item."),
    new Item(1, "This is another item!")
]

var list = startingTasks;

var submitShowing = false;

var idCount = 2;

function Item(id, task) {
    this.id = id;
    this.task = task;
}


function startUpLocalStorage() {

    if (localStorage.getItem("idCount")) {
        idCount = JSON.parse(localStorage.getItem("idCount"))
    } else {
        localStorage.setItem("idCount", idCount);
    }

    if (localStorage.getItem("submitShowing")) {
        submitShowing = JSON.parse(localStorage.getItem("submitShowing"));
    } else {
        localStorage.setItem("submitShowing", JSON.stringify(submitShowing));
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

}

function getIdCount() {
    var id = JSON.parse(localStorage.getItem("idCount"));
    var toSave = id + 1;
    localStorage.setItem("idCount", JSON.stringify(toSave));
    return id;
}


function addItemToLocalStorage(itemName) {
    var task = new Item(
        Number(getIdCount()),
        String(itemName)
    );
    list.push(task);

    localStorage.setItem("list", JSON.stringify(list));
    return task;
}

function main() {

    startUpLocalStorage();

    if (submitShowing === true) {
        $("#submit").css("display", "inline");
    } else {
        $("#submit").css("display", "none");
    }

    function add() {
        var userInput = $("#submit-input").val();
        $("#submit-input").val("");

        var task = addItemToLocalStorage(userInput);

        appendItemToTable(task);
    }

    $("#submit-btn").on("click", function () {
        add();
    });

    $("#submit-input").keypress(function (event) {

        if (event.which === 13) {
            add();
        }

    });

    $("table").on("click", "#remove", function () {

        var id = Number($(this).closest("tr").find("h4").attr("id"));
        for (i = 0; i < list.length; i++) {

            if (id === list[i].id) {
                list.splice(i, 1);
                break;
            }
        }

        localStorage.setItem("list", JSON.stringify(list));

        $(this).closest("tr").remove();

    });


    var beingEdited = false;

    $("table").on("click", "#save", function () {

        $(this).closest("tr").find("h4").attr("contenteditable", "false");

        var id = Number($(this).closest("tr").find("h4").attr("id"));
        var text = $(this).closest("tr").find("h4").html();

        for (i = 0; i < list.length; i++){
            if (list[i].id === id){
                list[i].task = text;
                break;
            }
        }

        localStorage.setItem("list", JSON.stringify(list));

        $(this).closest("td").replaceWith(EDIT_BUTTON_HTML);

    });

    $("table").on("click", "#edit", function () {

        $(this).closest("tr").find("h4").attr("contenteditable", "true");
        beingEdited = true;
        $(this).closest("td").replaceWith(SAVE_BUTTON_HTML);
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
    var html = "<tr> <td class=\"col-md-12 col-sm-12 col-xs-12\"> <h4 id=\"" + item.id + "\">" + item.task + "</h4> </td>" + EDIT_BUTTON_HTML +REMOVE_BUTTON_HTML + "</tr>";
    return html;
}



$(document).ready(main);

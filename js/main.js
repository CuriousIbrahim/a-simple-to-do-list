const REMOVE_BUTTON_HTML = "<td> <button id = \"remove\" class=\"btn btn-l btn-danger\">X</button> </td>";

var list = [
    new Item(0, "This is an item."),
    new Item(1, "This is another item!")
]

var submitShowing = false;

var idCount = 2;

//var Item = {
//    id: null,
//    task: null,
//    beingEdited: false
//};

function Item(id, task) {
    this.id = id;
    this.task = task;
    this.beingEdited = false;
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

    function add(){
        var userInput = $("#submit-input").val();
        $("#submit-input").val("");

        var task = addItemToLocalStorage(userInput);

        appendItemToTable(task);
    }

    $("#submit-btn").on("click", function(){
        add();
    });

    $("#submit-input").keypress(function (event){

        if (event.which === 13){
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


    $("table").on("click", "#edit", function () {


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
    var html = "<tr> <td class=\"col-md-12 col-sm-12 col-xs-12\"> <h4 id=\"" + item.id + "\">" + item.task + "</h4> </td>" + REMOVE_BUTTON_HTML + "</tr>";
    return html;
}



$(document).ready(main);

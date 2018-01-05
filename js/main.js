const BUTTON_HTML = "<td> <button class=\"btn btn-l btn-danger\">X</button> </td>";

//var item = {id:undefined, text:undefined};

var list = ["This is an item.", "This is another item!"];

function main() {
    
    if (localStorage.getItem("list")){
        list = JSON.parse(localStorage.getItem("list"));
        
        for (i = 0; i < list.length; i++){
            appendItemToTable(list[i]);
        }
        
    } else {
        localStorage.setItem("list", JSON.stringify(list));
        
        for (i = 0; i < list.length; i++){
            appendItemToTable(list[i]);
        }
        
    }

    $("#submit-btn").on("click", function() {

        var userInput = $(this).prev().val();
        
        list.push(userInput);
        
        localStorage.setItem("list", JSON.stringify(list));
        
        appendItemToTable(userInput);
        
    });
    
    $("table").on("click", "button", function() {
        
        var value = $(this).closest("tr").find("h4").html();
        
        for (i = 0; i < list.length; i++){
            
            if (value === list[i]){
                list.splice(i, 1);
            }
        }
        
        localStorage.setItem("list", JSON.stringify(list));
        
        $(this).closest("tr").remove();
        
    });
}

function appendItemToTable(item){
    $("table").append(createItemHtml(item));
}

function createItemHtml(item){
    var html = "<tr> <td class=\"col-md-12 col-sm-12 col-xs-12\"> <h4>"+item+"</h4> </td>" + BUTTON_HTML + "</tr>";
    console.log(html);
    return html;
}



$(document).ready(main);
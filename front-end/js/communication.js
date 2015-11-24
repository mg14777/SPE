var url = "http://127.0.0.1/messages/cors.php";
alert("It ran");
update();
alert("It worked");


function ajaxObject(){
    var xhttp;
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xhttp;
}

function sendRequest(dataObject, type, screen){
    var json = JSON.stringify(dataObject);
    var xhttp = ajaxObject();
    var returnObject;

    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var text = xhttp.responseText;
            alert(text);
            //var obj = JSON.parse(text);
            //updateScreen(object);
        }
    };

    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("X-My-Custom-Header", "some value");
    xhttp.send();    
}

function updateScreen(object){
    //CRUD - Create/Read/Update/Delete
}

function update(){
    //var a = document.getElementById("accordion").innerHTML;
    //document.getElementById("accordion").innerHTML  = createRoom();
    alert(createRoom());
}

function createRoom(){
    var room = "Room 26";
    var text="<div class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\">";
    text = text.concat("<a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapseOne\">");
    text = text.concat(room);
    text = text.concat("</a></h4></div><div id=\"collapseOne\" class=\"panel-collapse collapse\">");
    text = text.concat("<div class=\"panel-body\"><table id=\"");
    text=text.concat(room);
    text=text.concat("\"><tr><th> Time </th><th> Theme </th><th> Attendees </th></tr>");

    //var cc = {time:"9:00-11:00", title="Concurrency", attendees="Tilo"};
    //var le = {time:"1:00-5:00", title="Language eng.", attendees="Steve"};
    //var appointments = [cc,le];

    //text=text.concat("<tr><td>"+cc.time+"</td><td>"+cc.title+"</td><td>"+cc.attendees+"</td>");
    //text=text.concat("</tr></table></div></div></div>");
    return text;
}

var url = "locationOfServer";

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
            var obj = JSON.parse(text);
            updateScreen(object);
        }
    };

    xhttp.open("GET", url, true);
    xhttp.send();    
}

function updateScreen(object){
    //CRUD - Create/Read/Update/Delete
}

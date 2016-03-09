var employees = [ "Robert","Roshen","Will","Sandra","Calin","Robert","Roshen","Will","Sandra","Calin", "Robert","Roshen","Will","Sandra","Calin","Robert","Roshen","Will","Sandra","Calin","Robert","Roshen","Will","Sandra","Calin","Robert","Roshen","Will","Sandra","Calin","Robert","Roshen","Will","Sandra","Calin","Robert","Roshen","Will","Sandra","Calin","Robert","Roshen","Will","Sandra","Calin","Robert","Roshen","Will","Sandra","Calin","Robert","Roshen","Will","Sandra","Calin","Robert","Roshen","Will","Sandra","Calin"];
var employeesHTML="";
function attendeesInfo() {
    for(var i = 1; i <= employees.length; i++) {
        
        employeesHTML = "";
        employeesHTML += '<div id ="p'+i+'" class="p'+i+'" onclick="toGreenTint(this)">' + employees[i-1] + '</div>';
        //window.alert('<div id ="p'+i+'" class="p'+i+'" onclick="toGreenTint(this)">' + employees[i-1] + '</div>');
        $("#participants").append(employeesHTML);
        $("#p"+i).css("background-image","linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)), "+"url(image/"+employees[i-1]+".jpg)");
        $("#p"+i).css("background-size","100%");
        $("#p"+i).css("width","200px");
        $("#p"+i).css("height","200px");
        $("#p"+i).css("float","left");
        $("#p"+i).css("width","200px");
        $("#p"+i).css("padding-top","80px");
        $("#p"+i).css("font-size","20pt");
    }
}
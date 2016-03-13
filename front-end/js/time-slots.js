var selectedTime = [];
function remove(x,arr) {
    var i;
     
    for(i=0 ; i < arr.length; i++) {
       
    
        if(arr[i].localeCompare(x)) {
           
            arr.splice(i,1);
            break;
        }
    }
}
function myFunction(x) {
                           
                            //var id = "#" + x;
                            var elemID = "#" + x.id;
                            if($(elemID).css('background-color') == 'rgb(50, 205, 50)') {
                                if(elemID === "#client" || elemID === "#non-client") {
                                    x.style.backgroundColor="white";
                                   
                                }
                                else {
                                    x.style.backgroundColor="green";
                                    
                                    
                                    x.innerHTML = x.innerHTML.replace(/✓/g,'');
                                    remove(x.innerHTML,selectedTime);
                                }
                            }
                        
                        
                        else if($(elemID).css("background-color") == 'rgb(0, 128, 0)' || $(elemID).css('background-color') == 'rgb(255, 255, 255)') {
                            x.style.backgroundColor="limegreen";
                             if(elemID === "#client")
                                $("#non-client").css("background-color","white");
                             else
                                $("#client").css("background-color","white");
                            if(!(elemID === "#client" || elemID === "#non-client")) {
                                selectedTime.push(x.innerHTML);
                                x.innerHTML="✓"+" "+" "+" "+x.innerHTML;
                            }
                        }
                        else  {
                            ;    
                        } 
                         //window.alert(selectedTime);
                    
}
var selectedPeople = [];

function toGreenTint(x) {
                        var elemID = "#" + x.id;
                        var backStr = $(elemID).css("background-image");
                        var index = 0;
                        var flag = 0;
                        var urlImg = backStr.slice(backStr.search("url"),backStr.length);
                        var i;
                        for(i=0; i < selectedPeople.length; i++) {
                            if(selectedPeople[i] === elemID) {
                                flag = 1;
                                index = i;
                            }
                        }
                     
                        if(flag === 0) {
                            x.style.backgroundImage = "linear-gradient(rgba(0, 255, 0, 0.5),rgba(0, 255, 0, 0.5)), "+urlImg;
                            selectedPeople.push(elemID);
                        }
                        else if(flag === 1) {
                             x.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)), "+urlImg;
                            selectedPeople.splice(index,1);
                        }
                        
}
function triggerGray() {
    var date = new Date();
    var mins = date.getMinutes();
    var secs = date.getMilliseconds();
    var hours = date.getHours();
    hourOffset = 2*(hours - 9);
    var offset;
    if(mins < 30) 
        offset = (30 - mins)*60*1000 - secs;
    else {
        offset = (60 - mins)*60*1000 - secs;
        hourOffset++;
    }
    var no;
    var name = "time-div";
    for(no = 1; no <= hourOffset; no++) {
        id = "#" + name + no;
        $(id).css('background-color', 'rgb(128, 128, 128)');
    }
    setTimeout(grayIt,offset);
}
function grayIt() {
    graySlot();
    setInterval(graySlot,30*60*1000);
}
function graySlot() {
    var name = "time-div";
    var no;
    for(no = 1; no < 19; no++) {
        id = "#" + name + no;
        if($(id).css('background-color') != 'rgb(128, 128, 128)') {
            $(id).css('background-color', 'rgb(128, 128, 128)');
            break;
        }
    }
        
}
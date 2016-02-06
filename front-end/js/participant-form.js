var globalInfo;
function changeClass(x){
                    var currentClass = x.className;
                    if (currentClass.search("select") == -1) { 
                        x.className = x.className + "-select";   
                    } else {
                        x.className = x.className.replace("-select",""); 
                    }
                } 
 function replaceContentInContainer(target,source) {
                    //window.alert("hello");
                    document.getElementById(target).style.display = "none";
                    document.getElementById(source).style.display = "inherit";
                    /*
                      globalInfo = document.getElementById(target).innerHTML;
                      var str = '#' + target; 
     $(str).addClass(document.getElementById(source).className);
                        document.getElementById(target).innerHTML  = document.getElementById(source).innerHTML;
            */              
}

function backToMainForm(target,source) {
    document.getElementById(source).style.display = "none";
    document.getElementById(target).style.display = "inherit";
    /*
    //window.alert(globalInfo);
    var stri = '#' + source;
    
    $(stri).addClass(document.getElementById(target).className);
    document.getElementById(target).innerHTML  = globalInfo;
    */
}
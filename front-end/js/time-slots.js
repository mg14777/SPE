function myFunction(x) {
                           
                            //var id = "#" + x;
                            var elemID = "#" + x.id;
                            if($(elemID).css('background-color') == 'rgb(50, 205, 50)') {
                                
                                x.style.backgroundColor="green";
                                x.innerHTML = x.innerHTML.replace(/✓/g,'');
                            }
                        
                        
                        else if($(elemID).css("background-color") == 'rgb(0, 128, 0)') {
                            x.style.backgroundColor="limegreen";
                            x.innerHTML="✓"+" "+" "+" "+x.innerHTML;
                        }
                        else  {
                            ;    
                        }
                        
                    }
                    function toGreenTint(x) {
                        var elemID = "#" + x.id;
                        var backStr = $(elemID).css("background-image");
                        var urlImg = backStr.slice(backStr.search("url"),backStr.length);
                       /*
                        $(elemID).css("background-image","linear-gradient(rgba(0, 255, 0, 0.5),rgba(0, 255, 0, 0.5)), "+urlImg);*/
                        x.style.backgroundImage = "linear-gradient(rgba(0, 255, 0, 0.5),rgba(0, 255, 0, 0.5)), "+urlImg;
                        
                        //$(elemID).css("colour","black");
                        /*
                        dummyElement.style.background ="rgba(0,255,0,0.5)";               
                            x.style.background = "linear-gradient(
      rgba(0, 0, 0, 0.5), 
      rgba(0, 0, 0, 0.5)
    ),url(../image/roshen.jpg)";
                    */
                    }
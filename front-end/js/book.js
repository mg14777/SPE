function sendBooking() {
    if(selectedTime.length === 0)
        window.alert("FILL ALL ENTRIES IDIOT");
    var start = selectedTime[0].substr(0,5) + ":00";
    var end = selectedTime[0].substr(8) + ":00";
    var today = new Date();
    var date = today.getFullYear()+"-"+today.getMonth()+"-"+today.getDate();
    var description;
    if($("#non-client").css("background-color") == 'rgb(50, 205, 50)')
        description = "Non-Client";
    else
        description = "Client";
    var booking = {
        "start" : { "dateTime": date +"T"+start } ,
        "attendees" : [
             {
                "email": "ionescu.calin@gmail.com",
                "organizer": true
             },
             {
                "email": "blug@gmail.com",
                 "organizer": false
             },
             {
                "email": "blug1@gmail.com",
                 "organizer": false
             },
             {
                "email": "blug2@gmail.com",
                 "organizer": false
             }
        ],
        "end" : { "dateTime": date +"T"+end },
        "description" : description,
         "summary": "Potato meeting"        
    }
    //window.alert(booking.start.dateTime + "     " + booking.end.dateTime + "    " + booking.description + "    " + booking.attendees[1].email);
	window.alert("Your booking has been made");
	$('#myCarousel').carousel(1);
}
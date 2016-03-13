/**
 * Created by Shike Feng on 07-Dec-15.
 */

/*
       This file is used to store the JSON string received from the backend.
       Some 'decoding' functions to get the needed information for the front-end
       and generate HTML code dynamically.

 */

/*
    The name of the meeting room will be hard-coded.
*/
var currentRoomName = "One";

/*
    Here is an example JSON string
 */
var data = [
        {
            "room_name": "One",
            "meetings": [
                {
                    "organizer": "Robert",
                    "start_time": "0:00",
                    "end_time": "10:00",
                    "meetingType": "Client Meeting"
                },
                {
                    "organizer": "Mudit",
                    "start_time": "12:00",
                    "end_time": "13:30",
                    "meetingType": "Non-Client Meeting"
                },
                {
                    "organizer": "Robert",
                    "start_time": "13:30",
                    "end_time": "23:59",
                    "meetingType": "Client Meeting"
                }
            ]
        },
        {
            "room_name": "Two",
            "meetings": [
                {
                    "organizer": "Robert",
                    "start_time": "11:00",
                    "end_time": "12:00",
                    "meetingType": "Non-Client Meeting"
                },
                {
                    "organizer": "Robert",
                    "start_time": "13:00",
                    "end_time": "13:30",
                    "meetingType": "Client Meeting"
                },
                {
                    "organizer": "Robert",
                    "start_time": "13:30",
                    "end_time": "18:00",
                    "meetingType": "Non-Client Meeting"
                }
            ]

        },
        {
            "room_name": "Three",
            "meetings": [
                {
                    "organizer": "Mudit",
                    "start_time": "10:00",
                    "end_time": "11:00",
                    "meetingType": "Non-Client Meeting"
                },
                {
                    "organizer": "Robert",
                    "start_time": "12:00",
                    "end_time": "13:30",
                    "meetingType": "Client Meeting"
                },
                {
                    "organizer": "Mudit",
                    "start_time": "13:30",
                    "end_time": "15:00",
                    "meetingType": "Non-Client Meeting"
                }
            ]
        },
        {
            "room_name": "Four",
            "meetings": [
                {
                    "organizer": "Robert",
                    "start_time": "10:00",
                    "end_time": "11:00",
                    "meetingType": "Non-Client Meeting"
                },
                {
                    "organizer": "Robert",
                    "start_time": "12:00",
                    "end_time": "13:30",
                    "meetingType": "Non-Client Meeting"
                },
                {
                    "organizer": "Mudit",
                    "start_time": "14:00",
                    "end_time": "15:00",
                    "meetingType": "Non-Client Meeting"
                }
            ]
        }
    ];

function setData(data) {
    this.data = data;
}

function getData() {
    return data;
}

function setCurrentRoom(currentRoomNumber) {
	switch (currentRoomNumber) {
		case 1 :
			currentRoomName = "One";
			break;
		case 2 :
			currentRoomName = "Two";
			break;
		case 3 : 
			currentRoomName = "Three";
			break;
		default :
			currentRoomName = currentRoomNumber;
			break;
			
	}
}
/*
    According to the name of the room, find its index in the received JSON string
 */
function getRoom(roomName) {
    var index = null;
    for (var i = 0; i<data.length; i++){
        if (roomName == data[i].room_name){
            index = i;
            break;
        }
    }
    return index;
}

/*
    Get the necessary information for a specific room
    Take a room's index as the parameter
    Returns an object containing four fields. Namely: availability, organizer, meetingType and the Length of the meeting
 */
function getRoomInformation(roomIndex) {
    var time = new Date();
    var hour = time.getHours();
    var minute = time.getMinutes();
    var second = time.getSeconds();
    var now = hour*60*60 + minute*60 + second;
    var start = null;
    var startTime = [];
    var end = null;
    var endTime = [];
    var info = [];
    info.availability = "True";
    for (var i = 0; i < data[roomIndex].meetings.length; i++){
        startTime = data[roomIndex].meetings[i].start_time.split(":");
        endTime = data[roomIndex].meetings[i].end_time.split(":");
        start = startTime[0]*60*60 + startTime[1]*60;
        end = endTime[0]*60*60 + endTime[1]*60;
        if (now < end && now > start){
            info.availability = "False";
            info.organizer = data[roomIndex].meetings[i].organizer;
            info.meetingType = data[roomIndex].meetings[i].meetingType;
            info.meetingLength = end - now;
            break;
        }
    }
    return info;
}

/*
    Get the information for the current meeting room
 */
function getCurrentRoomInfo() {
    var roomIndex = getRoom(currentRoomName);
    return getRoomInformation(roomIndex);
}

/*
    Generate the schedule table for a room dynamically
    Take a room's information JSON string as a parameter
    Returns a string of HTML code.
 */
function generateScheduleTable(room) {
    var meetings = room.meetings;
    var tableHeader = "<table><th>Time</th><th>Meeting Type</th><th>Organizer</th>";
    var tableEnd = "</table>";
    var row;

    var html = tableHeader;
    for (var i = 0; i< meetings.length; i++){
        row = "<tr>";
        row += "<td>"+meetings[i].start_time + " ~ " + meetings[i].end_time+"</td>";
        row +="<td>"+meetings[i].meetingType + "</td>";
        row +="<td>"+meetings[i].organizer + "</td>";
        html+=row;
    }
    html += tableEnd;
    return html;
}

/*
    Generate the full schedule for all rooms.
    Returns a string of HTML codes for the collapse on the first page of the carousel
 */
function displayAllRoomSchedule() {
    var data = getData();
    var header1 = '<div class=\"panel panel-default\"><div class=\"panel-heading customise\" data-toggle="collapse" data-parent="#accordion"';
    var header2 = '<h4 class="panel-title">';
    var room;
    var html = "";
    for (var a = 0; a< data.length; a++ ){
        room = data[a];
        html += header1;
        html += 'data-target = "#collapse'+room.room_name;
        html += '" id="title_'+room.room_name + '">';
        html += header2;
        html += '<a href=\"#collapse' + room.room_name + '\">Room '+room.room_name+'</a></h4></div>';
        html += '<div id="collapse' + room.room_name +'" class="panel-collapse collapse">';
        html += generateScheduleTable(room);
        html += '</div>';
    }
        html += '<div class="pointer-container-left"><div class="pointer"><span class="arrowLeft"></span><span class="leftIndicator">Book Room</span></div></div>';
        html += '<div class="pointer-container-right"><div class="pointer"><span class="rightIndicator">Back</span><span class="arrowRight"></span></div></div>';
    return html;
}

/*
    Generate the code for the main page dynamically
 */
function mainPageInfo() {
    var roomIndex = getRoom(currentRoomName);
    var roomInfo = getRoomInformation(roomIndex);
    var html = '<div id="Room">';
    var htmlEnd = '</div>';
    html += '<div class="meeting">';
    if (roomInfo.availability == "False"){
        html += '<div id="state_occupied">BOOKED</div>';
        html += '<div id="type">'+roomInfo.meetingType+'</div>';
        html += '<div id="person">Organizer : '+roomInfo.organizer+'</div>';
        html += '<div id="clock"></div>';
        $("#content").css("background-color", "firebrick")
    } else {
        html += '<div id="state_available">AVAILABLE</div>';
        $("#content").css("background-color", "#42F605");
    }
        html += htmlEnd;
        html += '<button class="btn btn-primary" id="bookNowButton">Book Now</button>';
        html += '<div class="pointer-container-left"><div class="pointer"><span class="arrowLeft"></span><span class="leftIndicator">See Schedule</span></div></div>';
        html += '<div class="pointer-container-right"><div class="pointer"><span class="rightIndicator">Book Room</span><span class="arrowRight"></span></div></div>';
    return html;
}

/*
    This function will be called every time the front end receives information from the backend,
    render the interface
 */
function generateInfo() {
    var mainPage = mainPageInfo(data);
    var schedule = displayAllRoomSchedule();
    var currentRoom = '#collapse'+currentRoomName;
    var currentRoomInfo = getCurrentRoomInfo();
    $('#content').html(mainPage);
    $('#accordion').html(schedule);
    $(currentRoom).collapse('show');
    if (currentRoomInfo.availability === "True") {
        $('#Room').removeClass("occupied").addClass("available");
    } else {
        $('#Room').removeClass("available").addClass("occupied");
        var clock = $("#clock").FlipClock({
            clockFace: 'HourlyCounter',
            autoStart: false,
            callbacks: {
                stop: function() {
                    location.reload();
                }
            }
        });
        clock.setTime(parseInt(currentRoomInfo.meetingLength));
        clock.setCountdown(true);
        clock.start();
    }

    for (var i = 0; i < data.length; i++) {
        var roomInfo = getRoomInformation(i);
        var roomName = data[i].room_name;
        var titleName = '#title_'+ roomName;
        if (roomInfo.availability == "False") {
            $(titleName).removeClass("available").addClass("occupied");
        } else {
            $(titleName).removeClass("occupied").addClass("available");
        }
    }
}
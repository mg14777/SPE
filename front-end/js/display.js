/**
 * Created by Shike Feng on 07-Dec-15.
 */


    /*
    This is just an example JSON string
     */
var currentRoomName = "One";
var data = [
        {
            "room_name": "One",
            "meetings": [
                {
                    "organizer": "Robert",
                    "start_time": "10:00",
                    "end_time": "12:00",
                    "meeting_level": "First"
                },
                {
                    "organizer": "Mudit",
                    "start_time": "12:00",
                    "end_time": "12:30",
                    "meeting_level": "First"
                },
                {
                    "organizer": "Robert",
                    "start_time": "14:30",
                    "end_time": "18:00",
                    "meeting_level": "Second"
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
                    "meeting_level": "Second"
                },
                {
                    "organizer": "Robert",
                    "start_time": "13:00",
                    "end_time": "13:30",
                    "meeting_level": "First"
                },
                {
                    "organizer": "Robert",
                    "start_time": "15:30",
                    "end_time": "18:00",
                    "meeting_level": "Second"
                }
            ]

        },
        {
            "room_name": "Three",
            "meetings":[
                {
                    "organizer": "Mudit",
                    "start_time": "10:00",
                    "end_time": "11:00",
                    "meeting_level": "Second"
                },
                {
                    "organizer": "Robert",
                    "start_time": "12:00",
                    "end_time": "13:30",
                    "meeting_level": "First"
                },
                {
                    "organizer": "Mudit",
                    "start_time": "14:00",
                    "end_time": "15:00",
                    "meeting_level": "Second"
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
                    "meeting_level": "Second"
                },
                {
                    "organizer": "Robert",
                    "start_time": "12:00",
                    "end_time": "13:30",
                    "meeting_level": "First"
                },
                {
                    "organizer": "Mudit",
                    "start_time": "14:00",
                    "end_time": "15:00",
                    "meeting_level": "Second"
                }
            ]
        }
    ];

/*
 This function is used to get the availability state for the current room
 */
function setData(data){
    this.data = data
}
function getRoom(roomName){
    var index = null;
    for (var i = 0; i<data.length; i++){
        if (roomName == data[i].room_name){
            index = i;
            break;
        }
    }
    return index;
}

function getRoomInformation(roomIndex){
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
    info[0] = "True";
    for (var i = 0; i < data[roomIndex].meetings.length; i++){
        startTime = data[roomIndex].meetings[i].start_time.split(":");
        endTime = data[roomIndex].meetings[i].end_time.split(":");
        start = startTime[0]*60*60 + startTime[1]*60;
        end = endTime[0]*60*60 + endTime[1]*60;
        if (now < end && now > start){
            info[0] = "False";
            info[1] = data[roomIndex].meetings[i].organizer;
            info[2] = data[roomIndex].meetings[i].meeting_level;
            info[3] = end - now;
            break;
        }
    }
    return info;
}

function getCurrentRoomInfo(){
    var roomIndex = getRoom(currentRoomName);
    return getRoomInformation(roomIndex);
}

// Display the schedule table
function generateScheduleTable(room) {
    var meetings = room.meetings;
    var tableHeader = "<table><th>Time</th><th>Level</th><th>Organizer</th>";
    var tableEnd = "</table>";
    var row;

    var html = tableHeader;
    for (var i = 0; i< meetings.length; i++){
        row = "<tr>";
        row += "<td>"+meetings[i].start_time + " ~ " + meetings[i].end_time+"</td>";
        row +="<td>"+meetings[i].meeting_level + "</td>";
        row +="<td>"+meetings[i].organizer + "</td>";
        html+=row;
    }
    html += tableEnd;
    return html;
}

function displayAllRoomSchedule(data){
    var header1 = '<div class=\"panel panel-default\"><div class=\"panel-heading customise\" data-toggle="collapse" data-parent="#accordion"';
    var header2 = ' class="panel-title"';
    var room;
    var html = "";
    for (var a = 0; a< data.length; a++ ){
        room = data[a];
        html += header1;
        html += 'data-target = "#collapse'+room.room_name;
        html += '" id="title_'+room.room_name;
        html += '">';
        html += '<h4 ';
        html += header2;
        html += '> <a href="#collapse'+room.room_name+'">Room '+room.room_name+'</a><div class="bookButton"><a href="#third" class="btn btn-primary" >BOOK</a></div></h4></div>';
        html += '<div id="collapse'+room.room_name+'" class="panel-collapse collapse">';

        html += generateScheduleTable(room);
        html += '</div>';
    }
    return html;
}

function mainPageInfo(){
    var roomIndex = getRoom(currentRoomName);
    var roomInfo = getRoomInformation(roomIndex);
    var html = '<div id="Room">';
    var htmlEnd = '</div>';
    html += 'ROOM '+currentRoomName;
    html += '<div class="meeting">';
    if (roomInfo[0] == "False"){
        html += '<div id="state">BOOKED</div>';
        html += '<div id="level">Level : '+roomInfo[2]+'</div>';
        html += '<div id="person">Organizer : '+roomInfo[1]+'</div>';
        html += '<div id="clock" style="margin:2em;"></div>';
    } else {
        html += '<div id="state">AVAILABLE</div>';
        html += '<div id="clock" style="margin:3em;"></div>';
    }
        html += htmlEnd;
        html += '<button type="button" class="btn btn-primary" onclick="window.location.href=\'#third\'">Book Now</button>';
        html += htmlEnd;
    return html;
}

function generateInfo(){
    var mainPage = mainPageInfo(data);
    var schedule = displayAllRoomSchedule(data);
    var currentRoom = '#collapse'+currentRoomName;
    var currentRoomInfo = getCurrentRoomInfo();
    var currentRoomAvailability = currentRoomInfo[0];
    $('#content').html(mainPage);
    $('#accordion').html(schedule);
    $(currentRoom).collapse('show');
    if (currentRoomAvailability == "True") {
        $('#Room').removeClass("occupied").addClass("available");
        var clock = $("#clock").FlipClock({
            clockFace : 'TwentyFourHourClock'
        });
    } else {
        $('#Room').removeClass("available").addClass("occupied");
        clock = $("#clock").FlipClock({
            clockFace: 'HourlyCounter',
            autoStart: false,
            callbacks: {
                stop: function() {
                    location.reload();
                }
            }
        });
        clock.setTime(parseInt(currentRoomInfo[3]));
        clock.setCountdown(true);
        clock.start();
    }
    for (var i = 0; i < data.length; i++){
        var roomInfo = getRoomInformation(i);
        var roomName = data[i].room_name;
        var titleName = '#title_'+ roomName;
        if (roomInfo[0] == "False"){
            $(titleName).removeClass("available").addClass("occupied");
        } else {
            $(titleName).removeClass("occupied").addClass("available");
        }
    }
}

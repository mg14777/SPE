/**
 * Created by Shike Feng on 07-Dec-15.
 */


    /*
    This is just an example JSON string
     */
var currentRoomName = "One";
var data = {
    room_info: [
        {
            room_name: "One",
            meetings: [
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
            room_name: "Two",
            meetings: [
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
                    "start_time": "13:30",
                    "end_time": "15:00",
                    "meeting_level": "Second"
                }
            ]

        },

        {
            room_name: "Three",
            meetings: [
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
            room_name: "Four",
            meetings: [
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
    ]
};

/*
 This function is used to get the availability state for the current room
 */
function getRoom(roomName){
    var info = data.room_info;
    var index = null;
    for (var i = 0; i<info.length; i++){
        if (roomName == info[i].room_name){
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
    for (var i = 0; i < data.room_info[roomIndex].meetings.length; i++){
        startTime = data.room_info[roomIndex].meetings[i].start_time.split(":");
        endTime = data.room_info[roomIndex].meetings[i].end_time.split(":");
        start = startTime[0]*60*60 + startTime[1]*60;
        end = endTime[0]*60*60 + endTime[1]*60;
        if (now < end && now > start){
            info[0] = "False";
            info[1] = data.room_info[roomIndex].meetings[i].organizer;
            info[2] = data.room_info[roomIndex].meetings[i].meeting_level;
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
function displaySchedule(room) {
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

function displayLeft(data){
    var header1 = '<div class=\"panel panel-default\"><div class=\"panel-heading customise\"';
    var header2 = ' class="panel-title"><a data-toggle="collapse" data-parent="#accordion" ';
    var room;
    var html = "";
    for (var a = 0; a< data.length; a++ ){
        room = data[a];
        html += header1;
        html += ' id="title_'+room.room_name;
        html += '"><h4 ';
        html += header2;
        html += 'href="#collapse'+room.room_name+'">Room '+room.room_name+'</a><div id="next' + room.room_name+ '" class="nextAvailable"></div></h4></div>';
        html += '<div id="collapse'+room.room_name+'" class="panel-collapse collapse">';

        html += displaySchedule(room);
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

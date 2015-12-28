/**
 * Created by Shike Feng on 07-Dec-15.
 */
var data = {
    currentRoom: "One",
    room_info: [
        {
            room_number: "One",
            meetings: [
                {
                    "organizer": "Robert",
                    "start_time": "10:00",
                    "end_time": "12:00",
                    "meeting_level": "First"
                },
                {
                    "organizer": "Mudit",
                    "start_time": "13:00",
                    "end_time": "13:30",
                    "meeting_level": "First"
                },
                {
                    "organizer": "Robert",
                    "start_time": "14:00",
                    "end_time": "16:00",
                    "meeting_level": "Second"
                }
            ],
            availability: false,
            currentMeetingOrganiser: "Robert",
            currentMeetingLevel: "First",
            nextAvailable: 40
        },
        {
            room_number: "Two",
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
                    "organizer": "Robert",
                    "start_time": "14:00",
                    "end_time": "15:00",
                    "meeting_level": "Second"
                }
            ],
            availability: false,
            currentMeetingOrganiser: "Mudit",
            currentMeetingLevel: "First",
            nextAvailable: 20
        },
        {
            room_number: "Three",
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
            ],
            availability: true
        },
        {
            room_number: "Four",
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
            ],
            availability: true
        }
    ]
}



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
    var header1 = '<div class="panel panel-default"><div class="panel-heading customise"><h4 ';
    var header2 = ' class="panel-title"><a data-toggle="collapse" data-parent="#accordion" ';
    var headerEnd = '</div></div>';
    var room;
    var html = "";
    for (var a = 0; a< data.length; a++ ){
        room = data[a];
        html += header1;
        html += 'id="title_'+room.room_number+'"';
        html += header2;
        html += 'href="#collapse'+room.room_number+'">Room '+room.room_number+'</a><div id="next' + room.room_number+ '" class="nextAvailable"></div></h4>';
        html += ' <div id="collapse'+room.room_number+'" class="panel-collapse collapse">';
        var schedule = displaySchedule(room);
        html += schedule;
        html += headerEnd;
    }
    return html;
}

function mainPageInfo(data){
    var roomInfo;
    for (var i = 0; i < data.room_info.length; i++){
        roomInfo = data.room_info[i];
        if (roomInfo.room_number == data.currentRoom){
            break;
        }
    }
    var html = '<div id="Room" style="float:left">';
    var htmlEnd = '</div></div>';
    html += 'ROOM '+roomInfo.room_number;
    html += '<div class="meeting">';
    if (roomInfo.availability === false){
        html += '<div id="state">BOOKED</div>';
        html += '<div id="level">Level : '+roomInfo.currentMeetingLevel+'</div>';
        html += '<div id="person">Organiser : '+roomInfo.currentMeetingOrganiser+'</div>';
        html += '<div id="finishTime">Available in '+roomInfo.nextAvailable+' Minutes</div>';
    } else {
        html += '<div id="state">AVAILABLE</div>';
    }
        html += '<button type="button" class="btn btn-primary" onclick="window.location.href=\'#third\'">Book Now</button>';
        html += htmlEnd;
    return html;

}

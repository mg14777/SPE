
from django.shortcuts import render
from django.http import HttpResponse
import json

#

#

def index(request, roomNumber):
	#roomNumber = room
    return render(request,'info/index.html', {'roomNumber':roomNumber})

def startOfDayAjax(request, roomNumber):
	meetings = {}
	events = {
    'currentRoom': "One",
    'room_info': [
        {
            'room_name': "One",
            'meetings': [
                {
                    "organizer": "RandomName",
                    "start_time": "10:00",
                    "end_time": "12:00",
                    "meeting_level": "First"
                },
                {
                    "organizer": "Elsa",
                    "start_time": "13:00",
                    "end_time": "13:30",
                    "meeting_level": "First"
                },
                {
                    "organizer": "Robert",
                    "start_time": "16:00",
                    "end_time": "21:00",
                    "meeting_level": "Second"
                }
            ]

        },
        {
            'room_name': "Two",
            'meetings': [
                {
                    "organizer": "Hagee",
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
            ]

        },

        {
            'room_name': "Three",
            'meetings': [
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
            'room_name': "Four",
            'meetings': [
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
}
	return HttpResponse(json.dumps(events), content_type='application/json')

def updateEvent(request, roomNumber):
	#Wait for update from google calendar and then send it;
	event[0] = 'Whatever'
	return HttpResponse(json.dumps(event), content_type='application/json')

#
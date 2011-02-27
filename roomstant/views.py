from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.template import RequestContext

from piston.handler import typemapper

from emitters import JSONEmitter, JSONEncoderForHTML
from handlers import HotelHandler, RoomHandler, AvailableRoomHandler

def index(request, *args, **kwargs):

    handler= AvailableRoomHandler()
    result = handler.read(request, *args, **kwargs)
    srl = JSONEmitter(result, typemapper, handler, handler.fields, not request.user.is_authenticated())

    return render_to_response(
        'roomstant/index.html', {
        'rooms':srl.render(request, encoder=JSONEncoderForHTML),
        }, RequestContext(request)
    )

def detail(request, room_id):
    return render_to_response(
        'roomstant/detail.html', RequestContext(request)
    )
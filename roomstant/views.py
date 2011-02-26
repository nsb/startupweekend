from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.template import RequestContext

from piston.handler import typemapper

from emitters import JSONEmitter, JSONEncoderForHTML
from handlers import HotelHandler, RoomHandler

def index(request, *args, **kwargs):

    # Cheat a little and bootstrap events to avoid an initial API request
    handler= RoomHandler()
    result = handler.read(request, *args, **kwargs)
    srl = JSONEmitter(result, typemapper, handler, handler.fields, not request.user.is_authenticated())

    return render_to_response(
        'roomstant/index.html', {
        'rooms':srl.render(request, encoder=JSONEncoderForHTML),
        }, RequestContext(request)
    )

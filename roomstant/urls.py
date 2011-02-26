from django.conf.urls.defaults import *

from django.views.decorators.csrf import csrf_exempt

from piston.resource import Resource
from piston.emitters import Emitter
from piston.authentication import OAuthAuthentication, HttpBasicAuthentication

from roomstant.handlers import HotelHandler, RoomHandler

urlpatterns = patterns('roomstant.views',

    (r'^$', 'index', {}, 'index',),
)

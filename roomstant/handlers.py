# -*- coding: utf-8 -*-

from piston.handler import BaseHandler, AnonymousBaseHandler
from piston.utils import validate, rc, FormValidationError

from models import Hotel, Room

class HotelHandler(BaseHandler):
    model = Hotel
    fields = ()

class RoomHandler(BaseHandler):
    model = Room
    fields = ()

# -*- coding: utf-8 -*-

from piston.handler import BaseHandler, AnonymousBaseHandler
from piston.utils import validate, rc, FormValidationError

from models import Hotel, Room, AvailableRoom

class HotelHandler(BaseHandler):
    model = Hotel

class RoomHandler(BaseHandler):
    model = Room

class AvailableRoomHandler(BaseHandler):
    model = AvailableRoom
    fields = [
        'price',
        ('room', ('number', 'hotel')),
    ]
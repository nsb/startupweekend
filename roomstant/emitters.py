# -*- coding: utf-8 -*-
import datetime

import simplejson # Djangos version of simplejson does not yet have JSONEncoderForHTML
from django.utils import datetime_safe
from django.template import defaultfilters

from piston.emitters import Emitter

class JSONEncoder(simplejson.JSONEncoder):
    """
    JSONEncoder subclass that knows how to encode date/time and decimal types.
    """

    def default(self, o):
       if isinstance(o, datetime.datetime):
           d = datetime_safe.new_datetime(o)
           return defaultfilters.date(d, "SHORT_DATE_FORMAT")
       elif isinstance(o, datetime.date):
           d = datetime_safe.new_date(o)
           return defaultfilters.date(d, "SHORT_DATE_FORMAT")
       elif isinstance(o, datetime.time):
           return defaultfilters.time(o, "H:i")
       elif isinstance(o, decimal.Decimal):
         return str(o)
       else:
           return super(JSONEncoder, self).default(o)

class JSONEncoderForHTML(JSONEncoder, simplejson.encoder.JSONEncoderForHTML):
    pass

class JSONEmitter(Emitter):
    """
    JSON emitter, understands timestamps.
    """
    def render(self, request, encoder=JSONEncoder):
        cb = request.GET.get('callback')
        seria = simplejson.dumps(self.construct(), cls=encoder, ensure_ascii=False, indent=4)

        # Callback
        if cb:
            return '%s(%s)' % (cb, seria)

        return seria
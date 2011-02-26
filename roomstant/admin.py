from django.contrib import admin

from models import Hotel, Room, AvailableRoom, Booking

admin.site.register(Hotel)
admin.site.register(Room)
admin.site.register(AvailableRoom)
admin.site.register(Booking)

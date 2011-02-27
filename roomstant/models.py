from django.db import models

class Hotel(models.Model):
    name = models.CharField(max_length=512)
    stars = models.PositiveIntegerField()
    lat = models.DecimalField(max_digits=10, decimal_places=7)
    lon = models.DecimalField(max_digits=10, decimal_places=7)
    description = models.TextField()

    def __unicode__(self):
        return self.name

class Room(models.Model):
    hotel = models.ForeignKey(Hotel, related_name='rooms')
    name = models.CharField(max_length=256)
    image = models.ImageField(upload_to='rooms', null=True, blank=True)
    description = models.TextField()

    def __unicode__(self):
        return '%s: %s' % (self.hotel, self.number)

class AvailableRoom(models.Model):
    room = models.ForeignKey(Room, related_name='available')
    price = models.DecimalField(max_digits=7, decimal_places=2)
    date = models.DateTimeField(blank=True, null=True)

    def __unicode__(self):
        return self.room.name

class Booking(models.Model):
    name = models.CharField(max_length=512)

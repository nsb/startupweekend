from django.db import models

class Hotel(models.Model):
    name = models.CharField(max_length=512)
    email = models.EmailField()
    stars = models.PositiveIntegerField()

class Room(models.Model):
    image = models.ImageField(upload_to='rooms')

class AvailableRoom(models.Model):
    room = models.ForeignKey(Room, related_name='available')
    price = models.DecimalField(max_digits=7, decimal_places=2)
    date = models.DateTimeField()

class booking(models.Model):
    name = models.CharField(max_length=512)

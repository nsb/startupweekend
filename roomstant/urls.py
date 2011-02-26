from django.conf.urls.defaults import *

urlpatterns = patterns('roomstant.views',

    (r'^$', 'index', {}, 'index',),
)

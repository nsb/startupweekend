from django.http import HttpResponse
from django.shortcuts import render_to_response

def index(request):
    return render_to_response('roomstant/index.html')
    #return HttpResponse('<div>Hejsa</div><input name="range" type="range" min="0" max="100" step="5" value="15" style="-webkit-appearance: slider-vertical; height: 50px"/> Davs')

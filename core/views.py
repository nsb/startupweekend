from django.http import HttpResponse

def index(request):
    return HttpResponse('<input name="range" type="range" min="0" max="100" step="5" value="15" style="-webkit-appearance: slider-vertical; height: 50px"/>')

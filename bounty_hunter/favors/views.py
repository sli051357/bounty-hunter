from django.shortcuts import render
from django.http import HttpResponse
from .models import Favor, Tag

# Create your views here.
# favor list view
def favor_list(request):
    # TODO: create different lists for different filters of favor list 
    all_favors = Favor.objects.all()
    # completed_favors
    # incomplete_favors
    # etc
    return render(request, 'favors/favor_list.html', {"favors": all_favors})
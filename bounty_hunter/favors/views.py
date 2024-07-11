from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse
from .models import Favor, Tag

# Create your views here.
# view a list of all favors, ordered by date of creation
def favor_list(request): 
    all_favors = Favor.objects.order_by("-created_at")
    return render(request, 'favors/favor_list.html', {"favors": all_favors})

# TODO: create different lists for different filters of favor list 
# complete_favors, incomplete_favors, favors by name, etc

# view a specific favor
def favor_detail(request, favor_name):
    favor = get_object_or_404(Favor.objects.all(), name=favor_name)
    return render(request, 'favors/favor_detail.html', {"favor": favor})

# view a list of all tags, with preset tags listed before custom tags
def tag_list(request):
    all_tags = Tag.objects.order_by("-tag_type")
    return render(request, 'favors/tag_list.html', {"tags": all_tags})

# view a specific tag
def tag_detail(request, tag_name):
    tag = get_object_or_404(Tag.objects.all(), name=tag_name)
    return render(request, 'favors/tag_detail.html', {"tag": tag})

# TODO: create different lists for different types of tags

# need a way to create a favor
from django.shortcuts import render, get_object_or_404, get_list_or_404, redirect
from django.http import HttpResponse
from .models import Favor, Tag

# Create your views here.
# view a list of all favors, ordered by date of creation
def favor_list(request): 
    all_favors = Favor.objects.order_by("-created_at")
    return render(request, 'favors/favor_list.html', {"favors": all_favors})

# TODO: create different lists for different filters of favor list 
# complete_favors, incomplete_favors, favors by name, etc

# view a specific favor based on id
def favor_detail(request, favor_id):
    favor = get_object_or_404(Favor, pk=favor_id)
    tags = Tag.objects.filter(favors=favor)
    return render(request, 'favors/favor_detail.html', {"favor": favor, "tags": tags})

# view a list of all tags, with preset tags listed before custom tags
def tag_list(request):
    all_tags = Tag.objects.order_by("-tag_type")
    return render(request, 'favors/tag_list.html', {"tags": all_tags})

def tag_detail(request, tag_id):
    tag = get_object_or_404(Tag, pk=tag_id)
    favors = tag.favors.all()
    return render(request, 'favors/tag_detail.html', {"tag": tag, "favors": favors})

# TODO: create different lists for different types of tags

# view a specific favor
#def favor_detail(request, favor_name):
    #favor = get_object_or_404(Favor, name=favor_name)
    #return render(request, 'favors/favor_detail.html', {"favor": favor})

# view a specific tag
#def tag_detail(request, tag_name):
    #tag = get_object_or_404(Tag, name=tag_name)
    #return render(request, 'favors/tag_detail.html', {"tag": tag})
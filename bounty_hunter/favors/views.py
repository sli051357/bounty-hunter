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
def favor_id_detail(request, favor_id):
    favor = get_object_or_404(Favor, pk=favor_id)
    return render(request, 'favors/favor_detail.html', {"favor": favor})

# view a list of all tags, with preset tags listed before custom tags
def tag_list(request):
    all_tags = Tag.objects.order_by("-tag_type")
    return render(request, 'favors/tag_list.html', {"tags": all_tags})

def tag_id_detail(request, tag_id):
    tag = get_object_or_404(Tag, pk=tag_id)
    return render(request, 'favors/tag_detail.html', {"tag": tag})

# TODO: create different lists for different types of tags

# create a new favor
def create_favor(request):
    if request.method == 'POST':
        favor_name = request.POST.get('favor_name')
        favor_description = request.POST.get('favor_description')
        favor_assignee = request.POST.get('assignee_id')
        
        if favor_name and favor_description and favor_assignee:
            Favor.objects.create(name=favor_name, description=favor_description, assignee=favor_assignee)
            return redirect('favor_list')
            # return render(request, 'favors/create_favor.html') # add context
        else:
            # Handle the error case if needed
            # return render(request, 'favor_list.html', {'error': 'All fields are required.'})
            return render(request, 'favors/create_favor.html', {'error': 'All fields are required.'}) # add context
    # return redirect('favor_list')
    # TODO: once a favor is created, display favor list page
    return render(request, 'favors/create_favor.html') # add context

# view a specific favor
#def favor_detail(request, favor_name):
    #favor = get_object_or_404(Favor, name=favor_name)
    #return render(request, 'favors/favor_detail.html', {"favor": favor})

# view a specific tag
#def tag_detail(request, tag_name):
    #tag = get_object_or_404(Tag, name=tag_name)
    #return render(request, 'favors/tag_detail.html', {"tag": tag})
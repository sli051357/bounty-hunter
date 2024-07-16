from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from .models import Favor, Tag
from django.http import JsonResponse
from .forms import FavorForm, TagForm

# Create your views here.
# view a list of all favors, ordered by date of creation
def favor_list(request): 
    all_favors = Favor.objects.order_by("-created_at")
    favors_list = list(all_favors.values())
    # return render(request, 'favors/favor_list.html', {"favors": all_favors})
    return JsonResponse({"favors": favors_list})

# view a specific favor based on id
def favor_detail(request, favor_id):
    favor = get_object_or_404(Favor, pk=favor_id)
    tags = list(favor.tags.all())
    favor_data = {"id": favor.id, "name": favor.name, "description": favor.description, "owner": favor.owner,
                  "assignee": favor.assignee, "created_at": favor.created_at, "updated_at": favor.updated_at, 
                  "total_owed_type": favor.total_owed_type, "totwal_owed_amt": favor.total_owed_amt,
                  "privacy": favor.privacy, "status": favor.status, "tags": tags,}
    # return render(request, 'favors/favor_detail.html', {"favor": favor, "tags": tags})
    return JsonResponse(favor_data)

# view a list of all tags, with preset tags listed before custom tags
def tag_list(request):
    all_tags = Tag.objects.order_by("-tag_type")
    return render(request, 'favors/tag_list.html', {"tags": all_tags})

def tag_detail(request, tag_id):
    tag = get_object_or_404(Tag, pk=tag_id)
    favors = Favor.objects.filter(tags=tag)
    return render(request, 'favors/tag_detail.html', {"tag": tag, "favors": favors})

# TODO: create different lists for different filters of favor list 
# complete_favors, incomplete_favors, favors by name, etc
# TODO: create different lists for different types of tags

# create a new favor
# @login_required
def create_favor(request):
    if request.method =="POST":
        form = FavorForm(request.POST)
        if form.is_valid():
            favor = form.save(commit=False)
            favor.owner = request.user
            # favor.status = "Pending creation"
            favor.save()
            return redirect('favor_list')
    else:
        form = FavorForm()
    return render(request, 'favors/create_favor.html', {'form': form})

# edit a favor 
# @login_required
def edit_favor(request, favor_id):
    favor = get_object_or_404(Favor, pk=favor_id)
    if request.method == "POST":
        form = FavorForm(request.POST, instance=favor)
        if form.is_valid():
            # form.status = "Pending edits"
            form.save()
            return redirect('favor_list')
    else:
        form = FavorForm(instance=favor)
    return render(request, 'favors/edit_favor.html', {"form": form})

# create a new tag
# @login_required
def create_tag(request):
    if request.method == "POST":
        form = TagForm(request.POST)
        if form.is_valid():
            tag = form.save(commit=False)
            tag.owner = request.user
            # tag.owner = request.user
            tag.tag_type = "Custom"
            tag.save()
            return redirect('tag_list')
    else:
        form = TagForm()
    return render(request, 'favors/create_tag.html', {'form': form})

# edit a tag 
# @login_required
def edit_tag(request, tag_id):
    tag = get_object_or_404(Tag, pk=tag_id)
    if request.method == "POST":
        form = TagForm(request.POST, instance=tag)
        if form.is_valid():
            form.save()
            return redirect('tag_list')
    else:
        form = TagForm(instance=tag)
    return render(request, 'favors/edit_tag.html', {"form": form})





# --------------------------------------------------------------------

# view a specific favor
#def favor_detail(request, favor_name):
    #favor = get_object_or_404(Favor, name=favor_name)
    #return render(request, 'favors/favor_detail.html', {"favor": favor})

# view a specific tag
#def tag_detail(request, tag_name):
    #tag = get_object_or_404(Tag, name=tag_name)
    #return render(request, 'favors/tag_detail.html', {"tag": tag})
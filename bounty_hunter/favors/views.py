from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from .models import Favor, Tag
from django.http import JsonResponse
from .forms import FavorForm, TagForm
from django.db.models import Q
import datetime
import types


CREATE = "Create"
DELETE = "Delete"
COMPLETE = "Complete"
INCOMPLETE = "Incomplete"
EDIT = "Edit"
CANCEL = "Cancel" 
NONE = "None"



# Ceate your views here.
# view a list of all favors 
def favor_list(request): # ex: favors/

    # AND/OR functionality - default query uses AND
    # for now, each category can only take 1 parameter
    and_or = request.GET.get('query')
    or_query = False
    query = Q()
    if and_or == 'or':
        or_query = True

    def query_method(q, query_bool, field, user_input):
        if query_bool == True:
            q |= Q(**{field: user_input})
        if query_bool == False:
            q &= Q(**{field: user_input})
        return q

    # FILTER
    # filter by owner id
    owner_id = request.GET.get('owner')
    if owner_id:
        query = query_method(query, or_query, 'owner__id', owner_id)

    # filter by assignee id
    assignee_id = request.GET.get('assignee')
    if assignee_id:
        query = query_method(query, or_query, 'assignee__id', assignee_id)

    # filter by tag id
    tag_id = request.GET.get('tag')
    if tag_id:
        query = query_method(query, or_query, 'tags__id', tag_id)

    # filter by status (use the string constants)
    status = request.GET.get('status') 

    favors = Favor.objects.filter(query).distinct()

    # SORT - default sorts from lowest id to highest
    sort_method = request.GET.get('sort_by')
    sort_order = request.GET.get('order')

    # sort by name (in alphabetical order)
    if sort_method == 'name':
        if sort_order == 'descending':
            favors = favors.order_by('-name')
        # if order is ascending or none is specified, sort in ascending order
        else:
            favors = favors.order_by('name')
        
    # sort by date
    if sort_method == 'date':
        if sort_order == 'descending':
            favors = favors.order_by('-created_at')
        else:
            favors = favors.order_by('created_at')

    # sort by amount of money
    if sort_method == 'amount':
        if sort_order == 'descending':
            favors = favors.order_by('-total_owed_amt')
        else: 
            favors = favors.order_by('total_owed_amt')

    # search favors by name
    search = request.GET.get('search')
    if search:
        favors = favors.filter(name__icontains=search)

    # display favors and corresponding tags
    favors_list = []
    for f in favors:
        tags = list(f.tags.all().values())
        f_data = {"name": f.name, 
                  "id": f.id, 
                  "description": f.description, 
                  "owner": f.owner.username,
                  "assignee": f.assignee.username,
                  "created_at": f.created_at,
                  "updated_at": f.updated_at,
                  "total_owed_type": f.total_owed_type,
                  "total_owed_amt": f.total_owed_amt,
                  "privacy": f.privacy,
                  "owner_status": f.owner_status,
                  "assignee_status": f.assignee_status,
                  "is_active": f.active, #only show active in frontend
                  "is_completed": f.completed,
                  "tags": tags,}
        favors_list.append(f_data)


    return JsonResponse({"favors": favors_list})

# view a specific favor based on id
def favor_detail(request, favor_id):
    favor = get_object_or_404(Favor, pk=favor_id)
    tags = list(favor.tags.all().values())
    favor_data = {"name": favor.name, 
                  "id": favor.id, 
                  "description": favor.description, 
                  "owner": {"id": favor.owner.id, "email": favor.owner.email, "username": favor.owner.username}, 
                  "assignee": {"id": favor.assignee.id, "email": favor.assignee.email, "username": favor.assignee.username},
                  #if favor.assignee else None, 
                  "created_at": favor.created_at,
                  "updated_at": favor.updated_at,
                  "total_owed_type": favor.total_owed_type,
                  "total_owed_amt": favor.total_owed_amt,
                  "privacy": favor.privacy,
                  "is_active": favor.active, #only show active in frontend
                  "is_completed": favor.completed,
                  "tags": tags,}
    return JsonResponse(favor_data)

# view a list of all tags, with preset tags listed before custom tags
def tag_list(request):
    tags_list = list(Tag.objects.order_by("-tag_type").values())
    return JsonResponse({"tags": tags_list})

# view a specific tag based on id
def tag_detail(request, tag_id):
    tag = get_object_or_404(Tag, pk=tag_id)
    favors = list(Favor.objects.filter(tags=tag).values())
    tag_data = {"name": tag.name,
                "id": tag.id,
                "color": tag.color,
                "favors": favors}
    return JsonResponse(tag_data)

# create a new favor
# @login_required
def create_favor(request):
    if request.method =="POST":
        form = FavorForm(request.POST)
        if form.is_valid():
            favor = form.save(commit=False)
            favor.owner = request.user
            favor.points_value = 100
            favor.owner_status = CREATE
            favor.assignee_status = NONE
            favor.completed = False
            favor.active = False
            favor.save()
            return JsonResponse({"success": True, "favor_id": favor.id})
        else:
            return JsonResponse({"success": False, "errors": form.errors})
    else: 
        return JsonResponse({"error": "GET method not allowed"}, status=405)

# edit a favor 
# @login_required
def edit_favor(request, favor_id):
    favor = get_object_or_404(Favor, pk=favor_id)
    if request.method == "POST":
        form = FavorForm(request.POST, instance=favor)
        if form.is_valid():
            # form.status = "Pending_edits"
            form.save()
            return JsonResponse({"success": True})
        else:
            return JsonResponse({"success": False, "errors": form.errors})
    else:
        return JsonResponse({"error": "GET method not allowed"}, status=405)

# create a new tag
# @login_required
def create_tag(request):
    if request.method == "POST":
        form = TagForm(request.POST)
        if form.is_valid():
            tag = form.save(commit=False)
            tag.owner = request.user
            # tag.tag_type = "Custom"
            tag.save()
            return JsonResponse({"success": True, "tag_id": tag.id})
        else:
            return JsonResponse({"success": False, "errors": form.errors})
    else:
        return JsonResponse({"error": "GET method not allowed"}, status=405)

# edit a tag 
# @login_required
def edit_tag(request, tag_id):
    tag = get_object_or_404(Tag, pk=tag_id)
    if request.method == "POST":
        form = TagForm(request.POST, instance=tag)
        if form.is_valid():
            form.save()
            return JsonResponse({"success": True})
        else:
            return JsonResponse({"success": False, "errors": form.errors})
    else:
        return JsonResponse({"error": "GET method not allowed"}, status=405)

# change status of a favor. Automatically determines if assignee or owner.
def change_status(request, favor_id):
    status = request.POST["status"]
    favor = get_object_or_404(Favor, pk=favor_id)
    if favor.owner == request.user:
        (favor.owner_status,favor.assignee_status, favor) = help_change_status(favor.owner_status,favor.assignee_status, status, favor)
    else:
        (favor.assignee_status,favor.owner_status, favor) = help_change_status(favor.assignee_status,favor.owner_status, status, favor)

    if favor == None:
        return JsonResponse({"success": False})
    
    favor.save()
    return JsonResponse({"success": True})

#helper function changes status logic
def help_change_status(sender_status, reciever_status, status, favor):
    if sender_status == INCOMPLETE:
        return None #no sending incomplete status
    if reciever_status == NONE: # if assignee's status is default, owner can change to whatever they want, except cancel.
        if (sender_status) == CANCEL:
            return None
        sender_status = status
    else: #other's status is not NONE, it is a request. Now, owner can either cancel or accept:
        if status == CANCEL: #cancel, no change to favor
            sender_status = NONE
            reciever_status = NONE
        elif status == reciever_status: #accept changes
            favor = update_favor_from_status(favor, sender_status)
            sender_status = NONE
            reciever_status = NONE
        else: #not a valid status.
            return (sender_status, reciever_status, None)
        
    return (sender_status, reciever_status, favor)

def update_favor_from_status(favor, status):

    #terrible switch case workaround because python is buttcheeks
    consts = types.SimpleNamespace()
    consts.INCOMPLETE = "Incomplete" #default
    consts.CREATE = "Create" #1
    consts.DELETE = "Delete" #2
    consts.COMPLETE = "Complete" #3
    consts.EDIT = "Edit" #4
    consts.CANCEL = "Cancel"  #5
    consts.NONE = "None" #6


    match status:
        case consts.DELETE:
            favor.active = False 
        case consts.CREATE:
            favor.active = True
            favor.created_at = datetime.date.today()
            favor.updated_at = datetime.date.today()
        case consts.COMPLETE:
            favor.completed = True
        case consts.EDIT:
            favor.updated_at = datetime.date.today()
            favor = update_favor_with_edits(favor)
    
    return favor

def update_favor_with_edits(favor):
    #make the edits to the favor permanent
    return favor



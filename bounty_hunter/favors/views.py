from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from .models import Favor, Tag
from django.http import JsonResponse
from .forms import FavorForm, TagForm
from django.db.models import Q


CREATE = "Create"
DELETE = "Delete"
COMPLETE = "Complete"
EDIT = "Edit"
CANCEL = "Cancel" 
NONE = "None"

PENDING_CREATION = "Pending_creation" #1
PENDING_EDITS = "Pending_edits" #2
PENDING_DELETION = "Pending_deletion" #3
INCOMPLETE = "Incomplete" #4
COMPLETE = "Complete" #5
PENDING_COMPLETION = "Pending_completion"
# Ceate your views here.
# view a list of all favors 
def favor_list(request): # ex: favors/

    update_favors(request.user)

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

    # filter by status
    status = request.GET.get('status')
    if status == "1":
        query = query_method(query, or_query, 'status', "Pending_creation")
    if status == "2":
        query = query_method(query, or_query, 'status', "Pending_edits")
    if status == "3":
        query = query_method(query, or_query, 'status', "Pending_deletion")
    if status == "4":
        query = query_method(query, or_query, 'status', "Incomplete")
    if status == "5":
        query = query_method(query, or_query, 'status', "Complete")

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
                  "status": f.status,
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
                  "status": favor.status,
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
            favor.owner_status = "Create"
            favor.assignee_status = "None"
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
        (favor.owner_status,favor.assignee_status, favor.status) = help_change_status(favor.owner_status,favor.assignee_status, status, favor.status)
    else:
        (favor.assignee_status,favor.owner_status, favor.status) = help_change_status(favor.assignee_status,favor.owner_status, status, favor.status)

    if favor == None:
        return JsonResponse({"success": False})
    
    favor.save()
    return JsonResponse({"success": True})

#helper function changes status logic
def help_change_status(sender_status, reciever_status, status, favor_status):
    if reciever_status == NONE: # if assignee's status is default, owner can change to whatever they want, except cancel.
        if (sender_status) == CANCEL:
            return None
        sender_status = status
        favor_status = match_status(favor_status, sender_status, reciever_status)
    else: #other's status is not NONE, it is a request. Now, owner can either cancel or accept:
        if status == CANCEL: #cancel
            sender_status = NONE
            reciever_status = NONE
            favor_status = match_status(favor_status, sender_status, reciever_status)
        elif status == reciever_status: #accept changes
            sender_status = status
            favor_status = match_status(favor_status, sender_status, reciever_status)
            sender_status = NONE
            reciever_status = NONE
        else: #not a valid status.
            return None
    return (sender_status, reciever_status, favor_status)

    
#helper function given statuses, sets favor status
def match_status(favor_status, sender_status, reciever_status):
    # if both NONE, do nothing.
    if sender_status == NONE and reciever_status == NONE:
        return favor_status 
    
    # Both are not none. So either they are 
    # 1. both the same status and not None, so the status will be moved to the next state.
    # 2. One state is cancel and the other is not NONE(given by other function). reset the status
    # 3. One state is request chagne and the other is default. Therefore, it should be moved to that state.
    match favor_status:
        case PENDING_CREATION:
            if sender_status == reciever_status:
                favor_status = INCOMPLETE
            elif sender_status == CANCEL or reciever_status == CANCEL:
                favor_status = None ##delete the favor. Creation declined
            else: 
                

        case PENDING_EDITS:

        case PENDING_DELETION:
        case INCOMPLETE:
        case COMPLETE:



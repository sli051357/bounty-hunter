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


STATES =[(INCOMPLETE,INCOMPLETE), (CREATE,INCOMPLETE), (DELETE,DELETE), 
         (INCOMPLETE,COMPLETE), (COMPLETE,INCOMPLETE),(COMPLETE,COMPLETE),
         (DELETE,INCOMPLETE),(INCOMPLETE,DELETE),
         (EDIT,INCOMPLETE),(INCOMPLETE,EDIT),(EDIT,EDIT) ]


TRANSITIONS = {(STATES[1],(1,CREATE)): STATES[0],#creation
               (STATES[1],(0,CANCEL)): STATES[2],
               (STATES[1],(1,CANCEL)): STATES[2],

               (STATES[0],(0,DELETE)): STATES[6],#deletion
               (STATES[0],(1,DELETE)):STATES[7],
               (STATES[6],(1,CANCEL)):STATES[0],
               (STATES[7],(1,CANCEL)):STATES[0],
               (STATES[6],(0,CANCEL)):STATES[0],
               (STATES[7],(0,CANCEL)):STATES[0],
               (STATES[7],(0,DELETE)):STATES[2],
               (STATES[6],(1,DELETE)):STATES[2],

               (STATES[0],(0,DELETE)):STATES[4],#completion
               (STATES[0],(1,DELETE)):STATES[3],
               (STATES[4],(1,CANCEL)):STATES[0],
               (STATES[3],(1,CANCEL)):STATES[0],
               (STATES[4],(0,CANCEL)):STATES[0],
               (STATES[3],(0,CANCEL)):STATES[0],
               (STATES[3],(0,DELETE)):STATES[5],
               (STATES[4],(1,DELETE)):STATES[5],

               (STATES[0],(0,EDIT)):STATES[8],#edit
               (STATES[0],(1,EDIT)):STATES[9],
               (STATES[4],(1,CANCEL)):STATES[0],
               (STATES[3],(1,CANCEL)):STATES[0],
               (STATES[4],(0,CANCEL)):STATES[0],
               (STATES[3],(0,CANCEL)):STATES[0],
               (STATES[9],(0,EDIT)):STATES[10],
               (STATES[8],(1,EDIT)):STATES[10],
            
            
                }

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

    # filter by completed
    completed = request.GET.get('completed') 

    #filter by deleted
    deleted = request.GET.get('deleted') 

    # filter by is active
    active = request.GET.get('active')

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
                  "is_active": f.active, 
                  "is_completed": f.active, 
                  "is_deleted": f.deleted, 
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
                  "created_at": favor.created_at,
                  "updated_at": favor.updated_at,
                  "total_owed_type": favor.total_owed_type,
                  "total_owed_amt": favor.total_owed_amt,
                  "privacy": favor.privacy,
                  "owner_status": favor.owner_status,
                  "assignee_status": favor.assignee_status,
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
            favor.assignee_status = INCOMPLETE
            favor.completed = False
            favor.active = False
            favor.save()
            return JsonResponse({"success": True, "favor_id": favor.id})
        else:
            return JsonResponse({"success": False, "errors": form.errors})
    else: 
        return JsonResponse({"error": "GET method not allowed"}, status=405)

# edit a favor 
# when edit favor request is made, a second request to update the statuses must also be made
# @login_required
def edit_favor(request, favor_id):
    # this gets the favor and sets it to inactive
    favor = get_object_or_404(Favor, pk=favor_id)
    favor.active = False
    favor.save()

    # this creates a copy of the favor thath is active and has old favor as prev
    favor.pk = None
    favor.save()
    favor.active = True
    favor.previous_favor = get_object_or_404(Favor, pk=favor_id)

    if request.method == "POST":
        form = FavorForm(request.POST, instance=favor)
        if form.is_valid():
            # i think this saves the edits?
            form.save() 
            return JsonResponse({"success": True, "new_favor_pk": favor.pk})
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

    

# change status of favor users for all statuses. 
def change_status(request, favor_id):
    status = request.POST["status"]
    print("changing status to " + status)
    print("logged on as "+ request.user.username)
    favor = get_object_or_404(Favor, pk=favor_id)
    favor = get_object_or_404(Favor, pk=favor_id)
    curr_state = (favor.owner_status,favor.assignee_status)

    #checks if input is valid
    if (curr_state not in STATES):
        curr_state = STATES[0]
        print("invalid state of favor, resetting.")
        return JsonResponse({"success": False, "errors": "invalid favor state"})

    if favor.owner == request.user:
        print("sender is owner")
        transition = (curr_state,(0,status))
    else:
        print("sender is reciever")
        transition = (curr_state,(1,status))
    if transition not in TRANSITIONS:
        print("invalid transition")
        return JsonResponse({"success": False, "errors": "invalid input"})
    (favor.owner_status,favor.assignee_status) = TRANSITIONS[transition]

    #check if favor has been edited, and cancelled. assumes that the old/new favor has already been created.
    DELETE_OLD = {(STATES[4],(1,CANCEL)):STATES[0],
               (STATES[3],(1,CANCEL)):STATES[0],
               (STATES[4],(0,CANCEL)):STATES[0],
               (STATES[3],(0,CANCEL)):STATES[0]}
    #if edits are cancelled, re-enable old favor and delete current one.
    if transition in DELETE_OLD:
        temp = favor.previous_favor
        temp.active = True
        temp.save()

        favor.delete()
        favor.save()
    
        favor = temp
        
    favor.save()

    apply_transitions(favor)
    
    return JsonResponse({"success": True})

def apply_transitions(favor):
    curr_state = (favor.owner_status,favor.assignee_status)
    #if state has been created but not accepted:
    if curr_state == STATES[1]:
        favor.completed = False
        favor.active = False
        favor.deleted = False

    #if favor is incomplete, or has requested to be completed/deleted:
    elif curr_state in [STATES[0],STATES[3],STATES[4],STATES[6],STATES[7]]:
        favor.completed = False
        favor.active = True
        favor.deleted = False
        favor.previous_favor = None

    
    #favor has been requested to be edited
    elif curr_state in [STATES[8],STATES[9]]:
        favor.completed = False
        favor.active = True
        favor.deleted = False

    #favor has been successfully edited, reset favor to regular
    elif curr_state in [STATES[10]]:
        favor.owner_status = INCOMPLETE
        favor.assignee_status = INCOMPLETE
        favor.previous_favor = None
        favor.completed = False
        favor.active = True
        favor.deleted = False
    
    #if favor is deleted
    elif curr_state in [STATES[2]]:
        favor.completed = False
        favor.active = False
        favor.deleted = True
    #favor must be complete.
    else:
        favor.deleted = False
        favor.complete = True
        favor.active=False
    favor.save()


def show_change_status(request, favor_id):
    return render(request,"favors/test_change_status.html", {"favor_id": favor_id})



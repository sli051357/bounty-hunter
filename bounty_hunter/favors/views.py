from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User, AnonymousUser
from .models import Favor, Tag
from django.http import JsonResponse
from .forms import FavorForm, TagForm
from django.db.models import Q
from django.contrib.auth.models import User
import datetime
import types
from decimal import Decimal
from django.utils.dateparse import parse_date

from rest_framework.decorators import authentication_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
import json

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

               (STATES[0],(0,COMPLETE)):STATES[4],#completion
               (STATES[0],(1,COMPLETE)):STATES[3],
               (STATES[4],(1,CANCEL)):STATES[0],
               (STATES[3],(1,CANCEL)):STATES[0],
               (STATES[4],(0,CANCEL)):STATES[0],
               (STATES[3],(0,CANCEL)):STATES[0],
               (STATES[3],(0,DELETE)):STATES[5],
               (STATES[4],(1,DELETE)):STATES[5],

               (STATES[0],(0,EDIT)):STATES[8],#edit
               (STATES[0],(1,EDIT)):STATES[9],
               (STATES[8],(1,CANCEL)):STATES[0],
               (STATES[9],(1,CANCEL)):STATES[0],
               (STATES[8],(0,CANCEL)):STATES[0],
               (STATES[9],(0,CANCEL)):STATES[0],
               (STATES[9],(0,EDIT)):STATES[10],
               (STATES[8],(1,EDIT)):STATES[10],
            
            
                }

MONETARY = "Monetary"
NONMONETARY = "Nonmonetary"

#gets the total amount current user owes to a user to display on the profile. Whenever this is called, it recalculates the amt, so the serverside balance is up to date.
#@login_required
def get_total_amt_owed(request,to_user_username):
    if request.user == AnonymousUser:
        return JsonResponse(status=403,data={"status": "Permission Denied"})

    to_user = get_object_or_404(User,username=to_user_username)
    curr_user = request.user
    # gets all monetary favors where curr_user owes money to to_user
    pos_favors = Favor.objects.filter(Q(owner=to_user, assignee=curr_user, total_owed_type=MONETARY))

    #gets all monetary favors where to_user owes money to curr_user
    neg_favors = Favor.objects.filter(Q(owner=curr_user, assignee=to_user, total_owed_type=MONETARY))

    balance = 0
    for favor in pos_favors:
        balance += favor.total_owed_amt

    for favor in neg_favors:
        balance -= favor.total_owed_amt
    
    return JsonResponse({"amount_owed": balance})

# Ceate your views here.
# view a list of all favors 
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def favor_list(request): # ex: favors/
    # get current user
    curr_user = request.user

    # AND/OR functionality - default query uses AND
    # for now, each category can only take 1 parameter
    and_or = request.GET.get('query')
    or_query = False
    query = Q()
    if and_or == 'or':
        or_query = True

    def query_method(q, query_bool, q_input):
        if query_bool:
            q |= q_input
        else:
            q &= q_input
        return q

    # FILTER
    # filter by owner id
    owner_id = request.GET.get('owner')
    if owner_id and owner_id != '':
        query = query_method(query, or_query, Q(owner__id=owner_id))

    # filter by assignee id
    assignee_id = request.GET.get('assignee')
    if assignee_id and assignee_id != '':
        query = query_method(query, or_query, Q(assignee__id=assignee_id))

    # filter by tag id
    tag_id = request.GET.get('tag')
    if tag_id and tag_id != '':
        query = query_method(query, or_query, Q(tags__id=tag_id))

    # filter by status (use the string constants)
    status = request.GET.get('status') 
    if status and status != '':
        # favors sent by user
        if status == 'sent':
            query = query_method(query, or_query, Q(owner__id=curr_user.id))
        # favors received by user
        elif status == 'received':
            query = query_method(query, or_query, Q(assignee__id = curr_user.id))
        # favors in progress
        elif status == 'incomplete':  
            q_input = (Q(active = True) & Q(completed = False) & Q(deleted = False))
            query = query_method(query, or_query, q_input)
        # completed favors
        elif status == 'complete':
            q_input = (Q(completed = True) & Q(deleted = False))
            query = query_method(query, or_query, q_input)
            
    # filter by date range
    start_date = request.GET.get('start_date') # ex: start_date=2002-01-30
    end_date = request.GET.get('end_date')
    if (start_date and start_date != '') and (end_date and end_date != ''):
        start_date = parse_date(start_date)
        end_date = parse_date(end_date)
        q_in = (Q(created_at__gte = start_date) & Q(created_at__lte = end_date))
        query = query_method(query, or_query, q_in)

    # filter by price range
    price_low = request.GET.get('price_low')
    price_high = request.GET.get('price_high')
    if (price_low and price_low != '') and (price_high and price_high != ''):
        price_low = Decimal(price_low)
        price_high = Decimal(price_high)
        q_in = (Q(total_owed_amt__gte = price_low) & Q(total_owed_amt__lte = price_high))
        query = query_method(query, or_query, q_in)
    
    # get all favors owned by or assigned to the current user
    favors = Favor.objects.filter(Q(owner__id=curr_user.id) | Q(assignee__id=curr_user.id))
    # filter these favors by the query we've collected
    favors = favors.filter(query).distinct()

    # SORT - default sorts from lowest id to highest
    sort_method = request.GET.get('sort_by')
    sort_order = request.GET.get('order')

    # sort by name (in alphabetical order)
    if sort_method == 'name':
        if sort_order == 'descending': 
            favors = favors.order_by('-name')
        # Bounty title A-Z
        else: # if order is ascending or none is specified, sort in ascending order
            favors = favors.order_by('name')
        
    # sort by date
    if sort_method == 'date':
        # newest first 
        if sort_order == 'descending': 
            favors = favors.order_by('-created_at')
        # oldest first 
        else: 
            favors = favors.order_by('created_at')

    # sort by amount of money
    if sort_method == 'amount':
        # price: highest to lowest
        if sort_order == 'descending':
            favors = favors.order_by('-total_owed_amt')
        # price: lowest to highest
        else: 
            favors = favors.order_by('total_owed_amt')

    # sort by assignee username
    if sort_method == 'assignee':
        if sort_order == 'descending':
            favors = favors.order_by('-assignee__username')
        # Friend name A-Z
        else: 
            favors = favors.order_by('assignee__username')

    # SEARCH 
    search = request.GET.get('search')
    if search:
        favors = favors.filter(Q(name__icontains=search) |  # by favor name
                               Q(description__icontains=search) |   # by description
                               Q(assignee__username__icontains=search))     # by assignee name

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
                  "total_owed_wishlist": f.total_owed_wishlist,
                  "privacy": f.privacy,
                  "owner_status": f.owner_status,
                  "assignee_status": f.assignee_status,
                  "is_active": f.active, 
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
                  "total_owed_wishlist": favor.total_owed_wishlist,
                  "privacy": favor.privacy,
                  "owner_status": favor.owner_status,
                  "assignee_status": favor.assignee_status,
                  "is_active": favor.active, #only show active in frontend
                  "is_deleted": favor.deleted, 
                  "is_completed": favor.completed,
                  "tags": tags,}
    return JsonResponse(favor_data)

# view a list of all tags, with preset tags listed before custom tags
def tag_list(request):
    curr_user = request.user
    tags_list = list(Tag.objects.filter(owner__username=curr_user.username).order_by("-tag_type").values())
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
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_favor(request):
    data = json.loads(request.body)
    #fields = ['name', 'description', 'assignee', 'total_owed_type','total_owed_amt', 'total_owed_wishlist', 'privacy', 'active', 'completed', 'tags']
    name = data.get('name', None)
    print(name)
    owner = get_object_or_404(User,username=(data.get("owner", None)))
    description = data.get("description", None)
    assignee = get_object_or_404(User,username=(data.get("assignee", None)))
    total_owed_type = data.get('total_owed_type', None)
    total_owed_amt = data.get('total_owed_amt', None)
    privacy = data.get('privacy', None)
    active = data.get('active', None)
    owner_status = CREATE
    assignee_status = INCOMPLETE
    completed = False
    active = False
    #tags = get_tags(data.get('tags', None))
    #total_owed_wishlist = get_total_owed_wishlist(data.get('total_owed_wishlist', None))
    
    # ** make sure this matches with create_favor:
    # wishlist_item_name = data.get('total_owed_wishlist', None)
    # total_owed_wishlist = ""
    # if wishlist_item_name != "":
    #     if Wishlist.objects.filter(title=wishlist_item_name):
    #         total_owed_wishlist = wishlist_item_name

    newfavor = Favor(name=name, owner=owner, description=description, assignee=assignee, 
                    total_owed_type=total_owed_type, total_owed_amt=total_owed_amt,privacy=privacy, 
                    active=active, owner_status=owner_status, 
                    assignee_status=assignee_status, completed=completed)
    newfavor.save()
    

    return JsonResponse({"success": True, "favor_id": newfavor.id})

def get_tags(input):
    pass

def get_total_owed_wishlist(input):
    pass

# edit a favor 
# when edit favor request is made, a second request to update the statuses must also be made
# @login_required
def edit_favor(request, favor_id):
    # this gets the favor and sets it to inactive
    data = json.loads(request.body)
    #fields = ['name', 'description', 'assignee', 'total_owed_type','total_owed_amt', 'total_owed_wishlist', 'privacy', 'active', 'completed', 'tags']
    name = data.get('name', None)
    print(name)
    owner = get_object_or_404(User,username=(data.get("owner", None)))
    description = data.get("description", None)
    assignee = get_object_or_404(User,username=(data.get("assignee", None)))
    total_owed_type = data.get('total_owed_type', None)
    total_owed_amt = data.get('total_owed_amt', None)
    privacy = data.get('privacy', None)
    active = data.get('active', None)
    owner_status = CREATE
    assignee_status = INCOMPLETE
    completed = False
    active = False

    newfavor = Favor(name=name, owner=owner, description=description, assignee=assignee, 
                    total_owed_type=total_owed_type, total_owed_amt=total_owed_amt,privacy=privacy, 
                    active=active, owner_status=owner_status, 
                    assignee_status=assignee_status, completed=completed)
    newfavor.previous_favor = get_object_or_404(Favor, pk=favor_id)
    newfavor.save()
    newfavor.previous_favor.active = False
    newfavor.previous_favor.save()

    
    return JsonResponse({"status":"success"})

# create a new tag
# @login_required
def create_tag(request):
    if request.user == AnonymousUser:
        return JsonResponse(status=403,data={"status": "Permission Denied"})
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
    if request.user == AnonymousUser:
        return JsonResponse(status=403,data={"status": "Permission Denied"})
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
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def change_status(request, favor_id):
    data = json.loads(request.body)
    status = data.get("status", None)
    print("changing status to " + status)
    print("logged on as "+ request.user.username)
    favor = get_object_or_404(Favor, pk=favor_id)
    favor = get_object_or_404(Favor, pk=favor_id)
    curr_state = (favor.owner_status,favor.assignee_status)
    

    #checks if input is valid
    if (curr_state not in STATES):
        curr_state = STATES[0]
        print("invalid state of favor, resetting.")
        return JsonResponse({"status": "fail"})

    if favor.owner == request.user:
        print("sender is owner")
        transition = (curr_state,(0,status))
    else:
        print("sender is reciever")
        transition = (curr_state,(1,status))
    if transition not in TRANSITIONS:
        print("invalid transition")
        return JsonResponse({"status": "fail"})
    (favor.owner_status,favor.assignee_status) = TRANSITIONS[transition]

    #check if favor has been edited, and cancelled. assumes that the old/new favor has already been created.
    DELETE_OLD = {(STATES[8],(1,CANCEL)):STATES[0],
               (STATES[9],(1,CANCEL)):STATES[0],
               (STATES[8],(0,CANCEL)):STATES[0],
               (STATES[9],(0,CANCEL)):STATES[0]}
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
    
    return JsonResponse({"status": "success"})


# updates favor based on current state of owner status and assignee status
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

    #favor has been successfully edited, reset favor to regular adn delete old favor
    elif curr_state in [STATES[10]]:
        favor.owner_status = INCOMPLETE
        favor.assignee_status = INCOMPLETE
        favor.previous_favor.delete()
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

# delete a tag based on tag id
def delete_tag(request, tag_id):
    if request.user == AnonymousUser:
        return JsonResponse(status=403,data={"status": "Permission Denied"})
    tag = get_object_or_404(Tag, pk=tag_id)
    if request.method == "DELETE":
        tag.delete()
        return JsonResponse({"success": True})
    else:
        return JsonResponse({"error": "must use DELETE method"}, status=405)


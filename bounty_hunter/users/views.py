from django.shortcuts import render
from django.http import JsonResponse

from django.template import loader
from django.shortcuts import get_object_or_404

from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout

from .models import UserProfileInfo, LinkedAccounts, Wishlist
from django.shortcuts import redirect

from django.core.exceptions import PermissionDenied


# linked accounts will show up as the text and their ID. Use the ID to request edits and deletions.
def profile(request, request_username):
    request_owner = get_object_or_404(User, username=request_username)
    user_profile = get_object_or_404(UserProfileInfo, owner=request_owner)
    linked_accs_list = LinkedAccounts.objects.filter(owner=request_owner)
    linked_accs_list_strs = []
    for entry in linked_accs_list:
        linked_accs_list_strs.append(entry.account_text + ":" + str(entry.id))
    linked_accs = ",".join(linked_accs_list_strs)

    headers = {
        "bio":user_profile.bio_text,
        "pfp":user_profile.profile_image,
        "name":request_owner.username,
        "accounts":linked_accs,
        "rating score":user_profile.rating_score,
        "friend count":user_profile.friend_count,
        "status":user_profile.pubpriv_status
    }

    return JsonResponse(headers)


# sign in page
# def sign_in(request):
#     #temporary sign in template
#     return render(request, "users/signin.html", {})


# if sign in successful, redirect to profile. Else, return sign in page with failed response
# def sign_in_attempt(request):
#     request_username = request.POST["username"]
#     request_password = request.POST["password"]

#     user = authenticate(username=request_username, password=request_password)
#     if user is not None:
#         # can change this redirect to link to a different page ig
#         login(request, user)
#         return redirect("/users/profiles/" + user.get_username())
#     else:
#         #in the future will add another redirect.
#         return redirect("/users/signin")
    
def log_out(request):
    logout(request)
    return 
    

def delete_account(request, request_username):
    headers = {"success": False}
    if request.user.is_authenticated:
        if request.user.username == request_username:
            request.user.is_active = False
            request.user.save()
            headers["success"] = True
            return JsonResponse(headers)
        else:
            raise JsonResponse(headers)
    else:
        return JsonResponse(headers)

def edit_bio(request, request_username):
    headers = {"success": False}
    new_bio = request.POST["new_bio"]
    if request.user.is_authenticated:
        if request.user.username == request_username:
            profile = get_object_or_404(UserProfileInfo, owner=request.user)
            profile.bio_text = new_bio
            profile.save()
            return JsonResponse(headers)
        else:
            raise JsonResponse(headers)
    else:
        return JsonResponse(headers)

def rating_score(request, request_username):
    headers = {"success": False}
    new_score = request.POST["new_score"]
    if new_score is not None:
        profile = get_object_or_404(UserProfileInfo, owner=request.user)
        profile.rating_score = new_score
        profile.save()
        headers = {"success": True}
    return JsonResponse(headers)

def friend_count(request, request_username):
    headers = {"success": False}
    new_friendcount = request.POST["new_friendcount"]
    if new_friendcount is not None:
        profile = get_object_or_404(UserProfileInfo, owner=request.user)
        profile.friend_count = new_friendcount
        profile.save()
        headers = {"success": True}
    return JsonResponse(headers)

def pubpriv_status(request, request_username):
    headers = {"success": False}
    new_status = request.POST["new_status"]
    if request.user.is_authenticated:
        if request.user.username == request_username:
            profile = get_object_or_404(UserProfileInfo, owner=request.user)
            profile.bio_text = new_status
            profile.save()
            return JsonResponse(headers)
        else:
            raise JsonResponse(headers)
    else:
        return JsonResponse(headers)

def edit_profile_pic(request, request_username):
    headers = {"success": False}
    new_pic = request.POST["new_pic"]
    if request.user.is_authenticated:
        if request.user.username == request_username:
            profile = get_object_or_404(UserProfileInfo, owner=request.user)
            profile.profile_image = new_pic
            profile.save()
            return JsonResponse(headers)
        else:
            raise JsonResponse(headers)
    else:
        return JsonResponse(headers)

def add_link(request, request_username):
    headers = {"success": False}
    link = request.POST["link"]
    if request.user.is_authenticated:
        if request.user.username == request_username:
            new_link = LinkedAccounts(owner=request.user, account_text=link)
            new_link.save()
            return JsonResponse(headers)
        else:
            raise JsonResponse(headers)
    else:
        return JsonResponse(headers)

def remove_link(request, request_username):
    headers = {"success": False}
    id = request.POST["id"]
    if request.user.is_authenticated:
        if request.user.username == request_username:
            LinkedAccounts.objects.filter(id=id).delete()
            return JsonResponse(headers)
        else:
            raise JsonResponse(headers)
    else:
        return JsonResponse(headers)

def wishlist(request, request_username):
    request_owner = get_object_or_404(User, username=request_username)
    user_wishlist = get_object_or_404(UserProfileInfo, owner=request_owner)

    headers = {
        "item name":user_wishlist.name,
        "item image":user_wishlist.photo
    }

    return JsonResponse(headers)

def item_name(request, request_username):
    headers = {"success": False}
    name = request.POST["name"]
    if request.user.is_authenticated:
        if request.user.username == request_username:
            item = get_object_or_404(UserProfileInfo, owner=request.user)
            wishlist.name = name
            item.save()
            return JsonResponse(headers)
        else:
            raise JsonResponse(headers)
    else:
        return JsonResponse(headers)

def item_photo(request, request_username):
    headers = {"success": False}
    pic = request.POST["pic"]
    if request.user.is_authenticated:
        if request.user.username == request_username:
            photo = get_object_or_404(UserProfileInfo, owner=request.user)
            wishlist.photo = pic
            photo.save()
            return JsonResponse(headers)
        else:
            raise JsonResponse(headers)
    else:
        return JsonResponse(headers)


# Create your views here.

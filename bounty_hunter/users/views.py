from django.shortcuts import render
from django.http import HttpResponse

from django.template import loader
from django.shortcuts import get_object_or_404

from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout

from .models import UserProfileInfo, LinkedAccounts
from django.shortcuts import redirect

from django.core.exceptions import PermissionDenied


import os

from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from google.oauth2 import id_token
from google.auth.transport import requests
from django.utils.crypto import get_random_string

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
        "accounts":linked_accs
    }

    #temporary html template render
    template = loader.get_template("users/profile.html")

    return HttpResponse(template.render(headers,request))

# sign in page
def sign_in(request):
    #temporary sign in template
    return render(request, "users/signin.html", {})


# if sign in successful, redirect to profile. Else, return sign in page with failed response
def sign_in_attempt(request):
    request_username = request.POST["username"]
    request_password = request.POST["password"]

    user = authenticate(username=request_username, password=request_password)
    if user is not None:
        # can change this redirect to link to a different page ig
        login(request, user)
        return redirect("/users/profiles/" + user.get_username())
    else:
        #in the future will add another redirect.
        return redirect("/users/signin")
    
def log_out(request):
    logout(request)
    return redirect("/users/signin")
    

def delete_account(request, request_username):
    if request.user.is_authenticated:
        if request.user.username == request_username:
            request.user.is_active = False
            request.user.save()
            return redirect("/users/profiles/" + request.user.get_username())
        else:
            raise PermissionDenied
    else:
        return redirect("/users/signin")

def edit_bio(request, request_username):
    new_bio = request.POST["new_bio"]
    if request.user.is_authenticated:
        if request.user.username == request_username:
            profile = get_object_or_404(UserProfileInfo, owner=request.user)
            profile.bio_text = new_bio
            profile.save()
            return redirect("/users/profiles/" + request.user.get_username())
        else:
            raise PermissionDenied
    else:
        return redirect("/users/signin")

def edit_profile_pic(request, request_username):
    new_pic = request.POST["new_pic"]
    if request.user.is_authenticated:
        if request.user.username == request_username:
            profile = get_object_or_404(UserProfileInfo, owner=request.user)
            profile.profile_image = new_pic
            profile.save()
            return redirect("/users/profiles/" + request.user.get_username())
        else:
            raise PermissionDenied
    else:
        return redirect("/users/signin")

def add_link(request, request_username):
    link = request.POST["link"]
    if request.user.is_authenticated:
        if request.user.username == request_username:
            new_link = LinkedAccounts(owner=request.user, account_text=link)
            new_link.save()
            return redirect("/users/profiles/" + request.user.get_username())
        else:
            raise PermissionDenied
    else:
        return redirect("/users/signin")

def remove_link(request, request_username):
    id = request.POST["id"]
    if request.user.is_authenticated:
        if request.user.username == request_username:
            LinkedAccounts.objects.filter(id=id).delete()
            return redirect("/users/profiles/" + request.user.get_username())
        else:
            raise PermissionDenied
    else:
        return redirect("/users/signin")
    


@csrf_exempt
def auth_receiver(request):
    token = request.POST['credential']
    try:
        user_data = id_token.verify_oauth2_token(
            token, requests.Request(), os.environ['GOOGLE_OAUTH_CLIENT_ID']
        )
    except ValueError:
        return HttpResponse(status=403)
    
    request_username = request.session.user_data.email
    request_password = get_random_string(length=150)

    user = authenticate(username=request_username, password=request_password)

    if user is None:
        new_user = User(username=request_username, password=request_password, email=request_username)
        new_user.save()
        return redirect("/users/profiles/" + request_username)
    else:
        return redirect("/users/profiles/" + request_username)
    

    # In a real app, I'd also save any new user here to the database. See below for a real example I wrote for Photon Designer.
    # You could also authenticate the user here using the details from Google (https://docs.djangoproject.com/en/4.2/topics/auth/default/#how-to-log-a-user-in)
    


    return redirect('sign_in')

    




# Create your views here.

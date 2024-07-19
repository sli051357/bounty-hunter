from django.shortcuts import render
from django.http import JsonResponse
from django.db import IntegrityError
from django.template import loader
from django.shortcuts import get_object_or_404

from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout

from .models import UserProfileInfo, LinkedAccounts
from django.shortcuts import redirect

from django.core.mail import send_mail
from rest_framework.authtoken.models import Token

from django.http import HttpResponseNotFound

from PIL import Image
from django.core.files import File

EMAIL_HOST_USER = "sdsc.team.pentagon@gmail.com"
BASE_URL = "http://127.0.0.1:8000/"



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

    return JsonResponse(headers)

#temp sign in page
def sign_up(request):
    #temporary sign in template
    return render(request, "users/register.html")
    
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
    
def register_user(request):

    username =request.POST["username"]
    password =request.POST["password"]
    email = request.POST["email"]

    new_user = User(username=username,password=password,email=email,is_active=False)
    try:
        new_user.save()
    except IntegrityError:
        return HttpResponseNotFound("user already exists")         
    
    new_token = Token.objects.create(user=new_user)
    new_token.save()

    new_bio = UserProfileInfo(bio_text="No information given.", owner=new_user)
    with open("res/default.png", 'rb') as f:
        new_bio.profile_image.save('default_pfp.png', File(f), save=True)
    new_bio.save()

    send_mail(
    subject="Verify Your Email",
    message=BASE_URL + "users/verify/" + str(new_token.key),
    from_email=EMAIL_HOST_USER,
    recipient_list=[email],
    fail_silently=False
    )

    return redirect('/users/sign-up/')

def verify(request, token):
    request_user = get_object_or_404(Token,key=token).user
    request_user.is_active = True
    request_user.save()
    return redirect('/users/sign-up/')



# Create your views here.

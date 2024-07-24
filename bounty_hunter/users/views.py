from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.db import IntegrityError
from django.template import loader

from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout

from .models import UserProfileInfo, LinkedAccounts, Wishlist
from django.shortcuts import redirect

from django.core.mail import send_mail
from rest_framework.authtoken.models import Token

from django.http import HttpResponseNotFound, HttpResponse, Http404


from PIL import Image
from django.core.files import File

from django.contrib import messages

EMAIL_HOST_USER = "sdsc.team.pentagon@gmail.com"
BASE_URL = "http://127.0.0.1:8000/"

from django.core.exceptions import PermissionDenied
import base64


def bio(request, request_username):
    request_owner = get_object_or_404(User, username=request_username)
    user_profile = get_object_or_404(UserProfileInfo, owner=request_owner)
    data = {
        "bio":user_profile.bio_text
    }
    return JsonResponse(data=data)

def profile_pic(request, request_username):
    request_owner = get_object_or_404(User, username=request_username)
    user_profile = get_object_or_404(UserProfileInfo, owner=request_owner)

    data = {
        "pfp":base64.b64encode(user_profile.profile_image)
    }

    return JsonResponse(data=data)

def linked_accs(request, request_username):
    request_owner = get_object_or_404(User, username=request_username)
    linked_accs_list = LinkedAccounts.objects.filter(owner=request_owner)
    linked_accs_list_strs = []
    for entry in linked_accs_list:
        linked_accs_list_strs.append(entry.account_text + ":" + str(entry.id))
    linked_accs = ",".join(linked_accs_list_strs)

<<<<<<< HEAD
    headers = {
        "bio":user_profile.bio_text,
        "pfp":user_profile.profile_image,
        "name":request_owner.username,
        "accounts":linked_accs,
        "rating score":user_profile.rating_score,
        "friend count":user_profile.friend_count,
        "status":user_profile.pubpriv_status
=======
    data = {
        "accounts":linked_accs
>>>>>>> origin/dev
    }

    return JsonResponse(data=data)

<<<<<<< HEAD

# sign in page
# def sign_in(request):
#     #temporary sign in template
#     return render(request, "users/signin.html", {})
=======
#temp sign in pages
def sign_in(request):
    #temporary sign in template
    return render(request, "users/signin.html")
>>>>>>> origin/dev

def signin_attempt(request):
    username = request.POST["username"]
    password = request.POST["password"]
    user = authenticate(username=username,password=password)
    if user is not None:
        login(request,user=user)
        print("logged in")
        return redirect('/users/sign-up/')
    
    return redirect('/users/sign-up/')

def sign_up(request):
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
<<<<<<< HEAD
=======
    
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

def reset_password(request):
    email = request.POST["email"]
    try:
        attempt_user = get_object_or_404(User, email=email)
    except Http404:
        messages.add_message(request, messages.ERROR, "User does not exist.")
        return redirect('temp')

    user_token = get_object_or_404(Token, user=attempt_user)
    
    send_mail(
    subject="Reset your Password",
    message=BASE_URL + "users/reset-password/" + str(user_token.key),
    from_email=EMAIL_HOST_USER,
    recipient_list=[email],
    fail_silently=False
    )
    messages.add_message(request, messages.SUCCESS, "Email sent!")
    return redirect('temp')



def show_create_new_password(request, token):
    context = {"token":token}
    return render(request, "users/reset-password.html", context)

def create_new_password(request):
    pass1 = request.POST["pass1"]
    pass2 = request.POST["pass2"]
    token = request.POST["token"]

    if pass1 != pass2:
        print("passwords dont match")
        messages.add_message(request, messages.ERROR, "Passwords do not match.")
        return redirect('temp')
    
    user = get_object_or_404(Token,key=token).user
    user.password = pass1
    user.save()

    messages.add_message(request, messages.SUCCESS, "Password changed.")
    print("changed password")
    return redirect('temp')


def temp(request):
    context = {}
    #temporary page for testing
    return render(request, "users/forgot.html", context)

>>>>>>> origin/dev

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

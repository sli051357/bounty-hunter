from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.db import IntegrityError
from django.contrib.auth.models import User, AnonymousUser
from .models import UserProfileInfo, LinkedAccounts, FriendRequest, create_new_ref_number
from django.core.mail import send_mail
from rest_framework.authtoken.models import Token
from django.http import HttpResponse, Http404
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django.middleware.csrf import get_token
import json
import os
from rest_framework.decorators import authentication_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

from django.db.models import Q
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
import base64
from django.core.files.base import ContentFile

from django.conf import settings

EMAIL_HOST_USER = "sdsc.team.pentagon@gmail.com"
BASE_URL = "http://127.0.0.1:8000/"

class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)

        return JsonResponse({
            'token': token.key
        })
    
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def add_favorite_friend(request):
    #get post data
    data = json.loads(request.body)
    friend = get_object_or_404(User, username = data.get('friend', None))
    #get profile
    from_user = request.user
    profile = get_object_or_404(UserProfileInfo, owner=from_user)

    #if not favorited but is a friend, add them.
    if friend in profile.friends.all() and friend not in profile.favoritedFriends.all():
        profile.favoritedFriends.add(friend)
        profile.friends.remove(friend)
        profile.save()
        return JsonResponse({"status":"success"})
    else:
        return JsonResponse({"status":"fail"})
    
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def remove_favorite_friend(request):
    #get post data
    data = json.loads(request.body)
    friend = get_object_or_404(User, username = data.get('friend', None))

    #get profile
    from_user = request.user
    profile = get_object_or_404(UserProfileInfo, owner=from_user)

    #if favorited and is a friend, add them.
    if friend not in profile.friends.all() and friend in profile.favoritedFriends.all():
        profile.favoritedFriends.remove(friend)
        profile.friends.add(friend)
        profile.save()
        return JsonResponse({"status":"success"})
    else:
        return JsonResponse({"status":"fail"})
    
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_favorite_friends(request):
    print(request.user)
    friends = get_object_or_404(UserProfileInfo, owner=request.user).favoritedFriends
    data = {}
    for f in friends.all():
        user_profile = UserProfileInfo.objects.get(owner = f)
        f_data = [
            f.username,
            user_profile.rating,
            request.build_absolute_uri(user_profile.profile_image.url)
        ]
        data[f.username] = f_data

    #for friend in friends.all():
    #    data[friend.username] = "friend :)"
    
    return JsonResponse(data)

# searches for users whose usernames contain that string
def search_users(request):
    search_query = request.GET.get('q', '')  # Get the search parameter from the URL
    if search_query:
        users = User.objects.filter(
            Q(username__icontains=search_query) | 
            Q(email__icontains=search_query)
        )
    else:
        users = User.objects.none() 
        
    if users == User.objects.none():
        return JsonResponse({"users":[]})

    user_data = [
            {
                'username': user.username,
                'id': user.username,
                'imageUrl':  request.build_absolute_uri(UserProfileInfo.objects.get(owner=user).profile_image.url)
            } for user in users
        ]
    print(user_data)

    return JsonResponse({"users":user_data})


def get_csrf_token(request):
    token = get_token(request)
    return JsonResponse({'csrfToken': token})

def bio(request, request_username):
    request_owner = get_object_or_404(User, username=request_username)
    user_profile = get_object_or_404(UserProfileInfo, owner=request_owner)
    data = {
        "bio":user_profile.bio_text
    }
    return JsonResponse(data=data)

def rating(request, request_username):
    request_owner = get_object_or_404(User, username=request_username)
    user_profile = get_object_or_404(UserProfileInfo, owner=request_owner)
    data = {
        "rating": str(user_profile.rating)
    }
    return JsonResponse(data=data)

def friend_count(request, request_username):
    request_owner = get_object_or_404(User, username=request_username)
    user_profile = get_object_or_404(UserProfileInfo, owner=request_owner)
    count = user_profile.friends.count()
    data = {
        "friendCount": str(count)
    }
    return JsonResponse(data=data)


def linked_accs(request, request_username):
    request_owner = get_object_or_404(User, username=request_username)
    linked_accs_list = LinkedAccounts.objects.filter(owner=request_owner)

    data = {}

    for entry in linked_accs_list:
        data[str(entry.id)] = [entry.provider_text, entry.account_text]


    return JsonResponse(data)


#retrieves the list of friend requests    
# @login_required
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_incoming_friend_requests(request):
    if request.user == AnonymousUser:
        return JsonResponse(status=403, data={"status": "Permission Denied"})

    friend_requests = FriendRequest.objects.filter(to_user=request.user)
    data = {}
    for fr in friend_requests:
        # data[fr.pk] = {"to_user":fr.to_user.username, "from_user":fr.from_user.username}
        fr_profile = UserProfileInfo.objects.get(owner = fr.from_user)
        fr_data = [
            fr.from_user.username,
            fr_profile.rating,
            request.build_absolute_uri(fr_profile.profile_image.url),
            fr.pk
        ]
        print(fr_data)
        data[fr.pk] = fr_data
    return JsonResponse(data)
    
    

#retrieves the list of friends
# @login_required
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_friends_list(request):
    print(request.user)
    friends = get_object_or_404(UserProfileInfo, owner=request.user).friends
    data = {}
    for f in friends.all():
        user_profile = UserProfileInfo.objects.get(owner = f)
        f_data = [
            f.username,
            user_profile.rating,
            request.build_absolute_uri(user_profile.profile_image.url)
        ]
        data[f.username] = f_data

    #for friend in friends.all():
    #    data[friend.username] = "friend :)"
    
    return JsonResponse(data)

# returns the number of friends
# @Login_required
def get_friend_count(request):
    friends = get_object_or_404(UserProfileInfo, owner=request.user).friends
    count = 0
    for friend in friends.all():
        count += 1
    return JsonResponse(count, safe=False)

# @login_required
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def send_friend_request(request, username):
    from_user = request.user
    to_user = User.objects.get(username=username)

    #can only send if friend or favorited friend
    if UserProfileInfo.objects.get(from_user).friends.contains(to_user) or UserProfileInfo.objects.get(to_user).friends.contains(from_user):
        return JsonResponse({"status":"fail"})
    if UserProfileInfo.objects.get(from_user).favoritedFriends.contains(to_user) or UserProfileInfo.objects.get(to_user).favoritedFriends.contains(from_user):
        return JsonResponse({"status":"fail"})
    
    friend_req, created = FriendRequest.objects.get_or_create(from_user=from_user,to_user=to_user)
    if created:
        return JsonResponse({"status":"success"})
    else:
        return JsonResponse({"status":"fail"})

# @login_required
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def accept_friend_request(request, pk):
    if request.user == AnonymousUser:
        return JsonResponse(status=403, data={"status": "Permission Denied"})
    fr = FriendRequest.objects.get(pk=pk)
    if request.user == fr.to_user:
        UserProfileInfo.objects.get(owner=fr.to_user).friends.add(fr.from_user)
        UserProfileInfo.objects.get(owner=fr.from_user).friends.add(fr.to_user)
        fr.delete()
        return JsonResponse({"status":"success"})
    else:
        return JsonResponse({"status":"fail"})
    
# @login_required
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def reject_friend_request(request, pk):
    if request.user == AnonymousUser:
        return JsonResponse(status=403, data={"status": "Permission Denied"})
    fr = FriendRequest.objects.get(pk=pk)
    if request.user == fr.to_user:
        fr.delete()
        return JsonResponse({"status":"success"})
    else:
        return JsonResponse({"status":"fail"})
    
# @login_required
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def remove_friend(request, request_username):
    curr_user = UserProfileInfo.objects.get(owner=request.user)
    friend = User.objects.get(username=request_username)
    # check if user is a friend of curr_user
    if User.objects.get(username=request_username) in curr_user.friends.all() or User.objects.get(username=request_username) in curr_user.favoritedFriends.all():
        curr_user.friends.remove(friend)
        curr_user.favoritedFriends.remove(friend)
        if User.objects.get(username=request_username) not in curr_user.friends.all() and User.objects.get(username=request_username) not in curr_user.favoritedFriends.all():   # successfully removed
            return JsonResponse({"status":"success"})
        else:
            return JsonResponse({"status":"fail"})
    else:
        return JsonResponse({"status":"fail"})

# @login_required
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_account(request):
    request.user.is_active = False
    request.user.save()
    return JsonResponse(data={"status":"success"})

# we need to remake every post request to look like this.
# Authenticates the request, then checks if its the same user.
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def edit_bio(request, request_username):
    data = json.loads(request.body)
    new_bio = data.get('bio', None) 
    if request.user.username == request_username:
        profile = get_object_or_404(UserProfileInfo, owner=request.user)
        profile.bio_text = new_bio
        profile.save()
        return JsonResponse(data={"status":"success"})
    else:
        return JsonResponse(status=403, data={"status": "Permission Denied"})
    
#returns httpresponse of image for use in uri of app
def pic_access(request, filename):
    file_path = os.path.join(settings.MEDIA_ROOT, filename)
    
    if os.path.exists(file_path):
        with open(file_path, 'rb') as file:
            return HttpResponse(file.read(), content_type="image/jpeg")
    else:
        raise Http404("Image not found")

    
#returns url of image
def profile_pic(request, request_username):
    request_owner = get_object_or_404(User, username=request_username)
    user_profile = get_object_or_404(UserProfileInfo, owner=request_owner)

    data = {
        "url":request.build_absolute_uri(user_profile.profile_image.url)
    }

    return JsonResponse(data=data)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def edit_profile_pic(request, request_username):
    data = json.loads(request.body)
    filename = data.get("filename")
    new_pic_string  = data.get("new_pic")

    image_data = base64.b64decode(new_pic_string)
    new_pic =  ContentFile(image_data, name=filename)

    if request.user.is_authenticated:
        if request.user.username == request_username:
            profile = get_object_or_404(UserProfileInfo, owner=request.user)
            profile.profile_image = new_pic
            profile.save()
            return JsonResponse({"status":"success"})
        else:
            return JsonResponse(status=403, data={"status": "fail"})
    else:
        return JsonResponse(status=403, data={"status": "fail"})


def add_link(request, request_username):
    link = request.POST["link"]
    if request.user.is_authenticated:
        if request.user.username == request_username:
            new_link = LinkedAccounts(owner=request.user, account_text=link)
            new_link.save()
            return JsonResponse({"status":"success"})
        else:
            return JsonResponse(status=403, data={"status": "Permission Denied"})
    else:
        return JsonResponse(status=403, data={"status": "Permission Denied"})

def remove_link(request, request_username):
    id = request.POST["id"]
    if request.user.is_authenticated:
        if request.user.username == request_username:
            LinkedAccounts.objects.filter(id=id).delete()
            return JsonResponse({"status":"success"})
        else:
            return JsonResponse(status=403, data={"status": "Permission Denied"})
    else:
        return JsonResponse(status=403, data={"status": "Permission Denied"})
    

def register_user(request):
    data = json.loads(request.body)
    username =data.get('username', None) 
    password =data.get('password', None) 
    email = data.get('email', None) 
    # attempt to reactivate account, if fails move on to normal account creation.
    try:
        #will fail if user doesnt exist, then move on to next code
        user = get_object_or_404(User, email=email)

        print("email exists")
        #check if user has been "deleted"
        if not user.is_active:
            new_token = Token.objects.get(user=user)
            send_mail(
                subject="Reactivate your account",
                message=BASE_URL + "users/verify/" + str(new_token.key),
                from_email=EMAIL_HOST_USER,
                recipient_list=[email],
                fail_silently=False
            )
            return JsonResponse({"status": "success"})
        else:
            return JsonResponse({"status": "fail"})  
        
    except Http404: # if user does not exist, check if username exists.
        new_user = User(username=username,email=email,is_active=False)
        #sets password
        new_user.set_password(password)

        try:
            new_user.save()
        except IntegrityError: #will raise if username already exists.
            print("username exists")
            return JsonResponse({"status": "fail"})       
        
        new_token = Token.objects.create(user=new_user)
        new_token.save()

        #verification code is automatically generated
        new_bio = UserProfileInfo(bio_text="No information given.", owner=new_user)
        new_bio.save()

        send_mail(
        subject="Verify Your Email",
        message=BASE_URL + "users/verify/" + str(new_token.key),
        from_email=EMAIL_HOST_USER,
        recipient_list=[email],
        fail_silently=False
        )

        return JsonResponse({"status": "success"})

# for verifying in account creation, uses django rendered pages.
def verify(request, token):
    try:
        request_user = get_object_or_404(Token,key=token).user
    except Http404:
        return JsonResponse({"status":"fail", "error":"token not found"})
    if request_user.is_active:
        return JsonResponse({"status":"fail", "error":"account is already active"})
    
    request_user.is_active = True
    request_user.save()
    return JsonResponse({"status":"success"})

# for verifying in forgot password. Post the request here.
def verify_code(request):
    data = json.loads(request.body)

    #check if they posted a code
    try:
        code = data.get('code', None) 
    except KeyError:
        print("code not in data")
        return JsonResponse({"status": "fail"})
    #check if code is right
    try:
        profile = get_object_or_404(UserProfileInfo, code=int(code))
    except Http404:
        print("code is wrong")
        return JsonResponse({"status": "fail"})

    #reset code and return the authtoken for logging in the user.
    profile.code = create_new_ref_number()
    profile.save() 
    authToken = Token.objects.get(user=profile.owner)
    return JsonResponse({"status": "success", "authToken": authToken.key})

# in the forgot password screen, can send an email to send a code to log in to reset password. Should return authtoken i think.
def reset_password(request):
    data = json.loads(request.body)
    email = data.get("email",None)
    try:
        attempt_user = get_object_or_404(User, email=email)
    except Http404:
        return JsonResponse({"status":"fail"})


    try:
        user_code = get_object_or_404(UserProfileInfo, owner=attempt_user).code
    except Http404:
        return JsonResponse({"status":"fail"})
    
    send_mail(
    subject="Reset your Password",
    message="Code: "+ user_code,
    from_email=EMAIL_HOST_USER,
    recipient_list=[email],
    fail_silently=False
    )

    #once a code is entered, it should be reset. This gets handled in the verify_code method.
    
    return JsonResponse({"status": "success"})

# for resetting password, token required. 
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_new_password(request):
    data = json.loads(request.body)
    pass1 = data.get('pass1', None) 
    pass2 = data.get('pass2', None) 

    #check if the passwords match
    if pass1 != pass2:
        print("passwords dont match")
        return JsonResponse({"status": "fail"})
    # password length should already be checked by front i think.
    
    request.user.set_password(pass1)
    request.user.save()

    print("changed password")
    return JsonResponse({"status": "success"})


def temp(request):
    context = {}
    #temporary page for testing
    return render(request, "users/forgot.html", context)





# Create your views here.

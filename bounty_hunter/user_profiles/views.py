from django.shortcuts import render
from django.http import HttpResponse

#temporary
from django.template import loader

from .models import UserProfileInfo, LinkedAccounts, UserAccount

def profile(request, request_username):
    request_owner = UserAccount.objects.get(username_text=request_username)
    user_profile = UserProfileInfo.objects.get(owner=request_owner)
    bio = user_profile.bio_text
    pfp = user_profile.profile_image
    name = user_profile.owner.username_text
    context = {"bio" : bio,
               "pfp" : pfp,
               "name" : name}
    
    #temporary interface
    template = loader.get_template("user_profiles/profile.html")
    
    return HttpResponse(template.render(context,request))



# Create your views here.

from django.shortcuts import render
from django.http import HttpResponse

from django.template import loader
from django.shortcuts import get_object_or_404

from .models import UserProfileInfo, LinkedAccounts, UserAccount

# this method assumes that every user has profile info by default. We can get aroud this by 
# setting default profile stuff on account creation

def profile(request, request_username):
    request_owner = get_object_or_404(UserAccount, username_text=request_username)
    user_profile = get_object_or_404(UserProfileInfo, owner=request_owner)
    linked_accs_list = LinkedAccounts.objects.filter(owner=request_owner)
    linked_accs_list_strs = []
    for entry in linked_accs_list:
        linked_accs_list_strs.append(entry.account_text)

    linked_accs = ",".join(linked_accs_list_strs)

    headers = {
        "bio":user_profile.bio_text,
        "pfp":user_profile.profile_image,
        "name":request_owner.username_text,
        "accounts":(linked_accs)
    }

    #temporary html template render
    template = loader.get_template("user_profiles/profile.html")

    return HttpResponse(template.render(headers,request))



# Create your views here.

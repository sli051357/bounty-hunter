from django.shortcuts import render
from django.http import HttpResponse

#temporary
from django.template import loader

from .models import UserProfileInfo, LinkedAccounts, UserAccount

def profile(request, request_username):
    request_owner = UserAccount.objects.get(username_text=request_username)
    user_profile = UserProfileInfo.objects.get(owner=request_owner)
    linked_accs = LinkedAccounts.objects.filter(owner=request_owner)

    headers = {
        "bio":user_profile.bio_text,
        "pfp":user_profile.profile_image,
        "name":request_owner.username_text
    }

    #adds account links to HttpResponse Dictionary
    for i in range(0,len(linked_accs)):
        headers["acc_link_"+str(i)] = linked_accs[i].account_text

    #temporary html template render
    template = loader.get_template("user_profiles/profile.html")

    return HttpResponse(template.render(headers,request))



# Create your views here.

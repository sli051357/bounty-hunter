from django.contrib import admin
from .models import UserProfileInfo,LinkedAccounts, FriendRequest

# Register your models here.

admin.site.register(LinkedAccounts)
admin.site.register(UserProfileInfo)
admin.site.register(FriendRequest)
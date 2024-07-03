from django.contrib import admin
from .models import UserProfileInfo,LinkedAccounts
from django.contrib.auth.models import User

# Register your models here.

admin.site.register(LinkedAccounts)
admin.site.register(UserProfileInfo)

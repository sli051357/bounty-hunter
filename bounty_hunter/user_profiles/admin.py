from django.contrib import admin
from .models import UserAccount,UserProfileInfo

# Register your models here.

admin.site.register(UserAccount)
admin.site.register(UserProfileInfo)

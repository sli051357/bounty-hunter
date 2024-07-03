from django.contrib import admin
from .models import UserAccount,UserProfileInfo,LinkedAccounts

# Register your models here.

admin.site.register(UserAccount)
admin.site.register(LinkedAccounts)
admin.site.register(UserProfileInfo)

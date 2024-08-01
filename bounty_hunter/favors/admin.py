from django.contrib import admin
from .models import Favor, Tag, Notification
from django.contrib.auth.models import User

# Register your models here.
admin.site.register(Favor)
admin.site.register(Tag)
admin.site.register(Notification)
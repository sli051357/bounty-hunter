from django.urls import path
from . import views

urlpatterns = [
    path('<slug:request_username>', views.profile, name="profile"),
]
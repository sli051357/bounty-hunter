from django.urls import path
from . import views

urlpatterns = [
    path('profiles/<slug:request_username>/', views.profile, name="profile"),
    path('profiles/<slug:request_username>/delete/', views.delete_account, name="delete_account"),
    path('signin/', views.sign_in, name="signin"),
    path('signin-attempt/', views.sign_in_attempt, name="signin-attempt")
]
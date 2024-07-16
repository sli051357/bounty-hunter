from django.urls import path
from . import views

urlpatterns = [
    path('profiles/<slug:request_username>/', views.profile, name="profile"),
    path('profiles/<slug:request_username>/delete/', views.delete_account, name="delete_account"),
    path('profiles/<slug:request_username>/edit-bio', views.edit_bio, name="edit_bio"),
    path('profiles/<slug:request_username>/edit-profile-pic', views.edit_profile_pic, name="edit_profile_pic"),
    path('profiles/<slug:request_username>/add-link', views.add_link, name="add_link"),
    path('profiles/<slug:request_username>/remove-link', views.remove_link, name="remove_link"),
    path('signin/', views.sign_in, name="signin"),
    path('signin-attempt/', views.sign_in_attempt, name="signin_attempt"),    



]
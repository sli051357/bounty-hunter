from django.urls import path
import rest_framework.authtoken.views
from . import views


urlpatterns = [
    path('profiles/<slug:request_username>/profile-pic', views.edit_profile_pic, name="profile_pic"),
    path('profiles/<slug:request_username>/links', views.add_link, name="links"),
    path('profiles/<slug:request_username>/delete/', views.delete_account, name="delete_account"),
    path('profiles/<slug:request_username>/edit-bio', views.edit_bio, name="edit_bio"),
    path('profiles/<slug:request_username>/edit-profile-pic', views.edit_profile_pic, name="edit_profile_pic"),
    path('profiles/<slug:request_username>/add-link', views.add_link, name="add_link"),
    path('profiles/<slug:request_username>/rating-score', views.rating_score, name="rating_score"),
    path('profiles/<slug:request_username>/friend-count', views.friend_count, name="friend_count"),
    path('profiles/<slug:request_username>/pubpriv-status', views.pubpriv_status, name="pubpriv_status"),
    path('profiles/<slug:request_username>/remove-link', views.remove_link, name="remove_link"),
    path('get-token/', rest_framework.authtoken.views.obtain_auth_token),
    # path('sign-up/', views.sign_up, name="sign_up"),
    # path('register/', views.register_user, name="register"),
    # path('verify/<slug:token>', views.verify, name="verify"),
    # path('reset-password/<slug:token>', views.show_create_new_password, name="reset_password"),
    # path('reset-password/', views.create_new_password, name="reset_password_attempt"),
    # path('forgot/', views.reset_password, name="forgot"),
    
    #temporary links for testing
    # path('temp/', views.temp, name="temp"),
    # path('sign-in/', views.sign_in, name="sign_in"),
    # path('sign-in/attempt', views.signin_attempt, name="signin_attempt"),




]
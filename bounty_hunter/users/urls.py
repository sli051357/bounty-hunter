from django.urls import path
import rest_framework.authtoken.views
from . import views


urlpatterns = [
    path('profiles/<slug:request_username>/bio/', views.bio, name="bio"),
    path('profiles/<slug:request_username>/profile-pic/', views.profile_pic, name="profile_pic"),
    path('profiles/<slug:request_username>/links/', views.linked_accs, name="links"),
    path('delete/', views.delete_account, name="delete_account"),
    path('profiles/<slug:request_username>/edit-bio/', views.edit_bio, name="edit_bio"),
    path('profiles/<slug:request_username>/edit-profile-pic/', views.edit_profile_pic, name="edit_profile_pic"),
    path('profiles/<slug:request_username>/add-link/', views.add_link, name="add_link"),
    path('profiles/<slug:request_username>/remove-link/', views.remove_link, name="remove_link"),
    path('get-token/', views.CustomAuthToken.as_view()),
    path('register/', views.register_user, name="register"),
    path('verify/<slug:token>/', views.verify, name="verify"),
    path('reset-password/', views.create_new_password, name="reset_password_attempt"),
    path('forgot-password/', views.reset_password, name="forgot-password"),
    path('verify-code/', views.verify_code, name="verify-code"),
    path('get-friend-requests/', views.get_incoming_friend_requests, name="get_incoming_friend_requests"),
    path('get-friends-list/', views.get_friends_list, name="get_friends_list"),
    path('send-friend-request/<slug:username>/', views.send_friend_request, name="send_friend_request"),
    path('accept-friend-request/<int:pk>/', views.accept_friend_request, name="accept_friend_request"),
    path('reject-friend-request/<int:pk>/', views.reject_friend_request, name="reject_friend_request"),
    path('remove-friend/<slug:request_username>/', views.remove_friend, name="remove_friend"),
    path('get-csrf-token/', views.get_csrf_token, name="get_csrf_token"),
    path('res/<path:filename>/', views.pic_access, name='pic_access'),




]
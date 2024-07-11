from django.urls import path
from . import views

urlpatterns = [
    path('favors/', views.favor_list, name="favor_list"), 
    path('favors/<slug:favor_name>/', views.favor_details, name="favor_details"),
    path('tags/', views.tag_list, name="tag_list"),
    path('tags/<slug:tag_name>/', views.tag_details, name="tag_details")
]


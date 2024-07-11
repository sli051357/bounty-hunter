from django.urls import path
from . import views

urlpatterns = [
    path('favors/', views.favor_list name=favor_list),
]


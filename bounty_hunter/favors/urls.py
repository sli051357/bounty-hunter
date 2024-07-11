from django.urls import path
from . import views

urlpatterns = [
    # ex: /favors/
    path("", views.favor_list, name="favor_list"), 
    # ex: /favors/First Favor
    path("<slug:favor_name>/", views.favor_detail, name="favor_detail"),
    # ex: /favors/tags/
    path("tags/", views.tag_list, name="tag_list"),
    # ex: /favors/tags/Shopping
    path("tags/<slug:tag_name>/", views.tag_detail, name="tag_detail"),

    # more paths: 

]


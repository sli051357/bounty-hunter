from django.urls import path
from . import views

urlpatterns = [
    # ex: /favors/
    path("", views.favor_list, name="favor_list"), 
    
    # ex: /favors/First Favor
    # path("<slug:favor_name>/", views.favor_detail, name="favor_detail"),
    
    # ex: /favors/2
    path("<int:favor_id>/", views.favor_id_detail, name="favor_id_detail"),

    # ex: /favors/tags/
    path("tags/", views.tag_list, name="tag_list"),
    
    # ex: /favors/tags/Shopping
    #cpath("tags/<slug:tag_name>/", views.tag_detail, name="tag_detail"),

    # ex: /favors/tags/Shopping
    path("tags/<int:tag_id>/", views.tag_id_detail, name="tag_id_detail"),

    # more paths: 

]


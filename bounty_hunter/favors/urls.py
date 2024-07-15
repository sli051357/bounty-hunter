from django.urls import path
from . import views

urlpatterns = [
    # ex: /favors/
    path("", views.favor_list, name="favor_list"), 
    # ex: /favors/2
    path("<int:favor_id>/", views.favor_detail, name="favor_id_detail"),
    # ex: /favors/tags/
    path("tags/", views.tag_list, name="tag_list"),
    # ex: /favors/tags/3
    path("tags/<int:tag_id>/", views.tag_detail, name="tag_id_detail"),

    # more paths for filters, editing/creating favors, etc

]


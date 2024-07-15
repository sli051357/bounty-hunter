from django.urls import path
from . import views

urlpatterns = [
    # ex: /favors/
    path("", views.favor_list, name="favor_list"), 
    # ex: /favors/2
    path("<int:favor_id>/", views.favor_detail, name="favor_detail"),
    # ex: /favors/tags
    path("tags/", views.tag_list, name="tag_list"),
    # ex: /favors/tags/3
    path("tags/<int:tag_id>/", views.tag_detail, name="tag_detail"),
    # ex: /favors/create
    path("create/", views.create_favor, name="create_favor"),
    # ex: /favors/tags/create
    path("tags/create", views.create_tag, name="create_tag"),
    # ex: /favors/edit/1
    path("edit/<int:favor_id>/", views.edit_favor, name="edit_favor"),

    # more paths for filters, editing/creating favors, etc

]


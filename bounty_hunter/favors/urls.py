from django.urls import path
from . import views

urlpatterns = [
    # view all favors - ex: /favors/
    path("", views.favor_list, name="favor_list"), 
    # view a specific favor - ex: /favors/2
    path("<int:favor_id>/", views.favor_detail, name="favor_detail"),
    # create a new favor - ex: /favors/create
    path("create/", views.create_favor, name="create_favor"),
    # edit a favor - ex: /favors/edit/1
    path("edit/<int:favor_id>/", views.edit_favor, name="edit_favor"),
    # view all tags - ex: /favors/tags
    path("tags/", views.tag_list, name="tag_list"),
    # view a specific tag - ex: /favors/tags/3
    path("tags/<int:tag_id>/", views.tag_detail, name="tag_detail"),
    # create a new tag - ex: /favors/tags/create
    path("tags/create", views.create_tag, name="create_tag"),
    # edit a tag - ex: /favors/tags/edit/2
    path("tags/edit/<int:tag_id>/", views.edit_tag, name="edit_tag")

    # more paths for filters, editing/creating favors, etc

]


from django.urls import path
from .views import WishlistView, AddWishlistItemView, RemoveWishlistItemView
from . import views

urlpatterns = [
    path('', views.view_wishlist, name='view_wishlist'),
    path('add/', views.add_wishlist_item, name='add_wishlist_item'),
    path('remove/<int:pk>/', RemoveWishlistItemView.as_view(), name='remove_wishlist_item'),
]
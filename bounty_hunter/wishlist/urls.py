from django.urls import path
from .views import WishlistView, AddWishlistItemView, RemoveWishlistItemView

urlpatterns = [
    path('', WishlistView.as_view(), name='wishlist'),
    path('add/', AddWishlistItemView.as_view(), name='add_wishlist_item'),
    path('remove/<int:pk>/', RemoveWishlistItemView.as_view(), name='remove_wishlist_item'),
]
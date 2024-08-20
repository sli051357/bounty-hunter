import json
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views import View
from .models import Wishlist
from .forms import WishlistForm
from django.contrib.auth.models import User

from rest_framework.decorators import authentication_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

# class WishlistView(View):
#     def get(self, request):
#         items = Wishlist.objects.all().values()
#         return JsonResponse(list(items), safe=False)
    
# view full wishlist
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def view_wishlist(request):
    curr_user = request.user
    wishlist_items = Wishlist.objects.filter(owner=curr_user)
    data = {}
    for i in wishlist_items:
        i_data = [
            i.title,
            i.description,
            i.price,
            i.owner.username,
            request.build_absolute_uri(i.photo.url)
        ]
        data[i.title] = i_data
    print(data)
    return JsonResponse(data)

    # full_wishlist = []
    # for i in wishlist_items:
    #     i_data = {
    #         "title": i.title,
    #         "price": i.price,
    #         "description": i.description,
    #         "photo": request.build_absolute_uri(i.photo.url),
    #         "owner": i.owner.username
    #     }
    #     full_wishlist.append(i_data)
    # return JsonResponse({"wishlist": full_wishlist})

# class AddWishlistItemView(View):
#     def get(self, request):
#         form = WishlistForm()
#         form_data = {field.name: field.value() for field in form}
#         return JsonResponse({'form': form_data})
    
#     def post(self, request):
#         form = WishlistForm(request.POST, request.FILES)
#         if form.is_valid():
#             item = form.save()
#             return JsonResponse({'status': 'success', 'item_id': item.id})
#         return JsonResponse({'status': 'error', 'errors': form.errors})

# add wishlist item
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def add_wishlist_item(request):
    data = json.loads(request.body)
    title = data.get('title', None)
    description = data.get("description", None)
    owner = get_object_or_404(User,username=(data.get("owner", None)))
    price = data.get("price", None)
    photo = data.get("photo", None)

    newWishlistItem = Wishlist(title=title, price=price, description=description, photo=photo, owner=owner)
    newWishlistItem.save()
    
    return JsonResponse({"success": True, "wishlist_item_id": newWishlistItem.id})

# class RemoveWishlistItemView(View):
#     def post(self, request, pk):
#         item = get_object_or_404(Wishlist, pk=pk)
#         item.delete()
#         return JsonResponse({'status': 'success', 'item_id': pk})

# remove wishlist item
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def remove_wishlist_item(request, wishlist_id):
    wishlist_item = get_object_or_404(Wishlist, pk=wishlist_id)
    wishlist_item.delete()
    return JsonResponse({"status": "success"})

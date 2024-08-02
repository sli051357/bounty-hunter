from django.shortcuts import render, redirect
from django.views import View
from .models import Wishlist
from .forms import WishlistForm

class WishlistView(View):
    def get(self, request):
        items = Wishlist.objects.all()
        return render(request, 'wishlist/wishlist.html', {'items': items})

class AddWishlistItemView(View):
    def get(self, request):
        form = WishlistForm()
        return render(request, 'wishlist/add_item.html', {'form': form})
    
    def post(self, request):
        form = WishlistForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('wishlist')
        return render(request, 'wishlist/add_item.html', {'form': form})

class RemoveWishlistItemView(View):
    def post(self, request, pk):
        item = Wishlist.objects.get(pk=pk)
        item.delete()
        return redirect('wishlist')
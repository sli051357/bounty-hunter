from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views import View
from .models import Wishlist
from .forms import WishlistForm

class WishlistView(View):
    def get(self, request):
        items = Wishlist.objects.all().values()
        return JsonResponse(list(items), safe=False)

class AddWishlistItemView(View):
    def get(self, request):
        form = WishlistForm()
        form_data = {field.name: field.value() for field in form}
        return JsonResponse({'form': form_data})
    
    def post(self, request):
        form = WishlistForm(request.POST, request.FILES)
        if form.is_valid():
            item = form.save()
            return JsonResponse({'status': 'success', 'item_id': item.id})
        return JsonResponse({'status': 'error', 'errors': form.errors})

class RemoveWishlistItemView(View):
    def post(self, request, pk):
        item = get_object_or_404(Wishlist, pk=pk)
        item.delete()
        return JsonResponse({'status': 'success', 'item_id': pk})
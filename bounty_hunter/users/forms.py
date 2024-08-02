from django import forms
from .models import Wishlist


class AccountCreationForm(forms.Form):
    username = forms.CharField(label="Username", max_length=150)
    password = forms.CharField(label="Password", max_length=150)
    email = forms.CharField(label="Password", max_length=150)

class WishlistForm(forms.ModelForm):
    class Meta:
        model = Wishlist
        fields = ['title', 'price', 'URL', 'photo', 'owner']
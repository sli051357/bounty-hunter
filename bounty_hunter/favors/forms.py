from django import forms
from .models import Favor

# favor form 
class FavorForm(forms.ModelForm):
    class Meta:
        model = Favor
        # might need to add back 'status'
        fields = ['name', 'description', 'assignee', 'total_owed_type',
                  'total_owed_amt', 'total_owed_wishlist', 'privacy', 'active', 'completed']
        
# class TagForm(forms.ModelForm):
#     class Meta:
#         model = Tag
#         fields = ['emoji', 'name', 'color']

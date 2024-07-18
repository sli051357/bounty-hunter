from django import forms
from .models import Favor, Tag

# favor form 
class FavorForm(forms.ModelForm):
    class Meta:
        model = Favor
        # might need to add back 'status'
        fields = ['name', 'description', 'assignee', 'total_owed_type',
                  'total_owed_amt', 'privacy', 'status', 'tags']
        
class TagForm(forms.ModelForm):
    class Meta:
        model = Tag
        fields = ['name', 'color', 'tag_type']

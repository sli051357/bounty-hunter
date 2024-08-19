from django import forms
from .models import Favor, Tag

# favor form 
class FavorForm(forms.ModelForm):
    class Meta:
        model = Favor
        # might need to add back 'status'
        fields = ['name', 'description', 'assignee', 'total_owed_type',
                  'total_owed_amt', 'total_owed_wishlist', 'privacy', 'active', 'completed', 'tags']
        
class TagForm(forms.ModelForm):
    class Meta:
        model = Tag
        fields = ['emoji', 'name', 'color']

    def clean_custom_color(self):
        color = self.cleaned_data['color']
        if not color.startswith('#') or len(color) != 7:
            raise forms.ValidationError("Enter a valid hex color code.")
        return color

from django import forms
from .models import Favor, Tag

class FavorForm(forms.ModelForm):
    class Meta:
        model = Favor
        fields = ['name', 'description', 'assignee', 'total_owed_type',
                  'total_owed_amt', 'privacy', 'status']

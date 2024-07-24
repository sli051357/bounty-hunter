from django import forms


class AccountCreationForm(forms.Form):
    username = forms.CharField(label="Username", max_length=150)
    password = forms.CharField(label="Password", max_length=150)
    email = forms.CharField(label="Password", max_length=150)
    
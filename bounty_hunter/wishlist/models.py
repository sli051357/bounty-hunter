from django.db import models
from django.contrib.auth.models import User

class Wishlist(models.Model):
    title = models.CharField(max_length=100)
    price = models.IntegerField(default=0)
    URL = models.URLField(max_length=200, blank=True)
    photo = models.ImageField(upload_to='res/')
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
from django.db import models
import PIL
from django.contrib.auth.models import User
# Create your models here.

#model for storing bio and profile image. Each user has only one owner.
class UserProfileInfo(models.Model):
    friends = models.ManyToManyField(User, related_name='friends',blank=True)
    bio_text = models.CharField(max_length=200)
    profile_image = models.ImageField(upload_to='res/')
    owner = models.OneToOneField(User, on_delete=models.CASCADE)
    def __str__(self):
        return self.owner.username

class FriendRequest(models.Model):
    from_user = models.ForeignKey(User, related_name='from_user',on_delete=models.CASCADE)    
    to_user = models.ForeignKey(User, related_name='to_user', on_delete=models.CASCADE)    


#model for storing linked accounts. Many linked accounts may share a single owner.
class LinkedAccounts(models.Model):
    id = models.AutoField(primary_key=True)
    account_text = models.CharField(max_length=100)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    def __str__(self):
        return self.account_text    

#model for storing wishlist
class Wishlist(models.Model):
    title = models.CharField(max_length=100)
    price = models.IntegerField(default=0)
    URL = models.URLField(max_length=200, blank=True)
    photo = models.ImageField(upload_to='res/')
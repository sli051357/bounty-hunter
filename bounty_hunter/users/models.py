from django.db import models
import PIL
from django.contrib.auth.models import User
import random

def create_new_ref_number():
      return str(random.randint(1000000000, 9999999999))

#model for storing bio and profile image. Each user has only one owner.
class UserProfileInfo(models.Model):
    friends = models.ManyToManyField(User, related_name='friends',blank=True)
    favoritedFriends = models.ManyToManyField(User, related_name='favorited_friends',blank=True)
    bio_text = models.CharField(max_length=200)
    profile_image = models.ImageField(upload_to='users/res/',max_length=100,default="users/res/default_pfp.png")
    owner = models.OneToOneField(User, on_delete=models.CASCADE)
    code = models.CharField(
           max_length = 10,
           blank=True,
           unique=True,
           default=create_new_ref_number
      ) #add back in editbale = False after debug.
    public_status = models.BooleanField(default=True)
    rating = models.IntegerField(default=0)
    def __str__(self):
        return self.owner.username
    

#model for storing linked accounts. Many linked accounts may share a single owner.
class LinkedAccounts(models.Model):
    id = models.AutoField(primary_key=True)
    provider_text = models.CharField(max_length=100)
    account_text = models.CharField(max_length=100)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    def __str__(self):
        return self.account_text

#model for Friend Requests
class FriendRequest(models.Model):
    from_user = models.ForeignKey(User, related_name='from_user',on_delete=models.CASCADE)    
    to_user = models.ForeignKey(User, related_name='to_user', on_delete=models.CASCADE)  

from django.db import models
import PIL
from django.contrib.auth.models import User
# Create your models here.

#model for storing bio and profile image. Each user has only one owner.
class UserProfileInfo(models.Model):
    bio_text = models.CharField(max_length=200)
    profile_image = models.ImageField()
    owner = models.OneToOneField(User, on_delete=models.CASCADE)
    rating_score = models.IntegerField(max_length=None, default=0)
    friend_count = models.IntegerField(max_length=None, default=0)
    pubpriv_status = models.BooleanField(default=True) # true = public
    def __str__(self):
        return self.owner.username


#model for storing linked accounts. Many linked accounts may share a single owner.
class LinkedAccounts(models.Model):
    id = models.AutoField(primary_key=True)
    account_text = models.CharField(max_length=100)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    def __str__(self):
        return self.account_text    


from django.db import models
import PIL

# Create your models here.

#Stores username and password info.
class UserAccount(models.Model):
    username_text = models.CharField(max_length=16)
    password_text = models.CharField(max_length=16)
    def __str__(self):
        return self.username_text


#model for storing bio and profile image. Each user has only one owner.
class UserProfileInfo(models.Model):
    bio_text = models.CharField(max_length=200)
    profile_image = models.ImageField()
    owner = models.OneToOneField(UserAccount, on_delete=models.CASCADE)
    def __str__(self):
        return self.owner.username_text


#model for storing linked accounts. Many linked accounts may share a single owner.
class LinkedAccounts(models.Model):
    account_text = models.CharField(max_length=100)
    owner = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    def __str__(self):
        return self.account_text    


from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator
from django.test import tag
from django.utils import timezone
#from django.contrib.postgres.fields import ArrayField
from datetime import datetime
from wishlist.models import Wishlist

# Create your models here.
# Tag class
class Tag(models.Model):
    # currently forces each tag to have a name - do we want to have default tag names? or make names optional?
    name = models.CharField(max_length=20)
    color = models.CharField(max_length=7, 
                            validators=[RegexValidator(regex=r"^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$", message="Enter a valid hex code, ie #123456 or #ABC")],
                            help_text="Enter a valid hex code, ie #123456 or #ABC")
    owner = models.ForeignKey(User, on_delete=models.CASCADE, default=1, related_name="owned_tags")

    # preset or custom tag 
    PRESET = "Preset"
    CUSTOM = "Custom"
    tag_type_choices = [(PRESET, "Preset"), (CUSTOM, "Custom"),]
    tag_type = models.CharField(max_length=6, choices=tag_type_choices)

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

# Favor class
class Favor(models.Model):
    # related_name allows you to use User.owned_favors to see all favors they have created
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="owned_favors")
    name = models.CharField(max_length=60)
    description = models.TextField(max_length=600)
    created_at = models.DateTimeField(default=timezone.now) # only gives date, not time
    updated_at = models.DateTimeField(auto_now=True)
    tags = models.ManyToManyField(Tag, blank=True, related_name="tagged_favors")


    deleted = models.BooleanField(default=False) 
    completed = models.BooleanField(default=False)

    # is inactive if has been edited, or hasn't been accepted yet. Upon edits, old favor becomes inactive and new one becomes active. If accepted, old favor gets deleted, 
    # if rejected reactivate old favor and delete new one.
    active = models.BooleanField(default=False)

    #set to None if hasnt been edited.
    previous_favor = models.ForeignKey('self', on_delete=models.CASCADE, blank=True, null=True)

    # related_name allows you to use User.assigned_favors to view all assigned favors
    assignee = models.ForeignKey(User, on_delete=models.CASCADE, related_name="assigned_favors")

    # store whether the favor is monetary/nonmonetary, then store dollar amount if monetary
    MONETARY = "Monetary"
    NONMONETARY = "Nonmonetary"
    total_owed_choices = [(MONETARY, "Monetary"), (NONMONETARY, "Nonmonetary"),]
    total_owed_type = models.CharField(max_length=11, choices=total_owed_choices)
    total_owed_amt = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
    total_owed_wishlist = models.ForeignKey(Wishlist, on_delete=models.SET_NULL, blank=True, null=True)     # should enable dropdown of wishlist items 
    
    # privacy settings
    PRIVATE = "Private"
    PUBLIC = "Public"
    privacy_choices = [(PRIVATE, "Private"), (PUBLIC, "Public"),]
    privacy =  models.CharField(max_length=7, choices=privacy_choices)
    
    CREATE = "Create"
    DELETE = "Delete"
    COMPLETE = "Complete"
    INCOMPLETE = "Incomplete"
    EDIT = "Edit"
    CANCEL = "Cancel" 

    status_choices = [(CREATE, "Create"),(DELETE,"Delete"),(EDIT, "Edit"),(CANCEL, "Cancel"),(COMPLETE, "Complete"), (INCOMPLETE, "Incomplete")]

    # these contain the state of the favor
    owner_status = models.CharField(max_length=16, choices=status_choices, default=INCOMPLETE)
    assignee_status = models.CharField(max_length=16, choices=status_choices, default=INCOMPLETE)


    def __str__(self):
        return "%s - created by %s" % (self.name, self.owner)
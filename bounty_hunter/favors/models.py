from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator
from django.test import tag
from django.utils import timezone
#from django.contrib.postgres.fields import ArrayField
import datetime

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
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    tags = models.ManyToManyField(Tag, blank=True, related_name="tagged_favors")

    # related_name allows you to use User.assigned_favors to view all assigned favors
    assignee = models.ForeignKey(User, on_delete=models.CASCADE, related_name="assigned_favors")

    # store whether the favor is monetary/nonmonetary, then store dollar amount if monetary
    MONETARY = "Monetary"
    NONMONETARY = "Nonmonetary"
    total_owed_choices = [(MONETARY, "Monetary"), (NONMONETARY, "Nonmonetary"),]
    total_owed_type = models.CharField(max_length=11, choices=total_owed_choices)
    total_owed_amt = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
    
    # privacy settings
    PRIVATE = "Private"
    PUBLIC = "Public"
    privacy_choices = [(PRIVATE, "Private"), (PUBLIC, "Public"),]
    privacy =  models.CharField(max_length=7, choices=privacy_choices)
    
    # status of the favor
    PENDING_CREATION = "Pending_creation" #1
    PENDING_EDITS = "Pending_edits" #2
    PENDING_DELETION = "Pending_deletion" #3
    INCOMPLETE = "Incomplete" #4
    COMPLETE = "Complete" #5
    status_choices = [(PENDING_CREATION, "Pending_creation"), (PENDING_EDITS, "Pending_edits"), 
                      (PENDING_DELETION, "Pending_deletion"), (INCOMPLETE, "Incomplete"),
                      (COMPLETE, "Complete"), ]
    status = models.CharField(max_length=16, choices=status_choices)


    points_value = models.IntegerField()

    #favor only has 1 status
    #status function as switches. Default: None, None
    # if one status switches to Create, the other can either switch to Create or Cancel. One status switch also sets the status to Pending_[something]
    # cancel reests to None, None
    # Create Create switches to None, None, but also changes the favors status, like from Pending_creation to incomplete.
    CREATE = "Create"
    DELETE = "Delete"
    COMPLETE = "Complete"
    EDIT = "Edit"
    CANCEL = "Cancel" 
    NONE = "None"

    request_choices = [CREATE,DELETE,COMPLETE,INCOMPLETE,EDIT]

    owner_status = models.CharField(max_length=16, choices=request_choices)
    assignee_status = models.CharField(max_length=16, choices=request_choices)


    def __str__(self):
        return "%s - created by %s" % (self.name, self.owner)
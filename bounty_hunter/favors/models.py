from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator

# Create your models here.
# favor class
class Favor(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=60)
    description = models.CharField(max_length=600)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Edit later to create dropdown search option -- must add assigned_favors
    # related_name allows you to use User.assigned_favors to view all favors
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
    PENDING = "Pending"
    COMPLETE = "Complete"
    INCOMPLETE = "Incomplete"
    status_choices = [(PENDING, "Pending"), (COMPLETE, "Complete"), (INCOMPLETE, "Incomplete"),]
    status = models.CharField(max_length=10, choices=status_choices)

    tags = models.ManyToManyField('Tag')

    def __str__(self):
        return "Favor:%s (created by %s)" % (self.name, self.owner)

# tag class
class Tag(models.Model):
    # currently forces each tag to have a name - do we want to have default tag names? or make names optional?
    name = models.CharField(max_length=10)
    color = models.CharField(max_length=7, 
                            validators=RegexValidator(regex=r"^#([a-f0-9]{6}|[a-f0-9]{3})$", message="Enter a valid hex code, ie #123456 or #ABC"),
                            help_text="Enter a valid hex code, ie #123456 or #ABC")
    
    # preset or custom tag 
    PRESET = "Preset"
    CUSTOM = "Custom"
    tag_type_choices = [(PRESET, "Preset"), (CUSTOM, "Custom"),]
    tag_type = models.CharField(max_length=6, choices=tag_type_choices)

    def __str__(self):
        return self.name
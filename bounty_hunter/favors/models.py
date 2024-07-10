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
    status_choices = {PENDING: "Pending", COMPLETE: "Complete", INCOMPLETE: "Incomplete",}
    status = models.CharField(max_length=10, choices=status_choices)

    def __str__(self):


#class Tag(models.Model):
    #name = models.CharField(max_length=10, blank=True, null=True)
    #color = models.CharField(max_length=7, validators=RegexValidator(regex=))
    
    # preset or custom tag
    #tag_type =
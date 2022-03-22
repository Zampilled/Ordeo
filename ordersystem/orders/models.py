from django.contrib.auth import get_user_model
from django.db import models


User = get_user_model()

# Create your models here.



class Order(models.Model):
    orderDate = models.DateField()
    sent = models.BooleanField(default=False)
    recieved = models.BooleanField(default=False)
    owner = models.ForeignKey(User, blank=True, null=True, on_delete=models.CASCADE,)
    payment = models.CharField(max_length=50, blank=True)
    delivery = models.CharField(max_length=50,  blank=True)
    #products = models.CharField(max_length=500)
    total = models.FloatField(default=0)
from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(blank=True, upload_to='img/')
    price = models.FloatField()
    description = models.CharField(max_length=50, blank=True)




from django.db import models




class Product(models.Model):

    name = models.CharField(max_length=100)
    image = models.ImageField(blank=True, upload_to='images/' )
    price = models.FloatField()
    #quantity = models.IntegerField(blank=True, default=0)
    description = models.CharField(max_length=50, blank=True)




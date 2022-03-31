from django.db import models

from ordeo.apps.core.mixins.models import UpdatedAtMixin, CreatedAtMixin


class Product(CreatedAtMixin, UpdatedAtMixin, models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(blank=True, upload_to='img/')
    price = models.FloatField()
    description = models.CharField(max_length=50, blank=True)

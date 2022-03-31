# Register your models here.
from django.contrib import admin

from ordeo.apps.products.models import Product


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'price']

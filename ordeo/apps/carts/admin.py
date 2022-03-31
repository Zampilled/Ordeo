# Register your models here.
from django.contrib import admin

from ordeo.apps.carts.models import CartItem, Cart, OrderItem, Order


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    pass


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    pass


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    pass


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    pass

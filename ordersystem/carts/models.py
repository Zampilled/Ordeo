from django.contrib.auth import get_user_model
from django.db import models
from products.models import Product

User = get_user_model()


class CartItem(models.Model):
    owner = models.ForeignKey(User , on_delete=models.CASCADE, blank=True, null=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    ordered = models.BooleanField(default=False)
    name = models.CharField(max_length=100)
    image = models.ImageField(blank=True, upload_to='images/' )
    price = models.FloatField()
    description = models.CharField(max_length=50, blank=True)


    def __str__(self):
        return f"{self.quantity} of {self.product.name}"

    @property
    def subtotal(self):
        return self.quantity*self.price


class Cart(models.Model):
    owner = models.ForeignKey(User, blank=True, null=True, on_delete=models.CASCADE)
    products = models.ManyToManyField(CartItem, related_name="CartItem",blank=True, null=True)

    @property
    def total(self):
        return sum([CartItem.subtotal for CartItem in self.products.all()])


class OrderItem(models.Model):
    name = models.CharField(max_length=100)
    quantity = models.IntegerField()


class Order(models.Model):
    PaymentChoices = [
        ('Cash', 'Cash'),
        ('Online Payment', 'Online Payment Provider'),
        ('Visa', 'Visa')
    ]
    DeliveryChoices = (
        ('Pick-up', 'Pick-up'),
        ('Normal Delivery', 'Normal Delivery' ),
        ('Fast Delivery', 'Fast Delivery')
    )
    payment = models.CharField(max_length=50, choices=PaymentChoices, blank=True)
    delivery = models.CharField(max_length=50, choices=DeliveryChoices, blank=True)
    owner = models.ForeignKey(User, blank=True, null=True, on_delete=models.CASCADE)
    sent = models.BooleanField(default=False)
    received = models.BooleanField(default=False)
    products = models.ManyToManyField(OrderItem, related_name='OrderItem', blank=False)
    total = models.PositiveIntegerField()

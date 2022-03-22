from django.contrib.auth import get_user_model
from django.db import models
from products.models import Product

User = get_user_model()


# Create your models here.




class CartItem(models.Model):
    owner = models.ForeignKey(User , on_delete=models.CASCADE, blank=True, null=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    ordered = models.BooleanField(default=False)
    name = models.CharField(max_length=100)
    image = models.ImageField(blank=True, upload_to='images/' )
    price = models.FloatField()
    description = models.CharField(max_length=50, blank=True)
    #subtotal = models.FloatField(default=0)


    def __str__(self):
        return f"{self.quantity} of {self.product.name}"

    @property
    def subtotal(self):
        return self.quantity*self.price



class Cart(models.Model):
    PaymentChoices = (
        ('C', 'Cash'),
        ('O', 'Online Payment Provider'),
        ('V', 'Visa')
    )
    DeliveryChoices = (
        ('P', 'Pick-up'),
        ('N', 'Normal Delivery' ),
        ('F', 'Fast Delivery')
    )

    owner = models.ForeignKey(User, blank=True, null=True, on_delete=models.CASCADE,)
    payment = models.CharField(max_length=1, choices=PaymentChoices, blank=True)
    delivery = models.CharField(max_length=1, choices=DeliveryChoices, blank=True)
    ordered = models.BooleanField(default=False)
    products = models.ManyToManyField(CartItem, related_name="CartItem",blank=True, null=True)

    def __str__(self):
        return self.user.username

    @property
    def total(self):
        return sum([CartItem.subtotal for CartItem in self.products.all()])
#from .api import CartAPI
from django.urls import path

# from .api import CartAPI
from .api import ViewCartAPI, UpdateCartAPI, CartAPI, CheckoutAPI

#from .views import add_to_cart


urlpatterns = [
        path('api/cart', CartAPI.as_view(), name='api-cart'),
        path('api/cart/order', UpdateCartAPI.as_view(), name='api-order'),
        path('api/cart/checkout', CheckoutAPI.as_view(), name='api-checkout')

]
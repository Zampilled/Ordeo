#from .api import CartAPI
from django.urls import path

# from .api import CartAPI
from .api import ViewCartAPI, UpdateCartAPI, CartAPI

#from .views import add_to_cart


urlpatterns = [
        path('api/orderitem', UpdateCartAPI.as_view(), name='api-addorder'),
        path('api/cart/test', ViewCartAPI.as_view(), name='api-order'),
        path('api/cart', CartAPI.as_view(), name='api-cart'),
]
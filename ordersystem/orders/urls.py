from django.urls import path
from .api import ViewOrdersAPI

urlpatterns = [
    path('api/order', ViewOrdersAPI.as_view(), name='api-order'),



]
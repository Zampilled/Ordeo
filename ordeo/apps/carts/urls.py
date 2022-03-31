from django.urls import path
from .views import AdminOrderAPI, OrderAPI, SendOrderAPI, OrderReceivedAPI, CartAPI, UpdateCartAPI, CheckoutAPI

urlpatterns = [
    path('api/cart', CartAPI.as_view(), name='api-cart'),
    path('api/cart/order', UpdateCartAPI.as_view(), name='api-order'),
    path('api/cart/checkout', CheckoutAPI.as_view(), name='api-checkout'),
    path('api/orders/admin', AdminOrderAPI.as_view(), name='api-admin-orders-view'),
    path('api/orders/admin/send', SendOrderAPI.as_view(), name='api-admin-send-order'),
    path('api/orders', OrderAPI.as_view(), name='api-orders-view'),
    path('api/orders/received', OrderReceivedAPI.as_view(), name='api-order-received'),
]

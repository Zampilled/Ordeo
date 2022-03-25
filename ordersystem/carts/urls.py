from django.urls import path
from .api import UpdateCartAPI, CartAPI, CheckoutAPI, AdminOrderAPI, SendOrderAPI, OrderAPI,OrderRecievedAPI, DeleteAll

urlpatterns = [

        path('api/cart', CartAPI.as_view(), name='api-cart'),
        path('api/cart/order', UpdateCartAPI.as_view(), name='api-order'),
        path('api/cart/checkout', CheckoutAPI.as_view(), name='api-checkout'),
        path('api/orders/admin', AdminOrderAPI.as_view(), name='api-admin-orders-view'),
        path('api/orders/admin/send', SendOrderAPI.as_view(), name='api-admin-send-order'),
        path('api/orders', OrderAPI.as_view(), name='api-orders-view'),
        path('api/orders/received', OrderRecievedAPI.as_view(), name='api-order-received'),
        path('api/delete', DeleteAll.as_view(), name='api-delete')
]
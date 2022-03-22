from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions, status
from rest_framework.generics import ListAPIView
from rest_framework.response import Response

from .models import Order
from .serializers import OrderSerializer


class ViewOrdersAPI(generics.ListAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = OrderSerializer

    def get_queryset(self):
        cartitemqs = Order.objects.all()
        return cartitemqs



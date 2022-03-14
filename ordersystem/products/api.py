from rest_framework import viewsets, permissions

from .models import Product
from .serializers import ProductSerializer


class ProductViewSet(viewsets.ModelViewSet):

    permission_classes = [
        permissions.AllowAny
    ]


    serializer_class = ProductSerializer

    def get_queryset(self):
        return Product.objects.all()





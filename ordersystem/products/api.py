from rest_framework import viewsets, permissions

from .models import Product
from .serializers import ProductSerializer


class ProductViewSet(viewsets.ModelViewSet):

    serializer_class = ProductSerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes = [permissions.IsAuthenticated]
        else:
            self.permission_classes = [permissions.NOT]
        return super(ProductViewSet, self).get_permissions()        

    def get_queryset(self):
        return Product.objects.all()


from rest_framework import viewsets, permissions

from ordeo.apps.core.mixins.permissions import PermissionsByActionMixin
from ordeo.apps.products.models import Product
from ordeo.apps.products.serializers import ProductSerializer


class ProductViewSet(PermissionsByActionMixin, viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    # default permissions
    permission_classes = [permissions.IsAdminUser]
    # overriding permissions by action
    permission_classes_dict = {
        'retrieve': [permissions.IsAuthenticated],
        'list': [permissions.IsAuthenticated],
    }

    def get_queryset(self):
        return Product.objects.all()

from rest_framework import serializers

from .models import Cart
from .models import CartItem


class AddProductSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    quantity = serializers.IntegerField(default=1)


class CartItemSerializer(serializers.ModelSerializer):
    subtotal = serializers.FloatField()

    class Meta:
        model = CartItem
        fields = '__all__'


class CartSerializer(serializers.ModelSerializer):
    owner = serializers.CurrentUserDefault()
    total = serializers.FloatField()
    products = CartItemSerializer(read_only=True, many=True)

    class Meta:
        model = Cart
        fields = '__all__'
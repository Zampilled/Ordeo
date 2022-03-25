from rest_framework import serializers

from .models import Cart,CartItem, OrderItem,Order




class AddProductSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    quantity = serializers.IntegerField(default=1)

class SendSerializer(serializers.Serializer):
    id = serializers.IntegerField()

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



class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    products = OrderItemSerializer(read_only=True, many=True)
    class Meta:
        model = Order
        fields = '__all__'

class CheckoutSerializer(serializers.Serializer):
    payment = serializers.CharField(max_length=50, allow_blank=False)
    delivery = serializers.CharField(max_length=50, allow_blank=False)

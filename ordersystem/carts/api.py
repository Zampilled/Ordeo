from django.shortcuts import get_object_or_404
from products.models import Product
from rest_framework import generics, permissions, status
from rest_framework.generics import ListAPIView
from rest_framework.response import Response

from .models import CartItem, Cart
from .serializers import CartSerializer, CartItemSerializer, AddProductSerializer, CheckoutSerializer, SendSerializer


class CartAPI(ListAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = CartSerializer

    def get_queryset(self):
        return Cart.objects.filter(owner=self.request.user)



class ViewCartAPI(generics.ListAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = Cart

    def get_queryset(self):
        cartitemqs = CartItem.objects.all()
        return cartitemqs


#Add To Cart
class UpdateCartAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = CartItemSerializer

    def patch(self, request):
        serializer = AddProductSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        product = get_object_or_404(Product, pk=data['id'])
        quantity = data['quantity']

        cart_qs = Cart.objects.filter(owner=self.request.user)
        if cart_qs.exists():
            cart = cart_qs[0]
            if cart.products.filter(product__pk=product.pk).exists():
                item = cart.products.get(product = product.pk)
                item.quantity = quantity
                item.save()
                return Response({"message": "Quantity Updated"
                                 },
                                status=status.HTTP_200_OK
                                )
            else:
                return Response({"message": "Product doesnt exist",
                                 },
                                status=status.HTTP_400_BAD_REQUEST
                                )

    def post(self, request):
        serializer = AddProductSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        product = get_object_or_404(Product, pk=data['id'])
        quantity = data['quantity']
        cart_qs = Cart.objects.filter(owner=self.request.user)
        if cart_qs.exists():
            cart = cart_qs[0]
            if cart.products.filter(product__pk=product.pk).exists():
                item = cart.products.get(product = product.pk)
                item.quantity += quantity
                item.save()

                return Response({"message": "Quantity Added",
                                 },
                                status=status.HTTP_200_OK
                                )
            else:
                cart.products.create(
                    product=product,
                    owner=self.request.user,
                    quantity=quantity,
                    name=product.name,
                    price=product.price,
                    image=product.image,
                    description=product.description,
                )
                return Response({"message": " Item added to your cart", },
                                status=status.HTTP_200_OK,
                                )
        else:

            cart = Cart.objects.create(owner=self.request.user)
            cart.products.create(
                product=product,
                owner=self.request.user,
                quantity=quantity,
                name=product.name,
                price=product.price,
                image=product.image,
                description=product.description,
            )
            return Response({"message": "Order is created & Item added to your cart", },
                            status=status.HTTP_200_OK,)

    def put(self, request, *args, **kwargs):
        serializer = AddProductSerializer(data=request.data)
        serializer.is_valid()
        data = serializer.validated_data
        product = CartItem.objects.filter(product=data['id'])
        product.delete()
        return Response({
            "id": data['id'],
        },status=status.HTTP_200_OK,)


#Checkout Api

class CheckoutAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = CartItemSerializer

    def post(self, request):
        serializer = CheckoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        cart_qs = Cart.objects.filter(owner=self.request.user)
        cartitem_qs = CartItem.objects.filter(owner=self.request.user)
        if cartitem_qs.exists():
            if cart_qs.exists():
                cart = cart_qs[0]
                cart.payment = data['payment']
                cart.delivery = data['delivery']
                Cart.objects.create(owner=self.request.user)
                return Response({'status': 'Checkout Complete'},
                                status=status.HTTP_200_OK)
            else:
                Cart.objects.create(owner=self.request.user)
                return Response({'status': 'Cart Doesnt Exist. Creating One.'},
                                status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'status': 'Cart Is Empty'}, status=status.HTTP_400_BAD_REQUEST)

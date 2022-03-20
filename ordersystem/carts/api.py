from django.shortcuts import get_object_or_404
from products.models import Product
from rest_framework import generics, permissions, status
from rest_framework.generics import ListAPIView
from rest_framework.response import Response

from .models import CartItem, Cart
from .serializers import CartSerializer, CartItemSerializer, AddProductSerializer


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
    serializer_class = CartItemSerializer

    def get_queryset(self):
        cartitemqs = CartItem.objects.filter(owner=self.request.user, ordered=False)
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
        cart_product, created = CartItem.objects.get_or_create(
            product=product,
            owner=self.request.user,
            ordered=False,
            name=product.name,
            price=product.price,
            image=product.image,
            description=product.description,


        )
        cart_qs = Cart.objects.filter(owner=self.request.user, ordered=False)
        if cart_qs.exists():
            cart = cart_qs[0]
            if cart.products.filter(product__pk=product.pk).exists():
                cart_product.quantity = quantity
                cart_product.save()
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
        cart_product, created = CartItem.objects.get_or_create(
            product=product,
            owner=self.request.user,
            quantity=0,
            ordered=False,
            name=product.name,
            price=product.price,
            image=product.image,
            description=product.description,


        )
        cart_qs = Cart.objects.filter(owner=self.request.user, ordered=False)

        if cart_qs.exists():
            cart = cart_qs[0]

            if cart.products.filter(product__pk=product.pk).exists():
                cart_product.quantity += quantity

                cart_product.save()
                return Response({"message": "Quantity updated",
                                 },
                                status=status.HTTP_200_OK
                                )
            else:
                cart_product.quantity += quantity
                cart.products.add(cart_product)
                return Response({"message": " Item added to your cart", },
                                status=status.HTTP_200_OK,
                                )
        else:

            cart = Cart.objects.create(owner=self.request.user)
            cart_product.quantity = quantity
            cart.products.add(cart_product)
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


# Total api


from django.shortcuts import get_object_or_404
from products.models import Product
from rest_framework import generics, permissions, status
from rest_framework.generics import ListAPIView
from rest_framework.response import Response

from .models import CartItem, Cart, OrderItem, Order
from .serializers import CartSerializer, CartItemSerializer,OrderSerializer, AddProductSerializer, CheckoutSerializer, SendSerializer


class AdminOrderAPI(ListAPIView):
    permission_classes = [
        permissions.IsAdminUser
    ]
    serializer_class = OrderSerializer
    def get_queryset(self):
        return Order.objects.filter(sent=False)


class OrderAPI(ListAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = OrderSerializer
    def get_queryset(self):
        return Order.objects.filter(owner=self.request.user)


class SendOrderAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAdminUser
    ]
    serializer_class = CartSerializer

    def post(self, request):
        serializer = SendSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        id = data['id']
        orderqs = Order.objects.filter(id=id)
        if orderqs.exists():
            order = orderqs[0]
            if order.sent == False & order.received == False:
                order.sent = True
                order.save()
                return Response({
                    'status': 'Order sent'
                },status=status.HTTP_200_OK)
            else:
                return Response({
                    'status': 'Order Already Sent'
                },status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({
                'status': 'Order Doesnt Exist'
            })

class OrderRecievedAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = OrderSerializer
    def post(self, request):
        serializer = SendSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        id = data['id']
        orderqs = Order.objects.filter(id=id, owner=request.user)
        if orderqs.exists():
            order = orderqs[0]
            if order.received == False & order.sent == True:
                order.received = True
                order.save()
                return Response({
                    'status': 'Order Received'
                },
                    status=status.HTTP_200_OK)
            else:
                return Response({
                    'status': 'Order Already Received or Not Sent'
                },
                    status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({
                'status': 'Order Doesnt Exist'
            })





class CartAPI(ListAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = CartSerializer

    def get_queryset(self):
        return Cart.objects.filter(owner=self.request.user)



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
                order = Order.objects.create(
                    owner=cart.owner,
                    payment=data['payment'],
                    delivery=data['delivery'],
                    total=cart.total
                )
                i=0
                while i<cart.products.all().count():
                    order.products.create(
                        name=cart.products.all()[i].name,
                        quantity=cart.products.all()[i].quantity
                    )
                    i+=1
                order.save()
                cart.delete()
                Cart.objects.create(owner=self.request.user)
                return Response({'status': 'Checkout Complete'},
                                status=status.HTTP_200_OK)
            else:
                Cart.objects.create(owner=self.request.user)
                return Response({'status': 'Cart Doesnt Exist. Creating One.'},
                                status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'status': 'Cart Is Empty'}, status=status.HTTP_400_BAD_REQUEST)


class DeleteAll(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAdminUser
    ]
    def post(self, request):
        CartItem.objects.all().delete()
        Cart.objects.all().delete()
        Order.objects.all().delete()
        OrderItem.objects.all().delete()
        return Response({
            'status':'Everything gone'
        },status=status.HTTP_200_OK)
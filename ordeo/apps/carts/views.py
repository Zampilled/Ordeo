from django.shortcuts import get_object_or_404
from rest_framework import permissions, generics, status
from rest_framework.generics import ListAPIView
from rest_framework.response import Response

from ordeo.apps.carts.models import Order, Cart, CartItem
from ordeo.apps.carts.serializers import OrderSerializer, CartSerializer, SendSerializer, CartItemSerializer, \
    AddProductSerializer, CheckoutSerializer
from ordeo.apps.products.models import Product


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
        return Order.objects.filter(owner=self.request.user, received=False)


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
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    'status': 'Order Already Sent'
                }, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({
                'status': 'Order Doesnt Exist'
            })


class OrderReceivedAPI(generics.GenericAPIView):
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
            if order.received == False:
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
                if quantity <= 0:
                    item = cart.products.get(product=product.pk)
                    item.delete()
                else:
                    item = cart.products.get(product=product.pk)
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
                item = cart.products.get(product=product.pk)
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
                            status=status.HTTP_200_OK, )

    def put(self, request, *args, **kwargs):
        serializer = AddProductSerializer(data=request.data)
        serializer.is_valid()
        data = serializer.validated_data
        product = CartItem.objects.filter(product=data['id'])
        product.delete()
        return Response({
            "id": data['id'],
        }, status=status.HTTP_200_OK, )


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
                i = 0
                while i < cart.products.all().count():
                    order.products.create(
                        productId=cart.products.all()[i].product.pk,
                        image=cart.products.all()[i].image,
                        name=cart.products.all()[i].name,
                        quantity=cart.products.all()[i].quantity
                    )
                    i += 1
                order.save()
                cart.delete()
                cartitem_qs.delete()
                Cart.objects.create(owner=self.request.user)
                return Response({'status': 'Checkout Complete'},
                                status=status.HTTP_200_OK)
            else:
                Cart.objects.create(owner=self.request.user)
                return Response({'status': 'Cart Doesnt Exist. Creating One.'},
                                status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'status': 'Cart Is Empty'}, status=status.HTTP_400_BAD_REQUEST)
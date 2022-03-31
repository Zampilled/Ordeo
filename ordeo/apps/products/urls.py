from rest_framework import routers

from .views import ProductViewSet

router = routers.DefaultRouter()
router.register('api/products', ProductViewSet, 'products')

urlpatterns = router.urls
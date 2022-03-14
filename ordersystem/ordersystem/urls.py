from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include

urlpatterns = [
    path('', include('frontend.urls')),
    path('', include('products.urls')),
    path('', include('accounts.urls')),
    path('', include('carts.urls'))

    ]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

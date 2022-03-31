from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Ordeo API",
        default_version='v1',
        description="An inventory ordering full stack app using Django Rest Framewor",
        contact=openapi.Contact(email="contact@snippets.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)


urlpatterns = [
    path('', include('frontend.urls')),
    path('', include('products.urls')),
    path('', include('accounts.urls')),
    path('', include('carts.urls')),
    path('swagger', schema_view.with_ui('swagger', cache_timeout=0), name="schema-swagger-ui"),

    ]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

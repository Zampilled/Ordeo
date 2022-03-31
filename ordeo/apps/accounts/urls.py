from django.urls import path, include
import knox
from .views import RegisterAPI, LoginAPI, UserAPI

urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/logout', knox.views.LogoutView().as_view())
]
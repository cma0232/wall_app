from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import UserViewSet, WallViewSet

router = routers.DefaultRouter()
router.register('users', UserViewSet)
router.register('wall', WallViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

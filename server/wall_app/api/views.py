
from .serializers import UserSerializer, WallSerializer
from django.contrib.auth.models import User
from rest_framework import viewsets
from .models import Wall

class UserViewSet(viewsets.ModelViewSet):
   
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
class WallViewSet(viewsets.ModelViewSet):
    queryset = Wall.objects.all()
    serializer_class = WallSerializer


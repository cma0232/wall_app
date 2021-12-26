
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .models import Wall
from django.core.mail import send_mail


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username','email', 'password']
        
        # hide pwd
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        # hash pwd
        Token.objects.create(user=user)

        send_mail(
            'Welcome!🥳',
            'Welcome to your wall. Hurry up and post your first message!',
            'shiningmch@gmail.com',
            [validated_data['email']],
            fail_silently=False,
        )
        return user


class WallSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wall
        fields = ['id', 'message']

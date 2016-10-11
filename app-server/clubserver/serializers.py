"""Serializers."""


from django.contrib.auth.models import User
from userprofile.serializers import UserProfileSerializer
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    """User serializer."""

    class Meta:
        """Meta."""

        depth = 1
        model = User
        profile = UserProfileSerializer(required=False)
        fields = (
            'url',
            'username',
            'email',
            'is_staff',
            'profile',
        )

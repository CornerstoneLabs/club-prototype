"""Serializers."""


from django.contrib.auth.models import User
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    """User serializer."""

    class Meta:
        """Meta."""

        model = User
        fields = ('url', 'username', 'email', 'is_staff')
4

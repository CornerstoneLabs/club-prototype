"""User profile serializers."""
from rest_framework import serializers
from userprofile.models import UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
    """UserProfile serializer."""

    class Meta:
        """Meta."""

        model = UserProfile
        field = (
            'name',
            'image_url',
        )

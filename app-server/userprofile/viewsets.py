"""Viewsets."""
from userprofile.serializers import UserProfileSerializer
from userprofile.models import UserProfile
from rest_framework import viewsets


class UserProfileViewSet(viewsets.ModelViewSet):
    """Profile viewset."""

    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

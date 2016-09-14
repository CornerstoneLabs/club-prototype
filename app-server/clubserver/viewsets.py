"""Viewsets."""

from rest_framework import viewsets
from clubserver.serializers import UserSerializer
from django.contrib.auth.models import User


class UserViewSet(viewsets.ModelViewSet):
    """User view set."""

    queryset = User.objects.all()
    serializer_class = UserSerializer

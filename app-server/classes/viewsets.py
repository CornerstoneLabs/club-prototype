"""Viewsets."""
from classes.models import Class
from classes.models import ClassSession
from classes.models import ClassSessionNotification
from classes.models import Location
from classes.serializers import ClassSerializer
from classes.serializers import ClassSessionNotificationSerializer
from classes.serializers import ClassSessionSerializer
from classes.serializers import LocationSerializer
from rest_framework import viewsets


class ClassViewSet(viewsets.ModelViewSet):
    """Class viewset."""

    queryset = Class.objects.all()
    serializer_class = ClassSerializer


class ClassSessionViewSet(viewsets.ModelViewSet):
    """Class viewset."""

    queryset = ClassSession.objects.all()
    serializer_class = ClassSessionSerializer


class ClassSessionNotificationViewset(viewsets.ModelViewSet):
    """Class session notification."""

    queryset = ClassSessionNotification.objects.all()
    serializer_class = ClassSessionNotificationSerializer


class LocationViewSet(viewsets.ModelViewSet):
    """Location viewset."""

    queryset = Location.objects.all()
    serializer_class = LocationSerializer

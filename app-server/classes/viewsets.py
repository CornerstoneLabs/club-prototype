"""Viewsets."""
from classes.models import Class
from classes.models import Location
from rest_framework import viewsets
from classes.serializers import ClassSerializer
from classes.serializers import LocationSerializer


class ClassViewSet(viewsets.ModelViewSet):
    """Class viewset."""

    queryset = Class.objects.all()
    serializer_class = ClassSerializer


class LocationViewSet(viewsets.ModelViewSet):
    """Location viewset."""

    queryset = Location.objects.all()
    serializer_class = LocationSerializer
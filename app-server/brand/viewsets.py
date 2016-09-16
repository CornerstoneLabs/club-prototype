"""Viewsets."""
from brand.models import Brand
from rest_framework import viewsets
from brand.serializers import BrandSerializer


class BrandViewSet(viewsets.ModelViewSet):
    """Brand viewset."""

    queryset = Brand.objects.all()
    serializer_class = BrandSerializer

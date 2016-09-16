"""Class serializers."""


from rest_framework import serializers
from classes.models import Class
from classes.models import Location


class ClassSerializer(serializers.HyperlinkedModelSerializer):
    """Class serializer."""

    class Meta:
        """Meta."""

        model = Class
        fields = (
            'id',
            'day',
            'start_hours',
            'start_minutes',
            'end_hours',
            'end_minutes',
            'location',
            'title',
            'teacher',
            'image_url',
        )


class LocationSerializer(serializers.HyperlinkedModelSerializer):
    """Location serializer."""

    class Meta:
        """Meta."""

        model = Location
        fields = (
            'title'
        )

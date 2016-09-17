"""Class serializers."""


from rest_framework import serializers
from classes.models import Class
from classes.models import ClassSession
from classes.models import Location


class ClassSerializer(serializers.HyperlinkedModelSerializer):
    """Class serializer."""

    location = serializers.StringRelatedField()
    teacher = serializers.StringRelatedField()

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
            'content',
        )


class ClassSessionSerializer(serializers.HyperlinkedModelSerializer):
    """Class session serializer."""

    class Meta:
        """Meta."""

        model = ClassSession
        fields = (
            'parent_class',
            'session_start',
            'session_end',
            'checked_in'
        )


class LocationSerializer(serializers.HyperlinkedModelSerializer):
    """Location serializer."""

    class Meta:
        """Meta."""

        model = Location
        fields = (
            'title'
        )

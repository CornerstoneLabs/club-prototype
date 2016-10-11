"""Class serializers."""

from classes.models import Class
from classes.models import ClassSession
from classes.models import ClassSessionNotification
from classes.models import Location
from django.contrib.auth.models import User
from rest_framework import serializers


class ClassSerializer(serializers.HyperlinkedModelSerializer):
    """Class serializer."""

    location = serializers.PrimaryKeyRelatedField(queryset=Location.objects.all())
    teacher = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

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
            'max_participants',
            'participants',
        )


class ClassSessionSerializer(serializers.HyperlinkedModelSerializer):
    """Class session serializer."""

    class Meta:
        """Meta."""

        model = ClassSession
        fields = (
            'id',
            'parent_class',
            'session_start',
            'session_end',
            'checked_in',
        )


class ClassSessionNotificationSerializer(serializers.HyperlinkedModelSerializer):
    """Class session notification serializer."""

    class Meta:
        """Meta."""

        model = ClassSessionNotification
        fields = (
            'id',
            'text',
            'date_published',
            'session',
            'liked',
        )


class LocationSerializer(serializers.HyperlinkedModelSerializer):
    """Location serializer."""

    class Meta:
        """Meta."""

        model = Location
        fields = (
            'id',
            'title',
        )

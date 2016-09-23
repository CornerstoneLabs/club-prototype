"""Class views."""

from classes.models import Class
from classes.models import ClassSession
from classes.models import ClassSessionNotification
from classes.serializers import ClassSerializer
from classes.serializers import ClassSessionSerializer
from classes.serializers import ClassSessionNotificationSerializer
from django.http import HttpResponseBadRequest
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json


class UserSerializer(serializers.Serializer):
    """Serialize a user."""

    id = serializers.IntegerField()
    email = serializers.EmailField()
    username = serializers.CharField(max_length=100)


@csrf_exempt
@api_view(['GET'])
def current_user(request):
    """Return the current user."""
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


# NOTE -- THIS SHOULD NOT BE @csrf_exempt - FIX THE COOKINE PROBLEM IN ANGULAR
@csrf_exempt
@api_view(['POST'])
def add_participant(request):
    """Add the current user as a participant to this class."""
    received_json_data = json.loads(request.body.decode("utf-8"))
    class_id = received_json_data['class_id']

    try:
        selected_class = Class.objects.get(id=class_id)
    except Class.DoesNotExist:
        return HttpResponseBadRequest()

    selected_class.participants.add(request.user)
    selected_class.save()

    serializer = ClassSerializer(selected_class, context={'request': request})
    return JsonResponse(serializer.data)


# NOTE -- THIS SHOULD NOT BE @csrf_exempt - FIX THE COOKINE PROBLEM IN ANGULAR
@csrf_exempt
@api_view(['POST'])
def check_in(request):
    """Add the current user as a participant to this class."""
    received_json_data = json.loads(request.body.decode("utf-8"))
    class_session_id = received_json_data['class_session_id']

    try:
        selected_class = ClassSession.objects.get(id=class_session_id)
    except Class.DoesNotExist:
        return HttpResponseBadRequest()

    selected_class.checked_in.add(request.user)
    selected_class.save()

    serializer = ClassSessionSerializer(selected_class, context={'request': request})
    return JsonResponse(serializer.data)


def check_out_process(user, class_session_id):
    """Undo your check in process."""
    try:
        selected_class = ClassSession.objects.get(id=class_session_id)
    except Class.DoesNotExist:
        return HttpResponseBadRequest()

    selected_class.checked_in.remove(user)
    selected_class.save()

    return selected_class


@csrf_exempt
@api_view(['POST'])
def check_out(request):
    """Undo your check in."""
    received_json_data = json.loads(request.body.decode("utf-8"))
    class_session_id = received_json_data['class_session_id']

    selected_class = check_out_process(request.user, class_session_id)

    serializer = ClassSessionSerializer(selected_class, context={'request': request})
    return JsonResponse(serializer.data)


@csrf_exempt
@api_view(['POST'])
def class_session_notification_liked(request):
    """Add the current user as a like to this class."""
    received_json_data = json.loads(request.body.decode("utf-8"))
    notification_id = received_json_data['notification_id']

    try:
        notification = ClassSessionNotification.objects.get(id=notification_id)
    except Class.DoesNotExist:
        return HttpResponseBadRequest()

    notification.liked.add(request.user)
    notification.save()

    serializer = ClassSessionNotificationSerializer(notification, context={'request': request})
    return JsonResponse(serializer.data)

"""Class views."""

from classes.models import Class
from classes.models import ClassSession
from django.contrib.auth.models import User
from django.http import HttpResponseBadRequest
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from rest_framework import serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from classes.serializers import ClassSerializer
from classes.serializers import ClassSessionSerializer
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

    selected_class.participants.add(request.user)
    selected_class.save()

    serializer = ClassSessionSerializer(selected_class, context={'request': request})
    return JsonResponse(serializer.data)

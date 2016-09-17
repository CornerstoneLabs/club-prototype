"""Class views."""


from django.http import JsonResponse
from django.http import HttpResponseBadRequest
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from classes.models import Class
import json


# NOTE -- THIS SHOULD NOT BE @csrf_exempt - FIX THE COOKINE PROBLEM IN ANGULAR
@csrf_exempt
@require_http_methods(['POST'])
def add_participant(request):
    """Add the current user as a participant to this class."""
    received_json_data = json.loads(request.body.decode("utf-8"))
    class_id = received_json_data['class_id']

    try:
        selected_class = Class.objects.get(id=class_id)
    except Class.DoesNotExist:
        return HttpResponseBadRequest()

    print(request.user)
    selected_class.participants.add(request.user)
    selected_class.save()

    return JsonResponse({
        'status': 'ok'
    })

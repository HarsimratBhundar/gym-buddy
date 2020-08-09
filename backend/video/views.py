from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)

@csrf_exempt
@api_view(["POST"])
def upload_file(request):
    video = request.data.get('file')
    if video is not None:
        return HttpResponse(video, content_type="video/mp4")
    else:
        return Response({'error': 'Must contain field: file'},
                        status=HTTP_400_BAD_REQUEST)
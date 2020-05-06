from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)
from rest_framework.response import Response
from user.models import UserInfo
from user.serializers import UserInfoSerializer
from user.permissions import UserAccessPermission



def get_user_me(request):
    username = request.headers.get('username')
    userInfo = UserInfo.objects.get(username=username)
    if not userInfo:
        return Response({'error': 'User Info for user not found'},
                        status=HTTP_404_NOT_FOUND)
    return Response(UserInfoSerializer(userInfo).data,
                    status=HTTP_200_OK)

def update_user_me(request):
    username = request.headers.get('username')
    userInfo = UserInfo.objects.get(username=username)
    recieved_username = request.data.get('username')
    if recieved_username != username:
        return Response({'error': 'Cannot change username'},
                        status=HTTP_400_BAD_REQUEST)
    if 'created_date' in request.data or 'last_updated_date' in request.data:
        return Response({'error': 'Cannot change creation or updation date fields'},
                        status=HTTP_400_BAD_REQUEST)
    serializer = UserInfoSerializer(userInfo, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,
                        status=HTTP_200_OK)
    return Response({'errors': serializer.errors},
                    status=HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(["GET", "POST"])
@permission_classes((UserAccessPermission,))
def user_view(request):
    if (request.method == 'GET'):
        return get_user_me(request)
    elif (request.method == 'POST'):
        return update_user_me(request)

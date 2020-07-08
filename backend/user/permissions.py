from rest_framework import permissions
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class UserAccessPermission(permissions.BasePermission):
    message = 'Invalid permission'

    def has_permission(self, request, view):
        if (request.path == '/user'):
            token_recieved = request.headers.get('Authorization')
            username = request.headers.get('username')
            if token_recieved and username:
                if (request.method == 'GET' or request.method == 'POST'):
                        user = User.objects.get(username=username)
                        token, _ = Token.objects.get_or_create(user=user)
                        if (token_recieved.split(' ')[1] == token.key):
                            return True
        return False

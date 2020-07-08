from rest_framework import serializers
from .models import UserInfo
from django.utils import timezone

class UserInfoSerializer(serializers.ModelSerializer):

    def update(self, instance, validated_data):
        instance = super().update(instance, validated_data)
        instance.last_updated_date = timezone.now()
        instance.save()
        return instance

    class Meta:
        model = UserInfo
        fields = "__all__"

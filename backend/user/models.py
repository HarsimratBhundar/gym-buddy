from django.db import models
from django.conf import settings
from django.utils import timezone

# Create your models here.
class UserInfo(models.Model):
  username = models.CharField(max_length=200, primary_key=True)
  nickname = models.CharField(max_length=100, null=True, default=None)
  # added_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
  created_date = models.DateTimeField(default=timezone.now)
  last_updated_date = models.DateTimeField(null=True, default=None)

  def __str__(self):
    return self.username
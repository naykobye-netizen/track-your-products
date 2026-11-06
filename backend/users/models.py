from django.contrib.auth.models import AbstractUser
from django.db import models

# Basic model for the user
class User(AbstractUser):
    email = models.EmailField(unique=True)
    avatar = models.ImageField(
        upload_to="avatars/",
        blank=True,
        null=True
    )
    is_actived = models.BooleanField(default=False)

# Verification codes for user registration and login
class Verification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    code = models.IntegerField()
    expires_at = models.DateTimeField()
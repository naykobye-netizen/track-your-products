from django.db import models
from django.contrib.auth.models import AbstractUser

# Basic model for the user
class User(AbstractUser):
    email = models.EmailField(unique=True)
    avatar = models.ImageField(
        upload_to="avatars/",
        blank=True,
        null=True
    )

# Verification codes for user registration and login
class Verification(models.Model):
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)
    code = models.IntegerField()
    expires_at = models.DateTimeField()
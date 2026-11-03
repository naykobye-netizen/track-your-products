from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from users.models import User, Verification

# Registered models for the Django admin section
admin.site.register(User, UserAdmin)
admin.site.register(Verification)
from ninja import Schema
from datetime import datetime, timedelta, timezone
from django.conf import settings

# User registration payload
class RegisterSchema(Schema):
    username: str
    email: str
    password: str

# Response to user registration
class ResponseSchema(Schema):
    success: bool
    error: str

# User log in payload
class LoginSchema(Schema):
    username: str
    password: str
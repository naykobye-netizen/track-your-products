from ninja import NinjaAPI
from django.contrib.auth.hashers import make_password, check_password
from users.models import User, Verification
from users.schemas import RegisterSchema, LoginSchema, ResponseSchema
from django.db import transaction
from django.utils import timezone
from datetime import timedelta
from random import randint
from django.core.mail import EmailMultiAlternatives
from django.utils.html import strip_tags
import jwt
from django.conf import settings

# Send the email containing the code to the user's email address
def send_verification_email(user_email: str, code: str):
    subject = "Código de verificación - Track your products"
    from_email = None # We set it to None so that it uses the default value from settings.py
    to = [user_email]

    html_content = f"""
    <!DOCTYPE html>
    <html>
    <body style="font-family: -apple-system, sans-serif; background-color: #0f172a; padding: 40px 20px;">
        <table width="100%" style="max-width: 500px; margin: 0 auto; background-color: #1e293b; border-radius: 12px; border: 1px solid #334155; padding: 32px;">
            <tr>
                <td>
                    <div style="font-size: 18px; font-weight: 700; color: #f8fafc; margin-bottom: 24px;">
                        Track your products<span style="color: #3b82f6;">.</span>
                    </div>
                    <h1 style="color: #f8fafc; font-size: 20px; font-weight: 600; margin: 0 0 12px 0;">Verificación de cuenta</h1>
                    <p style="color: #94a3b8; font-size: 14px; margin-bottom: 24px;">Usa este código para confirmar tu registro y activar tu cuenta.</p>
                    
                    <div style="background-color: #0f172a; border: 1px solid #3b82f6; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 24px;">
                        <span style="font-family: monospace; font-size: 32px; font-weight: 700; color: #3b82f6; letter-spacing: 8px;">{code}</span>
                    </div>
                    
                    <p style="color: #64748b; font-size: 12px; margin: 0;">Este código expira en 15 minutos.</p>
                </td>
            </tr>
        </table>
    </body>
    </html>
    """

    text_content = strip_tags(html_content)
    email = EmailMultiAlternatives(subject, text_content, from_email, to)
    email.attach_alternative(html_content, "text/html")
    email.send()

# Generate and send the verification code via email so you can confirm your identity
def create_verificate_code(user):
    if (Verification.objects.filter(id_user = user).exists()):
        Verification.objects.get(id_user = user).delete()
    code_verification = randint(100000,999999)

    expire_date = timezone.now() + timedelta(minutes=15)

    Verification.objects.create(
        id_user = user,
        code = code_verification,
        expires_at = expire_date,
    )

    send_verification_email(user.email, code_verification)

api = NinjaAPI()

# Use a GET request to determine whether that username or email exists
@api.get("/exist")
def is_exist(request, type, check):

    if (type == "username"):
        return User.objects.filter(username = check).exists()
    else:
        return User.objects.filter(email = check).exists()

# POST request to register users and send the verification code
@api.post("/register", response=ResponseSchema)
def register_user(request, payload: RegisterSchema):
    is_success = False
    message_error = ""

    try:
        with transaction.atomic(): # If it fails, everything is cancelled.
            user = User.objects.create(
                username = payload.username,
                email= payload.email,
                password = make_password(payload.password)
            )

            create_verificate_code(user)

            is_success = True
    except Exception as error:
        message_error = str(error)

    return {
        "success": is_success,
        "error": message_error,
    }

# Verification to obtain the access token for your account
@api.post("verificate/")
def verificate_user(request, sendcode):
    is_success = False
    create_token = ""
    message_error = ""

    if (Verification.objects.filter(code = sendcode).exists()):
        verify = Verification.objects.get(code = sendcode)

        if (verify.expires_at > timezone.now()):
            user = verify.id_user
            verify.delete()
            is_success = True
            data_token = {
                "user_id": user.id,
                "exp": timezone.now() + timedelta(days=1) 
            }
            create_token = jwt.encode(data_token, settings.SECRET_KEY, algorithm="HS256")
        else:
            message_error = "El codigo ha expirado"
    else:
        message_error = "El codigo no es valido"
        
    return {
        "success": is_success,
        "token": create_token,
        "error": message_error,
    }

# POST request to log in as a user
@api.post("login/", response=ResponseSchema)
def login_user(request, payload: LoginSchema):
    is_success = False
    is_error = True
    message_error = ""

    if (User.objects.filter(username = payload.username)):
        user = User.objects.get(username = payload.username)

        if (check_password(payload.password, user.password)):
            is_success = True
            is_error = False
            create_verificate_code(user)

    if (is_error):
        message_error = "El usuario o contraseña son incorrectas"

    return {
        "success": is_success,
        "error": message_error
    }
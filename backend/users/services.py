
from django.contrib.auth.hashers import make_password, check_password
from django.core.mail import EmailMultiAlternatives
from django.utils.html import strip_tags
from django.db import transaction
from django.utils import timezone
from django.conf import settings
from datetime import timedelta
from random import randint
import jwt

from users.models import User, Verification
from users.schemas import RegisterSchema, LoginSchema
from users.utils import check_email, check_username

# Check if the user exists
def is_exist(username, email):
    user = None
    if User.objects.filter(username = username).exists():
        user = User.objects.get(username = username)
    if User.objects.filter(email = email).exists():
        user = User.objects.get(email = email)

    return user

# Send the email containing the code to the user's email address
def create_verification(user):
    if Verification.objects.filter(user = user).exists():
        Verification.objects.get(user = user).delete()

    code_verification = randint(100000,999999)
    expire_date = timezone.now() + timedelta(minutes=15)

    Verification.objects.create(
        user = user,
        code = code_verification,
        expires_at = expire_date,
    )

    subject = "Código de verificación - Track your products"
    from_email = None # We set it to None so that it uses the default value from settings.py
    to = [user.email]

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
                        <span style="font-family: monospace; font-size: 32px; font-weight: 700; color: #3b82f6; letter-spacing: 8px;">{code_verification}</span>
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

# Service function for the user registration endpoint
def register_service(payload: RegisterSchema):
    is_success = False
    message_error = ""
    if (not check_username(payload.username)):
        return {
            "success": is_success,
            "error": "El nombre de usuario debe tener entre 3 y 20 caracteres",
        }

    if (not check_email(payload.email)):
        return {
            "success": is_success,
            "error": "El correo electrónico no tiene un formato válido",
        }

    try:
        with transaction.atomic(): # If it fails, everything is cancelled.
            check_user = is_exist(payload.username, payload.email)
            if check_user:
                if check_user.is_active == False:
                    check_user.delete()
                else:
                    return {
                        "success": is_success,
                        "error": "El usuario ya existe"
                    }
            
            user = User.objects.create(
                username = payload.username,
                email= payload.email,
                password = make_password(payload.password)
            )

            create_verification(user)
            is_success = True

            return {
                "success": is_success,
                "error": message_error,
            }

    except Exception as error:
        return {
            "success": is_success,
            "error": f"Error al registrar el usuario: {error}"
        }

# Service function for the user verification endpoint
def verificate_service(sendcode):
    is_success = False
    create_token = ""
    message_error = ""

    if Verification.objects.filter(code = sendcode).exists():
        verify = Verification.objects.get(code = sendcode)

        if verify.expires_at > timezone.now():
            user = verify.user
            verify.delete()
            is_success = True

            if user.is_active == False:
                user.is_active = True
                user.save()

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

# Service function for the user login endpoint
def login_service(payload: LoginSchema):
    is_success = False
    message_error = ""

    if User.objects.filter(username = payload.username).exists():
        user = User.objects.get(username = payload.username)

        if check_password(payload.password, user.password):
            create_verification(user)
            is_success = True

    if not is_success:
        message_error = "El usuario o contraseña son incorrectas"

    return {
        "success": is_success,
        "error": message_error
    }
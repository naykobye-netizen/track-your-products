from ninja import NinjaAPI
from users.schemas import (
    LoginSchema,
    RegisterSchema,
    ResponseAuthSchema,
    ResponseVerificationSchema,
)
from users.services import (
    login_service, 
    register_service, 
    verificate_service
)

api = NinjaAPI()

# POST request to register users and send the verification code
@api.post("/register", response=ResponseAuthSchema)
def register(request, payload: RegisterSchema):
    return register_service(payload)


# Verification to obtain the access token for your account
@api.get("/verificate", response=ResponseVerificationSchema)
def verificate(request, code: int):
    return verificate_service(code)


# POST request to log in as a user
@api.post("/login", response=ResponseAuthSchema)
def login(request, payload: LoginSchema):
    return login_service(payload)

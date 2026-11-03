from ninja import Schema

# User registration payload
class RegisterSchema(Schema):
    username: str
    email: str
    password: str

# Response to user auth
class ResponseAuthSchema(Schema):
    success: bool
    error: str

# User log in payload
class LoginSchema(Schema):
    username: str
    password: str

# Response to user Verification
class ResponseVerificationSchema(Schema):
    success: bool
    token: str
    error: str
# Check if the email has a correct format
def check_email(email):
    if email.count("@") != 1:
        return False
    name_email = email.split("@")[0]
    domain_email = email.split("@")[1].split(".")[0]

    if domain_email == "" or email.count(".") < 1 or email.count(".") > 2:
        return False
    
    domain_extension = email.split("@")[1].split(".")[1]
    return not (domain_extension == "" or name_email == "")

# Check if the name meets the format requirements
def check_username(username):
    if len(username) < 3 or len(username) > 20:
        return False
    
    return True
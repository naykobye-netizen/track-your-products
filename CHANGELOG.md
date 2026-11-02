## [0.1.0] - 31-10-2026
### Added (Backend)
- User authentication and registration system with Django Ninja.
- Sending verification codes via email (with styled HTML).
- Validation of time-expiring verification codes.
- Generation and authentication using JWT tokens.
- Secure login endpoint with password validation.

## [0.1.5] - 2-11-2026
### Added (Backend)
- Command to clean up unverified users and expired verification codes
- Email format verification

### Fixed (Backend)
- Improvement to the email and username verification endpoint
- Renaming `id_user` to `user` in the verification model

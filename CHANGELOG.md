## [0.1.0] - 31-10-2026
### Added (Backend)
- User authentication and registration system with Django Ninja.
- Sending verification codes via email (with styled HTML).
- Validation of time-expiring verification codes.
- Generation and authentication using JWT tokens.
- Secure login endpoint with password validation.

## [0.5.0] - 03-11-2026

### Added (Backend)
- Command to clean up unverified users and expired verification codes.
- Email format verification and strict input validation.

### Fixed (Backend)
- Improvement to the email and username verification endpoints.
- Renaming `id_user` field to `user` in the verification model for standardized relations.

### Added (Frontend)
- Initial implementation of the Next.js frontend architecture (`/login`, `/register`, and verification flows).
- Route protection middleware using `middleware.ts` to manage access based on the `accessToken` cookie.
- Automatic redirection logic: protecting the root app path (`/`) for unauthenticated users and redirecting authenticated users away from `/login` and `/register`.
- Token persistence and handling using `js-cookie` with security flags (`secure: true`, `sameSite: 'strict'`).
- Reactive UI synchronization upon successful login/verification using `router.refresh()`.
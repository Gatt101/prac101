Required environment variables for the contact API

Set these in your .env.local (Next.js loads .env.local automatically in development):

- SMTP_HOST - SMTP server host (e.g. "smtp.mailtrap.io" or smtp provider host)
- SMTP_PORT - SMTP port (587 for TLS, 465 for SSL)
- SMTP_USER - SMTP username
- SMTP_PASS - SMTP password
- RECEIVER_EMAIL - The email address that will receive contact form messages
- SENDER_EMAIL - Optional. Email used in the From header (recommended to match domain / SMTP account)

Example .env.local (do NOT commit this file):

SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_pass
RECEIVER_EMAIL=you@example.com
SENDER_EMAIL=no-reply@example.com

Test with curl (from project root):

curl -X POST http://localhost:3000/api/contact -H "Content-Type: application/json" -d "{\"name\":\"Alice\",\"email\":\"alice@example.com\",\"task\":\"I\'d like to hire you for a project\"}"

Notes:
- The API expects JSON with `name`, `email`, and `task` (or `message`) fields.
- For production, use a trusted email provider (SendGrid, Mailgun, SES) and proper credentials.
- If using services like SendGrid, you can also switch to their Node SDK instead of SMTP for better deliverability.

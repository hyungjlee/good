-- Revoke direct access to password column from anon role
-- to prevent bcrypt hash exposure via direct Supabase REST API calls.
-- API routes already select only (id, name, message, created_at).
REVOKE SELECT (password) ON guestbook FROM anon;

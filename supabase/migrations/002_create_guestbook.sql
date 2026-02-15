CREATE TABLE guestbook (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT NOT NULL,
  password    TEXT NOT NULL,
  message     TEXT NOT NULL CHECK (char_length(message) <= 500),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: anyone can INSERT and SELECT, DELETE handled via API with password check
ALTER TABLE guestbook ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert guestbook"
  ON guestbook FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can read guestbook"
  ON guestbook FOR SELECT
  USING (true);

CREATE POLICY "Service role can delete guestbook"
  ON guestbook FOR DELETE
  USING (auth.role() = 'service_role');

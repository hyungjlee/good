CREATE TABLE rsvp (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT NOT NULL,
  phone       TEXT,
  side        TEXT NOT NULL CHECK (side IN ('groom', 'bride')),
  attending   BOOLEAN NOT NULL,
  party_size  INTEGER DEFAULT 1 CHECK (party_size BETWEEN 1 AND 10),
  meal_pref   TEXT CHECK (meal_pref IN ('korean', 'western', 'none')),
  message     TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: anyone can INSERT, only service_role can SELECT
ALTER TABLE rsvp ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert rsvp"
  ON rsvp FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service role can read rsvp"
  ON rsvp FOR SELECT
  USING (auth.role() = 'service_role');

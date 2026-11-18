CREATE TABLE IF NOT EXISTS gallery_registrations (
  email TEXT PRIMARY KEY NOT NULL,
  created_at TEXT NOT NULL
) WITHOUT ROWID;

CREATE INDEX IF NOT EXISTS gallery_registrations_created_at
  ON gallery_registrations (created_at);

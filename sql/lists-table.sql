CREATE TABLE IF NOT EXISTS lists (
	id serial PRIMARY KEY,
	name VARCHAR NOT NULL,
	user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
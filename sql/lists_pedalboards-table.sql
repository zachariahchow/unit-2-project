CREATE TABLE IF NOT EXISTS lists_pedalboards (
	id serial PRIMARY KEY,
	list_id INTEGER REFERENCES lists(id) ON DELETE CASCADE,
	pedalboard_id INTEGER REFERENCES pedalboards(id) ON DELETE CASCADE
);
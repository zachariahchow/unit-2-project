CREATE TABLE IF NOT EXISTS pedalboards_gear (
	id serial PRIMARY KEY,
	pedalboard_id INTEGER REFERENCES pedalboards(id) ON DELETE CASCADE,
	gear_id INTEGER REFERENCES gear(id) ON DELETE CASCADE,
	gear_order INTEGER
);
DB_NAME=unit2_proj

all: tables seed

clean:
	psql -a -d $(DB_NAME) -f users-table.sql
	psql -a -d $(DB_NAME) -f gear-table.sql
	psql -a -d $(DB_NAME) -f pedalboards-table.sql
	psql -a -d $(DB_NAME) -f lists-table.sql
	psql -a -d $(DB_NAME) -f pedalboards_gear-table.sql
	psql -a -d $(DB_NAME) -f lists_pedalboards-table.sql

db:
	psql -d postgres -tc "select 1 from pg_database where datname = '$(DB_NAME)'" | grep -q 1 || createdb $(DB_NAME)

dropdb:
	dropdb $(DB_NAME)

tables: db
	psql -a -d $(DB_NAME) -f all-tables.sql

seed: tables
	psql -a -d $(DB_NAME) -f seed.sql


.PHONY: all clean db dropdb tables seed
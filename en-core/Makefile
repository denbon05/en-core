all: lint test build

setup:
	npm ci

fix:
	npm run lintfix
	npx prisma format

lint:
	npm run lint

test:
	npm run test

start:
	DEBUG=app:* npm run dev

build:
	npm run build

# Database
db-latest:
	make db-migrate
	make db-seed

db-migrate:
	npm run migrate-db

db-seed:
	npm run seed-db

# app
compose-build:
	docker-compose -f docker-compose.yml build

compose-up:
	docker-compose up --abort-on-container-exit

.PHONY: test

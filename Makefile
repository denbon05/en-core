all: lint test build

ANSIBLE_PATH = 'services/ansible'

setup:
	npm ci
	make -C $(ANSIBLE_PATH) setup

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

init-db:
	make -C $(ANSIBLE_PATH) init-db
	make migrate-db
	make seed-db

migrate-db:
	npm run migrate-db

seed-db:
	npm run seed-db

.PHONY: test

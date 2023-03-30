all: lint test build

ANSIBLE_PATH = 'services/ansible'

setup:
	npm ci
	make -C $(ANSIBLE_PATH) setup

fix:
	npm run lintfix

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
	npx ts-node prisma/seed.ts

migrate-db:
	npx prisma migrate dev

reset-db:
	make -C $(ANSIBLE_PATH) remove-db
	make init-db

seed-db:
	npx ts-node prisma/seed.ts

.PHONY: test

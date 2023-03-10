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
	DEBUG=api,api:* npm run dev

build:
	npm run build

# Database

init-db:
	make -C $(ANSIBLE_PATH) init-db-dev
	npx knex migrate:latest
	npx knex seed:run

init-db-test:
	make -C $(ANSIBLE_PATH) init-db-test
	npx knex migrate:latest
	npx knex seed:run

.PHONY: test

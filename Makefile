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
	clear && DEBUG=api:* npm run dev

build:
	npm run build

# Database

init-db:
	make -C $(ANSIBLE_PATH) init-db-dev

init-db-test:
	make -C $(ANSIBLE_PATH) init-db-test

# Knex
migrate-make:
	npx ts-node -P tsconfig.knex.json \
	node_modules/.bin/knex migrate:make ${NAME}

migrate-latest:
	npx ts-node -P tsconfig.knex.json ./tsconfig.json \
	node_modules/.bin/knex migrate:latest

.PHONY: test

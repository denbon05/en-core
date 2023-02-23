all: lint test build

fix:
	npm run lintfix

lint:
	npm run lint

test:
	npm run test

start:
	clear && DEBUG=app:* npm run dev

build:
	npm run build

.PHONY: test

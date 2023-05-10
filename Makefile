init-local:
	make -C ansible init-local

init: init-local
	make -C ansible setup
	npm i
	cd app && npm ci

# app
app-build:
	docker-compose build app

app-run:
	docker-compose up

# vault
vault-encrypt:
	make -C ansible vault-encrypt

vault-decrypt:
	make -C ansible vault-decrypt
init-local:
	make -C ansible init-local

init: init-local
	make -C ansible setup
	npm i
	cd en-core && npm ci

# vault
vault-encrypt:
	make -C ansible vault-encrypt

vault-decrypt:
	make -C ansible vault-decrypt

# style
fix:
	make -C en-core fix
	make -C terraform format
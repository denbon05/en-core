init:
	npm i

# vault
vault-encrypt:
	make -C ansible vault-encrypt

vault-decrypt:
	make -C ansible vault-decrypt
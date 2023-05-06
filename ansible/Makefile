# vault
vault_cmd = find . -name "*vault.y*ml" -type f -exec ansible-vault $(cmd) {} \;

vault-encrypt:
	$(eval cmd := encrypt)
	$(vault_cmd)

vault-decrypt:
	$(eval cmd := decrypt)
	$(vault_cmd)

# setup project
setup:
	ansible-galaxy install -r requirements.yml

# infra
infra-init:
	ansible-playbook terraform.yml

infra-provision:
	ansible-playbook setup-servers.yml

# init-db:
# 	ansible-playbook manage-db.yml

# remove-db:
# 	ansible-playbook manage-db.yml -e "db_state=absent"

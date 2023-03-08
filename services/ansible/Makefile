setup:
	ansible-galaxy install -r requirements.yml
	ansible-playbook playbooks/project-vars.yml

init-db-dev:
	ansible-playbook playbooks/manage-db.yml -e "mode=dev"

init-db-test:
	ansible-playbook playbooks/manage-db.yml -e "mode=test"

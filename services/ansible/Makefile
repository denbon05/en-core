setup:
	ansible-galaxy install -r requirements.yml
	ansible-playbook playbooks/project-vars.yml

init-db:
	ansible-playbook playbooks/manage-db.yml

remove-db:
	ansible-playbook playbooks/manage-db.yml -e "db_state=absent"

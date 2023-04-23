setup:
	ansible-galaxy install -r requirements.yml
	ansible-playbook project-vars.yml --limit dev

init-db:
	ansible-playbook manage-db.yml

remove-db:
	ansible-playbook manage-db.yml -e "db_state=absent"

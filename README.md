# lang-core

<p>
  The platform allows you to bring together people who would like to help 
  others learn a particular language or languages.
</p>

## Prerequisites

### Tools

<ul>
  <li>Node      >=16</li>
  <li>Ansible   >=2</li>
  <li>Terraform >=1.4</li>
</ul>

### Env

<ul>
  <li>ansible/.vault-password</li>
  <li>Clear port <b>5432</b> for the db</li>
  <li>Clear port <b>3000</b> for the app</li>
</ul>

## Dev-mode

```bash
make init    # init project locally
make app-run # run app with db
```

---
title: 'Resetando a Senha do Root no MySQL'
layout: post
categories: desenvolvimento
image: mysql-reset-password.png
tags: mysql linux servidor
---

Hoje precisei acessar um servidor MySQL recém instalado no qual eu não sabia a senha do usuário root.

Mas eu tinha acesso de super-usuário no Linux. Então, decidi criar uma nova senha.

A maneira mais prática de realizar tal processo é utilizando o script **mysqld_safe**. Ele possui o parâmetro `--skip-grant-tables`, que possibilita logar sem inserir nenhuma senha. Para rodar esse script é necessário que exista o diretório `/var/run/mysqld` com propriedade do usuário do MySQL.

Antes de rodar o mysqld_safe, você pode conferir se o diretório necessário existe:

```sh
/var/run/mysqld
```

Caso não exista, crie-o e defina a propriedade:

```sh
sudo mkdir -p /var/run/mysqld
sudo chown mysql:mysql /var/run/mysqld
```

Feito isso, abra outro terminal, certifique-se que o MySQL está desligado e execute o mysqld_safe para rodar em segundo plano:

```sh
sudo systemctl stop mysql.service
sudo mysqld_safe --skip-grant-tables &
```

Agora já será possível entrar apenas com `mysql -uroot`. Sem necessidade da senha.

Estando no prompt do MySQL, use a tabela `mysql` e defina sua nova senha:

```sql
USE mysql;
-- O nome do campo é "Password" se a versão do seu MySQL é menor que 5.7
UPDATE user SET authentication_string=PASSWORD('nova-senha') WHERE user='root';
FLUSH PRIVILEGES;
EXIT
```

Com a nova senha definida, mate o processo do mysqld_safe com um `Ctrl + C` e inicie o MySQL normalmente:

```sh
sudo systemctl start mysql.service
```

À partir de então você poderá acessar o MySQL normalmente, com `mysql -uroot -p`.

Feito.


# Fontes
-   [MySQL :: MySQL 5.7 Reference Manual :: B.5.3.2 How to Reset the Root Password](https://dev.mysql.com/doc/refman/5.7/en/resetting-permissions.html)
-   [MysqlPasswordReset - Community Help Wiki](https://help.ubuntu.com/community/MysqlPasswordReset)
-   [Reset Forgotten MySQL Root Password](https://www.howtoforge.com/reset-forgotten-mysql-root-password)


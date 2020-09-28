---
title: 'Trocar plugin de autenticação no MySQL'
layout: post
categories: desenvolvimento
image: mysql-native-password.png
tags: mysql linux servidor
description: Instalou um servidor MySQL e não consegue entrar?
---

Á partir do MySQL Server 5.7, se não fornecermos uma senha para o usuário root durante a instalação, ele usará o plugin **auth_socket** para autenticação. Com esta configuração, o MySQL não se preocupará com sua senha de entrada, ele verificará se o usuário está se conectando usando um soquete UNIX e então comparará o nome de usuário. Se for igual, você está autenticado!

Erro ao fazer o login para o usuário root do MySQL a partir da conta de usuário normal do Linux:

```
natanfelles@controller:~$ mysql -uroot -p
Enter password:
ERROR 1698 (28000): Access denied for user 'root'@'localhost'
```

Mas está tudo bem quando mudamos para a conta root do Linux:

```
natanfelles@controller:~$ sudo su -
natanfelles@controller:~# mysql -uroot
Welcome to the MySQL monitor. Commands end with ; or \g.
Your MySQL connection id is 40
Server version: 5.7.22-0ubuntu18.04.1 (Ubuntu)
Copyright (c) 2000, 2018, Oracle and/or its affiliates. All rights reserved.
Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.
Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.
mysql>
```

Vamos verificar o plugin de autenticação atual que o servidor MySQL está usando:

```
mysql> SELECT plugin from mysql.user where User='root';
+-----------------------+
| plugin                |
+-----------------------+
| auth_socket           |
+-----------------------+
```

Para poder fazer o login com senha, você deve alterar o plugin de **auth_socket** para **mysql_native_password**. A seguir está o comando para fazer isso.

```
mysql> UPDATE mysql.user SET plugin = 'mysql_native_password', authentication_string = PASSWORD('nova-senha') WHERE User = 'root';
mysql> FLUSH PRIVILEGES;
```

Feito isso você pode logar utilizando a nova senha.

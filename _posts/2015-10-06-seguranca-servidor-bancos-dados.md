---
title:  "Segurança em Servidor de Bancos de Dados"
categories: seguranca
tags: linux mysql mariadb
image: mysql_secure_installation.jpg
description: Aprenda como instalar e proteger servidores MySQL ou MariaDB.
---

## Introdução

Existem muitas implementações de bancos de dados com a linguagem SQL disponíveis para sistemas Linux e Unix-like. O MySQL é o Sistema Gerenciador de Bancos de Dados mais popular em nível servidor.

Então, como qualquer outro software, ele pode oferecer brechas de segurança se for configurado incorretamente. Este tutorial lhe guiará por etapas básicas que podem ser realizadas para tornar um servidor de bancos de dados mais seguro.

Para ilustrar os procedimentos a serem executados, usarei o MySQL Server em uma VM com o Ubuntu 14.04. Mas, estas etapas podem ser realizadas em outras distribuições Linux ou no MariaDB.

## Configuração Inicial

O MySQL nos permite realizar a primeira configuração de segurança já durante sua instalação. Ele irá solicitar a senha do usuário root.

```sh
sudo apt-get install mysql-server
```

- New password for the MySQL root user: **Digite sua senha**

- Repeat password for the MySQL root user: **Repita sua senha**

Você pode configurar a senha do root outra hora, mas é recomendável que você faça isso agora, assim você deixa a conta de administrador segura desde o início.

Quando a instalação estiver completa, você pode rodar alguns scripts que já estão inclusos. Primeiro, usarei o script _mysql_install_db_ para criar o layout de diretórios dos bancos de dados.

```sh
sudo mysql_install_db
```

Em seguida, rode o script chamado _mysql_secure_installation_. Ele lhe guiará através de procedimentos para remover alguns padrões da instalação que são perigosos de se utilizar em ambientes de produção.

```sh
sudo mysql_secure_installation
```

O processo solicitará a senha do root, que foi configurada durante a instalação. Em seguida, você terá uma série de perguntas, a primeira é se você deseja trocar a senha do root.

Esta é uma ótima oportunidade para deixar sua senha com um nível de segurança alto, se você ainda não fez isso.

Podemos responder _Y_ (yes) em todas as outras questões.

Esse script removerá a possibilidade de qualquer usuário, além do root, entrar no MySQL. Desabilitará a possibilidade de entrar remotamente com a conta de administrador, removerá bancos de dados instalados por padrão para a realização de testes e atualizará a instância atual do MySQL para obter tais modificações.

## Considerações de Segurança

A prioridade básica quanto a segurança no MySQL (e outros SGBDs) é que o acesso pode ser permitido apenas quando isso é absolutamente necessário. Seus dados podem acabar desaparecendo em configurações balanceadas entre conveniência e segurança.

Neste guia, nós daremos prioridade a segurança, então se você for usar algum programa que acesse bancos de dados, adapte as configurações de acordo com o que for necessário.

## Segurança através do arquivo my.cnf

O principal arquivo de configuração do MySQL é chamado _my.cnf_ e localiza-se no diretório _/etc/mysql/_ no Ubuntu ou em _/etc/_ em algumas distribuições Linux.

Modificaremos algumas configurações neste arquivo para bloquear o acesso a nossa instância do MySQL.

Abra o arquivo com privilégios root. Adapte o caminho se você está usando outra distribuição Linux:

```sh
sudo vi /etc/mysql/my.cnf
```

O primeiro passo é checar se o _bind-address_ da seção _[mysqld]_ está setado para o loopback local da máquina, que é _127.0.0.1_.

```ini
bind-address = 127.0.0.1
```

Isso impedirá que o MySQL aceite conexões de outros lugares a não ser da máquina local.

Se precisar acessar algum banco de dados deste servidor remotamente, conecte através de SSH para fazer suas consultas ou configure um SSH Tunnel.

A próxima atenção é dada se o MySQL pode carregar arquivos diretamente do sistema. Esta é uma definição severa de segurança e não precisa ser feita ao menos que realmente seja preciso.

Na mesma sessão do arquivo, adicione uma diretiva que impossibilitará o carregamento de arquivos locais:

```ini
local-infile = 0
```

Isso impedirá que usuários sem privilégios tentem forçar o carregamento de arquivos no MySQL.

Se não houver mais espaço disponível e você não estiver operando com grandes bancos de dados, pode ser útil monitorar atividades suspeitas.

Muitos logs podem resultar em queda de desempenho, mas isso pode realmente ser útil.

Você pode habilitar o log na mesma sessão _[mysqld]_ adicionando a seguinte linha:

```ini
log = /var/log/mysql-logfile
```

Certifique-se que os arquivos de log não podem ser lidos por outros usuários:

```sh
sudo ls -l /var/log/mysql*
```

## Segurando o MySQL de Todos

Existem inumeros passos que podem ser executados para verificarmos se o MySQL está seguro.

Nesta sessão, enviaremos comando diretamente no prompt do MySQL, então precisamos logar.

```sh
mysql -u root -p
```

Entre com a senha do usuário root.

### Segurando Senha e Associando Hosts

Primeiro, certifique-se de que não existam usuários sem uma senha ou um host associado:

```sql
SELECT User,Host,Password FROM mysql.user;
```

Como pode ver, em nosso exemplo, o usuário _demo-user_ não possui senha e ele pode acessar o MySQL de qualquer lugar. Isto é muito inseguro.

Podemos definir uma senha para o usuário com este comando. Troque _novaSenha_ pela senha que você desejar.

```sql
UPDATE mysql.user SET Password=PASSWORD('novaSenha') WHERE User="demo-user";
```

Se você verificar a tabela User novamente, verá que agora o demo-user possui uma senha:

```sql
SELECT User,Host,Password FROM mysql.user;
```

Mas se olhar o campo _Host_, verá que continua havendo o símbolo _%_, que é um wildcard para qualquer host. E não é isso que queremos. Vamos trocar para _localhost_:

```sql
UPDATE mysql.user SET Host='localhost' WHERE User="demo-user";
```

Se olharmos outra vez, podemos ver que a tabela User possui todos os campos devidamente definidos.

```sql
SELECT User,Host,Password FROM mysql.user;
```

Se, por acaso, a tabela conter algum usuário em branco (o que não deve acontecer se você rodou o script _mysql_secure_installation_), podemos removê-lo.

Para fazer isso, execute o comando abaixo para excluir usuários em branco:

```sql
DELETE FROM mysql.user WHERE User="";
```

Depois de modificar  a tabela User, precisamos executar o comando abaixo para atualizarmos as permissões:

```sql
FLUSH PRIVILEGES;
```

### Implementando Aplicações para Usuários Específicos

Semelhante a prática de rodar processos separados por usuários no Linux, o MySQL permite o mesmo tipo de isolamento.

Cada aplicação que usa o MySQL pode ter seu próprio usuário, que pode possuir privilégios limitados, e apenas poder acessar determinados bancos de dados.

Quando configuramos uma nova aplicação que vá acessar o MySQL, podemos criar os bancos de dados necessários para ela:

```sql
CREATE DATABASE teste;
```

Em seguida, podemos criar o usuário que vai acessar este banco de dados, e determinar apenas os privilégios realmente necessários. Isto pode variar de acordo com a aplicação, alguns usuários podem precisar de mais privilégios do que outros.

Para criar um novo usuário, use o seguinte comando:

```sql
CREATE USER 'demo-user'@'localhost' IDENTIFIED BY 'senhaDoUsuario';
```

Podemos definir os privilégios com o seguinte comando. Veja o tutorial Como cria novos usuários definir permissões no MySQL para entender melhor cada privilégio:

```sql
GRANT SELECT,UPDATE,DELETE ON teste.* TO 'demo-user'@'localhost';
```

Como exemplo, se depois você quiser revogar os privilégios antes deles entrarem em vigor, podemos usuar o seguinte comando:

```sh
REVOKE UPDATE ON teste.* FROM 'demo-user'@'localhost';
```

Se precisar de todos os privilégios, podemos definir desta maneira:

```sql
GRANT ALL ON teste.* TO 'demo-user'@'localhost';
```

E para mostrar os privilégios de um determinado usuário, primeiro devemos validar as modificações com o comando _FLUSH PRIVILEGES_. Então, podemos consultar os privilégios de usuários:

```sql
FLUSH PRIVILEGES;
SHOW GRANTS FOR 'demo-user'@'localhost';
```

Sempre valide os privilégios para que as modificações entrem em vigor.

### Modificando o Usuário Root

Uma etapa adicional que você pode querer realizar é trocar o nome do usuário administrador. Se um atacante tentar acessar o MySQL como root, ele não conseguirá até saber o novo nome do administrador.

O acesso root pode ser modificado com o seguinte comando:

```sql
RENAME USER 'root'@'localhost' TO 'novoUsuarioAdmin'@'localhost';
```

Podemos ver a mudança com o mesmo comando usado para vermos os usuários do MySQL:

```sql
SELECT user,host,password FROM mysql.user;
```

Novamente, devemos renovar os privilégios:

```sql
FLUSH PRIVILEGES;
```

Lembre-se que você só poderá logar no MySQL como administrador com o novo nome de usuário:

```sh
mysql -u novoUsuarioAdmin -p
```

## Conclusão

De fato, esta não é uma lista muito extensa de práticas de segurança em servidores de bancos de dados, mas pode ser ser muito útil ao gerenciar o MySQL.

Mais informações sobre configuração e segurança no MySQL e no MariaDB podem ser encontradas em seus respectivos websites. A cada aplicação implementada deve-se ter atenção se seus privilégios realmente são necessários.

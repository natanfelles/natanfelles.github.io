---
title: Backup de Banco de Dados MariaDB ou MySQL
layout: post
categories: desenvolvimento
image: mariadb-database-backup.png
description: Backup de Banco de Dados MariaDB ou MySQL
---

Algum tempo atrás precisei fazer backup de um banco de dados MariaDB.

O banco possuía uma tabela com mais de 5 milhões de registros e, inicialmente, pensei que o processo seria demorado.

## Exportação

Para exportar a criação das tabelas e inserção de registros, foi utilizado o **mysqldump**:

```
mysqldump -uroot -p dbname > dbname.sql
```

No exemplo acima, **dbname** é o nome do banco e **dbname.sql** é o nome do arquivo.

O processo foi muito rápido! Levou menos de 20 segundos e criou um arquivo com cerca de 300 MB.

## Importação

Para importar os dados do banco exportado foi preciso que o esquema alvo já existisse.

No exemplo abaixo, **dbname** é o nome do banco de dados alvo e **dbname.sql** é o nome do arquivo com os dados exportados:

```
mysql -uroot -p dbname < dbname.sql
```

Para importar, o processo foi um pouco mais demorado: cerca de 3 minutos!

## Conclusão

Exportar e importar bancos de dados é um processo relativamente rápido quando utiliza-se as ferramentas apropriadas.

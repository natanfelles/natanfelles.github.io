---
title: Trocando versão principal do PHP
layout: post
categories: desenvolvimento
image: elephants.jpg
tags: php linux debian ubuntu
description: Troque a versão principal do PHP
---

Essa semana saiu o PHP 8 Release Candidate como versão disponível nos repositórios
[DEB.SURY.ORG](https://deb.sury.org/). E eu não pude deixar de instalar!

Porém o repositório do PHP 8 _ainda_ não possui a extensão Xdebug e, por causa disso, não pude fazer um upgrade geral em meus [pacotes](https://packagist.org/packages/natanfelles/). Então, continuei com o PHP 7.4 como a versão principal.

Problema é que, por ser mais recente, o PHP 8 se tornou o binário padrão:

```
php -v
```

```
PHP 8.0.0rc1 (cli) (built: Oct 17 2020 07:31:28) ( NTS )
Copyright (c) The PHP Group
Zend Engine v4.0.0-dev, Copyright (c) Zend Technologies
    with Zend OPcache v8.0.0rc1, Copyright (c), by Zend Technologies
```

Para trocar para outra versão, foi preciso atualizar os links simbólicos dos binários e deixar o 7.4 como padrão.

```
sudo update-alternatives --config php
```

Basta digitar o número da seleção:

```
Existem 2 escolhas para a alternativa php (disponibiliza /usr/bin/php).

  Selecção   Caminho          Prioridade Estado
------------------------------------------------------------
* 0            /usr/bin/php8.0   80        modo automático
  1            /usr/bin/php7.4   74        modo manual
  2            /usr/bin/php8.0   80        modo manual

Pressione <enter> para manter a escolha actual[*], ou digite o número da selecção: 1
```

Conferindo outra vez:

```
php -v
```

```
PHP 7.4.11 (cli) (built: Oct 17 2020 07:30:05) ( NTS )
Copyright (c) The PHP Group
Zend Engine v3.4.0, Copyright (c) Zend Technologies
    with Zend OPcache v7.4.11, Copyright (c), by Zend Technologies
    with Xdebug v2.9.8, Copyright (c) 2002-2020, by Derick Rethans
```

Feito!

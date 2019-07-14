---
title: Ambiente PHP 7.4 no Debian 11 Testing (bullseye)
layout: post
categories: desenvolvimento
image: php-environment.png
tags: debian php
description: Ambiente PHP 7.4 no Debian 11 Testing (bullseye)
---

Snippet: [https://gitlab.com/snippets/1875054](https://gitlab.com/snippets/1875054)

## Pacotes

Estude: [https://www.howtoforge.com/tutorial/how-to-install-php-7-on-debian/](https://www.howtoforge.com/tutorial/how-to-install-php-7-on-debian/)

```
sudo apt install build-essential libfcgi-dev libfcgi0ldbl libjpeg62-turbo-dev libmcrypt-dev libssl-dev libc-client2007e libc-client2007e-dev libxml2-dev libbz2-dev libcurl4-openssl-dev libjpeg-dev libpng-dev libfreetype6-dev libkrb5-dev libpq-dev libxslt1-dev libexpat1-dev libgeoip-dev libpcre3-dev rcs zlib1g-dev libwebp-dev pkg-config libicu-dev libedit-dev libreadline-dev libtidy-dev libzip-dev libsqlite3-dev
```

```
ln -s /usr/lib/libc-client.a /usr/lib/x86_64-linux-gnu/libc-client.a
```

```
cd /usr/include
ln -s x86_64-linux-gnu/curl
```

## Instalar phpenv e php-build

- [https://github.com/phpenv/phpenv](https://github.com/phpenv/phpenv)
- [https://github.com/php-build/php-build](https://github.com/php-build/php-build)
- [https://github.com/phpenv/phpenv-installer](https://github.com/phpenv/phpenv-installer)

```
curl -L https://raw.githubusercontent.com/phpenv/phpenv-installer/master/bin/phpenv-installer \
    | bash
```

### Auto-completar do comando phpenv

Adicione no fim do arquivo *.bashrc* ou *.bash_profile*

```bash
# phpenv - https://github.com/phpenv/phpenv-installer
export PHPENV_ROOT="${HOME}/.phpenv"
if [ -d "${PHPENV_ROOT}" ]; then
  export PATH="${PHPENV_ROOT}/bin:${PATH}"
  eval "$(phpenv init -)"
fi
```

## Verificando versões instaladas no phpenv

```
phpenv
php -v
phpenv global
phpenv local
phpenv local 7.3
cat .php-version
php -v
phpenv help install
phpenv install --list
```

## Instalar PHP 7.3 no phpenv

```
phpenv install 7.3.7
```

## Instalar PHP 7.4 no phpenv

```
phpenv install 7.4snapshot
```

```
-----------------
|  BUILD ERROR  |
-----------------

Here are the last 10 lines from the log:

-----------------------------------------
configure: WARNING: unrecognized options: --with-gd, --with-jpeg-dir, --with-png-dir, --enable-zip
configure: error: bison 3.0.0 is required to generate PHP parsers (excluded versions: none).
-----------------------------------------

The full Log is available at '/tmp/php-build.7.4snapshot.20190713161817.log'.
[Warn]: Aborting build.

```

### Instalar Versão 7.4.0alpha3

Leia: [https://www.php.net/archive/2019.php#2019-07-11-1](https://www.php.net/archive/2019.php#2019-07-11-1)

{: .file-excerpt }
~/.phpenv/plugins/php-build/share/php-build/definitions/7.4.0alpha3
:   ```bash
    configure_option -D "--with-gd" "--with-jpeg-dir" "--with-png-dir" "--enable-zip"

    install_package "https://downloads.php.net/~derick/php-7.4.0alpha3.tar.bz2"
    # https://github.com/xdebug/xdebug/releases/tag/2.8.0alpha1
    #install_xdebug "2.8.0alpha1"
    install_xdebug_master
    enable_builtin_opcache
    ```

```
phpenv install -l
```

```
phpenv install 7.4.0alpha3
```

#### Possíveis erros

##### Versão incompatível do sqlite3

```
-----------------
|  BUILD ERROR  |
-----------------

Here are the last 10 lines from the log:

-----------------------------------------
configure: error: Package requirements (sqlite3 > 3.7.4) were not met:

No package 'sqlite3' found

```

```
sudo apt install libsqlite3-dev
```

##### Faltando pacote oniguruma

```
-----------------
|  BUILD ERROR  |
-----------------

Here are the last 10 lines from the log:

-----------------------------------------
configure: error: Package requirements (oniguruma) were not met:

No package 'oniguruma' found

```

```
sudo apt install libonig-dev
```

## Sucesso!

```
phpenv install 7.4.0alpha3
```

```
[Info]: Loaded extension plugin
[Info]: Loaded apc Plugin.
[Info]: Loaded composer Plugin.
[Info]: Loaded github Plugin.
[Info]: Loaded uprofiler Plugin.
[Info]: Loaded xdebug Plugin.
[Info]: Loaded xhprof Plugin.
[Info]: Loaded zendopcache Plugin.
[Info]: php.ini-production gets used as php.ini
[Info]: Building 7.4.0alpha3 into /home/natanfelles/.phpenv/versions/7.4.0alpha3
[Skipping]: Already downloaded and extracted https://downloads.php.net/~derick/php-7.4.0alpha3.tar.bz2
[Preparing]: /tmp/php-build/source/7.4.0alpha3
[Compiling]: /tmp/php-build/source/7.4.0alpha3
[xdebug]: Installing from source
[xdebug]: Fetching from git://github.com/xdebug/xdebug.git
[xdebug]: commit 6b73bef7329e12c0f578cb75bddca18aa3ebd177
[xdebug]: Compiling xdebug in /tmp/php-build/source/xdebug-master
[xdebug]: Installing xdebug configuration in /home/natanfelles/.phpenv/versions/7.4.0alpha3/etc/conf.d/xdebug.ini
[xdebug]: Cleaning up.
[Info]: Enabling Opcache...
[Info]: Done
[Info]: The Log File is not empty, but the Build did not fail. Maybe just warnings got logged. You can review the log in /tmp/php-build.7.4.0alpha3.20190713183552.log or rebuild with '--verbose' option
[Success]: Built 7.4.0alpha3 successfully.
7.4 => 7.4snapshot
Download composer.phar ...
Move composer.phar to /home/natanfelles/.phpenv/versions/7.4.0alpha3/composer
```

## Checando versões instaladas

```
phpenv versions
```

```
* system (set by /home/natanfelles/.phpenv/version)
  7.3
  7.3.7
  7.4.0alpha3
```

## Checando versão do PHP no diretório atual

```
php -v
```

```
PHP 7.3.4-2 (cli) (built: Apr 13 2019 19:05:48) ( NTS )
Copyright (c) 1997-2018 The PHP Group
Zend Engine v3.3.4, Copyright (c) 1998-2018 Zend Technologies
    with Zend OPcache v7.3.4-2, Copyright (c) 1999-2018, by Zend Technologies
    with Xdebug v2.7.0, Copyright (c) 2002-2019, by Derick Rethans
```

## Trocando versão do PHP no diretório atual

```
phpenv local 7.4.0alpha3
```

```
php -v
```

```
PHP 7.4.0alpha3 (cli) (built: Jul 13 2019 18:58:46) ( NTS )
Copyright (c) The PHP Group
Zend Engine v3.4.0-dev, Copyright (c) Zend Technologies
    with Zend OPcache v7.4.0alpha3, Copyright (c), by Zend Technologies
    with Xdebug v2.8.0alpha2-dev, Copyright (c) 2002-2019, by Derick Rethans
```


## Frontend para o servidor PHP

Veja: [https://github.com/natanfelles/php-server](https://github.com/natanfelles/php-server)

### Auto-detectando o PHP Binário pelo phpenv

```
php-server
```

```
 ____  _   _ ____    ____
|  _ \| | | |  _ \  / ___|  ___ _ ____   _____ _ __
| |_) | |_| | |_) | \___ \ / _ \ '__\ \ / / _ \ '__|
|  __/|  _  |  __/   ___) |  __/ |   \ V /  __/ |
|_|   |_| |_|_|     |____/ \___|_|    \_/ \___|_|

Version: 2.9
PHP Binary: /home/natanfelles/.phpenv/versions/7.4.0alpha3/bin/php
Document Root: /home/natanfelles/php-test
Web Address: http://localhost:8080
Date: Sat, 13 Jul 2019 22:41:00 +0000

[Sat Jul 13 19:41:00 2019] PHP 7.4.0alpha3 Development Server (http://localhost:8080) started

```

### Explicitamente setando o PHP Binário

```
php-server --php ~/.phpenv/versions/7.3.7/bin/php
```

```
 ____  _   _ ____    ____
|  _ \| | | |  _ \  / ___|  ___ _ ____   _____ _ __
| |_) | |_| | |_) | \___ \ / _ \ '__\ \ / / _ \ '__|
|  __/|  _  |  __/   ___) |  __/ |   \ V /  __/ |
|_|   |_| |_|_|     |____/ \___|_|    \_/ \___|_|

Version: 2.9
PHP Binary: /home/natanfelles/.phpenv/versions/7.3.7/bin/php
Document Root: /home/natanfelles/php-test
Web Address: http://localhost:8080
Date: Sat, 13 Jul 2019 22:43:56 +0000

```


---
title:  "Configurando Nginx para Magento"
categories: desenvolvimento
tags: nginx magento linux
image: nginx-magento.png
description: Configurando Nginx para Magento
---

## Atenção!

Teste as configurações após cada mudança com o comando abaixo:

```sh
service nginx reload
```

## Configuração Global

O arquivo de configuração global normalmente localiza-se em /etc/nginx/nginx.conf e possui as princiais definições do servidor, ele também inclui todos os arquivos presentes no diretório /etc/nginx/conf.d/.

O exemplo abaixo nos servirá de referência:

```nginx
user nginx;
worker_processes  1;
error_log         /var/log/nginx/error.log;
pid               /var/run/nginx.pid;

events {
    worker_connections  1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request "'
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    autoindex off;
    ## Detecta quando HTTPS é usado
    map $scheme $fastcgi_https {
        default off;
        https on;
    }

    keepalive_timeout  10;

    gzip  on;
    gzip_comp_level 2;
    gzip_proxied any;
    gzip_types      text/plain text/html text/css application/x-javascript text/xml application/xml application/xml+rss text/javascript;

    ## Carrega os arquivos de configurações presentes em /etc/nginx/conf.d/
    include /etc/nginx/conf.d/*.conf;

}
```

## Sites Individuais

Para cada website com domínio próprio crie um arquivo /etc/nginx/conf.d/DOMAIN.conf, substitua DOMAIN pelo domínio, e insira o seguinte dentro dele:

```nginx
server {
    listen 80;
    server_name DOMAIN.com;
    rewrite / $scheme://www.$host$request_uri permanent; ## Forcibly prepend a www
}

server {
    listen 80 default;
    ## Diretivas SSL deve ir aqui
    ## Domínio carregará com ou sem www
    server_name www.DOMAIN.com *.DOMAIN.com;
    root /var/www/vhosts/DOMAIN.com;

    location / {
        ## Permite mostrar um arquivo html estático antes do php
        index index.html index.php;
        ## Se falhar, passa a URI para o manipulador do Magento
        try_files $uri $uri/ @handler;
        ## Determina que todos os arquivos podem ficar no cache do navegador
        expires 30d;
    }

    ## Este locais devem ter acesso protegido
    location ^~ /app/                { deny all; }
    location ^~ /includes/           { deny all; }
    location ^~ /lib/                { deny all; }
    location ^~ /media/downloadable/ { deny all; }
    location ^~ /pkginfo/            { deny all; }
    location ^~ /report/config.xml   { deny all; }
    location ^~ /var/                { deny all; }

    ## Permite que administradores vejam os arquivos do diretório export
    location /var/export/ {
        ## Mensagem mostrada na janela de login
        auth_basic           "Restricted";
        auth_basic_user_file htpasswd; ## Veja /etc/nginx/htpassword
        autoindex            on;
    }

    location  /. { ## Desativa o acesso direto ao .htaccess e outros arquivos ocultos
        return 404;
    }

    ## Magento usará o manipulador de front
    location @handler {
        rewrite / /index.php;
    }

    ## Redireciona caminhos como /js/index.php/x.js para seu relevante manipulador
    location ~ .php/ {
        rewrite ^(.*.php)/ $1 last;
    }

    ## Executa scripts PHP
    location ~ .php$ {
        ## Catch 404s that try_files miss
        if (!-e $request_filename) { rewrite / /index.php last; }

        ## Não armazena arquivos dinâmicos no cache
        expires        off;
        fastcgi_pass   127.0.0.1:9000;
        fastcgi_param  HTTPS $fastcgi_https;
        fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
        ## Store Code é definido em Admin &gt; Configuration &gt; Manage Stores
        fastcgi_param  MAGE_RUN_CODE default;
        fastcgi_param  MAGE_RUN_TYPE store;
        include        fastcgi_params; ## Veja /etc/nginx/fastcgi_params
    }
}
```

1. Verifique com atenção todas as instâncias de DOMAIN e as substitua pelo seu domínio.
2. Verifique se todos os caminhos são compátiveis com o seu servidor, especialmente o diretório root na linha 11.
3. O arquivo /etc/nginx/fastcgi_params deve estar incluído. Ele é instalado por várias distribuições Linux automaticamente, caso seu servidor não o possuir, obtenha a cópia de algum.
4. O MAGE_RUN_CODE e MAGE_RUN_TYPE são para instalações multi-lojas, cada DOMAIN que represente uma loja deve ter o Store Code no lugar de default na linha 53.
5. Uma senha deve ser configurada para acessar o diretório /var/export/. Para configurar a senha, substitua USERNAME pelo seu nome de usuário e digite o seguinte comando no terminal:
		<br> htpasswd -c /etc/nginx/htpasswd USERNAME

## Certificados SSL

Para a instalação, você precisa verificar a versão do servidor, faça isso:

```sh
nginx -v
```

Prossiga conforme abaixo o resultado.

### Versão Menor que 0.7.14

Para cada DOMAIN, localize na linha 8:

```nginx
listen 80 default;
```

E substitua por:

```nginx
listen 443;
ssl on;
ssl_certificate     /etc/nginx/conf.d/DOMAIN.crt;
ssl_certificate_key /etc/nginx/conf.d/DOMAIN.key;
```

Coloque os arquivos DOMAIN.crt e DOMAIN.key fornecidos pela autoridade certificadora em /etc/nginx/conf.d/

### Versão Maior ou Igual a 0.7.14

Na linha 9 insira o seguinte:

```nginx
listen 443 default ssl;
ssl_certificate     /etc/nginx/conf.d/DOMAIN.crt;
ssl_certificate_key /etc/nginx/conf.d/DOMAIN.key;
```

Coloque os arquivos DOMAIN.crt e DOMAIN.key fornecidos pela Autoridade Certificadora em /etc/nginx/conf.d/

## Fooman Speedster

Se você planeja usar o Fooman Speedster adicione o seguinte código ao bloco server.

```nginx
rewrite ^/minify/([0-9]+)(/.*.(js|css))$ /lib/minify/m.php?f=$2&d=$1 last;
rewrite ^/skin/m/([0-9]+)(/.*.(js|css))$ /lib/minify/m.php?f=$2&d=$1 last;

location /lib/minify/ {
    allow all;
}
```

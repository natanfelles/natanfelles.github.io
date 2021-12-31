---
title: PHP is faster than C++
layout: post
categories: desenvolvimento
image: php-cpp.png
tags: php cpp nginx cgi benchmark
description: Speed test of PHP-FPM versus C++ with CGI
---

Ah, como é bom o perfume das flores do campo! Não acha?

Esses dias comecei a fazer uns testes para tranformar alguns códigos simples escritos em PHP para C++.

Ainda não descobri a melhor maneira de fazer isso, mas comecei usando CGI, para facilitar.

Instalei, configurei, escrevi, compilei, testei e para minha surpresa o teste de benchmark de uma página respondida com PHP-FPM foi quase 10 vezes mais rápida que uma utilizando C++ e CGI.

## Código Fonte

Esse é o código do arquivo `index.php`:

```php
<?php
http_response_code(200);
header('Content-Type: text/html; charset=utf-8');
?>
<!doctype html>
<html>
<head>
<title>Hello World - PHP</title>
</head>
<body>
<h2>Hello World with PHP!</h2>
REMOTE_ADDR: <?= $_SERVER['REMOTE_ADDR'] ?><br>
</body>
</html>
```

Esse é o código do arquivo `index.cpp`:

```cpp
#include <iostream>

int main ()
{
   // Status
   std::cout << "Status: 200 OK\r\n"
   // Headers
   << "Content-Type: text/html; charset=utf-8\r\n"
   // Separator
   << "\r\n"
   // Body contents
   << "<!doctype html>\n"
   << "<html>\n"
   << "<head>\n"
   << "<title>Hello World - CGI</title>\n"
   << "</head>\n"
   << "<body>\n"
   << "<h2>Hello World with CGI!</h2>\n"
   << "REMOTE_ADDR: " << getenv("REMOTE_ADDR") << "<br>\n"
   << "</body>\n"
   << "</html>\n";
   return 0;
}
```

Como visto, a sintaxe da PHP realmente se sobressai, sendo ela uma linguagem de alto-nível.
O que eu não esperava é que a página respondida do script seria mais rápida do que a com código compilado.

Obviamente eu não utilizei as melhores técnicas para fazer isso, mas gostei da experiência.

## Instalações, configurações, compilações e grandes emoções eu vivi

Num sistema baseado no Debian, foi feita essa instalação:

```
sudo apt install build-essential fcgiwrap nginx php-fpm  
```

A compilação do código C++ foi realizada com esse comando:

```
g++ index.cpp -o index.cgi
```

Ambos os gateways foram configurados utilizando nginx.

E aqui está o conteúdo do virtual host:

```nginx
server {
    listen 80;

    root /home/natanfelles/cgi;

    server_name cgi.local;

    location ~ \.cgi$ {
        include /etc/nginx/fastcgi_params;
        fastcgi_pass unix:/var/run/fcgiwrap.socket;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.0-fpm.sock;
    }
}
```

Depois, os arquivos foram colocados no diretório root do virtual host.

## Testes

Os testes foram realizados com o Apache Benchmark.

Teste na página C++ e CGI:

```
ab -n 10000 -c 10 http://cgi.local/index.cgi
```

Teste na página PHP:

```
ab -n 10000 -c 10 http://cgi.local/index.php
```

### Resultados

O tempo das requisições para o arquivo CGI levou 32.377 segundos.

O tempo das requisições para o arquivo PHP levou 3.319 segundos.

## Conclusão

Então, a página com PHP respondeu 9.75 vezes mais rápido do que a com CGI.

## Vem pro play, playboy!

E aí, você tem experiência com C++? Sabe uma maneira de fazer isso mais rápido?

Por favor, diga como fazer isso nos comentários. Vou adorar saber!

Muito obrigado por ler. Hah!



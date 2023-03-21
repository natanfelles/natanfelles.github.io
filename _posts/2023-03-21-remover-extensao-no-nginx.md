---
title: Remover Extensões no Nginx
layout: post
categories: desenvolvimento
image: remover-extensao-nginx.png
tags: nginx linux servidor
description: Como remover extensões de arquivos no servidor web Nginx
---

Normalmente, páginas estáticas possuem a extensão do arquivo ao acessá-las por
um navegador, como, por exemplo, `contact.html`.

Com Nginx é possível remover o sufixo `.html`, fazendo com que a página HTML
`contact.html` seja acessível apenas por `contact`.

Para isso, adicione a linha seguinte no virtual host:

```nginx
try_files $uri $uri.html $uri/index.html =404;
```

Nginx tentará encontrar o arquivo com a extensão e irá respondê-lo caso encontre.

Se não encontrar, carregará a página de Erro 404.

Segue abaixo uma amostra mais detalhada fazendo isso funcionar:


```nginx
server {
    listen 80;

    root /home/natanfelles/websites/teste;

    index index.html;

    server_name teste.local;

    try_files $uri $uri.html $uri/index.html =404;

    error_page 404 /404.html;
}
```

Perceba que esse é o mesmo procedimento utilizado pelo GitHub e GitLab para
disponibilizar sites estático.

Note que o endereço da página atual é
[https://natanfelles.github.io/blog/remover-extensao-no-nginx](https://natanfelles.github.io/blog/remover-extensao-no-nginx)
mas também é acessível com a extensão em
[https://natanfelles.github.io/blog/remover-extensao-no-nginx.html](https://natanfelles.github.io/blog/remover-extensao-no-nginx.html).

Valeu, galera!

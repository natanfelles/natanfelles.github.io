---
layout: post
title:  "Biblioteca IMAP para CodeIgniter"
date:   2016-11-23
categories: desenvolvimento
---

![{{ post.title }}]({{ site.url }}/assets/img_posts/codeigniter-imap.png)

Este projeto possiblita que você use o protocolo IMAP no CodeIgniter Framework.

Perfeito para criar seu próprio webmail ou personalizar o gerenciamento de e-mails em sua aplicação.

## Como Usar

Antes de mais nada, você precisa carregar a biblioteca. Use autoload ou carregue onde precisar desta forma:

```php
<?php
$this->load->library('imap');
```

Após, inicialize a conexão com o servidor:

```php
<?php
$config = array(
	'host'     => 'imap-mail.outlook.com',
	'encrypto' => 'ssl',
	'user'     => 'phpimapclient@outlook.com',
	'pass'     => 'Abcd12345**'
);
$this->imap->imap_connect($config);
```

Feito isso, você pode começar a se comunicar com o servidor. Veja como obter as pastas da sua caixa de e-mails:

```php
<?php
$folders = $this->imap->get_folders();
print_r($folders);
```

## Mais sobre

Há mais de 20 métodos públicos, muito bem documentados, que podem ser utilizados por `$this->imap`. Testei com Gmail, Outlook e Postfix no Linux. Todos funcionaram perfeitamente.

### Dica:

Se você utiliza o PhpStorm, veja este projeto: [CodeIgniter Code Completion para PhpStorm]({{ site.baseurl }}{% post_url 2015-11-19-codeigniter-code-completion-phpstorm %}).


Espero que esta biblioteca possa lhe ser útil e se caso você tenha alguma sugestão ou encontre algum problema, não exite em criar uma issue ou iniciar um Pull Request no [GitHub](https://github.com/natanfelles/codeigniter-imap).

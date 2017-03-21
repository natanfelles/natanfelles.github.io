---
title:  "CodeIgniter Template"
categories: desenvolvimento projetos
tags: codeigniter php html css javascript
image: /assets/img_posts/codeigniter-template.png
description: O grande ganho com esse sistema de template é que não há necessidade de duplicação de código. Acompanhe os arquivos abaixos e você entenderá melhor.
---

![{{ post.title }}]({{ site.url }}/assets/img_posts/codeigniter-template.png)

<div style="display: none;">

Lá em 2012, no lendário Notepad++ comecei minhas primeiras linhas de código HTML e, com o passar do tempo, a ânsia por algo mais prático na construção de páginas me fez iniciar no PHP e aprendi a utilizar a família do _include_.

Revirei vários sistemas CMS (por não exigirem grandes conhecimentos técnicos, inicialmente) e quando aprendi a programar, de verdade, e a gerenciar um servidor Linux, os CMSs acabavam por me limitar (e preocupar) em alguns aspectos.

Chegou o momento em que decidi abandonar Wordpress e Magento e passar para algo um pouco mais forte. Pesquisei pelos frameworks mais famosos e acabei baixando o Zend, o (tão aclamado) Laravel e meu queridíssimo CodeIgniter.

Iniciei com o Zend e fiz meus neurônios trabalharem para fazer coisas que descobri serem tão simples em outros frameworks. Analisei, testei e gostei do Laravel. Mas por consumir menos RAM, ser mais rápido e totalmente fora-da-caixa, com suporte ao HMVC, escolhi o CodeIgniter para focar em meus projetos e neste artigo mostrarei como criar um sistema de template simples, mas muito útil em suas aplicações.

</div>

## Funcionamento

Nesta aplicação, criaremos 5 arquivos:

- application/views/html.php
- application/views/templates/head.php
- application/views/templates/scripts.php
- application/views/pages/example/index.php
- application/controllers/Example.php

Basicamente, funcionará da seguinte maneira:

1. O site é acessado via web e o controller é carregado.
2. O método executa o que for necessário e por fim, carregará a view html.php
3. A view html.php será responsável por carregar os blocos da página: head, scripts e o conteúdo.

Nada fora do normal, exceto pelo fato das views serem requisitadas pelo html.php.

O grande ganho com esse sistema de template é que não há necessidade de duplicação de código. Acompanhe os arquivos abaixos e você entenderá melhor:

## Mãos a obra!

Primeiro, crie o arquivo _application/views/html.php_ como no exemplo:

```php
<!doctype html>
<html lang="<?= isset($lang) ? $lang : 'en' ?>">
<?php
$this->load->view('templates/head');
?>
<body<?= isset($body_attr) ? " {$body_attr}" : '' ?>>
<?php
$this->load->view("pages/{$page}");
$this->load->view('templates/scripts');
?>
</body>
</html>
```

Em seguida, construa o head em _application/views/templates/head.php_:

```php
<head>
	<meta charset="UTF-8">
	<title><?= isset($title) ? $title : 'CodeIgniter' ?></title>
<?php
// CSS Links
if (isset($link_css)):
	foreach ($link_css as $link):
		echo '<link rel="stylesheet" href="' . $link . '">';
	endforeach;
endif;

// CSS Inline
if (isset($inline_css)):
	echo '<style type="text/css">';
	foreach ($inline_css as $inline):
		echo $inline;
	endforeach;
	echo '</style>';
endif;
?>
</head>
```

E o arquivo para o javascript em _application/views/templates/scripts.php_:

```php
<?php
// JS Links
if (isset($link_js)):
	foreach ($link_js as $link):
		echo '<script src="' . $link . '" type="text/javascript"></script>';
	endforeach;
endif;

// JS Inline
if (isset($inline_js)):
	echo '<script type="text/javascript">';
	foreach ($inline_js as $inline):
		echo $inline;
	endforeach;
	echo '</script>';
endif;
```

Feito isso, vamos à página de exemplo em _application/views/pages/example/index.php_:

```php
<div class="container">
	<div class="jumbotron">
		<h1>
		<span class="glyphicon glyphicon-fire"></span> CodeIgniter Template</h1>
		<p>Esta é uma página de exemplo.</p>
	</div>
</div>
```

Com as views já criadas, podemos fazer um controller em _application/controllers/Example.php_:

```php
<?php

class Example extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		// Precisamos desse helper para usarmos a função base_url()
		$this->load->helper('url');
	}

	public function index()
	{
		// views/html.php - Idioma da página html
		$data['lang'] = 'pt-BR';

		// views/pages/example/index.php - Conteúdo do body
		// Crie uma pasta com o nome do controller e arquivo com nome do método para melhor organizar
		$data['page'] = 'example/index';

		// views/templates/head.php - Título da Página
		$data['title'] = 'CodeIgniter Template';

		// views/html.php - Atributos da tag body
		$data['body_attr'] = 'class="grey"';

		// views/templates/head.php - CSS links.
		// Adicione os links de suas folhas de estilo
		$data['link_css'] = array(
			'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css', // Externo
			base_url('assets/css/styles.css'), // Local
		);

		// views/templates/head.php - CSS inline. Será inserido dentro da tag style, no head
		$data['inline_css'] = array(
			'body {padding-top: 70px}',
			'.grey {background-color: #f9f9f9}',
			'.jumbotron {background-color: #343131; color: #b3b3b3 }',
			'h1 {color: #fff !important}',
			'.glyphicon-fire {color: #dd4814; font-size: 150%}',
		);

		// views/templates/scripts.php - JS links. Serão inseridos na view scripts.php
		$data['link_js'] = array(
			'https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js',
			'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js',
			base_url('assets/js/scripts.js'),
		);

		// views/templates/scripts.php - JS inline. Será inserido dentro da tag script
		$data['inline_js'] = array(
			'console.log("Hello!")',
		);

		// Carrega a view principal e define os dados dinâmicos
		$this->load->view('html', $data);
	}

}
```

## Fim

Acredito que, só de analisar o código, você já consiga ter uma noção do funcionamento. Mas o melhor, mesmo, sempre é a prática. Então, que tal começar?

Você pode baixar, abrir issues ou fazer um fork e contribuir com esse projeto no [GitHub](http://github.com/natanfelles/codeigniter-template){:target="_blank"}.

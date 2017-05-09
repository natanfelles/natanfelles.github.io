---
title:  CodeIgniter Code Completion para PhpStorm
categories: desenvolvimento projetos
tags: codeigniter php
image: codeigniter-phpstorm.png
description: Trabalhar com o CodeIgniter no PhpStorm pode ser um pouco complicado inicialmente pois a IDE não detecta os objetos das classes CI_Controller e CI_Model, mas este pequeno problema pode ser resolvido com praticidade sem que seja necessário modificar arquivos do diretório system.
---

## O Problema

Trabalhar com o CodeIgniter no PhpStorm pode ser um pouco complicado inicialmente pois a IDE não detecta os objetos das classes CI_Controller e CI_Model, mas este pequeno problema pode ser resolvido com praticidade sem que seja necessário modificar arquivos do diretório system.

## A Solução

Abaixo, coloquei o link do repositório de um arquivo criado para que o PhpStorm detecte os objetos do CodeIgniter.

Extraia-o no mesmo diretório do arquivo index.php e através do PhpStorm vá até o diretório system/core/ e selecione os arquivos Controller.php e Model.php, clique com o botão direito, depois em _Mark as Plain Text_. Isso fará com que o editor não tente detectar a documentação nesses aquivos. Quando você for chamar objetos do framework, o pop-up de auto-completar, como na imagem acima, aparecerá para facilitar a sua vida.

## Observações

- Funciona perfeitamente com o CodeIgniter 3.
- Atualizações podem ser realizadas diretamente no arquivo phpstorm.php, vide CodeIgniter User Guide.

[Ver no GitHub](https://github.com/natanfelles/codeigniter-phpstorm){:target="_blank" class="btn btn-default"}

---
title: 'Composer Auto Complete'
layout: post
categories: desenvolvimento
image: composer-auto-complete.png
tags: php composer linux
---

O [composer](https://getcomposer.org/) facilita, e muito, o desenvolvimento com PHP. Mas, trabalhando na linha de comando, já me acostumei a não ter que ficar digitando todos os comandos o tempo todo. Principalmente utilizando o **apt** para gerenciar os pacotes do Sistema Operacional.

Porém, no composer não há, nativamente, o auto-completar de comandos. Uma rápida pesquisa, análise de código e já foi possível sanar esse pequeno "problema".

Alguém, muito tempo antes de mim, já sentiu essa mesma necessidade e fez melhor, criou um plugin de auto-completar para o composer. Veja como fazer para instalar e utilizar:

## Instalação

Antes de instalá-lo você já deve ter o **Gerenciador de Dependência para PHP** instalado.

Execute:

```sh
composer global require stecman/composer-bash-completion-plugin dev-master
```

Com a instalação realizada, será necessário fazer o _bash auto-completion_ saber onde está o arquivo de inicialização do plugin. Então, rode:

```sh
echo "source \"${COMPOSER_HOME-$HOME/.composer}/vendor/stecman/composer-bash-completion-plugin/hooks/bash-completion\"" >> ~/.bashrc
```

Isso adicionará uma linha contendo as instruções necessárias para utilizar o plugin no arquivo oculto `.bashrc` no diretório home do seu usuário.

## Utilizar

Reinicie sua sessão do _bash_ e já poderá usufruir do auto-completar.

Basta digitar `composer` e pressionar a tecla **Tab** para que as possíveis opções sejam mostradas na tela. O bacana é que ele também mostra as dependências instaladas e isso facilita o gerenciamento.

## Fonte

-   [BASH/ZSH auto-complete plugin for Composer](https://github.com/stecman/composer-bash-completion-plugin)

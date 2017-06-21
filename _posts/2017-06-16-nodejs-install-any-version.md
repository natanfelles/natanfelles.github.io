---
title: 'Instalando qualquer versão do Node.js'
layout: post
categories: desenvolvimento
image: nodejs-install.png
tags: nodejs linux servidor
---

Já havia algum tempo que eu vinha enfrentando dificuldades para trabalhar com o frontend no Laravel devido a diversas falhas ocorridas no processo de instalação dos pacotes necessários conforme o seu `package.json`.

Acontece que os repositórios das distros mais utilizadas têm mantido uma versão muito antiga do **nodejs** e então pode ser necessário instalar uma versão mais atual "manualmente".

O processo é bem prático e funciona perfeitamente.

Primeiro, instale o `npm`, caso já não o tiver:

```sh
sudo apt install npm
```

Em seguida, vamos instalar o pacote **n** (Interactively Manage All Your Node Versions), para poder gerenciar interativamente todas as nossas versões do Node:

```sh
sudo npm cache clean -f
sudo npm install -g n
```

Feito isso, basta rodar o comando `n list` para listar todas as versões disponíveis.

Escolha a versão que desejar e instale conforme o exemplo abaixo:

```sh
sudo n 8.0.0
```

Basta aguardar e tudo será atualizado automaticamente.

Método mais rápido e eficiente que encontrei.

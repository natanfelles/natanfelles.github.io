---
title:  "Steam: Jogando no Linux"
categories: desenvolvimento
tags: linux steam
image: /assets/img_posts/steam.png
description: Steam é um software proprietário que permite a interação online através de chats, transmisão de gameplays e principalmente jogar. Jogar praticamente qualquer game conhecido da atualidade (mais de 6 mil), destaque para famosos como  Counter-Strike, Half-Life e Grand Theft Auto.
---

![{{ post.title }}]({{ site.url }}/assets/img_posts/steam.png)

## O que é Steam?

Steam é um software proprietário que permite a interação online através de chats, transmisão de gameplays e principalmente jogar. Jogar praticamente qualquer game conhecido da atualidade (mais de 6 mil), destaque para famosos como  Counter-Strike, Half-Life e Grand Theft Auto.

## Instalação

Por possuir condições que impedem a redistribuição de software em sua liceça, o Steam não está nos repositórios padrão do Debian, e sim nos _non-free_.

Para iniciarmos a instalação, vamos aos comandos:

```sh
vi /etc/apt/sources.list
```

Adicione os repositórios <em>non-free</em>, como no exemplo:

```sh
# Debian
deb http://ftp.br.debian.org/debian/ jessie non-free contrib main
deb-src http://ftp.br.debian.org/debian/ jessie non-free contrib main

# Debian Security
deb http://security.debian.org/ jessie/updates non-free contrib main
deb-src http://security.debian.org/ jessie/updates non-free contrib main

# Debian Jessie Updates
deb http://ftp.br.debian.org/debian/ jessie-updates non-free contrib main
deb-src http://ftp.br.debian.org/debian/ jessie-updates non-free contrib main
```
Pressione `Esc` + `:wq` + `Enter` para salvar e sair.

Devemos adicionar a arquitetura i386 e atualizar a lista pacotes para rodar aplicações 32 bits:

```sh
dpkg --add-architecture i386;
apt-get update
```

Instale o Steam:

```sh
apt-get install steam
```
Para utilizar os recursos da sua placa de vídeo, instale a biblioteca OpenGL de acordo com o seu hardware.

Nvidia:

```sh
apt-get install install libgl1-nvidia-glx:i386
```

ATI/AMD:

```sh
apt-get install install libgl1-fglrx-glx:i386
```

## Divirta-se

Após finalizar as instalações você já poderá encontrar o ícone do Steam nas categorias de games e internet do menu.

## Fontes

- [Debian Wiki](https://wiki.debian.org/pt_BR/Steam){:target="_blank"}
- [Steam Powered](http://store.steampowered.com/browse/linux/){:target="_blank"}

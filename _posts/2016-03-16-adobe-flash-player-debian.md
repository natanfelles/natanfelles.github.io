---
title:  "Adobe Flash Player no Debian"
categories: desenvolvimento
tags: flash-player debian linux
image: flash-player.png
description: Veja como instalar o Adobe Flash Player no Debian.
---

## Sobre

Uma das intempéries mais comuns que podem acontecer utilizando sistemas GNU/Linux é a ausência de softwares proprietários. Um caso muito comum é a falta do Adobe Flash Player, principalmente para executar elementos em websites que ainda não se adaptaram ao HTML5.

Se tratando de GNU/Linux sempre há uma solução. Talvez você tenha que estudar e programar um pouquinho (ou muito), mas sempre tem um jeito.

Atualmente, muitos softwares proprietários estão disponíveis à partir dos repositórios oficiais de muitas distribuições Linux. No Debian, podemos utilizá-los inserindo o repositório _non-free_ no arquivo _/etc/apt/sources.list_ como no exemplo abaixo:

{: .file-excerpt }
/etc/apt/sources.list
:	```sh
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

Sempre que modificar o arquivo de fontes de repositórios é recomendável atualizar o sistema.

## Instalação

Para instalar o software requisitado, utilize o _apt-get_:

```sh
apt-get install flashplugin-nonfree
```

## Atualização

Sempre que quiser atualizar para a última versão do Flash Player, execute:

```sh
update-flashplugin-nonfree --install
```

## Fonte

- [Debian Wiki](https://wiki.debian.org/FlashPlayer){:target="_blank"}

---
title:  "Manpages Coloridas e em Português"
categories: desenvolvimento
tags: manpages linux
image: man-cp.png
description: Veja como configurar as páginas de manuais de softwares no Linux para português e coloridas.
---

No mundo Unix, a maioria dos programas possuem diversas opções  via linha de comando e é praticamente impossível lembrar-se de tudo quando você quer resolver alguma coisa através do terminal.

Para facilitar a vida do sysadmin, todo programa que se preza possui em seu pacote nem que seja uma mísera documentação possível. As quais podem ser utilizadas através do comando _man_ (de manual). Por exemplo: para sabermos as possíveis utilizações do comando _cp_, podemos simplesmente abrir o terminal e digitar:

```sh
man cp
```

Então podemos estudar ou relembrar aquele comando que você estava precisando e não lembrava mais.

Porém, por padrão as manpages não possuem coloração para facilitar a leitura e tudo vem em inglês. Podemos resolver essa situação com a instalação do _most_ e também com a instalação dos manuais em português.

Para isso, abra o terminal e execute:

```sh
apt-get install most manpages-pt manpages-pt-dev
```

Para utilizar o most, mude a variável de ambiente MANPAGER:

```sh
export MANPAGER="/usr/bin/most -s"
```

Depois disso, veja o novo visual do manual do cp:

```sh
man cp
```

Esta configuração durará apenas para a sessão atual, para que o most seja seu visualizador de manuais padrão, execute:

```sh
echo 'export MANPAGER="/usr/bin/most -s"' >> ~/.bashrc
```

Se você quiser que o most seja o paginador padrão do man para todos os usuários, execute o comando abaixo como super user:

```sh
echo 'export MANPAGER="/usr/bin/most -s"' >> /etc/profile
```

E é isso.

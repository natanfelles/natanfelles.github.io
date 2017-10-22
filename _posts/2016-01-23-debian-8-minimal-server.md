---
title:  Debian 8 Minimal Server
categories: desenvolvimento
tags: debian linux virtualbox
image: login-background.png
description: Aprenda como instalar o Debian 8 com o mínimo de softwares necessários para poder personalizar seu servidor ou desktop.
---

## Mínimo... Por quê?

A versão Debian Minimal possui apenas os pacotes realmente necessários para o funcionamento do sistema, sendo mais leve e possibilitando que o usuário personalize-o conforme suas necessidades.

O intuito desse tutorial é configurar o Debian para rodar posteriormente como servidor, sem interface gráfica e com configurações básicas que facilitarão o seu gerenciamento.

## 1 – Requerimentos

Para instalar o Debian 8, precisamos do CD de instalação. Você pode fazer o download através dos links abaixo conforme a arquitetura do seu sistema:

- **32 Bits**: [http://cdimage.debian.org/debian-cd/8.2.0/i386/iso-cd/debian-8.2.0-i386-netinst.iso](http://cdimage.debian.org/debian-cd/8.2.0/i386/iso-cd/debian-8.2.0-i386-netinst.iso){:target="_blank"}
- **64 Bits**: [http://cdimage.debian.org/debian-cd/8.2.0/amd64/iso-cd/debian-8.2.0-amd64-netinst.iso](http://cdimage.debian.org/debian-cd/8.2.0/amd64/iso-cd/debian-8.2.0-amd64-netinst.iso){:target="_blank"}

Caso os links acima tenham sido modificados pela equipe do Debian, faça o download através da página oficial:

- [Debian – Instalação via rede a partir de um CD mínimo](https://www.debian.org/CD/netinst/){:target="_blank"}

Se você já possui uma ISO com a versão CD/DVD da distribuição estável, ele funcionará da mesma forma; Então não precisa baixar novamente.

## 2 – Notas Preliminares

Neste tutorial, será usado o hostname debian.dominio.com com o IP 192.168.1.100 e gateway 192.168.1.1. Com certeza, você pode mudar essas configurações de acordo com às suas necessidades.

## 3 – Instalação do Sistema Base

Insira o CD de instalação e dê boot por ele. Se você estiver usando o VirtualBox, veja como configurá-lo para a instalação de novos sistema [clicando aqui]({{ site.baseurl }}{% post_url 2016-01-25-configurando-maquinas-virtuais-virtualbox %}) e depois continue este tutorial.

Selecione _Graphical install_ para usar a interface gráfica de instalação:

![Debian 01]({{ 'assets/img_posts/debian-install-01.png' | relative_url }})

Selecione o idioma padrão do sistema. Para servidores, normalmente, deixa-se em inglês, mesmo.

![Debian 02]({{ 'assets/img_posts/debian-install-02.png' | relative_url }})

Escolha a localização da sua máquina:

![Debian 03]({{ 'assets/img_posts/debian-install-03.png' | relative_url }})

![Debian 04]({{ 'assets/img_posts/debian-install-04.png' | relative_url }})

![Debian 05]({{ 'assets/img_posts/debian-install-05.png' | relative_url }})

![Debian 06]({{ 'assets/img_posts/debian-install-06.png' | relative_url }})

Selecione o layout do seu teclado:

![Debian 07]({{ 'assets/img_posts/debian-install-07.png' | relative_url }})

O instaldor irá verificar o CD de instalação, o hardware e configurar a rede se houver um servidor DHCP:

![Debian 08]({{ 'assets/img_posts/debian-install-08.png' | relative_url }})

Defina o hostname. Neste exemplo, o servidor se chamará debian.dominio.com, então eu coloquei debian:

![Debian 09]({{ 'assets/img_posts/debian-install-09.png' | relative_url }})

Defina seu domínio. Neste exemplo será dominio.com:

![Debian 10]({{ 'assets/img_posts/debian-install-10.png' | relative_url }})

Depois, defina a senha do super usuário root:

![Debian 11]({{ 'assets/img_posts/debian-install-11.png' | relative_url }})

Crie uma conta de usuário Linux padrão, pode ser seu próprio nome. Eu escolhi colocar Administrador; com o nome de usuário administrador (não use admin pois isto é um nome reservado pelo Debian):

![Debian 12]({{ 'assets/img_posts/debian-install-12.png' | relative_url }})

![Debian 13]({{ 'assets/img_posts/debian-install-13.png' | relative_url }})

![Debian 14]({{ 'assets/img_posts/debian-install-14.png' | relative_url }})

Selecione o fuso horário do servidor:

![Debian 15]({{ 'assets/img_posts/debian-install-15.png' | relative_url }})

Agora, vamos particionar os disco. Para simplificar a instalação, selecionei
	_Guided – use entire disk and set up LVM_, o que criará uma grande partição / para o sistema de arquivos e outra para a swap. Se você souber o que está fazendo, pode personalizar conforme achar necessário;

![Debian 16]({{ 'assets/img_posts/debian-install-16.png' | relative_url }})

![Debian 17]({{ 'assets/img_posts/debian-install-17.png' | relative_url }})

![Debian 18]({{ 'assets/img_posts/debian-install-18.png' | relative_url }})

![Debian 19]({{ 'assets/img_posts/debian-install-19.png' | relative_url }})

Quando estiver terminado o particionamento, selecione _Finish partitioning and write changes to disk_:

![Debian 20]({{ 'assets/img_posts/debian-install-20.png' | relative_url }})

Selecione _Yes_ quando aparecer a pergunta _Write changes to disk?_:

![Debian 21]({{ 'assets/img_posts/debian-install-21.png' | relative_url }})

Em seguida, as novas partições serão criadas e formatadas. Enfim, o sistema base estará instalado:

![Debian 22]({{ 'assets/img_posts/debian-install-22.png' | relative_url }})

Agora, iremos configurar o gerenciador de pacotes apt. Se você também estiver usando o CD Debian Jessie Netinstall, que possui o mínimo requerido de pacotes, deve usar um espelho de rede. Selecione o país onde o espelho de rede localiza-se (normalmente, utiliza-se o mesmo país onde o servidor está localizado por causa da baixa latência).

Selecione o país e a rede espelho que você quer utilizar:

![Debian 23]({{ 'assets/img_posts/debian-install-23.png' | relative_url }})

![Debian 24]({{ 'assets/img_posts/debian-install-24.png' | relative_url }})

Se você estiver usando um Proxy HTTP, configure-o agora ou simplesmente deixe em branco e clique em
	_Continue_:

![Debian 25]({{ 'assets/img_posts/debian-install-25.png' | relative_url }})

O Apt irá atualizar a base de pacotes através do espelho selecionado anteriormente:

![Debian 26]({{ 'assets/img_posts/debian-install-26.png' | relative_url }})

Podemos selecionar <em>No</em> para não enviar informações anônimas sobre o uso de pacotes:

![Debian 27]({{ 'assets/img_posts/debian-install-27.png' | relative_url }})

Selecionaremos apenas <em>SSH server</em> (para podermos logar remotamente por SSH) e _Standard system utilities_, depois pressione _Continue_.

![Debian 28]({{ 'assets/img_posts/debian-install-28.png' | relative_url }})

Os pacotes selecionados serão baixados e instalados automaticamente através do Apt:

![Debian 29]({{ 'assets/img_posts/debian-install-29.png' | relative_url }})

Quando questionado por _Install the GRUB boot loader to the master boot record?_, selecione _Yes_:

![Debian 30]({{ 'assets/img_posts/debian-install-30.png' | relative_url }})

O instaldor irá perguntar em qual partição você deseja instalar o gerenciador de inicialização Grub. Neste caso, meu servidor possui apenas um disco, então escolhi /dev/sda.

![Debian 31]({{ 'assets/img_posts/debian-install-31.png' | relative_url }})

Pressione enter para instalar o Grub e finalizar a instalação do sistema.

A instalação foi concluída. Remova o CD de instalação e clique em <em>Continue</em> para reiniciar o sistema:

![Debian 32]({{ 'assets/img_posts/debian-install-32.png' | relative_url }})

Ao iniciar o sistema você verá a tela do Grub, pressione enter ou aguarde o sistema iniciar automaticamente.

![Debian 33]({{ 'assets/img_posts/debian-install-33.png' | relative_url }})

Logo você estará com o sistema de login carregado.

![Debian 34]({{ 'assets/img_posts/debian-install-34.png' | relative_url }})

Entre com o nome de usuário _root_ e a senha de root que você escolheu durante a instalação. Quando quiser logar por SSH, use seu nome de usuário padrão, no meu caso _administrador_, pois o usuário root, por padrão, é desabilitado de conexões remotas via SSH. Digite _su_ (super user) e entre com a senha:

![Debian 35]({{ 'assets/img_posts/debian-install-35.png' | relative_url }})

## 4 – Instalação do Servidor SSH

Se você não instalou o servidor OpenSSH durante a instalação do sistema, faça isso agora:

```sh
apt-get -y install ssh openssh-server
```

Agora você poderá se conectar remotamente através de Clientes SSH.

## 5 – Instalação do VIM

Como editor padrão, prefiro usar o Vi Improved. Para instalá-lo, fazemos assim:

```sh
apt-get -y install vim-nox
```

### Nota para Iniciantes:

- Para abrir ou criar arquivos, digite: `vi /local/nomedoarquivo`.
- Para editar, pressione a tecla `i`, de _insert_.
- Para salvar, pressione `Esc` e depois `:w`, de _write_, ou `:wq` para escrever e sair.
- Dúvidas? Veja os principais comandos no [Wikipédia](https://pt.wikipedia.org/wiki/Vi){:target="_blank"}. Não se preocupe, você vai se acostumar.

Você não precisa instalar o VIM se prefere usar outro editor.

## 6 – Configuração da Rede

Por padrão, o instalador do Debian 8 configura a rede automaticamente com DHCP, temos que trocar isso pois um servidor precisa ter um IP Estático. Edite o arquivo /etc/network/interfaces e ajuste conforme precisar (neste exemplo, usarei o IP 192.168.1.100):

```sh
vi /etc/network/interfaces
```

O arquivo de interfaces criado automaticamente pelo instalador apt ficou assim:

{: .file-excerpt }
/etc/network/interfaces
:	```sh
	# This file describes the network interfaces available on your system
	# and how to activate them. For more information, see interfaces(5).

	source /etc/network/interfaces.d/*

	# The loopback network interface
	auto lo
	iface lo inet loopback

	# The primary network interface
	allow-hotplug eth0
	iface eth0 inet dhcp
	```

E aqui está o arquivo já configurado com o IP Estático 192.168.1.100 definido. Deixe o seu conforme este:

{: .file-excerpt }
/etc/network/interfaces
:	```sh
	# This file describes the network interfaces available on your system
	# and how to activate them. For more information, see interfaces(5).

	# The loopback network interface
	auto lo
	iface lo inet loopback

	# The primary network interface
	#allow-hotplug eth0
	#iface eth0 inet dhcp
	auto eth0
	iface eth0 inet static
			address 192.168.1.100
			netmask 255.255.255.0
			network 192.168.1.0
			broadcast 192.168.1.255
			gateway 192.168.1.1
	```

Por termos configurado a placa de rede eth0 para iniciar automaticamente, precisaremos reiniciar o servidor:

```sh
reboot
```

Nas próximas vezes que precisar reiniciar a rede, apenas use:

```sh
service networking restart
```

Entre como root novamente e edite o aquivo /etc/hosts:

```sh
vi /etc/hosts
```

Ele deve ficar semelhante a este exemplo:

{: .file-excerpt }
/etc/hosts
:	```sh
	127.0.0.1         localhost.localdomain      localhost
	192.168.1.100     debian.dominio.com         debian

	# The following lines are desirable for IPv6 capable hosts
	::1     localhost ip6-localhost ip6-loopback
	ff02::1 ip6-allnodes
	ff02::2 ip6-allrouters
	```

Se você quiser mudar o hostname, podes fazê-lo assim:

```sh
vi /etc/hostname
```

O arquivo /etc/hostname contém o nome do servidor, mas sem o domínio. No meu caso, apenas _debian_, modifique-o se quiser e depois reinicie o serviço do hostname para que a alteração entre em vigor:

```sh
service hostname restart
```

```sh
hostname;
hostname -f
```

Se a saída dos comandos mostrar o nome configurado, tudo está certo.

**Observação**: Se você mudar o hostname, não esqueça de atualizar o arquivo /etc/hosts.

## 7 – Atualização do Sistema

Primeiro, certifique-se de que o arquivo /etc/apt/sources.list contém o repositório jessie/updates (o qual permitirá a instalação dos pacotes mais atuais), e que os repositórios contrib e non-free estão habilitados.

```sh
vi /etc/apt/sources.list
```

O arquivo deve ficar semelhante ao exemplo abaixo:

{: .file-excerpt }
/etc/apt/sources.list
:	```sh
	#deb cdrom:[Debian GNU/Linux 8.2.0 _Jessie_ - Official amd64 NETINST Binary-1 20150906-11:09]/ jessie main

	deb http://ftp.br.debian.org/debian/ jessie main contrib non-free
	deb-src http://ftp.br.debian.org/debian/ jessie main contrib non-free

	deb http://security.debian.org/ jessie/updates main contrib non-free
	deb-src http://security.debian.org/ jessie/updates main contrib non-free

	# jessie-updates, previously known as 'volatile'
	deb http://ftp.br.debian.org/debian/ jessie-updates main contrib non-free
	deb-src http://ftp.br.debian.org/debian/ jessie-updates main contrib non-free
	```

Depois, atualize os repositórios:

```sh
apt-get update
```

Em seguida, faça o upgrade:

```sh
apt-get upgrade
```

E é isso! A instalação mínima está pronta para receber configurações avançadas.

---
title:  Configurando Máquinas Virtuais no VirtualBox
categories: desenvolvimento
tags: virtualbox linux
image: virtualbox.png
description: Aprenda a instalar o VirtualBox e configurar VMs com acesso à internet.
---

## Apresentação

O VirtualBox é um poderoso sistema de virtualização de código aberto mantido pela Oracle. Através dele você pode rodar diversos sistemas operacionais em uma única máquina física. Importante para a realização de testes, incompatibilidade de softwares, criação de redes e muito mais.

## Instalação

Podemos encontrar os arquivos de instalação no site [www.virtualbox.org](https://www.virtualbox.org/wiki/Downloads){:target="_blank"} compatíveis com várias plataformas.


Nesse artigo, instalaremos o VirtualBox através da linha de comando para que possamos mantê-lo sempre atualizado através do apt-get. Vamos lá:

Abra o terminal e edite o arquivo /etc/apt/sources.list:

```sh
vi /etc/apt/sources.list
```

Abaixo, segue o exemplo do meu arquivo atual. Adicione apenas a última linha, se quiser:

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

# VirtualBox
deb http://download.virtualbox.org/virtualbox/debian jessie contrib
```

Para que o novo repositório seja validado, adicione a apt-key:

```sh
wget -q https://www.virtualbox.org/download/oracle_vbox.asc -O- | sudo apt-key add -
```

Em seguida; atualize os repositórios e faça o upgrade:

```sh
apt-get update;
apt-get upgrade
```

Agora, vamos à instalação:

```sh
apt-get install virtualbox-5.0
```

Pode levar alguns minutos até baixar e instalar os pacotes necessários, aguarde. Assim que finalizar a instalação, precisaremos também do DKMS para que o VirtualBox realize as modificações necessárias em determinados módulos do kernel:

```sh
apt-get install dkms
```

Voilà! Tudo pronto para receber novos Sistemas Operacionais.

## Configurando uma VM

Indo até o menu de aplicativos do sistema você já deverá encontrar o item _Oracle VM VirtualBox_ na categoria de administração. Um clique para abri-lo ou escreva _virtualbox_ no terminal e pressione enter.

Para finalizar este tutorial, veremos a configuração básica para rodar qualquer sistema, possibilitando o acesso à internet. Nesse caso, veremos a pré-configuração do Mac OS X Yosemite.

Abra o VirtualBox e clique no menu &#8220;Novo&#8221;:

![VirtualBox 01]({{ 'assets/img_posts/virtualbox-install-01.png' | relative_url }})

O programa é super intuitivo, dê um nome à sua Virtual Machine, escolha o tipo e a versão do sistema:

![VirtualBox 02]({{ 'assets/img_posts/virtualbox-install-02.png' | relative_url }})

Em seguida, defina a quantidade de RAM dedicada ao novo SO.

### Atenção!

- Cuidado para não colocar muita RAM. O sistema hospedeiro poderá travar por insuficiência de memória.

![VirtualBox 03]({{ 'assets/img_posts/virtualbox-install-03.png' | relative_url }})

Acrescente um novo disco rígido:

![VirtualBox 04]({{ 'assets/img_posts/virtualbox-install-04.png' | relative_url }})

O tipo de arquivo de disco rígido pode ser mantido como VDI:

![VirtualBox 05]({{ 'assets/img_posts/virtualbox-install-05.png' | relative_url }})

Agora, você pode escolher o tipo de armazenamento do disco. Dinamicamente alocado permitirá que o tamanho do arquivo VDI aumente conforme você for salvando dados na VM, já o tamanho fixo deve ser pré-determinado, o que, inicialmente, ocupará mais espaço do disco físico, porém fornece um desempenho melhor ao rodar a VM. No meu caso, deixarei o armazenamento dinâmico, mesmo&#8230;

![VirtualBox 06]({{ 'assets/img_posts/virtualbox-install-06.png' | relative_url }})

Defina o local onde o VDI será salvo e o seu tamanho. Se você definiu o disco virtual como Dinamicamente alocado, esse será o tamanho máximo que ele pode chegar. Se o definiu como com Tamanho Fixo, o arquivo já alocará este tamanho em seu disco físico.

![VirtualBox 07]({{ 'assets/img_posts/virtualbox-install-07.png' | relative_url }})

Depois que criar o disco virtual, as definições básicas da VM estarão concluídas. Porém, podemos realizar mais configurações para adaptarmos a máquina virtual conforme necessário. Clique no menu _Configurações_:

![VirtualBox 08]({{ 'assets/img_posts/virtualbox-install-08.png' | relative_url }})

Na janela de configurações, podemos ajustar as opções do Sistema. Podes mudar a quantidade de memória, ordem de boot e outros:

![VirtualBox 09]({{ 'assets/img_posts/virtualbox-install-09.png' | relative_url }})

Nas opções do Monitor, ajuste as configurações 3D se o sistema convidado possui interface gráfica:

![VirtualBox 10]({{ 'assets/img_posts/virtualbox-install-10.png' | relative_url }})

Em Armazenamento, você pode adicionar mais drives e já inserir a imagem de instalação:

![VirtualBox 11]({{ 'assets/img_posts/virtualbox-install-11.png' | relative_url }})

No menu Rede, uma boa escolha é conectar a placa em modo bridge para usar a placa de rede física:

![VirtualBox 12]({{ 'assets/img_posts/virtualbox-install-12.png' | relative_url }})

Assim que finalizar as configurações, clique no menu <em>Iniciar</em> para ligar a VM:

![VirtualBox 08]({{ 'assets/img_posts/virtualbox-install-08.png' | relative_url }})

Caso não tenha sido inserido uma imagem de disco, o VirtualBox pedirá que você faça isso:

![VirtualBox 13]({{ 'assets/img_posts/virtualbox-install-13.png' | relative_url }})

Com tudo pronto, agora você pode prosseguir com a instalação do SO:

![VirtualBox 14]({{ 'assets/img_posts/virtualbox-install-14.png' | relative_url }})

## Conclusão

O uso do VirtualBox eleva o sysadmin a outro nível, facilitando vários tipos de testes e diminui consideravelmente os gastos na produção. Atualmente você pode instalar praticamente qualquer sistema virtualmente e isso é incrível. Não acha?

---
title: 'Pastas Compartilhadas no VirtualBox'
layout: post
categories: desenvolvimento
image: virtualbox-pastas-compartilhadas.png
tags: linux debian ubuntu virtualbox
description: Compartilhe diretórios locais com suas máquinas virtuais. 
---

Uma maneira muito prática de trabalhar com máquinas virtuais sem precisar fazer upload por FTP ou SSH a toda hora é utilizando as opções de pastas compartilhadas no VirtualBox.

Esse é o mesmo procedimento utilizado pelo Vagrant. Porém, um pouquinho mais demorado. Mas vale a pena saber.

Você já deve ter o [VirtualBox]({{ site.baseurl }}{% post_url 2016-01-25-configurando-maquinas-virtuais-virtualbox %}) instalado e também a ISO com os arquivos Adicionais para Convidados.

Caso não tiver, faça assim:

```sh
sudo apt install virtualbox-guest-additions-iso
```

Para compartilhar pastas você pode defininá-las pela interface do VirtualBox. Entre nas **Configurações** da VM e vá até a opção **Pastas Compartilhadas**. Defina o **Caminho da Pasta** em seu computador e o **Nome da Pasta**, pelo qual ela irá atender no sistema de arquivos do VirtualBox, dentro da máquina virtual. Também marque se deseja que a pasta seja de **Apenas Leitura**, para que não possa haver modificações dentro da VM e se quer **Montar Automaticamente**, para ela poder ficar disponível durante o boot.


## Instalação dos Adicionais para Convidado na VM

Vá até a janela da máquina virtual, no menu **Dispositivos** e clique em **Inserir imagem de CD dos Adicionais para Convidado...**.

Com o CD inserido, vá para o terminal, monte e instale:

```sh
sudo mount /media/cdrom0 /media/cdrom
sudo /media/cdrom/VBoxLinuxAdditions.run
```

Concluída a instalação já será possível montar as pastas compartilhadas manualmente, conforme abaixo:

```sh
sudo mount -t vboxsf nome_da_pasta_compartilhada local_de_montagem_na_vm
```

**\*** _O local de montagem deve ser um diretório existente._

## Montagem Automática de Pastas Compartilhadas

Se você definiu alguma pasta compartilhada para ter montagem automática, o local padrão onde elas ficam é dentro do diretório `/media` com o prefixo **sf_**. Por exemplo, se o nome de uma pasta é *websites* então ela será montada em `/media/sf_websites`.

Para que as pastas sejam montadas automaticamente em um local diferente já durante a inicialização do sistema. Adicione uma linha no arquivo `/etc/fstab` conforme este exemplo:

```
nome_da_pasta_compartilhada	 local_de_montagem_na_vm           vboxsf    defaults        0       0
```

E, para finalizar, somente usuários do grupo **vboxsf** podem ver o conteúdo das pastas compartilhadas que são montadas automaticamente. Então, para aqueles que devem ter acesso, adiciones-o ao grupo:

```
adduser usuario vboxsf
```

## Fonte

-   [Oracle VM VirtualBox - User Manual](http://download.virtualbox.org/virtualbox/5.1.22/UserManual.pdf#page=68)

---
title:  "Gerenciar Swap em Produção"
categories: desenvolvimento
tags: swap linux servidor
image: /assets/img_posts/ram.png
description: Hoje realizei uma manutenção preventiva em meu gabinete e, por algum motivo não identificado, uma das memórias RAM parou de funcionar.
---

![{{ post.title }}]({{ site.url }}/assets/img_posts/ram.png)

## Um drama de RAM

Hoje realizei uma manutenção preventiva em meu gabinete e, por algum motivo não identificado, uma das memórias RAM parou de funcionar.

A máquina já estava desligada há mais de 12 horas e antes de detectar esse problema tudo funcionava corretamente. Porém após limpar os componentes internos com um pincel e auxílio de um secador de cabelo (como tenho feito nos últimos 5 anos nesse computador) para manter tudo em boas condições me aconteceu essa intempérie.

Analisei, testei, relimpei, testei e nada. A RAM parou de funcionar.

Há anos que não utilizava muito a Swap e buscava manter o máximo de dados na memória volátil, mas devido ao acontecido tive que fazer alguns ajustes para suprir os 2 GB perdidos.

## Criar e adicionar um bloco swap personalizado

Embora a swap ser muito mais lenta que a RAM, ela ainda é muito útil e fácil de configurar.

A primeira coisa a ser feita é a criação de um novo diretório, como root, preferencialmente na raiz do sistema. Nesse caso, cria-se um caminho como este:

```sh
sudo mkdir /swap
```

Em seguida, com muita atenção, executa-se o comando `dd` especificando que ele deve criar um novo arquivo com caracteres nulos em _/swap/swapfile_ e 2 milhões de blocos de 1024 bytes, ou seja; um bloco de 2 GB:

```sh
sudo dd if=/dev/zero of=/swap/swapfile bs=1024 count=2000000
```

Com o arquivo criado, podemos configurá-lo como swap através do comando `mkswap`:

```sh
sudo mkswap /swap/swapfile
```

Você irá receber uma mensagem informando as novas configurações adicionadas e também um aviso de segurança dizendo que o arquivo possui permissões inseguras (0644) e que você deve modificá-las para leitura e escrita (0600) somente pelo proprietário do arquivo. Então podemos mudá-las com o `chmod`:

```sh
sudo chmod 600 /swap/swapfile
```

Agora já podemos habilitar a swap com `swapon`:

```sh
sudo swapon /swap/swapfile
```

Utilize o `htop` ou use o _Monitor do Sistema_ e verifique que a nova swap já deve estar estar funcionando.

## Habilitando o novo bloco no fstab

Para que esse novo bloco de swap seja carregado na inicialização do sistema devemos editar o arquivo _/etc/fstab_:

```sh
vi /etc/fstab
```

E adicionar uma nova linha especificando o caminho e opções do bloco:

```sh
/swap/swapfile swap swap defaults 0 0
```

## Conclusão

Obviamente a swap, que tem leitura e escrita de dados no disco rígido, é muito mais lenta que memórias voláteis mas, mesmo assim, ela é muito útil pois não vai deixar seu sistema travar por insuficiência de memória. Quando a RAM atingir o pico e começar a depender demais da swap o sistema ficará lento.

Cabe a você administrar os recurso da sua máquina e tirar o melhor proveito possível.

Talvez isso lhe seja útil algum dia assim como foi para mim nessa semana.

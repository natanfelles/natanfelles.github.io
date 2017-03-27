---
title: Resolvendo Problema em Conexão Wireless
layout: post
---

![{{ post.title }}]({{ site.url }}/assets/img_posts/post.png)

Desde o kernel 4.4.0-21 eu vinha tendo alguns problemas na qualidade da conexão de meu Adaptador Wireless da Realtek. Os principais fatores eram a desconexão inesperada do Access Point e a longa demora para realizar a primeira conexão depois que o a rede fosse ativada no sistema.

Quando fiz upgrade no SO e cheguei na versão 4.6 do kernel começou minha pequena guerra particular com o Adaptador. Não conseguia saber se ele estava com problemas, pois o utilizo desde 2012, ou se o problema era no driver (rtl8192cu) incluso no pacote `linux-firmware`. O sistema simplesmente travava; dava um freeze na tela, o cursor do mouse não mexia e os leds do teclado ligavam e não apagavam mais.

Como esse sintoma começou a aparecer logo depois que fiz upgrade, já desconfiei que isso havia sido o problema. Pesquisei e encontrei várias situações semelhantes em que o problema era incompatibilidade com a versão do driver e a solução foi voltar o kernel para a última versão compatível.

Agora que as distribuições Debian-Like já estão utilizando a versão 4.10, Gnome 3.24 (que me agradou muito) me surgiu um novo problema; muitos bugs devido estar utilizando o kernel 4.4 enquanto a distro já vem pronta para utilizar uma versão muito maior.

Subindo o sistema com a versão 4.10 os travamentos haviam parado. Tudo funcionando direitinho, exceto um detalhe: o adapatador não consegui conectar, mesmo com uma boa qualidade no sinal. No momento em que ele deveria realizar a conexão, simplesmente voltava tudo ao normal, não conseguia conectar.

Nada que uma horinha de pesquisa no Google não pudesse resolver. Encontrei a solução no Ask Ubuntu em [RealTek Wireless adapter issues. (RTL8192ce and RTL8192cu)](http://askubuntu.com/questions/471208/realtek-wireless-adapter-issues-rtl8192ce-and-rtl8192cu){: target="_blank"}.

## Pequeno Aprendizado

Durante as batalhas nessa pequena guerra, pude aprender, por necessidade, a verificar o hardware do sistema através do terminal, instalar e utilizar diferentes versões do kernel linux, e como bônus descobri como deixar meu desktop significativamente mais rápido.

Vamos aos detalhes:

### Listar Hardware

Para verificar os componentes conectados na sua máquina você pode utilizar o comando `lshw` e terá uma lista detalhada sobre cada item. Se verificar a manpage desse comando você verá os seus possíveis parâmetros e entre eles existe a opção `-C` para mostrar uma classe específica de hardware.

Para verificar os componentes de rede em sua máquina, execute:

```sh
sudo lshw -C network
```

No meu caso, obtive a seguinte saída:

```
*-network
       description: Ethernet interface
       product: AR8131 Gigabit Ethernet
       vendor: Qualcomm Atheros
       physical id: 0
       bus info: pci@0000:03:00.0
       logical name: enp3s0
       version: c0
       serial: 6c:f0:22:fe:5c:fc
       capacity: 1Gbit/s
       width: 64 bits
       clock: 33MHz
       capabilities: bus_master cap_list ethernet physical tp 10bt 10bt-fd 100bt 100bt-fd 1000bt-fd autonegotiation
       configuration: autonegotiation=on broadcast=yes driver=atl1c driverversion=1.0.1.1-NAPI latency=0 link=no multicast=yes port=twisted pair
       resources: irq:29 memory:fd8c0000-fd8fffff ioport:bf00(size=128)
  *-network
       description: Wireless interface
       physical id: 1
       bus info: usb@1:8
       logical name: wlx243c20066620
       serial: 24:3c:22:22:66:20
       capabilities: ethernet physical wireless
       configuration: broadcast=yes driver=rtl8192cu driverversion=4.4.0-21-generic firmware=N/A ip=192.168.1.2 link=yes multicast=yes wireless=IEEE 802.11bgn
```

Se observar na interface wireless, em configuration, verá o nome do driver e a versão instalada.

Caso você tenha algum problema semelhante, essa pode ser a primeira etapa para saná-lo.

### Instalar diferentes versões do Kernel

Como que, no início dessa guerra, tive que voltar o kernel para uma versão compatível com meu adapatador, acabei tendo que realizar esse processo.

A princípio, você pode instalar a imagem e o cabeçalho do kernel manualmente, basta fazer uma busca que já encontrará. Porém, aconselho a instalar versões diretamente pelo repositório do seu SO. No caso do Ubuntu 17.04, ...

TODO: Linkar e adicionar dica de performance com o kernel lowlatency no post [Melhorar (ainda mais) o Desempenho do Linux]({% post_url 2016-01-24-melhorar-desempenho-linux %})

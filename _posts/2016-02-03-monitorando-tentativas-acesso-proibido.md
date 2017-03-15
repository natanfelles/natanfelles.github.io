---
title:  "Monitorando Tentativas de Acesso Proibido"
categories: seguranca
tags: firewall monitoramento
image: /assets/img_posts/anon.png
description: Por padrão, muitos serviços executados em ambientes Unix-Like possuem portas pré-estabelecidas que podem ser vistas externamente por atacantes. Uma boa forma de iniciar com a segurança de um sistema é trabalhando através de TCP Wrappers, realização de filtragens de acesso.
---

![{{ post.title }}]({{ site.url }}/assets/img_posts/anon.png)

## TCP Wrappers

Por padrão, muitos serviços executados em ambientes Unix-Like possuem portas pré-estabelecidas que podem ser vistas externamente por atacantes. Uma boa forma de iniciar com a segurança de um sistema é trabalhando através de TCP Wrappers, realização de filtragens de acesso.

O intuito deste artigo é mostrar como pode ser realizada uma configuração simples e de extrema utilidade para reforçar as camadas de segurança em um servidor. Editaremos quatro arquivos para que o sistema monitore quais hosts podem ou não acessar determinados serviços. Muito útil em ambientes de produção onde um servidor pode ter um IP Público acessível através da internet.

## O Arquivo hostname

```sh
servidor.dominio.com
```

É nesse arquivo onde configura-se o nome do sistema, ele possui uma única linha e no exemplo acima o nome é _servidor_ e este faz parte do _dominio.com_. Em alguns casos, pode haver apenas um nome, sem que o sistema pertença a nenhum domínio.

É possível mudar estas informações editando o arquivo hostname. Para que o sistema atualize o novo FQDN (Fully Qualified Domain Name) é preciso reiniciar o serviço:

```sh
service hostname restart
```

Teste para ver se o novo FQDN entrou em vigor com:

```sh
hostname -f
```

A saída deve ser identica ao nome inserido, nesse caso mostraria _servidor.dominio.com_.

## O Arquivo hosts

```sh
127.0.0.1        localhost.localdomain   localhost
127.0.0.1        servidor.dominio.com    servidor
154.53.224.150   admin.dominio.com       admin
```

No arquivo hosts fica o endereçamento direto a nomes de domínios. No exemplo acima possuímos três linhas e cada uma com o IP, o FQDN e o nome do host respectivamente.

A primeira linha é padrão, ela diz que quando houver uma chamada por localhost ou localhost.localdomain o sistema deve dirigir-se ao IP 127.0.0.1, que é a própria máquina. Sabendo disso, você já consegue entender o que ocorre nas outras duas linhas.

No caso, 154.53.224.150 é o IP do local de onde o host _admin_ acessará o sistema.

Através do arquivo hosts podemos impor para qual IP destina-se um domínio. Por exemplo: Se colocassemos o domínio _google.com_ apontando para _127.0.0.1_ o sistema entenderia que o site do Google está na máquina local. Isso é só um exemplo…

## O Arquivo hosts.deny

```sh
# /etc/hosts.deny: list of hosts that are _not_ allowed to access the system.
#                  See the manual pages hosts_access(5) and hosts_options(5).
#
# Example:    ALL: some.host.name, .some.domain
#             ALL EXCEPT in.fingerd: other.host.name, .other.domain
#
# If you're going to protect the portmapper use the name "rpcbind" for the
# daemon name. See rpcbind(8) and rpc.mountd(8) for further information.
#
# The PARANOID wildcard matches any host whose name does not match its
# address.
#
# You may wish to enable this to ensure any programs that don't
# validate looked up hostnames still leave understandable logs. In past
# versions of Debian this has been the default.
# ALL: PARANOID
ALL: ALL: twist /var/noaccess %h %d;
	/bin/echo -e "$(date) - O host %h tentou acessar o %d" >> /home/username/security.log;
```

Este arquivo já é muito bem explicado através dos comentários, sua função é negar o acesso a determinados serviços.

Nesse caso, adicionei as duas últimas linhas e elas farão com que todos os serviços sejam impedidos de serem acessados por todos os locais, ou seja ninguém poderá entrar no servidor e além disso utilizaremos o script /var/noaccess para escrever uma linha em um arquivo de log a cada vez que um host tentar acessar qualquer serviço. Abaixo, segue um exemplo de como ficaria:

```sh
Ter Fev  4 13:45:32 BRST 2016 - O host 103.235.46.69 tentou acessar o sshd
```

Dessa meneira você saberá, pelo menos, o IP final de um atacante. Dê ainda mais atenção se o serviço não estiver rodando em uma porta padrão pois pode estar sendo alvo de um exploit.

## O Arquivo hosts.allow

```sh
# /etc/hosts.allow: list of hosts that are allowed to access the system.
#                   See the manual pages hosts_access(5) and hosts_options(5).
#
# Example:    ALL: LOCAL @some_netgroup
#             ALL: .foobar.edu EXCEPT terminalserver.foobar.edu
#
# If you're going to protect the portmapper use the name "rpcbind" for the
# daemon name. See rpcbind(8) and rpc.mountd(8) for further information.
#
ALL: 127.0.0.1
ALL: .dominio.com
```

Ao finalizar o arquivo anterior você deve ter ficado se peguntando; mas… se bloquearmos todos os acessos e ninguém poder entrar, também ficaremos trancados fora do servidor? Exatamente isso. Ninguém entra! Porém, existe o arquivo hosts.allow e nele configura-se quem pode acessar determinados serviços.

No exemplo acima, foram inseridas as duas últimas linhas e significam que todos os serviços são acessíveis para a própria máquina e para todos os hosts que pertençam ao _dominio.com_, não esqueça do ponto no início. Por isso, lá no arquivo hosts foi configurado o IP de acesso direto do admin e desta forma todos os serviços ficam acessíveis naquele IP (154.53.224.150).

## Monitorando Tentativas de Acesso Proibido

```sh
tail -f /home/username/security.log
```

A execução do script /bin/echo através do arquivo hosts.deny só será executado quando houver uma tentativa de acesso não autorizado e desta forma o arquivo /home/username/security.log não existirá até que isso aconteça.

Uma boa forma de testar se tudo funcionará é utilizando o [VirtualBox]({{ site.baseurl }}{% post_url 2016-01-25-configurando-maquinas-virtuais-virtualbox %}) com um [Servidor]({{ site.baseurl }}{% post_url 2016-01-23-debian-8-minimal-server %}). Quando tentar entrar em algum serviço, por SSH, por exemplo, o arquivo de log será criado e uma nova linha inserida a cada tentativa de acesso proibido. Utilize o tail para deixar o terminal rodando e mostrando as informações do invasor.

---
title: "Memcached: Instalar, configurar, proteger, analisar"
layout: post
categories: desenvolvimento
image: /assets/img_posts/memcached.png
---

![{{ post.title }}]({{ site.url }}/assets/img_posts/memcached.png)

Memcached é um serviço desenvolvido para aliviar o carregamento de bancos de dados em aplicações web dinâmicas armazenando objetos na memória.

Fazer repetitivas solicitações no banco de dados através do comando `SELECT` pode sobrecarregar o sistema, tornando-o lento demais.

Então o memcached chegou para resolver esse problema, ao invés de fazer repetidos comandos no banco de dados você pode salvar as informações obtidas através do `SELECT` diretamente na memória RAM. O que torna a resposta da sua aplicação muito mais rápida e desafoga o banco de dados.

Neste exemplo foi utilizado uma [VM]({{ site.baseurl }}{% post_url 2016-01-25-configurando-maquinas-virtuais-virtualbox %}) rodando [Debian 8]({{ site.baseurl }}{% post_url 2016-01-23-debian-8-minimal-server %}) com 512 MB de RAM e IP estático 192.168.1.21.

## Instalar

Em distribuições Debian podemos instalar o memcached através do _apt_:

```sh
sudo apt install memcached
```

## Configurar

Por padrão, o memcached vem configurado para rodar na porta 11211, listando em todas as interfaces de rede e capacidade de cachear 64 MB na RAM.

Como esse servidor será exclusivo para cache, irei aumentar a capacidade de armazenamento de dados para 450 MB e modificar a interface padrão (127.0.0.1) para o IP estático dessa máquina (192.168.1.21).

O arquivo de configuração do memcached fica em _/etc/memcached.conf_ e podemos abri-lo com o _Vi_:

```sh
sudo vi /etc/memcached.conf
```

O arquivo é bem documentado e sugiro que você comente as linhas que for alterar e adicione seus valores personalizados logo abaixo:

```sh
# memcached default config file
# 2003 - Jay Bonci <jaybonci@debian.org>
# This configuration file is read by the start-memcached script provided as
# part of the Debian GNU/Linux distribution.

# Run memcached as a daemon. This command is implied, and is not needed for the
# daemon to run. See the README.Debian that comes with this package for more
# information.
-d

# Log memcached's output to /var/log/memcached
logfile /var/log/memcached.log

# Be verbose
# -v

# Be even more verbose (print client commands as well)
# -vv

# Start with a cap of 64 megs of memory. It's reasonable, and the daemon default
# Note that the daemon will grow to this size, but does not start out holding this much
# memory
#-m 64
-m 450 # Quantidade personalizada de memória em MegaBytes

# Default connection port is 11211
-p 11211

# Run the daemon as root. The start-memcached will default to running as root if no
# -u command is present in this config file
-u memcache

# Specify which IP address to listen on. The default is to listen on all IP addresses
# This parameter is one of the only security measures that memcached has, so make sure
# it's listening on a firewalled interface.
#-l 127.0.0.1
-l 192.168.1.21 # Único endereço IP em que o memcached irá atender

# Limit the number of simultaneous incoming connections. The daemon default is 1024
# -c 1024

# Lock down all paged memory. Consult with the README and homepage before you do this
# -k

# Return error when memory is exhausted (rather than removing items)
# -M

# Maximize core file limit
# -r
```

Realizadas as alterações, podemos reiniciar o serviço:

```sh
sudo service memcached restart
```

## Proteger

O memcached atenderá apenas no IP 192.168.1.21, na porta 11211. Porém qualquer máquina que possa se comunicar com esse servidor irá poder executar comandos, setar novas informações no cache e também pegar informações salvas e isso pode ser um grave risco a segurança da aplicação.

Uma solução prática é proteger o memcached através de um firewall. Então, vamos instalar o **UFW**:

```sh
sudo apt install ufw
```

A primeira coisa a ser feita depois da instalação é definir a regra padrão do nosso firewall.

O UFW irá permitir todas as requisições de saída e bloquer todas as requisições de entrada:

```sh
sudo ufw default allow outgoing
sudo ufw default deny incoming
```

Se você deseja que o memcached atenda somente para um endereço IP, pode setar uma regra assim como essa:

```sh
sudo ufw allow from 192.168.1.2 to any port 11211 proto tcp
```

Mas se deseja que o memcached fique disponível em qualquer máquina da sua rede, pode definir desta maneira:

```sh
sudo ufw allow from 192.168.1.0/24 to any port 11211 proto tcp
```

Confira se as regras estão ativas:

```sh
sudo ufw status numbered
```

O UFW possui um manual bem explicativo e com exemplos. Veja a sua [manpage]({{ site.baseurl }}{% post_url 2016-01-24-manpages-coloridas-portugues %}) sempre que necessário.

## Analisar

Uma das maneiras mais práticas de monitorar o uso do seu servidor de cache, ou até mesmo de clusters, é a utilização do PHPMemcachedAdmin.

Supondo que você já possua um [servidor web]({{ site.baseurl }}{% post_url 2016-09-24-lemp %}) instalado em uma das máquinas da sua rede, você pode entrar no diretório desejado e instalar o PHPMemcachedAdmin desta forma:

```sh
wget https://github.com/elijaa/phpmemcachedadmin/archive/master.zip
unzip master.zip
mv phpmemcacheadmin-master phpmemcacheadmin
cd phpmemcacheadmin-master
chmod +rx *
chmod 777 Config/Memcache.php
chmod 777 Temp/
```

Depois de fazer o download, descompactar, renomear, entrar e setar as permissões corretas nos arquivos do sistema, você poderá acessar a interface web em seu navegador.

O PHPMemcachedAdmin permite que você adicione quantos servidores desejar, tanto pela interface web como pelo arquivo de configuração em _phpmemcacheadmin/Config/Memcache.php_. Dessa vez, já irei deixar o servidor recém configurado disponível no cluster _Default_:

```sh
vi phpmemcacheadmin/Config/Memcache.php
```

```php
<?php
return array(
    'stats_api'          => 'Server',
    'slabs_api'          => 'Server',
    'items_api'          => 'Server',
    'get_api'            => 'Server',
    'set_api'            => 'Server',
    'delete_api'         => 'Server',
    'flush_all_api'      => 'Server',
    'connection_timeout' => '1',
    'max_item_dump'      => '100',
    'refresh_rate'       => 2,
    'memory_alert'       => '80',
    'hit_rate_alert'     => '90',
    'eviction_alert'     => '0',
    'file_path'          => 'Temp/',
    'servers'            => array(
        'Default' => array(
            '192.168.1.21:11211' => array(
                'hostname' => '192.168.1.21',
                'port'     => '11211',
            ),
        ),
    ),
);
```

À partir de agora podemos analisar em tempo real o uso do nosso servidor memcached.

## Fontes

- [A Story of Caching](https://github.com/memcached/memcached/wiki/TutorialCachingStory){:target="_blank"}
- [memcached - a distributed memory object caching system](https://memcached.org/){:target="_blank"}
- [How to Configure a Firewall with UFW](https://www.linode.com/docs/security/firewalls/configure-firewall-with-ufw){:target="_blank"}
- [PHPMemcachedAdmin](https://blog.elijaa.org/phpmemcachedadmin/){:target="_blank"}

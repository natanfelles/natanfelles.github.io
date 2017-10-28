---
title:  "Apt-Cacher-NG: Proxy de Cache de Pacotes"
categories: desenvolvimento
tags: cache proxy debian linux
image: apt-cacher-ng.png
description: Possui mais de um computador rodando Linux? Aprenda a cachear pacotes de software para economizar banda e agilizar a instalação em várias máquinas.
---

## Apresentação

Apt-Cacher NG é um proxy de cache para pacotes de software baixados por mecanismos de distribuição em sistemas Unix/Linux de servidores espelhos acessíveis via HTTP.

## Entenda melhor

Sabe-se que é altamente recomendável manter um sistema operacional sempre atualizado por devidos fatores. Em locais onde há vários computadores pode haver um enorme gasto do tráfego de banda ou congestionamento da conexão com a internet para manter todos atualizados.

Algumas vezes, utilizando distribuições rolling release, que buscam sempre possuir as últimas versões de softwares, já cheguei a precisar baixar mais de 200 MB em um único update. Agora, imagine isso em uma empresa com 20 máquinas. Daria cerca de 4 GB de download para atualizar todas.

A solução mais simples é criar um servidor proxy de cache, ou seja, todos os pacotes baixados ficarão armazenados nele. E então todas as outras máquinas serão atualizadas através deste servidor proxy, intermediário, único responsável por baixar atualizações externas e repassá-las para todas as máquinas da rede local.

Toda vez que uma máquina for atualizada ocorrerá o seguinte processo:

1. A máquina conecta com o proxy e questiona se há atualizações para ela.
2. O proxy conecta no repositório oficial e questiona por essas atualizações, fazendo uma comparação entre as versões de seus pacotes com os pacotes externos.
3. Se houver novos pacotes, o proxy baixa os pacotes e, se houver versão maior do que os da máquina, os retransmite para ela.
4. Se não houver novos pacotes, mas eles tiverem versão maior do que os da máquina, o proxy apenas retransmite os pacotes para a máquina.
5. Por fim, o proxy se atualizará com os repositórios externos e a máquina se atualizará com o proxy.

Certo. Chega de teoria e vamos ver como podemos fazer isso acontecer.

## Instalação do Servidor Proxy de Cache

Você precisará de uma máquina para ser o servidor proxy de cache. Recomendo que utilize um sistema sem desktop, mas é indiferente.

No servidor, vamos instalar o Apt-Cacher-NG:

```sh
sudo apt install apt-cacher-ng
```

O Apt-Cacher-NG, por padrão, roda na porta 3142 e é acessível via web, onde possui uma página explicando como configurar outras máquinas para usá-lo, manual e estatísticas. Você pode entrar diretamente pelo IP do servidor ou hostname, como no exemplo: _http://192.168.1.100:3142_

## Configuração dos Clientes

Estando com o servidor proxy de cache instalado, vamos ver como configurar as máquinas clientes:

Em cada cliente, crie um arquivo em /etc/apt/apt.conf e adicione as linhas abaixo, substituindo o IP pelo do seu servidor:

{: .file-excerpt }
/etc/apt/apt.conf
:	```sh
	#Acquire::AllowInsecureRepositories true; # Allow to use an offline repo
	Acquire::http::proxy "http://192.168.1.100:3142"; # The cache proxy repo
	Acquire::https::proxy "DIRECT"; # Allow cache proxy SSL repos
	```

Feito! Salve e feche o arquivo e atualize a máquina cliente:

```sh
sudo apt update
```

Ao atualizar a máquina, automaticamente o proxy será atualizado.

Faça isso em todas as máquinas clientes e desta forma você só precisará baixar pacotes em um único local.

## Segurança

Caso seja necessário, você pode proteger o sistema web com a requisição de usuário e senha.

Para isso, edite o arquivo /etc/apt-cacher-ng/security.conf:

{: .file-excerpt }
/etc/apt-cacher-ng/security.conf
:	```sh
	#AdminAuth: mooma:moopa
	AdminAuth: usuario:Senh4
	```
Depois reinicie o apt-cacher-ng:

```sh
sudo systemctl restart apt-cacher-ng.service
```

À partir de agora, quando for navegar na porta 3142 do seu servidor proxy, lhe será solicitado os dados de acesso.

### Informação

Para configurações avançadas, leia o manual em _http://192.168.1.100:3142/acng-doc/html/index.html_.

## Conclusão

Configurar o Apt-Cacher-NG é simples e de extrema utilidade. Você pode ter várias máquinas na rede local, mas vai baixar pacotes externos apenas por uma, uma única vez.

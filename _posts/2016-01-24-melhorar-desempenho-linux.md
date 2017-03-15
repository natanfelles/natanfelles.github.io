---
title:  "Melhorar (ainda mais) o Desempenho do Linux"
categories: desenvolvimento
tags: swap zram linux
---

![{{ post.title }}]({{ site.url }}/assets/img_posts/linux-performance.jpg)

## Sim! Você pode

Neste artigo, veremos como aumentar a performance do seu sistema, sem a necessidade de comprar hardware novo, com duas configurações simples, mas que podem aumentar significativamente o tempo de resposta da sua máquina.

Configuraremos como o Debian trabalhará com o gerenciamento da Memória RAM e da Swap.

## Ajustando o Uso da Swap

A Swap é uma partição do disco criada durante a instalação do sistema e serve como uma Memória RAM extra, designada para impedir que o sistema trave caso toda a RAM seja utilizada e também na hibernação, o que é muito útil. Porém, por padrão, mesmo tendo memória disponível, o sistema acaba utilizando a Swap, acessando o disco rígido (que é mais lento) e dessa forma, todo o sistema acaba prejudicado. Resolveremos isso.

Abra o _Monitor do Sistema_, ou use o _htop_ pelo terminal e observe a utilização da RAM e da Swap do seu sistema. Se possuir muita RAM livre e a Swap estiver sendo utilizada, há duas escolhas que podemos fazer:

1. Desativar a Swap (apenas se tiver certeza de que não precisará dela)
2. Reduzir o uso da Swap (recomendável)

### 1 – Desativando a Swap

Sempre que você quiser desabilitar a Swap, execute:

```sh
sudo swappoff -a
```

Quando quiser ativá-la novamente:

```sh
sudo swappon -a
```

### 2 – Reduzindo o Uso da Swap

Para reduzir o uso da Swap, teremos que editar o arquivo /etc/sysctl.conf:

```sh
sudo vi /etc/sysctl.conf
```

```ini
vm.swappiness=10
vm.vfs_cache_pressure=50
```

Explicando:

**swappiness**:  Controla como o kernel realiza as trocas de cache na RAM. Ao aumentar esse valor, aumentará a quantidade de trocas. O valor padrão é 60, colocando 10 significa que a Swap só será usada quando a RAM atingir 90%.

**vfs_cache_pressure**: Controla a tendência do kernel para recuperar a memória que é usada no cache do sistema virtual de arquivos. O valor 50 é o ideal, valores mais altos podem deixar o sistema lento e muito baixos reduzem o uso do cache.

## ZRam

O ZRam é um módulo do kernel capaz de criar blocos de cache, semelhante a swap, porém ao invés do cache ficar no HD, ele permanece direto na memória, o que agiliza a execução de programas.

No Ubuntu, basta dar um apt-get para instalá-lo:

```sh
sudo apt-get install zram-config
```

Já no Debian, o processo é um poquinho mais extenso...

 ou crie o arquivo _/etc/init.d/zram_:

```sh
sudo vi /etc/init.d/zram
```

E insira:

```sh
#!/bin/sh
### BEGIN INIT INFO
# Provides:          zram
# Required-Start:    $local_fs
# Required-Stop:     $local_fs
# Default-Start:     S
# Default-Stop:      0 1 6
# Short-Description: Use compressed RAM as in-memory swap
# Description:       Use compressed RAM as in-memory swap
### END INIT INFO

# Author: Antonio Galea <antonio.galea@gmail.com>
# Thanks to Przemyslaw Tomczyk for suggesting swapoff parallelization
# Distributed under the GPL version 3 or above, see terms at
#      https://gnu.org/licenses/gpl-3.0.txt

FRACTION=75

MEMORY=`perl -ne'/^MemTotal:s+(d+)/ && print $1*1024;' < /proc/meminfo`
CPUS=`grep -c processor /proc/cpuinfo`
SIZE=$(( MEMORY * FRACTION / 100 / CPUS ))

case "$1" in
  "start")
    param=`modinfo zram|grep num_devices|cut -f2 -d:|tr -d ' '`
    modprobe zram $param=$CPUS
    for n in `seq $CPUS`; do
      i=$((n - 1))
      echo $SIZE > /sys/block/zram$i/disksize
      mkswap /dev/zram$i
      swapon /dev/zram$i -p 10
    done
    ;;
  "stop")
    for n in `seq $CPUS`; do
      i=$((n - 1))
      swapoff /dev/zram$i && echo "disabled disk $n of $CPUS" &
    done
    wait
    sleep .5
    modprobe -r zram
    ;;
  *)
    echo "Usage: `basename $0` (start | stop)"
    exit 1
    ;;
esac
```

Defina as permissões corretas:

```sh
sudo chmod +x /etc/init.d/zram
```

Por fim, instrua o sistema a usar o script à partir do boot:

```sh
sudo insserv zram
```

Reinicie o sistema e observe as diferenças.

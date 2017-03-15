---
title:  "Links Simbólicos"
categories: desenvolvimento
tags: symlink linux windows
---

![{{ post.title }}]({{ site.url }}/assets/img_posts/symlink.jpg)

## Considerações

Algumas vezes nos deparamos na necessidade de criar atalhos em nossos projetos para agilizar o acesso a diversos locais no sistema de arquivos. Mas, diferente do que você pode estar pensando, o popular "Atalho" não é a solução na maioria das IDEs pois o Atalho é um arquivo .Ink, que funciona muito bem no Explorer do Windows, mas ao abri-lo, o editor mostrará o código-fonte do arquivo e não o diretório que você deseja. A solução imediata é mais antiga, mas a melhor opção nesse caso; um Link Simbólico.

## Abra o Terminal

Usuários Linux devem ser mais habituados a trabalhar com a linha de comando, mas caso você esteja começando sua jornada de desenvolvedor, utilize o atalho de teclado `Alt + T`, no Ubuntu ou vá até o Iniciar, no Windows e pesquise por "cmd", que é o Processador de Comandos do Windows, clique com o botão direito e execute-o como administrador.

### Link Simbólico no Linux

Dependendo do local para o qual você queira criar o symlink, você deverá ter privilégios root.
No Linux, podemos usar como exemplo o seguinte comando:

```sh
ln -s /home/natanfelles/projetos/meusite.com/ /var/www/meusite.com
```

Onde o primeiro caminho resulta no diretório existente e o segundo é o link a ser criado. É isso.

### Link Simbólico no Windows

No Windows, qualquer link simbólico só pode ser executado se você abrir o prompt como administrador, caso contrário o comando será recusado. Podemos seguir o seguinte exemplo:

```
mklink /d "B:\Winginx\home\meusite.com" "W:\meusite.com"
```

Ao contrário do Linux, no Windows o primeiro caminho é o link a ser criado e o segundo é o que já existe.

## Conclusão

Podemos concluir que a criação de links simbólicos é um procedimento simples e muito útil para agilizar projetos mais complexos.

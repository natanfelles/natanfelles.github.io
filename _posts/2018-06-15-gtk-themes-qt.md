---
title: Como usar tema GTK em aplicações Qt
layout: post
categories: customizacao
image: gtk-qt.png
tags: gnome lxde xfce gtk qt
description: 
---

Se você é daqueles que gosta de personalizar a aparência do seu sistema operacional e instalar temas, já deve ter percebido que algumas aplicações não se adaptam aos estilos do GTK.

Tenho utilizado o tema [Arc Dark](https://github.com/nicohood/arc-theme) há algum tempo e o VLC, [VirtualBox]({{ site.baseurl }}{% post_url 2016-01-25-configurando-maquinas-virtuais-virtualbox %}) e algums outros sofwares com GUI, que utilizo no dia a dia, permaneciam com a aparência padrão do Qt:

![VLC Qt]({{ 'assets/img_posts/vlc-qt.png' | relative_url }})

Depois de um tempo utilizando [Linux Mint](https://www.linuxmint.com) e [Manjaro](https://manjaro.org), percebi que nessas distros os temas já se adaptam, por padrão, em aplicações Qt.

Levei um tempo para pesquisar e entender o que se passa e então descobri como fazer isso acontecer no [Debian](https://www.debian.org).

É preciso instalar o [Qt5 Configuration Utility](https://packages.debian.org/buster/qt5ct) e o [Qt 5 extra widget styles](https://packages.debian.org/buster/qt5-style-plugins), configurar váriaveis de ambiente e reiniciar. Vamos lá:

Instale os softwares necessários:

```
sudo apt install qt5ct qt5-style-plugins
```

Adicione as váriaveis de ambiente necessárias, no arquivo */etc/environment*:

{: .file-excerpt }
/etc/environment 
:   ```sh
    export QT_QPA_PLATFORMTHEME=qt5ct
    export QT_AUTO_SCREEN_SCALE_FACTOR=0
    ```

Reinicie o sistema.

Abra o **Qt5 Settings** ou rode num terminal:

```
qt5ct
```

Na opção **Style** selecione "gtk2" e mantenha **Standard dialogs** como "Default".

![Qt5 Configuration - GTK]({{ 'assets/img_posts/qt5ct-appearance.png' | relative_url }})

A fonte padrão utilizada no GNOME tem sido a Cantarell. Também é possível modificar:

![Qt5 Configuration - Cantarell Font]({{ 'assets/img_posts/qt5ct-fonts.png' | relative_url }})

Por fim, aplicações Qt irão utilizar o seu tema GTK.

Veja como ficou o VLC:

![VLC GTK - Arc Theme]({{ 'assets/img_posts/vlc-gtk-arc-theme.png' | relative_url }})

Agora parece simples.

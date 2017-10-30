---
title: 'SublimeText: O Melhor Editor'
layout: post
categories: desenvolvimento
image: sublime-best-editor.png
tags: linux debian ubuntu editor sublime
description: Veja como instalar e configurar o SublimeText com pacotes esseciais
---

Meu primeiro editor de códigos foi o Notepad do Windows, onde comecei copiando e colando scripts da internet. Com o passar do tempo descobri o [Notepad++](https://notepad-plus-plus.org) e aquele código colorido era de encher os olhos.

A possibilidade de fazer algumas customizações no Notepad++ também me agradava, embora não saber, logo de cara, o significado de cada coisa. Ah, e ele era em português! Gostava disso (me perdia no inglês, naquela época).

Com o passar do tempo utilizei alguns editores WYSIWYG como o [NVU](http://www.nvu.com) e o "todo poderoso" Dreamweaver. Realmente, a possibilidade de clicar em um botão ou customizar opções pela interface gráfica ajudaram muito. Ajudaram a entender os códigos gerados, porque, para mim, isso sempre foi o mais importante.

Trabalhar com o Dreamweaver, [NetBeans](https://netbeans.org) ou as poderosas IDEs da JetBrains é algo sensacional. Facilitam o desenvolvimento e muito.

Porém, já há alguns anos meu editor do dia a dia tem sido o [Sublime](https://www.sublimetext.com), gosto do [Gedit](https://wiki.gnome.org/Apps/Gedit), mas o Sublime é tão leve e customizável que o identifico como o melhor editor disponível. Falo de editor e não IDE.

Nesse artigo falarei sobre como instalar e realizar algumas configurações "básicas" no SublimeText em um ambiente Debian-based.

## Instalação

O arquivo de instalação do SublimeText pode ser baixado diretamente no [site](https://www.sublimetext.com/).

Algo muito legal que o pessoal da Sublime HQ Pty Ltd fez esse ano foi criar repositórios para diversas distribuições Linux. Para quem não vive mais sem o APT, como eu, isso foi o máximo. Se bem que as versões do Sublime não mudam tão frequentemente, mas poder instalar ou atualizá-lo pela linha de comando facilita o processo.

Indo [até essa página](https://www.sublimetext.com/docs/3/linux_repositories.html#apt) você terá as instruções de como adicionar os repositórios em seu Sistema Operacional.

Se nada mudou, no Debian é assim:

```sh
wget -qO - https://download.sublimetext.com/sublimehq-pub.gpg | sudo apt-key add -
sudo apt install apt-transport-https
echo "deb https://download.sublimetext.com/ apt/stable/" | sudo tee /etc/apt/sources.list.d/sublime-text.list
```

Depois, basta intalar:

```sh
sudo apt update
sudo apt install sublime-text
```

### Package Control

O SublimeText pode ser totalmente customizado e você pode adicionar recursos e tranformá-lo em uma IDE multi-linguagens.

O local mais popular onde podem ser encontrados milhares de pacotes é o [Package Control](https://packagecontrol.io/).

O Package Control deve ser instalado para depois você poder utilizar seus recursos.

Aconselha-se que você sempre instale-o conforme as [instruções](https://packagecontrol.io/installation) oficiais.

#### Instalação do Package Control

Vá até o menu *View > Show Console*, cole o código abaixo e pressione `Enter`:

```python
import urllib.request,os,hashlib; h = '6f4c264a24d933ce70df5dedcf1dcaee' + 'ebe013ee18cced0ef93d5f746d80ef60'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by) 
```

Feito isso você já podera instalar pacotes "automaticamente".

Basta pressionar `Ctrl + Shift + P` e selecionar a opção *Package Control: Install Package* (digite "pci").

Depois basta pesquisar o pacote que você quer, selecioná-lo e pressionar `Enter`. 

### Pacotes Essenciais <small>para mim</small>

Abaixo listo alguns pacotes muito úteis para tunar o SublimeText.

- [A File Icon](https://packagecontrol.io/packages/A%20File%20Icon)
- [All Autocomplete](https://packagecontrol.io/packages/All%20Autocomplete)
- [ApacheConf.tmLanguage](https://packagecontrol.io/packages/ApacheConf.tmLanguage)
- [Auto Semi-Colon](https://packagecontrol.io/packages/Auto%20Semi-Colon)
- [Blade Snippets](https://packagecontrol.io/packages/Blade%20Snippets)
- [Bootstrap 3 Snippets](https://packagecontrol.io/packages/Bootstrap%203%20Snippets)
- [Bootstrap 4 Snippets](https://packagecontrol.io/packages/Bootstrap%204%20Snippets)
- [BracketHighlighter](https://packagecontrol.io/packages/BracketHighlighter)
- [Color Highlighter](https://packagecontrol.io/packages/Color%20Highlighter)
- [Composer](https://packagecontrol.io/packages/Composer)
- [ComposerPackageInfo](https://packagecontrol.io/packages/ComposerPackageInfo)
- [DocBlockr](https://packagecontrol.io/packages/DocBlockr)
- [DocBlockr_Python](https://packagecontrol.io/packages/DocBlockr_Python)
- [DotENV](https://packagecontrol.io/packages/DotENV)
- [EditorConfig](https://packagecontrol.io/packages/EditorConfig)
- [Emmet](https://packagecontrol.io/packages/Emmet)
- [Figlet Big ASCII Text](https://packagecontrol.io/packages/Figlet%20Big%20ASCII%20Text)
- [FuzzyFilePath](https://packagecontrol.io/packages/FuzzyFilePath)
- [Git](https://packagecontrol.io/packages/Git)
- [Git Config](https://packagecontrol.io/packages/Git%20Config)
- [GitGutter](https://packagecontrol.io/packages/GitGutter)
- [HighlightWords](https://packagecontrol.io/packages/HighlightWords)
- [Hosts](https://packagecontrol.io/packages/Hosts)
- [INI](https://packagecontrol.io/packages/INI)
- [IntelliDocs](https://packagecontrol.io/packages/IntelliDocs)
- [Jekyll](https://packagecontrol.io/packages/Jekyll)
- [Laravel Blade Highlighter](https://packagecontrol.io/packages/Laravel%20Blade%20Highlighter)
- [Liquid](https://packagecontrol.io/packages/Liquid)
- [Markdown Extended](https://packagecontrol.io/packages/Markdown%20Extended)
- [Markdown Preview](https://packagecontrol.io/packages/Markdown%20Preview)
- [Minify](https://packagecontrol.io/packages/Minify)
- [nginx](https://packagecontrol.io/packages/nginx)
- [Package Control](https://packagecontrol.io/packages/Package%20Control)
- [PHP Codebeautifier](https://packagecontrol.io/packages/PHP%20Codebeautifier)
- [phpunitkit](https://packagecontrol.io/packages/phpunitkit)
- [Python PEP8 Autoformat](https://packagecontrol.io/packages/Python%20PEP8%20Autoformat)
- [RestructuredText Improved](https://packagecontrol.io/packages/RestructuredText%20Improved)
- [SCSS](https://packagecontrol.io/packages/SCSS)
- [SideBarEnhancements](https://packagecontrol.io/packages/SideBarEnhancements)
- [SublimeCodeIntel](https://packagecontrol.io/packages/SublimeCodeIntel)
- [SublimeLinter](https://packagecontrol.io/packages/SublimeLinter)
- [SublimeLinter-contrib-htmllint](https://packagecontrol.io/packages/SublimeLinter-contrib-htmllint)
- [SublimeLinter-csslint](https://packagecontrol.io/packages/SublimeLinter-csslint)
- [SublimeLinter-jshint](https://packagecontrol.io/packages/SublimeLinter-jshint)
- [SublimeLinter-php](https://packagecontrol.io/packages/SublimeLinter-php)
- [SublimeLinter-pylint](https://packagecontrol.io/packages/SublimeLinter-pylint)
- [SublimeREPL](https://packagecontrol.io/packages/SublimeREPL)
- [SublimeTmpl](https://packagecontrol.io/packages/SublimeTmpl)
- [Theme - One Dark](https://packagecontrol.io/packages/Theme%20-%20One%20Dark)
- [TodoReview](https://packagecontrol.io/packages/TodoReview)
- [TrailingSpace](https://packagecontrol.io/packages/TrailingSpaces)
- [Volt](https://packagecontrol.io/packages/Volt)

## Configurações

Aqui: [Sublime Text User Backup](https://gitlab.com/natanfelles/sublime-backup).

---
title: 'SublimeText: O Melhor Editor'
layout: post
categories: desenvolvimento
image: sublime-best-editor.png
tags: linux debian ubuntu editor sublime
description: Veja como instalar e configurar o SublimeText com pacotes essenciais
---

Meu primeiro editor de códigos foi o Notepad do Windows, onde comecei copiando e colando scripts da internet. Com o passar do tempo descobri o [Notepad++](https://notepad-plus-plus.org) e aquele código colorido era de encher os olhos.

A possibilidade de fazer algumas customizações no Notepad++ também me agradava, embora não saber, logo de cara, o significado de cada coisa. Ah, e ele era em português! Gostava disso (me perdia no inglês, naquela época).

Com o passar do tempo utilizei alguns editores WYSIWYG como o [NVU](http://www.nvu.com) e o "todo poderoso" Dreamweaver. Realmente, a possibilidade de clicar em um botão ou customizar opções pela interface gráfica ajudaram muito. Ajudaram a entender os códigos gerados, porque, para mim, isso sempre foi o mais importante.

Trabalhar com o Dreamweaver, [NetBeans](https://netbeans.org) ou as poderosas IDEs da JetBrains é algo sensacional. Facilitam o desenvolvimento e muito.

Porém, já há alguns anos meu editor do dia a dia tem sido o [Sublime](https://www.sublimetext.com), gosto do [Gedit](https://wiki.gnome.org/Apps/Gedit), mas o Sublime é tão leve e customizável que o identifico como o melhor editor disponível. <s>Falo de editor e não IDE</s>.

Nesse artigo falarei sobre como instalar e realizar algumas configurações <s>"básicas"</s> no SublimeText em um ambiente Debian-based.

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

Depois, basta instalar:

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
- [Advanced CSV](https://packagecontrol.io/packages/Advanced%20CSV)
- [All Autocomplete](https://packagecontrol.io/packages/All%20Autocomplete)
- [ApacheConf.tmLanguage](https://packagecontrol.io/packages/ApacheConf.tmLanguage)
- [ApplySyntax](https://packagecontrol.io/packages/ApplySyntax)
- [Auto Semi-Colon](https://packagecontrol.io/packages/Auto%20Semi-Colon)
- [Blade Snippets](https://packagecontrol.io/packages/Blade%20Snippets)
- [Bootstrap 3 Snippets](https://packagecontrol.io/packages/Bootstrap%203%20Snippets)
- [Bootstrap 4 Snippets](https://packagecontrol.io/packages/Bootstrap%204%20Snippets)
- [BracketHighlighter](https://packagecontrol.io/packages/BracketHighlighter)
- [ColorHelper](https://packagecontrol.io/packages/ColorHelper)
- [Composer](https://packagecontrol.io/packages/Composer)
- [ComposerPackageInfo](https://packagecontrol.io/packages/ComposerPackageInfo)
- [DocBlockr](https://packagecontrol.io/packages/DocBlockr)
- [DocBlockr_Python](https://packagecontrol.io/packages/DocBlockr_Python)
- [DotENV](https://packagecontrol.io/packages/DotENV)
- [EditorConfig](https://packagecontrol.io/packages/EditorConfig)
- [Emmet](https://packagecontrol.io/packages/Emmet)
- [Figlet Big ASCII Text](https://packagecontrol.io/packages/Figlet%20Big%20ASCII%20Text)
- [Fold Comments](hhttps://packagecontrol.io/packages/Fold%20Comments)
- [Function Name Display](https://packagecontrol.io/packages/Function%20Name%20Display)
- [FuzzyFilePath](https://packagecontrol.io/packages/FuzzyFilePath)
- [Git](https://packagecontrol.io/packages/Git)
- [Git Config](https://packagecontrol.io/packages/Git%20Config)
- [GitGutter](https://packagecontrol.io/packages/GitGutter)
- [HighlightWords](https://packagecontrol.io/packages/HighlightWords)
- [Hosts](https://packagecontrol.io/packages/Hosts)
- [Hover Image Preview](https://packagecontrol.io/packages/Hover%20Image%20Preview)
- [Image​2​Base​64](https://packagecontrol.io/packages/Image2Base64)
- [INI](https://packagecontrol.io/packages/INI)
- [IntelliDocs](https://packagecontrol.io/packages/IntelliDocs)
- [Jekyll](https://packagecontrol.io/packages/Jekyll)
- [Jinja2](https://packagecontrol.io/packages/Jinja2)
- [Keymaps](https://packagecontrol.io/packages/Keymaps)
- [Laravel Blade Highlighter](https://packagecontrol.io/packages/Laravel%20Blade%20Highlighter)
- [LESS](https://packagecontrol.io/packages/LESS)
- [Liquid](https://packagecontrol.io/packages/Liquid)
- [Load file to REPL](https://packagecontrol.io/packages/Load%20file%20to%20REPL)
- [LSP](https://packagecontrol.io/packages/LSP)
- [Markdown Extended](https://packagecontrol.io/packages/Markdown%20Extended)
- [Markdown Preview](https://packagecontrol.io/packages/Markdown%20Preview)
- [Minify](https://packagecontrol.io/packages/Minify)
- [nginx](https://packagecontrol.io/packages/nginx)
- [Package Control](https://packagecontrol.io/packages/Package%20Control)
- [PHP Codebeautifier](https://packagecontrol.io/packages/PHP%20Codebeautifier)
- [PHP-Twig](https://packagecontrol.io/packages/PHP-Twig)
- [phpunitkit](https://packagecontrol.io/packages/phpunitkit)
- [ProjectManager](https://packagecontrol.io/packages/ProjectManager)
- [Python PEP8 Autoformat](https://packagecontrol.io/packages/Python%20PEP8%20Autoformat)
- [Requester](https://packagecontrol.io/packages/Requester)
- [RestructuredText Improved](https://packagecontrol.io/packages/RestructuredText%20Improved)
- [SCSS](https://packagecontrol.io/packages/SCSS)
- [SideBarEnhancements](https://packagecontrol.io/packages/SideBarEnhancements)
- [SublimeCodeIntel](https://packagecontrol.io/packages/SublimeCodeIntel)
- [SublimeLinter](https://packagecontrol.io/packages/SublimeLinter)
- [SublimeLinter-contrib-htmllint](https://packagecontrol.io/packages/SublimeLinter-contrib-htmllint)
- [SublimeLinter-csslint](https://packagecontrol.io/packages/SublimeLinter-csslint)
- [SublimeLinter-jshint](https://packagecontrol.io/packages/SublimeLinter-jshint)
- [SublimeLinter-json](https://packagecontrol.io/packages/SublimeLinter-json)
- [SublimeLinter-php](https://packagecontrol.io/packages/SublimeLinter-php)
- [SublimeLinter-pylint](https://packagecontrol.io/packages/SublimeLinter-pylint)
- [SublimeLinter-xmllint](https://packagecontrol.io/packages/SublimeLinter-xmllint)
- [SublimeREPL](https://packagecontrol.io/packages/SublimeREPL)
- [SublimeTmpl](https://packagecontrol.io/packages/SublimeTmpl)
- [SyncedSideBar](https://packagecontrol.io/packages/SyncedSideBar)
- [TabsExtra](https://packagecontrol.io/packages/TabsExtra)
- [Theme - One Dark](https://packagecontrol.io/packages/Theme%20-%20One%20Dark)
- [TodoReview](https://packagecontrol.io/packages/TodoReview)
- [TrailingSpace](https://packagecontrol.io/packages/TrailingSpaces)
- [Volt](https://packagecontrol.io/packages/Volt)

## Configurações

### Preferences

```json
{
    "always_show_minimap_viewport": true,
    "auto_complete_cycle": true,
    "auto_complete_triggers":
    [
        {
            "characters": "$>:\\",
            "selector": "source.php"
        },
        {
            "characters": ".",
            "selector": "source.js"
        },
        {
            "characters": ".",
            "selector": "source.ts"
        }
    ],
    "auto_find_in_selection": true,
    "binary_file_patterns":
    [
        "*.dds",
        "*.eot",
        "*.gif",
        "*.ico",
        "*.jar",
        "*.jpeg",
        "*.jpg",
        "*.pdf",
        "*.png",
        "*.swf",
        "*.tga",
        "*.ttf",
        "*.zip",
        "*.phar",
        "*.tar",
        "*.tgz",
        "*.gz",
        "*.bz2",
        "*.rar",
        "*.ttf",
        "*.eot",
        "*.deb",
        "*.exe",
        "*.mp3",
        "*.mp4",
        "*.wma",
        "*.3gp",
        "*.eog"
    ],
    "caret_extra_bottom": 1,
    "close_windows_when_empty": false,
    "color_scheme": "Packages/User/Color Highlighter/themes/One Dark (SL).tmTheme",
    "default_line_ending": "unix",
    "dictionary": "Packages/Language - English/en_US.dic",
    "draw_minimap_border": true,
    "figlet_font": "xtimes",
    "folder_exclude_patterns":
    [
        ".svn",
        ".git",
        ".hg",
        "CVS",
        ".idea",
        ".sass-cache",
        "_site",
        "nbproject"
    ],
    "font_size": 11,
    "highlight_line": true,
    "highlight_modified_tabs": true,
    "ignored_packages":
    [
        "All Autocomplete",
        "ApplySyntax",
        "ComposerPackageInfo",
        "Jekyll",
        "LSP",
        "Requester",
        "RestructuredText",
        "SublimeLinter-contrib-htmlhint",
        "SublimeLinter-contrib-markdownlint",
        "Vintage"
    ],
    "line_padding_bottom": 1,
    "line_padding_top": 2,
    "mdpopups.user_css": "Packages/User/mdpopups.css",
    "one_dark_show_scroll_tabs": false,
    "one_dark_show_tabs_dropdown": true,
    "overlay_scroll_bars": "enabled",
    "phpunit.php_executable": "/usr/bin/php7.0",
    "preview_on_click": true,
    "rulers":
    [
        80
    ],
    "show_encoding": true,
    "show_line_endings": true,
    "tab_size": 4,
    "tabs_small": true,
    "theme": "One Dark.sublime-theme",
    "trim_trailing_white_space_on_save": false,
    "word_wrap": true
}
```

### Key Bindings

```json
[
    { "keys": ["ctrl+\\"], "command": "toggle_side_bar" },
    { "keys": ["f12"], "command": "toggle_side_bar" },
    { "keys": ["ctrl+m"], "command": "toggle_minimap" },
    { "keys": ["ctrl+space"], "command": "code_intel_auto_complete" },
    { "keys": ["ctrl+d"], "command": "duplicate_line" },
    { "keys": ["ctrl+alt+l"], "command": "pep8_autoformat", "context": [{ "key": "selector", "operator": "equal", "operand": "source.python" }] },
    { "keys": ["ctrl+alt+l"], "command": "php_cbf", "context": [{ "key": "selector", "operator": "equal", "operand": "source.php" }] }, 
    { "keys": ["ctrl+alt+t"], "command": "toggle_trailing_spaces" },
    { "keys": ["shift+delete"], "command": "delete_trailing_spaces" },
    { "keys": ["ctrl+alt+b"], "command": "beautify" },
    { "keys": ["ctrl+alt+m"], "command": "minify" },
    { "keys": ["ctrl+shift+c"], "command": "color_highlighter_pick_color" },
    { "keys": ["ctrl+alt+n"], "command": "sublime_tmpl" },
    { "keys": ["ctrl+alt+m"], "command": "markdown_preview_select", "args": { "target": "browser" }},
    { "keys": ["ctrl+alt+c"], "command": "show_panel", "args": {"panel": "console", "toggle": true} },
    { "keys": ["f8"], "command": "load_file_to_repl", "args": { "clear": true, "save_focus": false }},
    { "keys": ["ctrl+down"],  "command": "toggle_fold_comments" },
    { "keys": ["f2"],  "command": "side_bar_rename" },
    { "keys": ["f5"],  "command": "refresh_folder_list" },
    { "keys": ["alt+d"],  "command": "side_bar_duplicate" },
    { "keys": ["f10"],  "command": "lsp_symbol_definition" }
]
```

### SublimeCodeIntel.sublime-settings

```json
{
    "codeintel_tooltips": "popup",
    // This empty enable completion of classes in phpdocs
    "codeintel_exclude_scopes_from_complete_triggers": [],
    "codeintel_database_dir": "~/.config/sublime-text-3/codeintel",
    "codeintel_scan_exclude_dir":[
        ".svn",
        ".git",
        ".hg",
        "CVS",
        ".idea",
        ".sass-cache",
        "_site",
        "nbproject",
        "tests/coverage",
        "var/cache",
        "var/page_cache",
    ],
    "codeintel_language_settings": {
        "Python3": {
            "python3": "/usr/bin/python3.6",
            "codeintel_scan_extra_dir": [
               "/home/natanfelles/.config/sublime-text-3/Packages/SublimeCodeIntel/arch",
                "/home/natanfelles/.config/sublime-text-3/Packages/SublimeCodeIntel/libs",
                "/usr/share/python",
                "/usr/local/lib/python3.6",
            ],
            "codeintel_scan_files_in_project": true,
            "codeintel_max_recursive_dir_depth": 25,
            "codeintel_selected_catalogs": []
        },
        "JavaScript": {
            "codeintel_scan_extra_dir": [],
            "codeintel_scan_exclude_dir":[],
            "codeintel_scan_files_in_project": true,
            "codeintel_max_recursive_dir_depth": 25,
            "codeintel_selected_catalogs": ["jQuery","HTML5"],
            "javascriptExtraPaths": []
        },
        "PHP": {
            "php": "/usr/bin/php",
            "codeintel_scan_extra_dir": [
                //"/home/natanfelles/.config/composer/vendor/phalcon/ide-stubs/src/Phalcon",
                "/home/natanfelles/.config/composer/vendor/jetbrains/phpstorm-stubs"
            ],
            "codeintel_scan_files_in_project": true,
            "codeintel_max_recursive_dir_depth": 25,
            "codeintel_scan_exclude_dir":["/usr/bin/php"],
            "phpConfigFile": "/etc/php/7.1/fpm/php.ini",
        }
    }
}
```

### Auto-Completar, Docs, Templates, Plugins e Ajustes Finos

Quer transformar o SublimeText na mais poderosa, leve e rápida IDE para desenvolver em qualquer linguagem de programação?

Faça download do meu [Sublime Text User Backup](https://gitlab.com/natanfelles/sublime-backup), com cerca de 40 templates para o SublimeTmpl, por apenas [U$ 5 dólares](#){: onclick="sendForm('STIDE')"}.

[Solicitar Acesso](#){: class="btn btn-block btn-success" onclick="sendForm('STIDE')"}

<div class="embed-responsive embed-responsive-16by9">
    <iframe class="embed-responsive-item" src="https://www.youtube.com/watch?v=lmAPsJDthFA?autoplay=1" autoplay="autoplay"></iframe>
</div>

<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank" id="STIDE">
    <input type="hidden" name="cmd" value="_s-xclick">
    <input type="hidden" name="hosted_button_id" value="AJUDWBVRKYLJU">
</form>

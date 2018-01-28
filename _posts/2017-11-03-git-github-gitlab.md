---
title: 'Git, GitHub & GitLab - O que preciso saber?'
layout: post
categories: desenvolvimento
image: git-github-gitlab.svg
tags: git github gitlab vcs
description: Comandos básicos para utilizar o Git 
---

```sh
apt install git ssh
```

```sh
git config --global user.name "Scott Chacon"
git config --global user.email "schacon@gmail.com"
```

```sh
git config (--global) user.signingkey <gpg-key-id>
```

```sh
git init
```

```sh
git clone
```

```sh
git add <filepaths>
```

```sh
git branch
```

```sh
git branch <new_branch>
```

```
git branch -d <branch_to_delete>
```

```sh
git checkout <branch_to_use>
```

```sh
git checkout -b <new_branch>
```

```sh
git commit -m "<message>"
```

```sh
git commit --amend
```

```sh
git fetch
```

```sh
git merge <branch_to_merge_into>
```

```sh
git push <remote> <remote_branch>
```

```sh
git push -f <remote> <remote_branch>
```

```sh
git push -D <remote> <remote_branch_to_delete>
```

```sh
git pull <remote> <branch>
```

```sh
git log
```

- [O Livro da Comunidade Git](http://djalma.blog.br/material-texto/git-book.pdf)
- [Como criar um servidor VCS com GitLab]({{ site.baseurl }}{% post_url 2016-09-23-gitlab %})
- [GitHub Help](https://help.github.com)
- [GitLab Help](https://gitlab.com/help)
- [Git](https://git-scm.com)

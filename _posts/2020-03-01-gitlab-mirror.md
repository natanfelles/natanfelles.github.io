---
title: Como espelhar repositórios do GitLab para o GitHub
layout: post
categories: desenvolvimento
image: gitlab-mirror.svg
tags: git gitlab github mirror espelhar
description: Como fazer em algumas etapas
---

Em algum momento você pode precisar sincronizar um repositório git do GitLab com
o GitHub.

Para isso é preciso que você gere um token de acesso no GitHub indo em [Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens). Clique 
no botão "Generate new token" e selecione a opção **Repo > public_repo**.

![Personal access tokens]({{ 'assets/img_posts/personal-access-token.png' | relative_url }})

Salve esse token se pretende utilizá-lo mais de uma vez. Pois não será possível 
revê-lo depois.

Feito isso, crie o repositório espelho no GitHub.

Em seguida, vá até o reposiório principal no GitLab em **Setting > Repository > Mirroring repositories** e ensira o **Git repository URL**. Que deve ser no seguinte formato:
`https://<username>@github.com/<username>/<repositorio>.git`.

![GitLab Mirror Repository]({{ 'assets/img_posts/gitlab-mirror-repo.png' | relative_url }})

A **Mirror direction** deve ser Push. E a **Password** é o token gerado no GitHub.

Clique no botão **Mirror repository** e está feito.



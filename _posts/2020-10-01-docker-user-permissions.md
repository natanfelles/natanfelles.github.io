---
title: 'Resolvendo permissão negada ao tentar conectar ao soquete do Docker'
layout: post
categories: desenvolvimento
image: docker-cloud.png
tags: docker linux
description: Instalou o Docker e não consegue executar nenhum comando?
---

## Problema:

Você está tentando executar um contêiner do Docker, mas só recebe uma mensagem de erro como esta:

```
docker: Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Post http://%2Fvar%2Frun%2Fdocker.sock/v1.26/containers/create: dial unix /var/run/docker.sock: connect: permission denied.
See 'docker run --help'.
```

## Solução:

A mensagem de erro informa que o usuário atual não pode acessar o mecanismo do docker, porque você não tem permissões para acessar o soquete unix para se comunicar com o mecanismo.

Execute este comando em seu shell favorito e, em seguida, **saia completamente da sua conta e faça login novamente** (ou saia da sessão SSH e reconecte. Em caso de dúvida, reinicie o computador em que está tentando executar o Docker!):

```
sudo usermod -a -G docker $USER
```

Depois de fazer isso, você deverá ser capaz de executar o comando sem problemas. Execute `docker run hello-world` como um usuário normal para verificar se funciona. Reinicialize se o problema ainda persistir.

É necessário fazer logout e login novamente porque a mudança de grupo não terá efeito a menos que sua sessão seja encerrada.

Done.

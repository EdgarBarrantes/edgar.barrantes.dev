---
tag: [2022, docker, software, dockerfile]
title: How to run bash inside of a docker container
description: For when you need to debug a container
---

# How to run bash inside of a docker container

This will give you the container id:

```bash
docker container ls
```

This is how you run bash inside the container:

```bash
docker exec -it CONTAINER_ID bash
```

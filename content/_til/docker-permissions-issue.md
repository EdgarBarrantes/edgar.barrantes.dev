---
title: "Fix Docker permission issue"
description: "Fixes "Error: connect EACCES /var/run/docker.sock"."
date: "2022-04-20"
tag:
  - docker
  - linux
---

# Fix docker permission issue

In order to fix this error:

```bash
Error: connect EACCES /var/run/docker.sock
```

Run:

```bash
sudo chmod 666 /var/run/docker.sock
```

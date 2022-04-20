---
tag: [2022, docker, software]
title: Fix docker permission issue
description: Fixes Error connect EACCES /var/run/docker.sock
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

sudo chmod 666 /var/run/docker.sock

---

tag: [2022, docker, software, dockerfile]
title: Fix docker permission issue
description: Fixes Error: connect EACCES /var/run/docker.sock

---

# How to run bash inside of a docker container

In order to fix this error:

```bash
Error: connect EACCES /var/run/docker.sock
```

Run:

```bash
sudo chmod 666 /var/run/docker.sock
```

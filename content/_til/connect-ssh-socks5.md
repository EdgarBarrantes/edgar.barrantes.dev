---
tag: [2022, ssh, vpn]
title: How to create a vpn with a server you have access to
description: "Quick trick for personal vpn"
date: "27-05-2022"
source: [jeff]
---

# How to create a vpn with a server you have access to

Connect to ssh to your server:

```bash
ssh -D 127.0.0.1:8082 apps
```

Where apps is setup in ~/.ssh/config:

```
  User root
  IdentityFile ~/.ssh/whathaveyou,
  HostName IP
```

Open up chrome with that connection as a proxy:

```bash
google-chrome --proxy-server="socks5://127.0.0.1:8082"
```

There you go, that browser session is passing all its traffic through your server.

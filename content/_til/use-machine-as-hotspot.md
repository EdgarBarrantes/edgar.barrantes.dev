---
tag: [2024, hotspot, server]
title: How to use a linux machine as a hotspot
description:
date: "24-06-2024"
source: [web]
---

# How to use a linux machine as a hotspot

Create network
```bash
sudo nmcli device wifi hotspot con-name hotspotname ssid hotspotname band bg password verysecretpassword
```
```

Doesn't work with PMF for some reason
```
nmcli c modify hotspotname wifi-sec.pmf 1
```

You need to enable forwarding packages

```
sudo iptables -t filter -P FORWARD ACCEPT
```

Show QR code and data

```
nmcli dev wifi show-password
```

There you go.
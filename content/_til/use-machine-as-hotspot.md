---
tag: [2024, hotspot, server]
title: How to use a linux machine as a hotspot
description: "When you have an ethernet connection and need to share it with your phone or other devices."
date: "24-06-2024"
source: [web]
---

# How to use a linux machine as a hotspot

Create network:

```bash
sudo nmcli device wifi hotspot con-name hotspotname ssid hotspotname band bg password verysecretpassword
```

Doesn't work with PMF for some reason:

```bash
nmcli c modify hotspotname wifi-sec.pmf 1
```

You need to enable forwarding packages:

```bash
sudo iptables -t filter -P FORWARD ACCEPT
```

Show QR code and data:

```bash
nmcli dev wifi show-password
```

There you go.
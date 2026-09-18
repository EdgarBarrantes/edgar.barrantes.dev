---
title: "Fix the fastecdsa install failure when setting up Cairo"
description: "The legacy-install-failure error on fastecdsa needs python-dev and libgmp."
date: "2022-05-13"
tag:
  - cairo
  - starknet
  - python
---

# Fix the fastecdsa install failure when setting up Cairo

When starting the development environment for Cairo you might run into an `legacy-install-failure` error while trying to install `fastecdsa`.

In my particular case (using Pop!\_OS), I solved it by installing python-dev:

```bash
sudo apt-get install gcc python-dev-is-python3 libgmp3-dev
```

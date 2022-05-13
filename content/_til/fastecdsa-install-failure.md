---
tag: [2022, cairo, starknet, smart-contracts]
title: Correct error when installing python dependencies
description:
---

# Correct error when installing python dependencies for Cairo environment

When starting the development environment for Cairo you might run into an `legacy-install-failure` error while trying to install `fastecdsa`.

In my particular case (using Pop!\_OS), I solved it by installing python-dev:

```bash
sudo apt-get install gcc python-dev-is-python3 libgmp3-dev

```

---
tag: [2022, npm, node, nvm]
title: How to remove TLS warning in npm
description: This error keeps appearing and the linked post does not exactly say how to fix things
---

# How to remove TLS warning in npm

I had been getting this error anytime I install any package:

_npm notice Beginning October 4, 2021, all connections to the npm registry - including for package installation - must use TLS 1.2 or higher. You are currently using plaintext http to connect. Please visit the GitHub blog for more information: [https://github.blog/2021-08-23-npm-registry-deprecating-tls-1-0-tls-1-1/](https://github.blog/2021-08-23-npm-registry-deprecating-tls-1-0-tls-1-1/)_

## How to start using TLS 1.2+ when using nvm

Get a recent version of node (ideally you should always be using [nvm](https://github.com/nvm-sh/nvm)):

```bash
# LTS:
nvm install --lts
# Or latest:
nvm install node
# Or to see all versions and chose:
nvm latest-remote
```

With that out of the way, the real fix:

```bash
npm set registry=https://registry.npmjs.org/
```

You can test it worked by running (this is on the original link in the npm log):

```bash
npm install -g https://tls-test.npmjs.com/tls-test-1.0.0.tgz
```

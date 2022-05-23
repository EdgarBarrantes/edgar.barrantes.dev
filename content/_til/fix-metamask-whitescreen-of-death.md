---
tag: [2022, metamask, wallet, crypto]
title: How to fix metamask white screen of death in firefox
description:
---

# How to fix metamask white screen of death in Firefox in Linux

I encountered an issue where metamask screen in firefox, this is what I did to fix it:

Go to:

```bash
/home/USERNAME/.mozilla/firefox/STRING.dev-edition-default/storage/default/moz-extension+++UUID^userContextId=NUMBER/idb/
```

That folder should have another one inside in the shape of:

```bash
UNKNOWNSTRING-eengsairo.files
```

Where:

- USERNAME: your username
- STRING: a particular string in your system, also in your case it might me dev edition.
- UUID: The Internal UUID of the metamask extension, find it by pasting `about:debugging#addons` in your address bar, it's on the metamask extension, labeled as Internal UUID.
- NUMBER: Some number I don't know where it comes from, you might have several, find one where you can find the folder ending in `eengsairo.files`.
- UNKNOWNSTRING: Same as above, no idea where this comes from.

There's an sqlite database there, you can open it with [an SQLlite browser](https://sqlitebrowser.org/dl/). On `Browse Data` tab, in the file table, there is only one row (in my case), where the id is a number you should remember, let's call it **MAGICNUMBER**.

Inside `UNKNOWNSTRING-eengsairo.files`, there should be at least a file with a number as it's name, copy the highest numbered file into a new file called MAGICNUMBER:

```bash
cp OLDFILENAME MAGICNUMBER
```

And that's it.

Use this solution at your own risk, remember to backup the files you'll need, it's a simple `cp file fileBackUp` away from potentially losing funds.

_This solution is based on [this](https://community.metamask.io/t/metamask-firefox-blank-white-screen/2066/24) answer in metamask forum._

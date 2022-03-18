---
tag: [2022, docker, software, dockerfile]
title: Execute bash in node asynchronously
description: In order to wait for the results of bash while inside node
---

# Execute bash in node asynchronously

Look at this beauty!

Sure, it's using clases, might be able to transform this into something nicer...

```typescript
import { exec } from "child_process";

class CommandExecutorAsync {
  execCommand: (url: string) => Promise<any>;
  constructor() {
    this.execCommand = function (cmd) {
      return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(stdout);
        });
      });
    };
  }
}

const executor = new CommandExecutorAsync();
return executor.execCommand("sh scripts/prepareFiles.sh");
```

Actually, something like this should work:

```typescript
import { exec } from "child_process";

const commandExecutorAsync = () => {
  return {
    execCommand: (cmd: string) => new Promise((resolve, reject) => {
      exec(cmd, (error, stdout, stderr) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(stdout);
      });
    });
  }
}

const executor = commandExecutorAsync();
return executor.execCommand("sh scripts/prepareFiles.sh");
```

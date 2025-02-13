---
tag:
  - nodejs
  - typescript
  - shell-scripting
  - async-programming
  - system-integration
  - devops
  - backend
title: "Executing Shell Commands in Node.js: A TypeScript Guide"
description: "A comprehensive guide to executing shell commands asynchronously in Node.js using TypeScript, with best practices for error handling and system integration."
date: '2022-03-18'
---

# Executing Shell Commands in Node.js: A TypeScript Guide

## Overview

When building Node.js applications, you often need to interact with the system shell to execute commands. This guide demonstrates how to properly execute shell commands asynchronously using TypeScript, with proper error handling and modern practices.

## Implementation Approaches

### 1. Modern Promise-Based Implementation

```typescript
import { exec } from 'child_process';
import { promisify } from 'util';

// Convert exec to promise-based function
const execAsync = promisify(exec);

interface ExecResult {
  stdout: string;
  stderr: string;
}

async function executeCommand(command: string): Promise<ExecResult> {
  try {
    const { stdout, stderr } = await execAsync(command);
    return { stdout, stderr };
  } catch (error) {
    throw new Error(`Command execution failed: ${error.message}`);
  }
}

// Usage
const result = await executeCommand('ls -la');
console.log(result.stdout);
```

### 2. Class-Based Implementation

```typescript
import { exec, ExecException } from 'child_process';

interface CommandResult {
  stdout: string;
  stderr: string;
}

class CommandExecutor {
  async execute(command: string): Promise<CommandResult> {
    return new Promise((resolve, reject) => {
      exec(command, {
        maxBuffer: 1024 * 1024 * 10 // 10MB buffer
      }, (error: ExecException | null, stdout: string, stderr: string) => {
        if (error) {
          reject(new Error(`Command failed: ${error.message}`));
          return;
        }
        resolve({ stdout, stderr });
      });
    });
  }

  async executeWithTimeout(command: string, timeoutMs: number): Promise<CommandResult> {
    return Promise.race([
      this.execute(command),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error(`Command timed out after ${timeoutMs}ms`)), timeoutMs)
      )
    ]) as Promise<CommandResult>;
  }
}
```

### 3. Functional Approach

```typescript
import { exec } from 'child_process';

interface CommandOptions {
  timeout?: number;
  maxBuffer?: number;
  cwd?: string;
  env?: NodeJS.ProcessEnv;
}

const executeCommand = (
  command: string, 
  options: CommandOptions = {}
) => {
  const { 
    timeout = 0,
    maxBuffer = 1024 * 1024 * 10,
    cwd = process.cwd(),
    env = process.env 
  } = options;

  return new Promise((resolve, reject) => {
    exec(command, { timeout, maxBuffer, cwd, env }, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve({ stdout, stderr });
    });
  });
};

// Usage
const executor = executeCommand;
await executor('sh scripts/prepareFiles.sh', { timeout: 5000 });
```

## Best Practices

### 1. Error Handling

```typescript
try {
  const { stdout } = await executeCommand('some-command');
  console.log('Success:', stdout);
} catch (error) {
  if (error.code === 'ENOENT') {
    console.error('Command not found');
  } else if (error.code === 'ETIMEDOUT') {
    console.error('Command timed out');
  } else {
    console.error('Command failed:', error.message);
  }
}
```

### 2. Security Considerations

```typescript
import { escape } from 'shell-quote';

function sanitizeCommand(command: string, args: string[]): string {
  return `${command} ${args.map(arg => escape([arg])).join(' ')}`;
}

// Usage
const userInput = 'user provided input';
const safeCommand = sanitizeCommand('echo', [userInput]);
await executeCommand(safeCommand);
```

### 3. Resource Management

```typescript
interface CleanupOptions {
  timeout: number;
  signal?: AbortSignal;
}

async function executeWithCleanup(
  command: string,
  cleanup: () => Promise<void>,
  options: CleanupOptions
): Promise<void> {
  try {
    await executeCommand(command);
  } finally {
    await Promise.race([
      cleanup(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Cleanup timed out')), options.timeout)
      )
    ]);
  }
}
```

## Common Use Cases

### 1. Running Multiple Commands

```typescript
async function executeSequence(commands: string[]): Promise<string[]> {
  const results: string[] = [];
  for (const cmd of commands) {
    const { stdout } = await executeCommand(cmd);
    results.push(stdout);
  }
  return results;
}
```

### 2. Parallel Execution

```typescript
async function executeParallel(commands: string[]): Promise<string[]> {
  const promises = commands.map(cmd => executeCommand(cmd));
  const results = await Promise.all(promises);
  return results.map(result => result.stdout);
}
```

## Error Handling Patterns

### 1. Custom Error Types

```typescript
class CommandError extends Error {
  constructor(
    message: string,
    public readonly command: string,
    public readonly code?: number,
    public readonly stderr?: string
  ) {
    super(message);
    this.name = 'CommandError';
  }
}
```

### 2. Retry Logic

```typescript
async function executeWithRetry(
  command: string,
  retries = 3,
  delay = 1000
): Promise<CommandResult> {
  for (let i = 0; i < retries; i++) {
    try {
      return await executeCommand(command);
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw new Error('Unreachable');
}
```

## Additional Resources

- [Node.js Child Process Documentation](https://nodejs.org/api/child_process.html)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Shell Quote Package](https://www.npmjs.com/package/shell-quote)

---

*Last Updated: 2022-03-18*

*Tags: #nodejs #typescript #async #shell #system-integration #devops*

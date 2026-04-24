#!/usr/bin/env node

'use strict';

import readline from 'readline';
import { c, gray, cyan } from './ansi';
import { printBanner } from './banner';
import { startSpinner, stopSpinner, isSpinning } from './spinner';
import { buildCommands } from './commands';

function main(): void {
  printBanner();

  readline.emitKeypressEvents(process.stdin);
  // Required for raw key capture
  if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
  }

  const termWidth = Math.max(60, process.stdout.columns || 120);
  const hr = () => gray('─'.repeat(termWidth));
  console.log(gray(' ? for shortcuts'));

  const rl = readline.createInterface({
    input:    process.stdin,
    output:   process.stdout,
    prompt:   `${hr()}\n${c.gray}>${c.reset} `,
    terminal: true,
  });

  // After every redraw (typing, backspace, prompt), append the bottom ───
  // and move the cursor back to where readline expects it.
  const _rawRefreshLine = (rl as any)._refreshLine.bind(rl);
  (rl as any)._refreshLine = () => {
    _rawRefreshLine();
    const col = 2 + ((rl as any).cursor as number);
    process.stdout.write(`\n\r${hr()}\x1b[1A\r`);
    if (col > 0) process.stdout.write(`\x1b[${col}C`);
  };

  const commands = buildCommands(rl);

  const resumeAfterSpin = () => {
    stopSpinner(true);
    rl.prompt();
  };

  // ESC key — stop spinner and resume
  process.stdin.on('keypress', (_ch, key: { name?: string; ctrl?: boolean } | undefined) => {
    if (!isSpinning()) return;
    if (key?.name === 'escape' || (key?.ctrl && key?.name === 'c')) {
      resumeAfterSpin();
    }
  });

  // Ctrl+C — stop spinner if spinning, otherwise show hint
  rl.on('SIGINT', () => {
    if (isSpinning()) {
      resumeAfterSpin();
    } else {
      process.stdout.write('\n');
      console.log(gray(' Use /exit to quit.'));
      rl.prompt();
    }
  });

  rl.on('close', () => {
    console.log('');
    console.log(gray(' Goodbye!'));
    console.log('');
    process.exit(0);
  });

  rl.prompt();

  rl.on('line', (line: string) => {
    if (isSpinning()) return;

    const input = line.trim();

    if (!input) {
      rl.prompt();
      return;
    }

    if (input.startsWith('/')) {
      const cmd     = input.split(' ')[0].toLowerCase();
      const handler = commands[cmd];
      if (handler) {
        handler();
      } else {
        console.log('');
        console.log(` ${gray(`Unknown command: ${cyan(cmd)}. Type /help for available commands.`)}`);
        console.log('');
      }
      rl.prompt();
      return;
    }

    // Thinking forever ✨
    console.log('');
    startSpinner();
  });
}

main();

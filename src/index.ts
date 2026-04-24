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

  // Pre-draw the bottom ─── two lines below, then move cursor back up so
  // readline draws the top ─── and > on top of the reserved space.
  const _rawPrompt = rl.prompt.bind(rl);
  (rl as any).prompt = (preserveCursor?: boolean) => {
    process.stdout.write(`\n\n${hr()}\x1b[2A\r`);
    _rawPrompt(preserveCursor);
  };

  const commands = buildCommands(rl);

  const resumeAfterSpin = () => {
    stopSpinner();
    console.log('');
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

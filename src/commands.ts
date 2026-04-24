import readline from 'readline';
import { orange, bold, gray, cyan, dim } from './ansi';
import { printBanner } from './banner';

export type CommandHandler = () => void;

export function buildCommands(rl: readline.Interface): Record<string, CommandHandler> {
  return {
    '/help': () => {
      const cmds: [string, string][] = [
        ['/help',    'Show this help message'],
        ['/status',  'Show account and model status'],
        ['/clear',   'Clear the conversation history'],
        ['/compact', 'Compact conversation with summary'],
        ['/cost',    'Show token usage and costs'],
        ['/exit',    'Exit Claude Code'],
      ];
      console.log('');
      console.log(` ${orange('✻')} ${bold('Available commands:')}`);
      console.log('');
      for (const [cmd, desc] of cmds) {
        console.log(`   ${cyan(cmd.padEnd(12))} ${gray(desc)}`);
      }
      console.log('');
    },

    '/status': () => {
      console.log('');
      console.log(` ${orange('✻')} ${bold('Status')}`);
      console.log('');
      console.log(`   ${dim('Model:')}       ${gray('claude-sonnet-4-6')}`);
      console.log(`   ${dim('Account:')}     ${gray('pro')}`);
      console.log(`   ${dim('Context:')}     ${gray('0 / 200,000 tokens')}`);
      console.log(`   ${dim('Session:')}     ${gray('new session')}`);
      console.log('');
    },

    '/clear': () => {
      console.clear();
      printBanner();
    },

    '/compact': () => {
      console.log('');
      console.log(` ${orange('✻')} ${gray('Conversation compacted.')}`);
      console.log('');
    },

    '/cost': () => {
      console.log('');
      console.log(` ${orange('✻')} ${bold('Token usage')}`);
      console.log('');
      console.log(`   ${dim('Input tokens:')}    ${gray('0')}`);
      console.log(`   ${dim('Output tokens:')}   ${gray('0')}`);
      console.log(`   ${dim('Total cost:')}      ${gray('$0.0000')}`);
      console.log('');
    },

    '/exit': () => {
      console.log('');
      console.log(gray(' Goodbye!'));
      console.log('');
      process.exit(0);
    },
  };
}

import { c, orange, dim, bold, gray, cyan, italic, padEnd, centerIn } from './ansi';
import { LOGO } from './drawings';

export function printBanner(): void {
  const cwd        = process.cwd();
  const termWidth  = Math.max(60, process.stdout.columns || 120);
  const innerWidth = termWidth - 2; // used only for top/bot borders: ╭[innerWidth]╮

  // Row structure: │·[leftInner]·│·[rightInner]·│  → overhead = 7 chars
  const leftInner  = Math.max(28, Math.floor((termWidth - 7) * 0.44));
  const rightInner = termWidth - 7 - leftInner;

  const row  = (left: string, right = '') =>
    `${orange('│')} ${padEnd(left, leftInner)} ${orange('│')} ${padEnd(right, rightInner)} ${orange('│')}`;
  const rowC = (left: string, right = '') =>
    `${orange('│')} ${centerIn(left, leftInner)} ${orange('│')} ${padEnd(right, rightInner)} ${orange('│')}`;

  const titleLabel  = ` Claude Code (fake) v1.0.0 `;
  const rightDashes = Math.max(0, innerWidth - 3 - titleLabel.length);
  const topBorder   = orange('╭' + '─'.repeat(3)) + `${c.bold}${c.orange}${titleLabel}${c.reset}` + orange('─'.repeat(rightDashes) + '╮');
  const botBorder   = orange(`╰${'─'.repeat(innerWidth)}╯`);

  const username = 'Lazy';
  const email    = 'lazyPerson23@gmail.com';
  const orgName  = `${email}'s Organization`;
  const home     = process.env.USERPROFILE ?? process.env.HOME ?? '';
  const shortCwd = home && cwd.startsWith(home) ? '~' + cwd.slice(home.length) : cwd;

  const rightSep  = orange('─'.repeat(rightInner));
  const tipLine   = `Run ${cyan('/init')} to create a CLAUDE.md file with instructions for Claude`;
  const activity1 = `${dim('10m ago')}  the prompt line is ${gray('…')}`;
  const activity2 = `${dim('13m ago')}  do this`;
  const resumeStr = italic(orange('/resume for more'));
  const modelLine = `Sonnet 4.6 with medium effort ${orange('·')} Claude Pro ${orange('·')}`;

  console.log('');
  console.log(topBorder);
  console.log(row('', bold('Tips for getting started')));
  console.log(rowC(bold(`Welcome back ${orange(username)}!`), tipLine));
  console.log(row('', rightSep));
  console.log(rowC(orange(LOGO[0]), bold('Recent activity')));
  console.log(rowC(orange(LOGO[1]), activity1));
  console.log(rowC(orange(LOGO[2]), activity2));
  console.log(rowC(modelLine, resumeStr));
  console.log(rowC(gray(orgName), ''));
  console.log(rowC(dim(shortCwd), ''));
  console.log(botBorder);
  console.log('');
}

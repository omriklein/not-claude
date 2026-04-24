import { c, orange, gray, dim } from './ansi';

const FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'] as const;
const VERBS  = [
  'Thinking', 'Analyzing', 'Reasoning', 'Considering', 'Processing',
  'Reflecting', 'Evaluating', 'Synthesizing', 'Contemplating', 'Deliberating',
  'Pondering', 'Computing', 'Introspecting', 'Formulating',
] as const;

let _interval: NodeJS.Timeout | null = null;

export const isSpinning = () => _interval !== null;

export function startSpinner(): void {
  if (_interval) return;

  let frame    = 0;
  let elapsed  = 0;
  let verb     = randomVerb();
  let verbTimer = 0;

  _interval = setInterval(() => {
    elapsed   += 80;
    verbTimer += 80;

    if (verbTimer >= Math.floor(Math.random() * 4000 + 3000)) {
      verb      = randomVerb();
      verbTimer = 0;
    }

    const secs    = (elapsed / 1000).toFixed(0);
    const spinner = orange(FRAMES[frame % FRAMES.length]);
    const label   = gray(`${verb}…`);
    const time    = dim(`(${secs}s)`);

    process.stdout.write(`${c.clearLine} ${spinner} ${label} ${time}`);
    frame++;
  }, 80);
}

export function stopSpinner(keep = false): void {
  if (!_interval) return;
  clearInterval(_interval);
  _interval = null;
  process.stdout.write(keep ? '\n' : c.clearLine);
}

function randomVerb(): string {
  return VERBS[Math.floor(Math.random() * VERBS.length)];
}

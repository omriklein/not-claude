'use strict';

export const c = {
  reset:     '\x1b[0m',
  bold:      '\x1b[1m',
  dim:       '\x1b[2m',
  // orange:    '\x1b[38;5;214m',
  orange:    '\u001b[38;5;208m',
  cyan:      '\x1b[36m',
  gray:      '\x1b[90m',
  white:     '\x1b[97m',
  clearLine: '\r\x1b[K',
} as const;

export const orange = (s: string) => `${c.orange}${s}${c.reset}`;
export const dim    = (s: string) => `${c.dim}${s}${c.reset}`;
export const bold   = (s: string) => `${c.bold}${s}${c.reset}`;
export const gray   = (s: string) => `${c.gray}${s}${c.reset}`;
export const cyan   = (s: string) => `${c.cyan}${s}${c.reset}`;

export const italic = (s: string) => `\x1b[3m${s}${c.reset}`;

export const stripAnsi = (s: string) => s.replace(/\x1b\[[0-9;]*m/g, '');
export const visLen    = (s: string) => stripAnsi(s).length;
export const clip      = (s: string, w: number) =>
  visLen(s) > w ? stripAnsi(s).slice(0, w - 1) + '…' : s;
export const padEnd    = (s: string, w: number) => clip(s, w) + ' '.repeat(Math.max(0, w - visLen(clip(s, w))));
export const centerIn  = (s: string, w: number) => {
  const clipped = clip(s, w);
  const pad = Math.max(0, w - visLen(clipped));
  const l   = Math.floor(pad / 2);
  return ' '.repeat(l) + clipped + ' '.repeat(pad - l);
};

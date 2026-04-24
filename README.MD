# not-claude

> A drop-in fake for the Claude Code CLI. Looks identical. Thinks forever. Does nothing.

[![npm version](https://img.shields.io/npm/v/not-claude.svg)](https://www.npmjs.com/package/not-claude)
[![npm downloads](https://img.shields.io/npm/dm/not-claude.svg)](https://www.npmjs.com/package/not-claude)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## Why?

Sometimes you just need Claude to think for a while. A long while. Indefinitely, even.

`not-claude` is a terminal impersonator — it mimics the look, feel, and spinner of the real Claude Code CLI down to the last braille dot. Type a prompt, watch it think, take a break. It will still be thinking when you get back.

---

## Install

```bash
npm install -g not-claude
```

---

## Usage

Just type `not-claude` instead of `claude`:

```bash
not-claude
```

Then type any prompt and watch it "think" forever.

### Slash commands (for realism)

| Command    | Description                        |
|------------|------------------------------------|
| `/help`    | Show available commands            |
| `/status`  | Show fake model/account status     |
| `/clear`   | Clear the screen                   |
| `/compact` | Compact conversation (fake)        |
| `/cost`    | Show token usage (spoiler: $0.00)  |
| `/exit`    | Actually exit                      |

---

## What it looks like

```
╭──────────────────────────────────────────────────────────╮
│ ✻ Welcome to Claude Code!  (fake v1.0.0)                 │
│                                                          │
│   /help for help, /status for your current setup        │
│                                                          │
│   cwd: /Users/you/your-project                          │
╰──────────────────────────────────────────────────────────╯

> refactor the entire codebase

 ⠸ Deliberating… (42s)
```

---

## FAQ

**Is this the real Claude?**  
No.

**Will it ever respond?**  
No.

**Is that the point?**  
Yes.

**Does it work on Windows?**  
Yes — Node.js handles the ANSI codes.

---

## License

MIT
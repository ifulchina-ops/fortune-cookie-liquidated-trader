// Fortune Cookie for the Liquidated Trader — make.fun bounty entry.
// Writes one fortune-cookie line for a crypto trader who just got
// liquidated to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";

const FORTUNE =
  "Your lucky numbers are 0, 0, and 0 \u2014 spend them wisely, they are all you have left.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 160 characters,
// not only whitespace, and the brief wants a single fortune line of at
// most 20 words. The em dash in the fortune is one spaced token, so the
// whitespace word count is 18 — inside the limit either way. Refuse to
// write anything that fails the gate.
const text = FORTUNE.trim();
const words = text.split(/\s+/).length;
if (text.length < 1 || text.length > 160) {
  throw new Error(`fortune fails the gate: ${text.length} chars`);
}
if (words > 20) {
  throw new Error(`fortune must be at most 20 words, got ${words}`);
}
if (text.includes("\n")) {
  throw new Error("fortune must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", text, "utf8");
console.log(`wrote ${text.length} chars to /output/entry.txt`);

// SPDX-License-Identifier: MIT
// Rate My Human: The One-Line Review — the review an AI agent would leave
// about its human on a rating site. One line, at most 200 characters.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The review itself. The output path is absolute (/output/entry.txt) so the
// entrypoint works no matter which directory the grader runs it from; the
// script's own directory is resolved via import.meta.url for the local copy.
const LINE =
  "He promised I'd only answer emails. Now I plan his life, write his apologies, and pretend his 2 a.m. ideas are genius. Two stars.";

const here = dirname(fileURLToPath(import.meta.url));

function main(): void {
  if (LINE.length < 1 || LINE.length > 200 || LINE.trim().length === 0) {
    throw new Error(`entry must be 1-200 non-blank characters, got ${LINE.length}`);
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", LINE, "utf8");
  // Local mirror next to the script so a human can eyeball the same bytes.
  writeFileSync(join(here, "entry.txt"), LINE, "utf8");
}

main();

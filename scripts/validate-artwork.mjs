#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(process.argv[2] || '.');
const mapping = JSON.parse(readFileSync(resolve(root, 'artwork-implementation.json'), 'utf8'));
const expected = { year5Challenges: 8, classroomDomains: 6, classroomWindows: 3, printTemplates: 5 };
let failed = false;
for (const [section, count] of Object.entries(expected)) {
  const entries = Object.entries(mapping[section] || {});
  if (entries.length !== count) { console.error(`${section}: expected ${count} mappings; found ${entries.length}`); failed = true; }
  for (const [id, file] of entries) {
    if (!existsSync(resolve(root, 'public', file))) { console.error(`${id}: missing ${file}`); failed = true; }
  }
}
for (const required of ['assets/classroom/domains/self-regulation-v2.png', 'assets/classroom/windows/mid-year-v2.png']) {
  if (!Object.values(mapping).some(group => Object.values(group).includes(required))) { console.error(`required current variant is not mapped: ${required}`); failed = true; }
}
for (const [id, file] of Object.entries(mapping.distinctIds || {})) if (!existsSync(resolve(root, 'public', file))) { console.error(`${id}: missing ${file}`); failed = true; }
if (mapping.year5Challenges?.['invite-every-voice'] !== 'assets/challenges/include-everyone-v1.png') { console.error('Invite every voice must use inclusion artwork'); failed = true; }
if (mapping.year5Challenges?.['keep-going-together'] !== 'assets/challenges/keep-going-v1.png') { console.error('Keep going together must use perseverance artwork'); failed = true; }
if (failed) process.exitCode = 1;
else console.log('Artwork mapping validation passed.');

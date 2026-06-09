const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
const lines = fs.readFileSync(filePath, 'utf-8').split('\n');

const keywords = ['colors =', 'color_hex =', 'const colors'];

lines.forEach((line, idx) => {
  const lineNum = idx + 1;
  const lower = line.toLowerCase();
  const matched = keywords.filter(kw => lower.includes(kw));
  if (matched.length > 0) {
    console.log(`Line ${lineNum} [matches: ${matched.join(',')}]: ${line.trim()}`);
  }
});

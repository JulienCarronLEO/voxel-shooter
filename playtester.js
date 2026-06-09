#!/usr/bin/env node
/**
 * Block Sort - Playtester & Level Analyser
 *
 * Parses LEVEL_DEFS from index.html, runs Monte Carlo simulations using
 * three strategies (random, greedy, smart), and writes playtester-report.md.
 *
 * Usage:  node playtester.js [--runs N] [--level N]
 */

'use strict';
const fs = require('fs');
const path = require('path');

// -- CLI args ----------------------------------------------------------------
const args = process.argv.slice(2);
let RUNS = 2000;
let ONLY_LEVEL = null;
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--runs' && args[i + 1]) RUNS = parseInt(args[i + 1], 10);
  if (args[i] === '--level' && args[i + 1]) ONLY_LEVEL = parseInt(args[i + 1], 10);
}

// -- Parse LEVEL_DEFS from index.html -----------------------------------------
const htmlPath = path.join(__dirname, 'index.html');
const html = fs.readFileSync(htmlPath, 'utf-8');

// Extract the JS block that defines LEVEL_DEFS
const start = html.indexOf('const LEVEL_DEFS = [');
if (start === -1) { console.error('?  LEVEL_DEFS not found in index.html'); process.exit(1); }
// Find matching bracket end
let depth = 0, i = start + 'const LEVEL_DEFS = '.length;
let jsText = '';
for (; i < html.length; i++) {
  jsText += html[i];
  if (html[i] === '[') depth++;
  else if (html[i] === ']') { depth--; if (depth === 0) { i++; break; } }
}
// eslint-disable-next-line no-new-func
const LEVEL_DEFS = new Function('return ' + jsText)();
if (!Array.isArray(LEVEL_DEFS)) { console.error('?  Failed to parse LEVEL_DEFS'); process.exit(1); }
console.log(`ok  Parsed ${LEVEL_DEFS.length} levels from index.html`);

// -- Color names --------------------------------------------------------------
const COLOR_NAMES = ['Red', 'Blue', 'Green', 'Orange', 'Purple', 'White'];
function colorName(ci) { return COLOR_NAMES[ci] || `Color${ci}`; }

// -- Simulation helpers -------------------------------------------------------
function rng(max) { return Math.floor(Math.random() * max); }
function pick(arr) { return arr[rng(arr.length)]; }
function pickExcluding(arr, exclude) {
  const filtered = arr.filter(x => x !== exclude);
  return filtered.length ? pick(filtered) : pick(arr);
}

/**
 * Simulate one play-through of a level with a given strategy function.
 *
 * Strategy fn: (current, next, colorCounts, colorsAvailable) => 'fire' | 'swap'
 *   current/next = colorIdx of projectile
 *   colorCounts  = Map<colorIdx, count>
 *   colorsAvailable = Set of colorIdxes with blocks remaining
 *
 * Returns { won: bool, shotsUsed, blocksCleared, efficiency }
 */
function simulate(level, strategyFn) {
  const palette = level.palette || [...new Set(level.cluster.map(b => b.ci))];

  // Build color count map
  const colorCounts = new Map();
  for (const b of level.cluster) {
    colorCounts.set(b.ci, (colorCounts.get(b.ci) || 0) + 1);
  }
  let totalBlocks = level.cluster.length;
  let shotsLeft = level.shotBudget;
  let shotsUsed = 0;
  let blocksCleared = 0;

  // Draw initial current + next
  let current = pick(palette);
  let next = pickExcluding(palette, current);

  while (shotsLeft > 0 && totalBlocks > 0) {
    const colorsAvailable = new Set([...colorCounts.entries()]
      .filter(([, n]) => n > 0).map(([ci]) => ci));

    if (colorsAvailable.size === 0) break;

    // Ask strategy: swap or fire?
    const action = strategyFn(current, next, colorCounts, colorsAvailable);
    if (action === 'swap') {
      const tmp = current;
      current = next;
      next = pickExcluding(palette, current);
      // swap costs nothing - but we only allow 1 free swap per turn (then must fire)
    }

    // Fire current
    shotsLeft--;
    shotsUsed++;

    const cnt = colorCounts.get(current) || 0;
    if (cnt > 0) {
      // Match: knock out 1-3 adjacent same-color blocks (simulate floodMatch)
      const knocked = Math.min(cnt, 1 + rng(3)); // 1-3
      colorCounts.set(current, cnt - knocked);
      blocksCleared += knocked;
      totalBlocks -= knocked;
    }
    // Miss: no blocks removed - shot wasted

    // Advance queue
    current = next;
    next = pickExcluding(palette, current);
  }

  const won = totalBlocks === 0;
  const efficiency = blocksCleared / (level.cluster.length || 1);
  return { won, shotsUsed, blocksCleared, efficiency };
}

// -- Strategies ---------------------------------------------------------------

/** Random: sometimes swap, sometimes don't - no logic */
function stratRandom(current, next, colorCounts, colorsAvailable) {
  return Math.random() < 0.3 ? 'swap' : 'fire';
}

/**
 * Greedy: swap if next is a better match (more blocks) than current.
 * "Better" = the color has more blocks remaining.
 */
function stratGreedy(current, next, colorCounts, colorsAvailable) {
  const curCnt = colorCounts.get(current) || 0;
  const nxtCnt = colorCounts.get(next)    || 0;
  // Swap if next has strictly more blocks and current isn't already a match
  if (nxtCnt > curCnt && curCnt === 0) return 'swap';
  if (nxtCnt > curCnt * 1.5) return 'swap';
  return 'fire';
}

/**
 * Smart: swap if swapping leads to a higher-value shot,
 * weighted by whether we'd otherwise waste the shot entirely.
 */
function stratSmart(current, next, colorCounts, colorsAvailable) {
  const curCnt = colorCounts.get(current) || 0;
  const nxtCnt = colorCounts.get(next)    || 0;

  // If current has 0 blocks and next has blocks ? always swap
  if (curCnt === 0 && nxtCnt > 0) return 'swap';
  // If both have blocks, prefer the one with more (maximise clear)
  if (nxtCnt > curCnt + 1) return 'swap';
  return 'fire';
}

// -- Run simulations ----------------------------------------------------------
function runSims(level) {
  const strategies = [
    { name: 'Random',  fn: stratRandom  },
    { name: 'Greedy',  fn: stratGreedy  },
    { name: 'Smart',   fn: stratSmart   },
  ];
  const results = {};
  for (const { name, fn } of strategies) {
    let wins = 0, totalShots = 0, totalEff = 0;
    for (let r = 0; r < RUNS; r++) {
      const res = simulate(level, fn);
      if (res.won) wins++;
      totalShots += res.shotsUsed;
      totalEff   += res.efficiency;
    }
    results[name] = {
      winRate:    wins / RUNS,
      avgShots:   totalShots / RUNS,
      avgEff:     totalEff / RUNS,
    };
  }
  return results;
}

// -- Level analysis helpers ----------------------------------------------------
function analyseLevel(level) {
  const palette = level.palette || [...new Set(level.cluster.map(b => b.ci))];
  const counts = new Map();
  for (const b of level.cluster) {
    counts.set(b.ci, (counts.get(b.ci) || 0) + 1);
  }

  // Color balance: how uniform are the counts?
  const vals = [...counts.values()];
  const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
  const variance = vals.reduce((a, b) => a + (b - mean) ** 2, 0) / vals.length;
  const stdDev = Math.sqrt(variance);
  const balanceScore = 1 - (stdDev / (mean || 1)); // 1 = perfect balance

  // Minimum shots needed (optimal play: match every shot, get max 3 per shot)
  const minShotsNeeded = vals.reduce((sum, n) => sum + Math.ceil(n / 3), 0);

  // Slack: budget - minimum shots needed
  const slack = level.shotBudget - minShotsNeeded;

  // Orphaned colors: colors present but not represented in palette (shouldn't happen but check)
  const usedColors = new Set(level.cluster.map(b => b.ci));
  const paletteSet = new Set(palette);
  const orphaned = [...usedColors].filter(ci => !paletteSet.has(ci));

  // Singleton colors (only 1 block of a color - easy to miss or hard to clear)
  const singletons = [...counts.entries()].filter(([, n]) => n === 1).map(([ci]) => ci);

  return { counts, palette, mean, stdDev, balanceScore, minShotsNeeded, slack, orphaned, singletons };
}

function difficultyLabel(winRate) {
  if (winRate >= 0.90) return '? Easy';
  if (winRate >= 0.70) return '? Medium';
  if (winRate >= 0.45) return '? Hard';
  if (winRate >= 0.20) return '? Very Hard';
  return '? Brutal';
}

function starRating(winRate) {
  // 5 stars = easy, 1 star = brutal, based on Smart strategy win rate
  if (winRate >= 0.90) return '*****';
  if (winRate >= 0.70) return '*****';
  if (winRate >= 0.45) return '*****';
  if (winRate >= 0.20) return '*****';
  return '*****';
}

// -- Generate report -----------------------------------------------------------
const levels = ONLY_LEVEL
  ? LEVEL_DEFS.filter((_, i) => i + 1 === ONLY_LEVEL)
  : LEVEL_DEFS;

const allResults = [];
for (const level of levels) {
  process.stdout.write(`  Simulating ${level.displayName || level.name}... `);
  const sims = runSims(level);
  const analysis = analyseLevel(level);
  allResults.push({ level, sims, analysis });
  console.log(`done (Smart win: ${(sims.Smart.winRate * 100).toFixed(1)}%)`);
}

// Build markdown
let md = `# Block Sort - Playtester Report
*Generated: ${new Date().toISOString().slice(0, 10)} - ${RUNS.toLocaleString()} simulations per level*

---

## Summary Table

| Level | Name | Blocks | Budget | Min Shots | Slack | Difficulty | Smart Win% | Greedy Win% |
|-------|------|--------|--------|-----------|-------|------------|-----------|-------------|
`;

for (const { level, sims, analysis } of allResults) {
  const diff = difficultyLabel(sims.Smart.winRate);
  const slack = analysis.slack >= 0 ? `+${analysis.slack}` : `${analysis.slack}`;
  md += `| ${level.name} | ${level.displayName} | ${level.cluster.length} | ${level.shotBudget} | ${analysis.minShotsNeeded} | ${slack} | ${diff} | ${(sims.Smart.winRate * 100).toFixed(1)}% | ${(sims.Greedy.winRate * 100).toFixed(1)}% |\n`;
}

md += `\n---\n\n## Per-Level Analysis\n\n`;

for (const { level, sims, analysis } of allResults) {
  const smartWin = sims.Smart.winRate;
  const diff = difficultyLabel(smartWin);
  const stars = starRating(smartWin);

  md += `### ${level.name}: ${level.displayName}  ${stars}\n\n`;
  md += `**Difficulty:** ${diff} &nbsp;|&nbsp; **Blocks:** ${level.cluster.length} &nbsp;|&nbsp; **Budget:** ${level.shotBudget} shots\n\n`;

  // Color breakdown
  md += `**Color breakdown:**\n\n`;
  md += `| Color | Count | Carts needed | % of cluster |\n|-------|-------|--------------|----------|\n`;
  for (const [ci, n] of [...analysis.counts.entries()].sort((a, b) => a[0] - b[0])) {
    const pct = ((n / level.cluster.length) * 100).toFixed(0);
    md += `| ${colorName(ci)} (${ci}) | ${n} | ${Math.ceil(n / 3)} | ${pct}% |\n`;
  }
  md += `\n`;

  // Shot analysis
  md += `**Shot analysis:**\n`;
  md += `- Minimum shots if every shot is a perfect match: **${analysis.minShotsNeeded}**\n`;
  const slackStr = analysis.slack >= 0
    ? `+${analysis.slack} shots to spare`
    : `**${Math.abs(analysis.slack)} shots short** - impossible to win without multi-block combos!`;
  md += `- Budget slack: ${slackStr}\n`;
  md += `- Average shots used (Smart): **${sims.Smart.avgShots.toFixed(1)}** / ${level.shotBudget}\n\n`;

  // Strategy comparison
  md += `**Simulation results (${RUNS.toLocaleString()} runs each):**\n\n`;
  md += `| Strategy | Win Rate | Avg Shots Used | Avg Block Efficiency |\n|----------|----------|----------------|---------------------|\n`;
  for (const [name, r] of Object.entries(sims)) {
    md += `| ${name} | ${(r.winRate * 100).toFixed(1)}% | ${r.avgShots.toFixed(1)} | ${(r.avgEff * 100).toFixed(1)}% |\n`;
  }
  md += `\n`;

  // Warnings
  const warnings = [];
  if (analysis.slack < 0) {
    warnings.push(`!? **Impossible without combos**: budget is ${Math.abs(analysis.slack)} shots below the minimum needed for perfect play. Requires multi-block explosions.`);
  } else if (analysis.slack === 0) {
    warnings.push(`!? **Zero margin**: no room for mistakes - every shot must match. Consider adding 1-2 shots to the budget.`);
  }
  if (analysis.singletons.length > 0) {
    warnings.push(`!? **Singleton colors**: ${analysis.singletons.map(colorName).join(', ')} appear only once. These are easy to miss and hard to get right without luck.`);
  }
  if (analysis.balanceScore < 0.6) {
    warnings.push(`!? **Unbalanced colors**: color counts vary widely (std dev ${analysis.stdDev.toFixed(1)} vs mean ${analysis.mean.toFixed(1)}). One color dominates; others are scarce.`);
  }
  if (analysis.palette.length > 5) {
    warnings.push(`!? **Six colors**: maximum palette complexity. Players need to track many carts simultaneously.`);
  }
  if (sims.Smart.winRate < sims.Greedy.winRate - 0.1) {
    warnings.push(`!? **Smart underperforms Greedy**: the level may have degenerate structure where thinking ahead hurts. Review block layout.`);
  }

  // Recommendations
  const recs = [];
  if (smartWin >= 0.9 && level.cluster.length < 15) {
    recs.push(`? Level feels easy and short. Add 3-5 more blocks or reduce budget by 1 to increase challenge.`);
  }
  if (smartWin < 0.3 && analysis.slack >= 0) {
    recs.push(`? Win rate is low despite adequate budget - the random block draw hurts players. Add 1-2 shots of slack, or expose clusters of same-color blocks so combo shots are more achievable.`);
  }
  if (analysis.balanceScore < 0.5) {
    recs.push(`? Redistribute blocks more evenly across colors, or remove the dominant color's surplus blocks.`);
  }
  if (analysis.singletons.length > 1) {
    recs.push(`? Pair up singleton colors - give each at least 2-3 blocks so they feel intentional rather than frustrating.`);
  }
  if (smartWin > 0.85 && level.cluster.length >= 20) {
    recs.push(`? Good balance of challenge and fun. This is a well-tuned level.`);
  }

  if (warnings.length || recs.length) {
    md += `**Flags & Recommendations:**\n\n`;
    for (const w of warnings) md += `${w}\n\n`;
    for (const r of recs)    md += `${r}\n\n`;
  }

  md += `---\n\n`;
}

// Overall progression analysis
md += `## Progression Analysis\n\n`;
md += `The Smart strategy win rates across levels show the following difficulty curve:\n\n`;
md += `\`\`\`\n`;
for (const { level, sims } of allResults) {
  const bar = '?'.repeat(Math.round(sims.Smart.winRate * 20));
  const pct = (sims.Smart.winRate * 100).toFixed(0).padStart(3);
  md += `${level.name.padEnd(8)} ${pct}%  ${bar}\n`;
}
md += `\`\`\`\n\n`;

// Detect difficulty spikes
const diffs = allResults.map(r => r.sims.Smart.winRate);
let spikeWarnings = [];
for (let i = 1; i < diffs.length; i++) {
  const drop = diffs[i - 1] - diffs[i];
  if (drop > 0.25) {
    spikeWarnings.push(`!? Difficulty spike between **${allResults[i-1].level.name}** (${(diffs[i-1]*100).toFixed(0)}%) and **${allResults[i].level.name}** (${(diffs[i]*100).toFixed(0)}%) - a ${(drop*100).toFixed(0)}% drop in win rate. Consider adding a bridge level or increasing ${allResults[i].level.name}'s budget.`);
  }
  const rise = diffs[i] - diffs[i - 1];
  if (rise > 0.30) {
    spikeWarnings.push(`? Sudden ease-up between **${allResults[i-1].level.name}** (${(diffs[i-1]*100).toFixed(0)}%) and **${allResults[i].level.name}** (${(diffs[i]*100).toFixed(0)}%) - ${(rise*100).toFixed(0)}% rise in win rate. This level may feel too easy after the previous one.`);
  }
}
if (spikeWarnings.length) {
  for (const w of spikeWarnings) md += `${w}\n\n`;
} else {
  md += `No major difficulty spikes detected. The progression feels smooth.\n\n`;
}

md += `---\n\n*Run \`node playtester.js --runs 5000\` for higher-fidelity results, or \`--level N\` to analyse a single level.*\n`;

// Write output
const outPath = path.join(__dirname, 'playtester-report.md');
fs.writeFileSync(outPath, md, 'utf-8');
console.log(`\nok  Report written to playtester-report.md`);

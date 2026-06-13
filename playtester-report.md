# Block Sort - Playtester Report
*Generated: 2026-06-09 - 5,000 simulations per level*

---

## Summary Table

| Level | Name | Blocks | Budget | Min Shots | Slack | Difficulty | Smart Win% | Greedy Win% |
|-------|------|--------|--------|-----------|-------|------------|-----------|-------------|
| Level 1 | Cube Alpha | 20 | 10 | 7 | +3 | ? Hard | 47.3% | 47.6% |
| Level 2 | Cube Beta | 21 | 10 | 8 | +2 | ? Brutal | 15.6% | 15.3% |
| Level 3 | Crystal Cluster | 15 | 7 | 6 | +1 | ? Brutal | 2.6% | 2.6% |
| Level 4 | Hex Mix | 19 | 9 | 7 | +2 | ? Brutal | 1.2% | 1.6% |
| Level 5 | Scatter Lab | 25 | 12 | 10 | +2 | ? Brutal | 1.1% | 1.0% |
| Level 6 | Tri-Strata | 26 | 5 | 9 | -4 | ? Brutal | 0.0% | 0.0% |
| Level 7 | Three Pillars | 16 | 5 | 6 | -1 | ? Brutal | 0.0% | 0.0% |
| Level 8 | Symmetry Six | 18 | 9 | 6 | +3 | ? Brutal | 3.3% | 3.0% |
| Level 9 | Particle Soup | 20 | 12 | 8 | +4 | ? Brutal | 6.7% | 6.7% |
| Level 10 | Master Mix | 23 | 14 | 9 | +5 | ? Very Hard | 25.9% | 25.5% |

---

## Per-Level Analysis

### Level 1: Cube Alpha  *****

**Difficulty:** ? Hard &nbsp;|&nbsp; **Blocks:** 20 &nbsp;|&nbsp; **Budget:** 10 shots

**Color breakdown:**

| Color | Count | Carts needed | % of cluster |
|-------|-------|--------------|----------|
| Red (0) | 11 | 4 | 55% |
| Blue (1) | 9 | 3 | 45% |

**Shot analysis:**
- Minimum shots if every shot is a perfect match: **7**
- Budget slack: +3 shots to spare
- Average shots used (Smart): **9.8** / 10

**Simulation results (5,000 runs each):**

| Strategy | Win Rate | Avg Shots Used | Avg Block Efficiency |
|----------|----------|----------------|---------------------|
| Random | 20.0% | 9.9 | 87.8% |
| Greedy | 47.6% | 9.8 | 94.3% |
| Smart | 47.3% | 9.8 | 94.1% |

---

### Level 2: Cube Beta  *****

**Difficulty:** ? Brutal &nbsp;|&nbsp; **Blocks:** 21 &nbsp;|&nbsp; **Budget:** 10 shots

**Color breakdown:**

| Color | Count | Carts needed | % of cluster |
|-------|-------|--------------|----------|
| Red (0) | 7 | 3 | 33% |
| Blue (1) | 8 | 3 | 38% |
| Green (2) | 6 | 2 | 29% |

**Shot analysis:**
- Minimum shots if every shot is a perfect match: **8**
- Budget slack: +2 shots to spare
- Average shots used (Smart): **10.0** / 10

**Simulation results (5,000 runs each):**

| Strategy | Win Rate | Avg Shots Used | Avg Block Efficiency |
|----------|----------|----------------|---------------------|
| Random | 3.6% | 10.0 | 81.3% |
| Greedy | 15.3% | 10.0 | 88.8% |
| Smart | 15.6% | 10.0 | 88.5% |

**Flags & Recommendations:**

? Win rate is low despite adequate budget - the random block draw hurts players. Add 1-2 shots of slack, or expose clusters of same-color blocks so combo shots are more achievable.

---

### Level 3: Crystal Cluster  *****

**Difficulty:** ? Brutal &nbsp;|&nbsp; **Blocks:** 15 &nbsp;|&nbsp; **Budget:** 7 shots

**Color breakdown:**

| Color | Count | Carts needed | % of cluster |
|-------|-------|--------------|----------|
| Red (0) | 4 | 2 | 27% |
| Blue (1) | 3 | 1 | 20% |
| Green (2) | 2 | 1 | 13% |
| Purple (4) | 3 | 1 | 20% |
| White (5) | 3 | 1 | 20% |

**Shot analysis:**
- Minimum shots if every shot is a perfect match: **6**
- Budget slack: +1 shots to spare
- Average shots used (Smart): **7.0** / 7

**Simulation results (5,000 runs each):**

| Strategy | Win Rate | Avg Shots Used | Avg Block Efficiency |
|----------|----------|----------------|---------------------|
| Random | 0.4% | 7.0 | 67.5% |
| Greedy | 2.6% | 7.0 | 77.2% |
| Smart | 2.6% | 7.0 | 76.4% |

**Flags & Recommendations:**

? Win rate is low despite adequate budget - the random block draw hurts players. Add 1-2 shots of slack, or expose clusters of same-color blocks so combo shots are more achievable.

---

### Level 4: Hex Mix  *****

**Difficulty:** ? Brutal &nbsp;|&nbsp; **Blocks:** 19 &nbsp;|&nbsp; **Budget:** 9 shots

**Color breakdown:**

| Color | Count | Carts needed | % of cluster |
|-------|-------|--------------|----------|
| Red (0) | 5 | 2 | 26% |
| Blue (1) | 3 | 1 | 16% |
| Green (2) | 3 | 1 | 16% |
| Orange (3) | 3 | 1 | 16% |
| Purple (4) | 2 | 1 | 11% |
| White (5) | 3 | 1 | 16% |

**Shot analysis:**
- Minimum shots if every shot is a perfect match: **7**
- Budget slack: +2 shots to spare
- Average shots used (Smart): **9.0** / 9

**Simulation results (5,000 runs each):**

| Strategy | Win Rate | Avg Shots Used | Avg Block Efficiency |
|----------|----------|----------------|---------------------|
| Random | 0.2% | 9.0 | 67.1% |
| Greedy | 1.6% | 9.0 | 76.8% |
| Smart | 1.2% | 9.0 | 76.3% |

**Flags & Recommendations:**

!? **Six colors**: maximum palette complexity. Players need to track many carts simultaneously.

? Win rate is low despite adequate budget - the random block draw hurts players. Add 1-2 shots of slack, or expose clusters of same-color blocks so combo shots are more achievable.

---

### Level 5: Scatter Lab  *****

**Difficulty:** ? Brutal &nbsp;|&nbsp; **Blocks:** 25 &nbsp;|&nbsp; **Budget:** 12 shots

**Color breakdown:**

| Color | Count | Carts needed | % of cluster |
|-------|-------|--------------|----------|
| Red (0) | 3 | 1 | 12% |
| Blue (1) | 7 | 3 | 28% |
| Green (2) | 3 | 1 | 12% |
| Orange (3) | 2 | 1 | 8% |
| Purple (4) | 5 | 2 | 20% |
| White (5) | 5 | 2 | 20% |

**Shot analysis:**
- Minimum shots if every shot is a perfect match: **10**
- Budget slack: +2 shots to spare
- Average shots used (Smart): **12.0** / 12

**Simulation results (5,000 runs each):**

| Strategy | Win Rate | Avg Shots Used | Avg Block Efficiency |
|----------|----------|----------------|---------------------|
| Random | 0.1% | 12.0 | 68.5% |
| Greedy | 1.0% | 12.0 | 79.6% |
| Smart | 1.1% | 12.0 | 79.4% |

**Flags & Recommendations:**

!? **Unbalanced colors**: color counts vary widely (std dev 1.7 vs mean 4.2). One color dominates; others are scarce.

!? **Six colors**: maximum palette complexity. Players need to track many carts simultaneously.

? Win rate is low despite adequate budget - the random block draw hurts players. Add 1-2 shots of slack, or expose clusters of same-color blocks so combo shots are more achievable.

---

### Level 6: Tri-Strata  *****

**Difficulty:** ? Brutal &nbsp;|&nbsp; **Blocks:** 26 &nbsp;|&nbsp; **Budget:** 5 shots

**Color breakdown:**

| Color | Count | Carts needed | % of cluster |
|-------|-------|--------------|----------|
| Red (0) | 9 | 3 | 35% |
| Blue (1) | 9 | 3 | 35% |
| Green (2) | 8 | 3 | 31% |

**Shot analysis:**
- Minimum shots if every shot is a perfect match: **9**
- Budget slack: **4 shots short** - impossible to win without multi-block combos!
- Average shots used (Smart): **5.0** / 5

**Simulation results (5,000 runs each):**

| Strategy | Win Rate | Avg Shots Used | Avg Block Efficiency |
|----------|----------|----------------|---------------------|
| Random | 0.0% | 5.0 | 38.3% |
| Greedy | 0.0% | 5.0 | 38.3% |
| Smart | 0.0% | 5.0 | 38.7% |

**Flags & Recommendations:**

!? **Impossible without combos**: budget is 4 shots below the minimum needed for perfect play. Requires multi-block explosions.

---

### Level 7: Three Pillars  *****

**Difficulty:** ? Brutal &nbsp;|&nbsp; **Blocks:** 16 &nbsp;|&nbsp; **Budget:** 5 shots

**Color breakdown:**

| Color | Count | Carts needed | % of cluster |
|-------|-------|--------------|----------|
| Red (0) | 6 | 2 | 38% |
| Blue (1) | 6 | 2 | 38% |
| Green (2) | 4 | 2 | 25% |

**Shot analysis:**
- Minimum shots if every shot is a perfect match: **6**
- Budget slack: **1 shots short** - impossible to win without multi-block combos!
- Average shots used (Smart): **5.0** / 5

**Simulation results (5,000 runs each):**

| Strategy | Win Rate | Avg Shots Used | Avg Block Efficiency |
|----------|----------|----------------|---------------------|
| Random | 0.0% | 5.0 | 58.3% |
| Greedy | 0.0% | 5.0 | 61.8% |
| Smart | 0.0% | 5.0 | 61.7% |

**Flags & Recommendations:**

!? **Impossible without combos**: budget is 1 shots below the minimum needed for perfect play. Requires multi-block explosions.

---

### Level 8: Symmetry Six  *****

**Difficulty:** ? Brutal &nbsp;|&nbsp; **Blocks:** 18 &nbsp;|&nbsp; **Budget:** 9 shots

**Color breakdown:**

| Color | Count | Carts needed | % of cluster |
|-------|-------|--------------|----------|
| Red (0) | 3 | 1 | 17% |
| Blue (1) | 3 | 1 | 17% |
| Green (2) | 3 | 1 | 17% |
| Orange (3) | 3 | 1 | 17% |
| Purple (4) | 3 | 1 | 17% |
| White (5) | 3 | 1 | 17% |

**Shot analysis:**
- Minimum shots if every shot is a perfect match: **6**
- Budget slack: +3 shots to spare
- Average shots used (Smart): **9.0** / 9

**Simulation results (5,000 runs each):**

| Strategy | Win Rate | Avg Shots Used | Avg Block Efficiency |
|----------|----------|----------------|---------------------|
| Random | 0.7% | 9.0 | 70.9% |
| Greedy | 3.0% | 9.0 | 80.3% |
| Smart | 3.3% | 9.0 | 80.1% |

**Flags & Recommendations:**

!? **Six colors**: maximum palette complexity. Players need to track many carts simultaneously.

? Win rate is low despite adequate budget - the random block draw hurts players. Add 1-2 shots of slack, or expose clusters of same-color blocks so combo shots are more achievable.

---

### Level 9: Particle Soup  *****

**Difficulty:** ? Brutal &nbsp;|&nbsp; **Blocks:** 20 &nbsp;|&nbsp; **Budget:** 12 shots

**Color breakdown:**

| Color | Count | Carts needed | % of cluster |
|-------|-------|--------------|----------|
| Red (0) | 8 | 3 | 40% |
| Blue (1) | 3 | 1 | 15% |
| Green (2) | 3 | 1 | 15% |
| Orange (3) | 2 | 1 | 10% |
| Purple (4) | 2 | 1 | 10% |
| White (5) | 2 | 1 | 10% |

**Shot analysis:**
- Minimum shots if every shot is a perfect match: **8**
- Budget slack: +4 shots to spare
- Average shots used (Smart): **12.0** / 12

**Simulation results (5,000 runs each):**

| Strategy | Win Rate | Avg Shots Used | Avg Block Efficiency |
|----------|----------|----------------|---------------------|
| Random | 0.9% | 12.0 | 70.2% |
| Greedy | 6.7% | 12.0 | 80.7% |
| Smart | 6.7% | 12.0 | 80.1% |

**Flags & Recommendations:**

!? **Unbalanced colors**: color counts vary widely (std dev 2.1 vs mean 3.3). One color dominates; others are scarce.

!? **Six colors**: maximum palette complexity. Players need to track many carts simultaneously.

? Win rate is low despite adequate budget - the random block draw hurts players. Add 1-2 shots of slack, or expose clusters of same-color blocks so combo shots are more achievable.

? Redistribute blocks more evenly across colors, or remove the dominant color's surplus blocks.

---

### Level 10: Master Mix  *****

**Difficulty:** ? Very Hard &nbsp;|&nbsp; **Blocks:** 23 &nbsp;|&nbsp; **Budget:** 14 shots

**Color breakdown:**

| Color | Count | Carts needed | % of cluster |
|-------|-------|--------------|----------|
| Red (0) | 5 | 2 | 22% |
| Blue (1) | 6 | 2 | 26% |
| Green (2) | 5 | 2 | 22% |
| Orange (3) | 3 | 1 | 13% |
| Purple (4) | 4 | 2 | 17% |

**Shot analysis:**
- Minimum shots if every shot is a perfect match: **9**
- Budget slack: +5 shots to spare
- Average shots used (Smart): **13.7** / 14

**Simulation results (5,000 runs each):**

| Strategy | Win Rate | Avg Shots Used | Avg Block Efficiency |
|----------|----------|----------------|---------------------|
| Random | 4.8% | 14.0 | 83.2% |
| Greedy | 25.5% | 13.8 | 92.0% |
| Smart | 25.9% | 13.7 | 91.8% |

**Flags & Recommendations:**

? Win rate is low despite adequate budget - the random block draw hurts players. Add 1-2 shots of slack, or expose clusters of same-color blocks so combo shots are more achievable.

---

## Progression Analysis

The Smart strategy win rates across levels show the following difficulty curve:

```
Level 1   47%  ?????????
Level 2   16%  ???
Level 3    3%  ?
Level 4    1%  
Level 5    1%  
Level 6    0%  
Level 7    0%  
Level 8    3%  ?
Level 9    7%  ?
Level 10  26%  ?????
```

!? Difficulty spike between **Level 1** (47%) and **Level 2** (16%) - a 32% drop in win rate. Consider adding a bridge level or increasing Level 2's budget.

---

*Run `node playtester.js --runs 5000` for higher-fidelity results, or `--level N` to analyse a single level.*

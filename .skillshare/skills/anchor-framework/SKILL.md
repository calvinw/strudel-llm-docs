---
name: anchor-framework
description: Strudel composition methodology using a 4-instrument stack with 4-step harmonic instruments and 12-step melody instruments. Anchor points align every 3rd step of the fast instruments with the slow harmonic rhythm. Triggered by "/anchor-framework KEY" (e.g. "/anchor-framework E:minor").
---

# anchor-framework

Build a Strudel composition in the given key using the Anchor Framework System.

## Inputs

`/anchor-framework KEY`

- `KEY` — the scale to compose in (e.g. `E:minor`, `D:minor`, `C:major`)

## Core Structure

```
Instrument 1: 4 steps  (chord progression, mid-range)
Instrument 2: 4 steps  (harmonizing bass)
Instrument 3: 12 steps (melody — anchors on steps 1, 4, 7, 10)
Instrument 4: 12 steps (counter-melody — anchors on steps 1, 4, 7, 10)
```

Because all instruments share the same cycle, instruments 3 and 4 play three times as fast as instruments 1 and 2. Every 3rd step of instruments 3 and 4 (steps 1, 4, 7, 10) falls on the same beat as a step in instruments 1 and 2 — these are the **anchor points** where all four voices must harmonize.

## Step 0 — Harmonic Foundation (start here)

Build the initial stack using `piano` for all instruments so harmony is easy to hear.

- Instruments 1 & 2: choose notes from chords in the key (they harmonize with each other)
- Instruments 3 & 4: place anchor notes on steps 1, 4, 7, 10 that harmonize with instruments 1 & 2; fill all other steps with `~`

```javascript
const g_scale = "E:minor"

const step0 = stack(
    n("0 2 1 3").scale(g_scale).sound("piano").gain(.6),
    n("-7 -5 -6 -4").scale(g_scale).sound("piano").gain(.6),
    n("-2 ~ ~ 4 ~ ~ 3 ~ ~ 5 ~ ~").scale(g_scale).sound("piano").gain(.6),
    n("7 ~ ~ 7 ~ ~ 5 ~ ~ 3 ~ ~").scale(g_scale).sound("piano").gain(.8)
)
```

## Step 1 — Instrument Selection

Replace `piano` with varied timbres. Keep the same notes — only the sounds change.

- Instrument 1: pad or string (e.g. `gm_pad_sweep`, `gm_string_ensemble_1`)
- Instrument 2: warm pad or bass (e.g. `gm_pad_warm`, `gm_electric_bass_finger`)
- Instrument 3: synth bass or lead (e.g. `gm_synth_bass_1`)
- Instrument 4: bright synth (e.g. `supersaw`)

## Step 2 — Melodic Development

Fill in the non-anchor steps of instruments 3 and 4 to create flowing melodic lines. Anchor notes must stay the same.

## Step 3 — Rhythmic Sophistication (Syncopation)

Apply the `/syncopations` skill transforms to notes in instruments 3 and 4. Randomly pick a few to apply — do not syncopate every note.

## Step 4 — Counter-melody

Fill instrument 4 with a sparse melody. Echo some syncopation patterns from instrument 3. All anchor steps must still harmonize with instruments 1 and 2.

## Step 5 — Full Arrangement

- Add syncopation to instruments 1 and 2 as well
- Add reverb: `.room(2)`
- Add sharpening: `.shape(.1)`
- Add a percussion pattern using `s()` with drum sounds (e.g. `bd`, `sd`, `hh`, `oh`)
- Wrap everything in `arrange()` to sequence the steps with repeat counts

```javascript
arrange(
  [2, step0],
  [2, step1],
  [2, step2],
  [2, step3],
  [2, step4],
  [2, step5],
  [10, step6]
).slow(1.6)
```

## Key Strudel Concepts

- `stack()` — combines multiple instruments playing simultaneously
- `n()` — scale degree notation (0 = root, negative = below root)
- `.scale("E:minor")` — constrains all `n()` values to the chosen scale
- `~` — rest (silence for one step)
- `[]` — group sub-steps within a single step (used for syncopation)
- `.gain()` — volume (0–1)
- `.room()` — reverb amount
- `.shape()` — soft distortion / sharpening
- `arrange([count, pattern], ...)` — sequence patterns with repeat counts

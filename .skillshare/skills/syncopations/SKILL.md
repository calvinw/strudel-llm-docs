---
name: syncopations
description: Standard syncopation transforms for Strudel mini-notation. Shows how to replace a plain note with a syncopated group using [], ~, and @ operators. Triggered by "/syncopations" or referenced by the anchor-framework skill.
---

# syncopations

Apply syncopation to notes in a Strudel pattern by replacing a plain note value with one of these mini-notation transforms.

## Inputs

`/syncopations`

No arguments needed — returns the full set of available transforms.

## Transforms

Replace any `note` in your pattern with one of these:

| Original | Transform | Effect |
|----------|-----------|--------|
| `note` | `[~ note]` | Delayed entry — rest first, note second |
| `note` | `[note ~]` | Early cutoff — note first, then silence |
| `note` | `[note@2 ~]` | Note held for 2/3 of the step, then silence |
| `note` | `[~ note@2]` | Silence for 1/3, then note held for 2/3 |
| `note` | `[~ ~ note]` | Late entry — two rests then note |

## Usage

Pick a few notes in your pattern and apply transforms at random — do **not** syncopate every note or the rhythm becomes too busy.

### Before
```javascript
n("9 8 7 7 6 5 5 4 3 2 1 0")
```

### After (a few transforms applied)
```javascript
n("9 [8 ~] 7 7 [~ 6@2] 5 5 4 [3 ~] 2 1 0")
```

## Notes

- `@` sets the relative duration weight of a sub-step (e.g. `note@2` takes twice as long as `~`)
- `[]` groups sub-steps so they fit within a single parent step
- These transforms preserve the anchor points — only apply them to non-anchor steps when working with the `/anchor-framework` skill

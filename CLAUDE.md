# Strudel Live Coding Composition Project

**For a quick project overview, see [README.md](README.md)**

This document contains LLM documentation guidelines and composition methodology for the Strudel Live Coding Composition Project.

## Setup and Installation

### Running in a Codespace or Devcontainer

Everything is set up automatically when the Codespace starts — the Strudel MCP server, composition skills, and all AI agents are configured with no manual steps needed.

### Running Locally

Clone this repository first:
```bash
git clone https://github.com/calvinw/strudel-llm-docs.git
cd strudel-llm-docs
```

**Connect the Strudel MCP server:**

The project includes a `.mcp.json` file that Claude Code picks up automatically — no install needed. Just start Claude Code from inside the project directory.

For OpenCode (or to install explicitly for Claude Code):
```bash
./local-setup/install_strudel_mcp_claude.sh
```

**Install the composition skills:**
```bash
./local-setup/install_skills.sh
```

### MCP Server and Session Setup

1. Open the Strudel UI at https://strudel-llm.mcp.mathplosion.com/strudel
2. Copy the **Session ID** displayed on the page (e.g., "b8t7")
3. Provide this Session ID to your LLM when beginning work
4. The LLM will use this ID to communicate with your specific browser session

### MCP Tools Available

- **`play_code`** — send Strudel code to the browser and play it
- **`stop_play`** — stop current playback
- **`get_mcp_status`** — check session status
- **`get_currently_playing_code`** — retrieve current code from editor

---

## Project Structure

```
.skillshare/skills/
    anchor-framework/   ← /anchor-framework skill + composition-notes.txt
    syncopations/       ← /syncopations skill + syncopations.txt
compositions/           ← save your work here; example compositions included
docs/ref/               ← split Strudel function reference (A-C, D-F, etc.)
docs/sounds/            ← synths, samples, drum machines, wavetables
local-setup/            ← install scripts for local setup
```

---

## Instructions for LLMs: How to Use These Docs

### Step 1: Start a Composition with a Skill

Use the `/anchor-framework` skill to begin a composition. It guides you through the full process from harmonic foundation to final arrangement.

```
/anchor-framework E:minor
```

Use the `/syncopations` skill to look up rhythm transforms when adding syncopation.

```
/syncopations
```

### Step 2: Choose Your Sounds

Before writing code, refer to `docs/sounds/` to select instruments:

- **Need synthesizers, pads, or basic waveforms?** → `docs/sounds/synths.txt`
  - Examples: `gm_pad_warm`, `supersaw`, `sine`, `piano`
- **Need acoustic sampled instruments?** → `docs/sounds/samples.txt`
  - Examples: `kalimba`, `harp`, `flute`
- **Need drum machine sounds?** → `docs/sounds/drum-machines.txt`
  - Examples: `tr808_bd`, `tr909_sd`, `linndrum_hh`
- **Need retro/digital sounds?** → `docs/sounds/wavetables.txt`
  - Examples: `wt_digital`, `wt_vgame`

### Step 3: Look Up Strudel Functions

The comprehensive Strudel reference is split into 6 alphabetical files in `docs/ref/`:

| File | Functions |
|------|-----------|
| `strudel_reference_A-C.txt` | 80 functions |
| `strudel_reference_D-F.txt` | 63 functions |
| `strudel_reference_G-J.txt` | 35 functions |
| `strudel_reference_K-O.txt` | 55 functions |
| `strudel_reference_P-R.txt` | 67 functions |
| `strudel_reference_S-Z.txt` | 107 functions |

**Quick lookup workflow:**
1. Check `docs/ref/strudel_reference_QUICK_LOOKUP.txt` for a one-liner on any function
2. Find the right file using `docs/ref/strudel_reference_INDEX.txt`
3. Load only that alphabetical file — don't load all 6

### Step 4: Save Your Work

Save completed compositions to `compositions/`. Example compositions are already there for reference:
- `eminor_composition_process.js` — E minor, 7-step development walkthrough
- `dminor_composition_process.js` — D minor, descending melody focus
- `lydian_composition_process.js` — Lydian mode example

---

## Composition Methodology: Anchor Framework System

The full methodology is documented in the `/anchor-framework` skill at:
`.skillshare/skills/anchor-framework/SKILL.md`

The original composition notes are at:
`.skillshare/skills/anchor-framework/composition-notes.txt`

### Core Structure

```
Instrument 1: 4 steps  (chord progression, mid-range)
Instrument 2: 4 steps  (harmonizing bass)
Instrument 3: 12 steps (melody — anchors on steps 1, 4, 7, 10)
Instrument 4: 12 steps (counter-melody — anchors on steps 1, 4, 7, 10)
```

Because all instruments share the same cycle, instruments 3 and 4 play three times as fast as 1 and 2. Every 3rd step of instruments 3 and 4 falls on the same beat as a step in instruments 1 and 2 — these are the **anchor points** where all four voices must harmonize.

### Development Steps

- **Step 0** — Harmonic foundation with piano, anchors only (rests elsewhere)
- **Step 1** — Replace pianos with varied timbres
- **Step 2** — Fill in full melodies for instruments 3 and 4
- **Step 3** — Add syncopation (see `/syncopations` skill)
- **Step 4** — Develop counter-melody in instrument 4
- **Step 5** — Add syncopation to instruments 1 and 2, add effects and drums

### Key Strudel Concepts

- **`stack()`** — combines multiple instruments
- **`n()`** — scale degree notation (0 = root, negative = below root)
- **`.scale("E:minor")`** — constrains all `n()` values to the chosen scale
- **`~`** — rest
- **`[]`** — group sub-steps (used for syncopation)
- **`.room()`** — reverb
- **`.shape()`** — soft distortion
- **`arrange([count, pattern], ...)`** — sequence patterns with repeat counts

---

## Resources

- **`docs/`** — Complete Strudel documentation and tutorials
- **`docs/sounds/`** — Sound/instrument guide
- **`docs/ref/`** — Function reference (split alphabetically)
- **`compositions/`** — Save your work here
- **`.skillshare/skills/`** — Composition skills (`/anchor-framework`, `/syncopations`)
- **MCP Tools** — Direct integration with browser sessions for live coding

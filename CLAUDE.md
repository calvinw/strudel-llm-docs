# Strudel Live Coding Composition Project

**For a quick project overview, see [README.md](README.md)**

This document contains complete setup instructions, LLM documentation guidelines, and composition methodology for the Strudel Live Coding Composition Project.

## Setup and Installation

### Prerequisites
Clone this repository first:
```bash
git clone https://github.com/calvinw/strudel-llm-docs.git
cd strudel-llm-docs
```

### Installing the Strudel MCP Server
Run the installation script to set up the Strudel MCP server for Claude Code:
```bash
./install_strudel_mcp_claude.sh
```

This installs the remote Strudel MCP server from:
- **MCP Server URL**: https://strudel-llm.mcp.mathplosion.com/sse
- **Companion Website UI**: https://strudel-llm.mcp.mathplosion.com/strudel

### Getting Started with a Session

1. Visit the Strudel UI at https://strudel-llm.mcp.mathplosion.com/strudel
2. Copy the **Session ID** displayed on the page (e.g., "fox8")
3. Provide this Session ID to Claude when beginning work with Strudel
4. Claude will use this ID to communicate with your specific browser session

### MCP Methods Available

The Strudel MCP provides these methods for live coding:
- **`play_code`**: Execute Strudel code in the browser session
- **`stop_play`**: Stop current playback
- **`get_mcp_status`**: Check session status
- **`get_currently_playing_code`**: Retrieve current code from editor

The MCP is kept minimal by design - comprehensive documentation is maintained locally in the `docs/` directory, allowing users to customize and add their own documentation as needed.

## Project Structure

### Documentation Location
All documentation is now located in the `docs/` directory:
- Core Strudel concepts and API reference
- Workshop tutorials and examples
- User-customizable documentation

### Split Reference Documentation
To keep LLM context efficient, the comprehensive Strudel reference has been split into 6 alphabetical files in the `docs/ref/` directory:
- **`ref/strudel_reference_A-C.txt`** (80 functions)
- **`ref/strudel_reference_D-F.txt`** (63 functions)
- **`ref/strudel_reference_G-J.txt`** (35 functions)
- **`ref/strudel_reference_K-O.txt`** (55 functions)
- **`ref/strudel_reference_P-R.txt`** (67 functions)
- **`ref/strudel_reference_S-Z.txt`** (107 functions)

**Support Files (in `docs/ref/`):**
- **`ref/strudel_reference_INDEX.txt`** - Maps all 407 functions to their file location
- **`ref/strudel_reference_QUICK_LOOKUP.txt`** - One-liner descriptions of every function

**How to Use:** When working with Claude or other LLMs, look up your function in the INDEX file, then load only the relevant alphabetical file to keep context small and focused.

### Sounds Documentation
Strudel.cc organizes sounds into 4 categories, documented in `docs/sounds/`:
- **`sounds/synths.txt`** - Synthesizer instruments (basic waveforms like sine, square, sawtooth; MIDI instruments like pianos, guitars, organs, pads; FX effects)
- **`sounds/samples.txt`** - Sampled acoustic instruments (kalimba, harp, flute, recorder, world instruments, traditional pianos)
- **`sounds/drum-machines.txt`** - Emulated classic drum machines (Roland TR-808, TR-909, Linn, Korg, Akai, Yamaha, etc. with individual drum sounds like bd, sd, hh)
- **`sounds/wavetables.txt`** - Wavetable-based looping instruments (digital sounds, video game sounds)

**How to Use:** When composing, refer to these files to choose appropriate sounds. For example:
- Use `synths.txt` for "gm_pad_warm" or "supersaw"
- Use `samples.txt` for "kalimba" or "harp"
- Use `drum-machines.txt` for "tr808_bd" or "tr909_sd"

### Compositions Directory
Save all compositions in the `compositions/` directory for organization.

## Instructions for LLMs: How to Use These Docs

When you're asked to help with Strudel composition, follow this workflow to efficiently access the right documentation.

### Step 1: Understand the Project (First Time Only)
Read these files to understand the overall project:
- **[README.md](README.md)** - Project overview and setup
- **[CLAUDE.md](CLAUDE.md)** - This file, with complete context and methodology

### Step 2: Planning Phase - Choose Your Sounds
Before writing any code, refer to `docs/sounds/` to select appropriate instruments:

**Ask yourself:** What instruments do I need?
- **Need synthesizers, pads, or basic waveforms?** → Check `docs/sounds/synths.txt`
  - Examples: "gm_pad_warm", "supersaw", "sine", "piano"
- **Need acoustic sampled instruments?** → Check `docs/sounds/samples.txt`
  - Examples: "kalimba", "harp", "flute", "kalimba2"
- **Need drum machine sounds?** → Check `docs/sounds/drum-machines.txt`
  - Examples: "tr808_bd", "tr909_sd", "linndrum_hh"
- **Need retro/digital sounds?** → Check `docs/sounds/wavetables.txt`
  - Examples: "wt_digital", "wt_vgame"

### Step 3: Writing Code - Use Function References
When writing code, you'll need to look up Strudel functions:

**Quick lookup workflow:**
1. **If you just need a function name:** Check `docs/ref/strudel_reference_QUICK_LOOKUP.txt`
   - One-liner descriptions of all 407 functions
   - Great for refreshing your memory on what a function does

2. **If you need to find a specific function:** Use `docs/ref/strudel_reference_INDEX.txt`
   - Maps all function names to their documentation file
   - Example: Looking for "lpf"? Index says it's in "strudel_reference_P-R.txt"

3. **Load the specific alphabetical file you need:**
   - `docs/ref/strudel_reference_A-C.txt` (80 functions)
   - `docs/ref/strudel_reference_D-F.txt` (63 functions)
   - `docs/ref/strudel_reference_G-J.txt` (35 functions)
   - `docs/ref/strudel_reference_K-O.txt` (55 functions)
   - `docs/ref/strudel_reference_P-R.txt` (67 functions)
   - `docs/ref/strudel_reference_S-Z.txt` (107 functions)

Each file contains:
- Function name and synonyms
- Clear description
- Parameter information
- Working code examples

### Step 4: Composition Workflow
Once you have sounds and understand the functions, follow the **Anchor Framework System** (see section below) to build your composition systematically.

---

## Example: E Minor Composition Workflow

Here's how to use the documentation when composing in E minor:

1. **Planning (sounds selection):**
   - Check `docs/sounds/synths.txt` → Pick "gm_pad_warm" for pad
   - Check `docs/sounds/synths.txt` → Pick "supersaw" for synth
   - Check `docs/sounds/drum-machines.txt` → Pick "tr909_bd" for kick

2. **Building chords (function lookups):**
   - Need `.scale()` function? → INDEX says P-R → Load `strudel_reference_P-R.txt`
   - Need `.note()` function? → INDEX says N → Load `strudel_reference_A-C.txt` (wait, N is not in A-C... check INDEX)

3. **Implementation:**
   - Use `stack()` to combine instruments (QUICK_LOOKUP or P-R file)
   - Use `n()` or `note()` for melodies (A-C or appropriate file)
   - Apply effects like `.room()` (P-R file)

---

## Tips for Efficient Documentation Use

- **Keep the INDEX open** - It's your map to find any function quickly
- **Load only what you need** - Don't load S-Z when you only need A-C functions
- **Use QUICK_LOOKUP for quick questions** - "What does `clip` do?" → Check QUICK_LOOKUP first
- **Use full files for implementation** - When coding, load the full alphabetical file with examples
- **Refer to sounds/ first** - Make sonic decisions before diving into code
- **Check composition examples** - Review `eminor_composition_process.js` and `dminor_composition_process.js` for reference implementations

---

## Composition Methodology: Anchor Framework System

### Core Approach: 4-Instrument Stack with 4-12 Step Pattern

Our systematic composition process uses:
```
Instrument 1: 4 steps  (chord progression, mid-range)
Instrument 2: 4 steps  (harmonizing bass)
Instrument 3: 12 steps (melody, harmonizes on steps 1,4,7,10)
Instrument 4: 12 steps (counter-melody, harmonizes on steps 1,4,7,10)
```

### Implementation Process

**Step 0: Harmonic Foundation**
- Create 4-step chord progressions in chosen key/scale
- Instruments 1 & 2 provide harmonic foundation
- Instruments 3 & 4 establish "anchor points" every 3rd step
- Non-anchor steps initially filled with rests (`~`)

**Step 1: Instrument Selection**
- Replace pianos with varied timbres (pads, strings, basses, synths)
- Maintain the harmonic structure while exploring sonic palette

**Step 2: Melodic Development**
- Fill in complete melodies for 12-step instruments
- Maintain harmony at anchor points with other instruments
- Create flowing melodic lines between anchors

**Step 3: Rhythmic Sophistication**
Add syncopation using standard transforms from `syncopations.txt`:
- `note` → `[~ note]` (delayed entry)
- `note` → `[note ~]` (early cutoff)
- `note` → `[note@2 ~]` (half duration + rest)
- `note` → `[~ note@2]` (rest + half duration)

**Step 4: Counter-melody**
- Develop sparse melodies in instrument 4
- Echo syncopation patterns from instrument 3
- Maintain anchor point harmony

**Step 5: Full Arrangement**
- Add syncopation to foundational instruments 1 & 2
- Apply effects (reverb with `.room()`, distortion with `.shape()`)
- Integrate percussion patterns

### Example Implementation

This process is demonstrated in:
- **`eminor_composition_process.js`**: Complete E minor composition showing all 7 development steps
- **`dminor_composition_process.js`**: D minor composition with descending melody focus

Both files show the progressive building from basic piano chords to full arrangements with drums, effects, and sophisticated rhythmic patterns.

### Key Strudel Concepts Used

- **`stack()`**: Combines multiple instruments
- **`note()` / `n()`**: Defines melodic patterns
- **Mini-notation**: Pattern syntax with `~` for rests, `[]` for grouping
- **Scale system**: `.scale("E:minor")` for harmonic consistency
- **Effects**: `.room()`, `.shape()`, `.gain()` for sonic shaping
- **`arrange()`**: Sequences different sections with repetition counts

## Resources Available

- **`docs/`**: Complete Strudel documentation and tutorials
- **`compositions/`**: Save completed works here
- **MCP Tools**: Direct integration with browser sessions for live coding
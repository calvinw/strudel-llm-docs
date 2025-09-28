# Strudel Live Coding Composition Project

## Setup and Installation

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

### Compositions Directory
Save all compositions in the `compositions/` directory for organization.

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
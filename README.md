# Strudel Live Coding Composition Project

A systematic approach to creating musical compositions using [Strudel](https://strudel.cc/), a browser-based live coding environment that ports TidalCycles pattern language to JavaScript.

## Overview

This project demonstrates a **composition methodology** for creating sophisticated 4-part harmonized music using code. It includes:

- **Anchor Framework System**: A systematic approach to building compositions with 4 instruments using harmonic anchor points
- **Step-by-step examples**: Complete composition processes from basic chords to full arrangements
- **Documentation and tutorials**: Comprehensive guides for working with Strudel through LLMs

## Integration with Strudel MCP

This project is designed to work with the **Strudel MCP (Model Context Protocol) server**, which enables direct integration between AI assistants and live Strudel sessions:

- **MCP Server**: https://strudel-llm.mcp.mathplosion.com/sse
- **Web Interface**: https://strudel-llm.mcp.mathplosion.com/strudel

The MCP allows you to:
- Send code directly to a browser Strudel session
- Get real-time feedback on compositions
- Iterate on musical ideas collaboratively with AI

## Based on Strudel for LLM Experimentation

This work builds on **[strudel-llm-mirror](https://github.com/calvinw/strudel-llm-mirror)**, a fork of the original Strudel project specifically adapted for LLM experimentation and collaborative music creation.

## Quick Start

1. **Install the MCP server** (if using Claude Code):
   ```bash
   ./install_strudel_mcp_claude.sh
   ```

2. **Visit the web interface** to get your session ID:
   https://strudel-llm.mcp.mathplosion.com/strudel

3. **Explore the examples**:
   - `eminor_composition_process.js` - Complete E minor composition walkthrough
   - `dminor_composition_process.js` - D minor with descending melody focus

## Documentation

- **[CLAUDE.md](CLAUDE.md)** - Complete project documentation, setup instructions, and composition methodology
- **[docs/](docs/)** - Comprehensive Strudel documentation and tutorials
- **[compositions/](compositions/)** - Directory for saving completed works

## Composition Methodology

The project uses an **Anchor Framework** approach:

1. **4-instrument stack**: 2 instruments with 4 steps, 2 instruments with 12 steps
2. **Harmonic anchors**: Fast instruments harmonize on every 3rd step
3. **Progressive development**: From basic chords → melodies → syncopation → effects → drums
4. **Systematic transforms**: Standardized rhythmic variations and syncopation patterns

## Example Composition Structure

```javascript
const composition = stack(
    // Instrument 1: 4-step chord progression
    n("0 2 1 3").scale("E:minor").sound("gm_pad_sweep"),

    // Instrument 2: 4-step harmonizing bass
    n("-7 -5 -6 -4").scale("E:minor").sound("gm_pad_warm"),

    // Instrument 3: 12-step melody (anchors on 1,4,7,10)
    n("-2 -1 0 4 3 2 3 4 5 5 4 3").scale("E:minor").sound("gm_synth_bass_1"),

    // Instrument 4: 12-step counter-melody
    n("7 ~ ~ 7 ~ ~ 5 ~ ~ 3 ~ ~").scale("E:minor").sound("supersaw")
);
```

---

**Get started by reading [CLAUDE.md](CLAUDE.md) for complete setup and usage instructions!**
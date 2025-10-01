# Strudel Documentation Table of Contents

**Generated from:** Strudel LLM Documentation
**Split into focused sections:** September 2024

This documentation has been organized into 7 focused files covering all aspects of Strudel live coding.

## Quick Start

**New to Strudel?** Start here:
1. [Basics and Getting Started](basics_and_getting_started.md) - Essential concepts and first steps
2. [Patterns and Notation](patterns_and_notation.md) - Mini-notation and pattern creation
3. [Audio and Synthesis](audio_and_synthesis.md) - Sound design and effects

## Complete Documentation

### 1. [Basics and Getting Started](basics_and_getting_started.md)
Essential concepts for new users
- **What is Strudel** - Live coding environment basics
- **First Sounds** - Code fields, basic samples, drum sounds
- **First Notes** - Numbers, note names, scales
- **Basic Sequences** - Mini-notation fundamentals, tempo control
- **Basic Effects** - lpf, vowel, gain, delay, reverb, panning
- **Core Functions Reference** - sound(), note(), n(), bank(), scale(), setcpm()
- **Example Patterns** - Rock beats, house patterns, basic compositions

### 2. [Patterns and Notation](patterns_and_notation.md)
Complete mini-notation and pattern manipulation system
- **Mini-Notation Reference** - Complete syntax table with examples
- **Pattern Creation Functions** - cat(), seq(), stack(), arrange(), polymeter()
- **Pattern Effects** - rev(), jux(), add(), ply(), off()
- **Accumulation Modifiers** - superimpose(), layer(), echo(), echoWith()
- **Conditional Modifiers** - sometimes(), when(), chunk(), mask()
- **Utility Patterns** - run(), binary(), silence
- **Time Modifiers** - fast(), slow(), setcpm()
- **Practical Examples** - Complex pattern building, nested effects

### 3. [Audio and Synthesis](audio_and_synthesis.md)
Sound design, effects, and signal processing
- **Signal Chain Overview** - Audio processing order and routing
- **Synthesis** - Basic waveforms, noise, additive, FM, wavetable, ZZFX
- **Filters** - Low-pass, high-pass, band-pass, vowel filters
- **Amplitude Processing** - ADSR envelopes, tremolo, gain control
- **Filter Envelopes** - Dynamic filter modulation with ADSR
- **Distortion & Waveshaping** - Bit manipulation, shape, distort
- **Global Effects** - Delay, reverb, phaser systems
- **Spatial Effects** - Panning, jux, ducking
- **Orbits and Routing** - Signal routing and effects sends
- **Practical Examples** - Acid bass, lush pads, retro plucks

### 4. [Samples and Sounds](samples_and_sounds.md)
Working with audio samples and sound libraries
- **What are Samples** - Sample-based music concepts
- **Default Samples** - Built-in drum sounds and abbreviations
- **Sound Banks** - Drum machine banks, bank() function
- **Sample Selection** - Using n() and colon notation
- **Loading Custom Samples** - URLs, GitHub, strudel.json, local files
- **Pitched Samples** - Multi-sample instruments, pitch mapping
- **Shabda Integration** - Freesound.org samples, text-to-speech
- **Sampler Effects** - begin/end, speed, chop, slice, scrub, looping
- **Continuous Signals** - Using signals to control sample parameters
- **Performance Considerations** - Lazy loading, caching, optimization

### 5. [Musical Theory](musical_theory.md)
Harmony, scales, chords, and musical concepts
- **Understanding Pitch** - Frequency, MIDI numbers, scientific notation
- **Scales** - Scale usage, types, transformations, transposition
- **Chords and Voicings** - Manual construction, chord symbols, voicing controls
- **Chord Symbol Reference** - Complete chord notation system
- **Custom Voicing Dictionaries** - Creating custom chord voicings
- **Advanced Harmonic Concepts** - Voice leading, inversions, modal harmony
- **Practical Harmonic Patterns** - Jazz progressions, blues, circle of fifths
- **Parameter Modification** - Mathematical operations on pitch values
- **Continuous Signals for Harmony** - Algorithmic melody generation
- **Song Structure** - Using arrange() for complete compositions

### 6. [Advanced Features](advanced_features.md)
External integration and advanced capabilities
- **Device Motion Control** - Mobile sensor integration for expressive control
- **MIDI Integration** - Input/output, control changes, system exclusive
- **OSC (Open Sound Control)** - SuperCollider/SuperDirt integration
- **MQTT** - Internet of Things protocol integration
- **Gamepad Input** - Game controller musical interaction
- **Hydra Visual Integration** - Audio-reactive visual synthesis
- **Continuous Signals** - Advanced signal generation and control
- **CSound Integration** - Loading external instruments
- **Music Metadata** - Adding metadata tags to compositions
- **Offline Usage** - Standalone apps, caching, PWA functionality
- **Performance and Debugging** - Analysis tools, monitoring, error handling

### 7. [Recipes and Examples](recipes_and_examples.md)
Practical techniques and complete examples
- **Arpeggios** - Multiple approaches to chord note sequences
- **Break Chopping** - Drum break manipulation and granular techniques
- **Filter Envelopes** - Creating movement with dynamic filtering
- **Sound Layering** - Combining multiple sounds for rich textures
- **Oscillator Detune** - Chorus effects and voice spreading
- **Rhythmic Patterns** - Polyrhythms, polymeter, phasing, Euclidean rhythms
- **Sample Techniques** - Advanced sample manipulation and effects
- **Duration Control** - Various approaches to note and sample length
- **Wavetable Synthesis** - Custom waveform techniques
- **Complete Song Arrangements** - Jazz waltz, electronic dance, ambient
- **Generative Techniques** - Probabilistic and algorithmic composition
- **Performance Tips** - Live coding strategies and smooth transitions
- **Integration Examples** - MIDI controllers, motion control, Hydra visuals

## Cross-References

Each document contains links to related sections in other files. The documentation is designed to be read either sequentially for learning or as reference material for specific topics.

## Project Context

These documents support the [Strudel LLM Docs project](../CLAUDE.md) which provides:
- MCP server integration for live coding
- Anchor framework composition methodology
- Example compositions and starter files

**Official Strudel Website:** https://strudel.cc
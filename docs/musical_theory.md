# Strudel Musical Theory and Harmony

**Generated from:** Strudel LLM Documentation

This document covers Strudel's musical theory features, including scales, chords, voicings, and harmonic concepts.

## Understanding Pitch

### Frequency and Perception

Pitch is created by vibrations at specific frequencies, measured in Hertz (Hz):

```javascript
// Play frequencies directly
freq("<200 [300,500] 400 [500,<600 670 712 670>]>*8")
```

**Key Concepts:**
- Higher frequency = higher pitch
- Human hearing range: ~20Hz to 20,000Hz
- Doubling frequency = one octave higher
- Frequency perception is logarithmic, not linear

### MIDI Numbers

Standard musical representation using numbers 0-127:

```javascript
// MIDI numbers (440Hz = A4 = MIDI 69)
note("69 73 76 81")  // A4 C#5 E5 A5
```

**MIDI to Frequency Formula:**
```
frequency = 440 * 2^((midi_number - 69) / 12)
```

### Scientific Pitch Notation

Note names with octave numbers:

```javascript
// Note names: letter + accidental + octave
note("A4 C#5 E5 A5")     // Sharp notation
note("A4 Db5 E5 A5")     // Flat notation (same pitches)
```

**Available Notes:**
- Letters: A, B, C, D, E, F, G
- Accidentals: `#` (sharp), `b` (flat)
- Octaves: 0-9 (middle C = C4)

## Scales

### Basic Scale Usage

Transform numbers into musical notes:

```javascript
// Scale degrees (0-indexed)
n("0 2 4 6 4 2").scale("C:major")

// Pattern scales
n("[0,7] 4 [2,7] 4")
.scale("C:<major minor>/2")

// Random notes in scale
n(rand.range(0,12).segment(8))
.scale("C:ritusen")
```

### Scale Format

Scales consist of: `root:type`

**Root Notes:**
- Can include octave: `C4:major`, `F#3:minor`
- Default octave is 3: `C:major` = `C3:major`

**Common Scale Types:**
- `major` - Standard major scale
- `minor` - Natural minor scale
- `dorian` - Dorian mode
- `mixolydian` - Mixolydian mode
- `pentatonic` - Pentatonic scale
- `blues` - Blues scale
- `chromatic` - All 12 semitones

### Scale Transformations

**Transpose by semitones:**
```javascript
"[c2 c3]*4".transpose("<0 -2 5 3>").note()

// Using interval notation
"[c2 c3]*4".transpose("<1P -2M 4P 3m>").note()
```

**Scale transpose by steps:**
```javascript
"[-8 [2,4,6]]*2"
.scale('C4 bebop major')
.scaleTranspose("<0 -1 -2 -3 -4 -5 -6 -4>*2")
.note()
```

## Chords and Voicings

### Manual Chord Construction

Define chords explicitly:

```javascript
// Basic triads using intervals from root
note("<[0,4,7] [0,3,7] [0,3,6] [0,4,8]>".add("60"))
// Major    Minor    Dim      Aug

// With note names
note("<[c3,e3,g3] [f3,a3,c4]>")
```

### Common Triad Types

| Type | Intervals | Example |
|------|-----------|---------|
| Major | 0,4,7 | C major = C,E,G |
| Minor | 0,3,7 | C minor = C,Eb,G |
| Diminished | 0,3,6 | C dim = C,Eb,Gb |
| Augmented | 0,4,8 | C aug = C,E,G# |

### Chord Symbols

Use standard chord symbols with automatic voicing:

```javascript
// Basic chord symbols
chord("<C Am F G>").voicing()

// Complex jazz chords
chord("<C^7 A7b13 Dm7 G7>*2").voicing()
```

### Chord Symbol Reference

**Basic Chords:**
- `C` - Major triad
- `Cm` or `C-` - Minor triad
- `C7` - Dominant 7th
- `C^7` or `CM7` - Major 7th
- `Cm7` or `C-7` - Minor 7th

**Extended Chords:**
- `C9`, `C11`, `C13` - Extended dominants
- `C^9`, `C^11`, `C^13` - Extended majors
- `Cm9`, `Cm11` - Extended minors
- `C6`, `Cm6` - Added 6th chords

**Altered Chords:**
- `C7#5`, `C7b5` - Altered 5th
- `C7#9`, `C7b9` - Altered 9th
- `C7#11` - Sharp 11th
- `C7alt` - Altered dominant

### Voicing Controls

**Anchor - Reference point for voicing placement:**
```javascript
anchor("<c4 g4 c5 g5>").chord("C").voicing()
```

**Mode - How voicing relates to anchor:**
```javascript
mode("<below above duck root>").chord("C").anchor("c5").voicing()
```

- `below`: Top note ≤ anchor (default)
- `above`: Bottom note ≥ anchor
- `duck`: Top note < anchor
- `root`: Bottom note = root near anchor

**Note Selection - Pick specific chord tones:**
```javascript
n("0 3 1 2").chord("<C <Fm Db>>").voicing()
```

### Custom Voicing Dictionaries

Create your own chord voicings:

```javascript
addVoicings('jazz', {
  '': ['3M 7M 9M 12P 15P', '7M 10M 13M 16M 19P'],      // Major
  '7': ['3M 7m 9M 12P 15P', '7m 10M 13M 16M 19P'],     // Dominant
  'm7': ['8P 11P 14m 17m 19P', '5P 8P 11P 14m 17m'],   // Minor 7
  'm7b5': ['3m 5d 8P 11P 14m', '5d 8P 11P 14m 17m'],   // Half-diminished
}, ['C3', 'C6'])

"<C^7 A7 Dm7 G7>".voicings('jazz').note()
```

### Root Notes and Bass Lines

Extract root notes from chord symbols:

```javascript
// Create bass line from chord progression
"<C^7 A7b13 Dm7 G7>*2".rootNotes(3).note()

// Combined with voicings for complete arrangement
"<C^7 A7b13 Dm7 G7>*2".layer(
  x=>x.voicings('lefthand').struct("[~ x]*2").note(),  // Chords
  x=>x.rootNotes(2).note().s('sawtooth').cutoff(800)   // Bass
)
```

## Advanced Harmonic Concepts

### Voice Leading

Create smooth chord progressions by minimizing movement between voices:

```javascript
// Good voice leading - notes move smoothly
note(`<
[0,3,7] [7,12,16] [0,7,16] [4,7,12]
[0,3,7] [4,7,12] [0,3,7] [4,7,12]
>`.add(`<
a c d f
a e a e
>`))
```

The `voicing()` function automatically creates good voice leading.

### Chord Inversions

Same chord with different bass notes:

```javascript
// C major in different inversions
note("<[c3,e3,g3] [e3,g3,c4] [g3,c4,e4]>")
// Root position, 1st inversion, 2nd inversion
```

### Modal Harmony

Use different modes for varied harmonic colors:

```javascript
// Same root, different modes
n("0 1 2 3 4 5 6 7")
.scale("C:<ionian dorian phrygian lydian mixolydian aeolian locrian>")
```

## Practical Harmonic Patterns

### Jazz ii-V-I Progression

```javascript
let progression = chord("<Dm7 G7 C^7 C^7>")
$: progression.voicing().struct("[~ x]*2")     // Comping
$: progression.rootNotes(2).note().s('bass')   // Walking bass
$: n("0 2 4 5").set(progression).voicing()     // Melody
```

### Blues Changes

```javascript
chord(`<
F7 Bb7 F7 [Cm7 F7]
Bb7 Bo F7 [Am7 D7]
Gm7 C7 [F7 D7] [Gm7 C7]
>`).voicing()
```

### Circle of Fifths

```javascript
// Moving through keys
chord("<C G D A E B F# Db Ab Eb Bb F>").voicing()
```

### Secondary Dominants

```javascript
// V/V - V - I (five of five)
chord("<D7 G7 C>").voicing()
```

## Parameter Modification

### Numeric Operations

Transform pitch values mathematically:

```javascript
// Addition/subtraction
n("0 2 4".add("<0 3 4 0>")).scale("C:major")
note("c3 e3 g3".add("<0 5 7 0>"))  // Add semitones

// Multiplication/division
"<1 1.5 [1.66, <2 2.33>]>*4".mul(150).freq()
ratio("1, 5:4, 3:2").mul(110).freq()  // Just intonation ratios

// Rounding
n("0.5 1.5 2.5".round()).scale("C:major")
n("42 42.1 42.5 43".floor())
n("42 42.1 42.5 43".ceil())
```

### Range Mapping

Convert continuous signals to musical ranges:

```javascript
// Map 0-1 signals to pitch ranges
s("[bd sd]*2,hh*8")
.cutoff(sine.range(500,4000))      // Linear mapping

.cutoff(sine.rangex(500,4000))     // Exponential mapping

// Map -1 to 1 signals
s("[bd sd]*2,hh*8")
.cutoff(sine2.range2(500,4000))
```

## Continuous Signals for Harmony

Use mathematical functions to generate musical content:

```javascript
// Sine wave melodies
n(sine.segment(16).range(0,15))
.scale("C:minor")

// Multiple signals for harmony
n(stack(sine,cosine).segment(16).range(0,15))
.scale("C:minor")

// Perlin noise for organic patterns
n(perlin.segment(8).range(0,7))
.scale("E:minor")
```

## Song Structure with Arrange

Organize sections into complete songs:

```javascript
arrange(
  [4, chord("<Am F C G>").voicing()],     // 4 cycles of verse
  [2, chord("<F G Am Am>").voicing()],    // 2 cycles of chorus
  [4, chord("<Am F C G>").voicing()],     // 4 cycles of verse
  [4, chord("<F G Am C F G Am Am>").voicing()] // 4 cycles of bridge
)
```

## Microtonality and Alternative Tunings

While Strudel primarily uses 12-tone equal temperament, you can explore alternative tunings:

```javascript
// Just intonation ratios
ratio("1 9:8 5:4 4:3 3:2 5:3 15:8 2").mul(220).freq()

// Custom frequency relationships
[1, 1.125, 1.25, 1.333, 1.5, 1.667, 1.875, 2]
.mul(220).freq()
```

## Next Steps

- [Audio and Synthesis](audio_and_synthesis.md) for sound design applications
- [Patterns and Notation](patterns_and_notation.md) for rhythmic harmony
- [Recipes and Examples](recipes_and_examples.md) for practical applications
- [Advanced Features](advanced_features.md) for MIDI and external integration
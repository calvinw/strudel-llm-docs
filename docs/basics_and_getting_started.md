# Strudel Basics and Getting Started

**Generated from:** Strudel LLM Documentation
**Official Website:** https://strudel.cc

This document covers the fundamental concepts for getting started with Strudel, a music live coding environment for the browser that ports the TidalCycles pattern language to JavaScript.

## What is Strudel?

Strudel is a live coding environment that allows you to:
- Make music with code in real time
- Create algorithmic compositions
- Learn music and programming together
- Integrate with music setups via MIDI or OSC

## Getting Started

The best way to start learning Strudel is through the workshop. Begin with your [first sounds](https://strudel.cc/workshop/first-sounds/).

No prior JavaScript or Tidal Cycles knowledge is required - Strudel has a low barrier to entry while remaining powerful and expressive.

## First Sounds

### Code Fields and Basic Usage

Interactive code fields are the heart of Strudel. Here's how to use them:

```
sound("casio")
```

**Usage:**
1. Click into the text field
2. Press `ctrl` + `enter` to play
3. Change `casio` to `metal`
4. Press `ctrl` + `enter` to update
5. Press `ctrl` + `.` to stop

Congratulations, you are now live coding!

### Basic Sounds

Play sounds using the `sound()` function:

```
sound("casio")
```

Try out different standard sounds:
```
insect wind jazz metal east crow casio space numbers
```

**Sample Selection with :**

One sound can contain multiple samples. Select them with `:number`:

```
sound("casio:1")
```

Not adding a number is like doing `:0`.

### Drum Sounds

Strudel comes with drum sounds using standard abbreviations:

```
sound("bd hh sd oh")
```

**Drum Sound Reference:**
- `bd` = **b**ass **d**rum
- `sd` = **s**nare **d**rum
- `rim` = **rim** shot
- `hh` = **h**i **h**at
- `oh` = **o**pen **h**ihat
- `lt` = **l**ow tom
- `mt` = **m**iddle tom
- `ht` = **h**igh tom
- `rd` = **r**i**d**e cymbal
- `cr` = **cr**ash cymbal

**Drum Machine Banks:**

Change drum character with `bank()`:

```
sound("bd hh sd oh").bank("RolandTR909")
```

Available banks:
- `AkaiLinn`
- `RhythmAce`
- `RolandTR808`
- `RolandTR707`
- `RolandTR909`
- `ViscoSpaceDrum`

### Basic Sequences

Play multiple sounds by separating with spaces:

```
sound("bd hh sd hh")
```

**Key Sequence Concepts:**

**Longer sequences run faster:**
```
sound("bd bd hh bd rim bd hh bd")
```

**One per cycle with `< .. >`:**
```
sound("<bd bd hh bd rim bd hh bd>")
```

**Speed control with `*`:**
```
sound("<bd bd hh bd rim bd hh bd>*8")
```

**Tempo control:**
```
setcpm(90/4)
sound("<bd hh rim hh>*8")
```
- cpm = cycles per minute
- Default: 30 cycles per minute = 1 cycle every 2 seconds

**Rests with `-` or `~`:**
```
sound("bd hh - rim - bd hh rim")
```

**Sub-sequences with `[]`:**
```
sound("bd [hh hh] sd [hh bd] bd - [hh sd] cp")
```

**Speed multiplication:**
```
sound("bd hh*2 rim hh*3 bd [- hh*2] rim hh*2")
```

**Parallel sequences with `,`:**
```
sound("hh hh hh, bd casio")
```

**Multiple lines with backticks:**
```
sound(`bd*2, - cp,
- - - oh, hh*4,
[- casio]*2`)
```

**Sample number selection with `n()`:**
```
n("0 1 [4 2] 3*2").sound("jazz")
```

This is equivalent to:
```
sound("jazz:0 jazz:1 [jazz:4 jazz:2] jazz:3*2")
```

## First Notes

### Numbers and Note Names

**Play notes with numbers (MIDI values):**
```
note("48 52 55 59").sound("piano")
```

**Play notes with letters:**
```
note("c e g b").sound("piano")
```

Available letters: a through g

**Add flats or sharps for black keys:**
```
note("db eb gb ab bb").sound("piano")
```

**Octave numbers:**
```
note("c2 e3 g4 b5").sound("piano")
```

### Changing Sounds

**Different synthesizer sounds:**
```
note("c e g b").sound("sawtooth")
```

Available basic waveforms:
- `sine`
- `sawtooth`
- `square`
- `triangle`

**Different sample banks:**
```
note("c e g b").sound("gm_acoustic_guitar_nylon")
```

### Scales

**Using scales:**
```
n("0 2 4 6").scale("C:major").sound("piano")
```

**Different scale types:**
```
n("0 1 2 3 4 5 6 7").scale("C:minor").sound("piano")
```

## Basic Mini-Notation Reference

| Concept | Syntax | Example |
|---------|--------|---------|
| Sequence | space | `sound("bd bd sd hh")` |
| Sample Number | :x | `sound("hh:0 hh:1 hh:2 hh:3")` |
| Rests | - or ~ | `sound("metal - jazz jazz:1")` |
| Alternate | <> | `sound("<bd hh rim oh bd rim>")` |
| Sub-Sequences | [] | `sound("bd wind [metal jazz] hh")` |
| Sub-Sub-Sequences | [[]] | `sound("bd [metal [jazz [sd cp]]]")` |
| Speed up | * | `sound("bd sd*2 cp*3")` |
| Parallel | , | `sound("bd*2, hh*2 [hh oh]")` |

## Core Functions Reference

| Name | Description | Example |
|------|-------------|---------|
| sound | plays the sound of the given name | `sound("bd sd [- bd] sd")` |
| note | plays notes by name or number | `note("c e g b").sound("piano")` |
| n | select sample number or scale degree | `n("0 1 4 2").sound("jazz")` |
| bank | selects the sound bank | `sound("bd sd").bank("RolandTR909")` |
| scale | applies musical scale | `n("0 2 4 6").scale("C:major")` |
| setcpm | sets tempo in cycles per minute | `setcpm(45)` |

## Example Patterns

**Basic rock beat:**
```
setcpm(100/4)
sound("[bd sd]*2, hh*8").bank("RolandTR505")
```

**Classic house:**
```
sound("bd*4, [- cp]*2, [- hh]*4").bank("RolandTR909")
```

**We Will Rock You:**
```
setcpm(81/2)
sound("bd*2 cp").bank("RolandTR707")
```

## Basic Effects

**Low-pass filter (lpf):**
```
note("c2 c3 c2 c3").sound("sawtooth").lpf(800)
```

**Vowel filter:**
```
note("c3 eb3 g3").sound("sawtooth").vowel("<a e i o>")
```

**Gain (volume):**
```
sound("hh*16").gain("[.25 1]*4")
```

**Delay:**
```
sound("bd rim").delay(.5)
```

**Reverb (room):**
```
sound("bd rim").room(.5)
```

**Panning:**
```
sound("bd rim bd cp").pan("0 1")
```

**Speed/pitch:**
```
sound("bd rim bd cp").speed("<1 2 -1 -2>")
```

## Next Steps

After mastering these basics, explore:
- [Pattern Effects](patterns_and_notation.md) for advanced pattern manipulation
- [Audio and Synthesis](audio_and_synthesis.md) for sound design
- [Musical Theory](musical_theory.md) for scales and chords
- [Recipes and Examples](recipes_and_examples.md) for practical applications
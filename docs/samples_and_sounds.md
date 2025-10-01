# Strudel Samples and Sounds

**Generated from:** Strudel LLM Documentation

This document covers working with audio samples in Strudel, including loading, manipulating, and processing samples.

## What are Samples?

Samples are short pieces of audio used as the basis for sound generation. Music based on samples can be thought of as a sound collage. Strudel allows loading samples from various audio formats (wav, mp3, ogg) from any publicly available URL.

## Default Samples

Strudel comes with built-in sample maps providing a solid foundation for music making.

### Drum Sounds

Strudel uses the comprehensive [tidal-drum-machines](https://github.com/ritchse/tidal-drum-machines) library with standard abbreviations:

| Drum Type | Abbreviation | Example |
|-----------|--------------|---------|
| Bass drum, Kick drum | bd | `s("bd")` |
| Snare drum | sd | `s("sd")` |
| Rimshot | rim | `s("rim")` |
| Clap | cp | `s("cp")` |
| Closed hi-hat | hh | `s("hh")` |
| Open hi-hat | oh | `s("oh")` |
| Crash | cr | `s("cr")` |
| Ride | rd | `s("rd")` |
| High tom | ht | `s("ht")` |
| Medium tom | mt | `s("mt")` |
| Low tom | lt | `s("lt")` |

### Additional Percussion

| Source | Abbreviation | Example |
|--------|--------------|---------|
| Shakers, maracas | sh | `s("sh")` |
| Cowbell | cb | `s("cb")` |
| Tambourine | tb | `s("tb")` |
| Other percussions | perc | `s("perc")` |
| Miscellaneous | misc | `s("misc")` |
| Effects | fx | `s("fx")` |

### Basic Usage

```javascript
// Basic drum pattern
s("bd sd [~ bd] sd,hh*16")

// Using multiple sample types
s("bd sd [~ bd] sd,hh*16, misc")
```

## Sound Banks

### Using Bank Names

Instead of writing full sample names like `RolandTR808_bd`, use the `bank()` function:

```javascript
// Long way (avoid this)
s("RolandTR808_bd RolandTR808_sd,RolandTR808_hh*16")

// Short way with bank()
s("bd sd,hh*16").bank("RolandTR808")

// Pattern different banks
s("bd sd,hh*16").bank("<RolandTR808 RolandTR909>")
```

Available drum machine banks include:
- `RolandTR808`
- `RolandTR909`
- `RolandTR707`
- `AkaiLinn`
- `RhythmAce`
- `ViscoSpaceDrum`

## Selecting Sample Variants

### Using the `n()` Function

Most sample banks contain multiple variants. Select them with `n()`:

```javascript
// Select different hihat samples (0-3)
s("hh*8").bank("RolandTR909").n("0 1 2 3")

// Numbers wrap around - these play the same sounds
s("hh*8").bank("RolandTR909").n("0 1 2 3 4 5 6 7")
```

### Using Colon Notation in Mini-Notation

```javascript
// Select samples directly in the pattern
s("bd*4,hh:0 hh:1 hh:2 hh:3 hh:4 hh:5 hh:6 hh:7")
.bank("RolandTR909")
```

## Loading Custom Samples

### From Direct URLs

Define custom sample mappings with specific audio file URLs:

```javascript
samples({
  bassdrum: 'bd/BT0AADA.wav',
  hihat: 'hh27/000_hh27closedhh.wav',
  snaredrum: ['sd/rytm-01-classic.wav', 'sd/rytm-00-hard.wav'], // Multiple files
}, 'https://raw.githubusercontent.com/tidalcycles/Dirt-Samples/master/');

s("bassdrum snaredrum:0 bassdrum snaredrum:1, hihat*16")
```

### From strudel.json Files

Load sample mappings from JSON files:

```javascript
samples('https://raw.githubusercontent.com/tidalcycles/Dirt-Samples/master/strudel.json')
s("bd sd bd sd,hh*16")
```

**strudel.json format:**
```json
{
  "_base": "https://raw.githubusercontent.com/tidalcycles/Dirt-Samples/master/",
  "bassdrum": "bd/BT0AADA.wav",
  "snaredrum": "sd/rytm-01-classic.wav",
  "hihat": "hh27/000_hh27closedhh.wav"
}
```

**Cache busting:** Force browser to reload updated JSON:
```javascript
samples('https://example.com/strudel.json?version=2');
```

### GitHub Shortcut

```javascript
samples('github:tidalcycles/dirt-samples')
s("bd sd bd sd,hh*16")

// With specific branch
samples('github:user/repo/branch')
```

### From Local Disk

**Method 1: Import Sounds Folder**
1. Go to `sounds` tab in REPL
2. Open `import-sounds` tab
3. Press "import sounds folder" button
4. Select folder containing audio files

**Method 2: @strudel/sampler**
```bash
cd samples
npx @strudel/sampler
```

Then load in Strudel:
```javascript
samples('http://localhost:5432/');
n("<0 1 2>").s("swoop smash")
```

### Generating strudel.json

Create a strudel.json file automatically:
```bash
npx --yes @strudel/sampler --json > strudel.json
```

## Pitched Samples

### Specifying Base Pitch

Make samples play in tune when using `note()`:

```javascript
samples({
  'gtr': 'gtr/0001_cleanC.wav',
  'moog': { 'g3': 'moog/005_Mighty%20Moog%20G3.wav' },
}, 'github:tidalcycles/dirt-samples');

note("g3 [bb3 c4] <g4 f4 eb4 f3>@2").s("gtr,moog").clip(1)
```

### Multi-Sample Instruments

Define different samples for different pitch ranges:

```javascript
samples({
  'moog': {
    'g2': 'moog/004_Mighty%20Moog%20G2.wav',
    'g3': 'moog/005_Mighty%20Moog%20G3.wav',
    'g4': 'moog/006_Mighty%20Moog%20G4.wav',
  }
}, 'github:tidalcycles/dirt-samples')

note("g2!2 <bb2 c3>!2, <c4@3 [<eb4 bb3> g4 f4]>")
.s('moog').clip(1)
```

The sampler automatically picks the closest matching sample for each note.

## Shabda Integration

### Freesound.org Samples

Query samples from freesound.org:

```javascript
samples('shabda:bass:4,hihat:4,rimshot:2')

$: n("0 1 2 3 0 1 2 3").s('bass')
$: n("0 1*2 2 3*2").s('hihat').clip(1)
$: n("~ 0 ~ 1 ~ 0 0 1").s('rimshot')
```

### Text-to-Speech

Generate speech samples:

```javascript
// Default English (British), female voice
samples('shabda/speech:the_drum,forever')

// Specific language and gender
samples('shabda/speech/fr-FR/m:magnifique')

$: s("the_drum*2").chop(16).speed(rand.range(0.85,1.1))
$: s("forever magnifique").slow(4).late(0.125)
```

## Sampler Effects

### Playback Control

**Begin/End - Trim samples:**
```javascript
// Skip first quarter of sample
s("rave").begin("<0 .25 .5 .75>")

// Cut off end of sample
s("bd*2,oh*4").end("<.1 .2 .5 1>")
```

**Speed - Change pitch and tempo:**
```javascript
s("bd*6").speed("1 2 4 1 -2 -4")  // Negative = reverse
speed("1 1.5*2 [2 1.1]").s("piano").clip(1)
```

**Clip - Control duration:**
```javascript
note("c a f e").s("piano").clip("<.5 1 2>")  // .5=half, 2=double duration
```

### Looping

**Basic looping:**
```javascript
s("casio").loop(1)  // Loop entire sample
```

**Loop regions:**
```javascript
s("space").loop(1)
.loopBegin("<0 .125 .25>")    // Start loop point
.loopEnd("<1 .75 .5 .25>")    // End loop point
```

**Fit to cycles:**
```javascript
// Make sample fit exactly 2 cycles
s("rhodes").loopAt(2)

// Make sample fit its event duration
s("rhodes/2").fit()
```

### Granular Manipulation

**Chop - Cut into equal parts:**
```javascript
s("rhodes")
.chop(4)      // Cut into 4 parts
.rev()        // Reverse order of chops
.loopAt(2)    // Fit into 2 cycles
```

**Striate - Progressive portions:**
```javascript
s("numbers:0 numbers:1 numbers:2").striate(6).slow(3)
```

**Slice - Trigger specific parts:**
```javascript
// Cut into 8 slices, trigger with pattern
s("breaks165").slice(8,"0 1 <2 2*2> 3 [4 0] 5 6 7".every(3,rev))

// Slice at specific points
s("breaks125").fit().slice([0,.25,.5,.75],"0 1 1 <2 3>")
```

**Splice - Speed-matched slicing:**
```javascript
s("breaks165")
.splice(8, "0 1 [2 3 0]@2 3 0@2 7")  // Matches slice speed to step duration
```

**Scrub - Tape-style manipulation:**
```javascript
// position:speed notation
s("swpad:0").scrub("{0.1!2 .25@3 0.7!2 <0.8:1.5>}%8")

// Scrub breakbeats
s("amen/4").fit().scrub("{0@3 0@2 4@3}%8".div(16))
```

### Cut Groups

Stop playing samples when new ones in the same group trigger:

```javascript
s("[oh hh]*4").cut(1)  // Open hihat cuts off when closed hihat plays
```

This mimics classic drum machine behavior where open and closed hihats can't play simultaneously.

## Continuous Signals for Sample Control

Use continuous signals to modulate sample parameters:

```javascript
// Random cutoff modulation
s("bd*4,hh*8").cutoff(rand.range(500,8000))

// Sawtooth wave clipping
note("<c3 [eb3,g3] g2 [g3,bb3]>*8")
.clip(saw.slow(2))

// Sine wave note patterns
n(sine.segment(16).range(0,15))
.scale("C:minor")
```

### Available Continuous Signals

| Signal | Range | Description |
|--------|-------|-------------|
| `saw` | 0-1 | Sawtooth wave |
| `sine` | 0-1 | Sine wave |
| `cosine` | 0-1 | Cosine wave |
| `tri` | 0-1 | Triangle wave |
| `square` | 0-1 | Square wave |
| `rand` | 0-1 | Random values |
| `perlin` | 0-1 | Smooth noise |

All have `-1 to 1` variants: `saw2`, `sine2`, `cosine2`, `tri2`, `square2`, `rand2`

## Sample Organization Tips

1. **Use descriptive names** for custom samples
2. **Organize by type** (drums, bass, melody, fx)
3. **Specify pitch** for melodic samples
4. **Use consistent folder structure** for @strudel/sampler
5. **Test sample timing** with different BPMs
6. **Consider sample length** vs. pattern cycle length

## Performance Considerations

- Samples are **lazy loaded** (only when first played)
- First playback may have slight delay while loading
- Browser caching affects reload behavior
- Large samples increase memory usage
- Use appropriate sample rate/quality for context

## Next Steps

- [Audio and Synthesis](audio_and_synthesis.md) for effects and processing
- [Musical Theory](musical_theory.md) for harmonic and melodic concepts
- [Patterns and Notation](patterns_and_notation.md) for rhythmic manipulation
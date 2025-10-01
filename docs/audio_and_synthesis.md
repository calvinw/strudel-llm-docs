# Strudel Audio Effects and Synthesis

**Generated from:** Strudel LLM Documentation

This document covers Strudel's audio effects system, synthesis capabilities, and signal processing chain.

## Signal Chain Overview

Strudel processes audio through a specific signal chain. Understanding this order helps in crafting effective sounds:

1. **Sound Generation** - Samples or oscillators produce the initial sound
2. **Detune Effects** - Pitch-based effects like `detune`, `penv`
3. **Gain & ADSR** - Volume envelope processing
4. **Filters** - In order: lpf → hpf → bandpass → vowel
5. **Sample Processing** - coarse → crush → shape → distort
6. **Modulation** - tremolo → compressor → panning → phaser
7. **Post Gain** - Final volume adjustment
8. **Sends** - Split to delay, reverb, and dry output
9. **Orbits** - Routing and final mixing

**Important:** Effects are single-use per pattern. You cannot chain multiple instances of the same effect (e.g., `.lpf(100).distort(2).lpf(800)` won't work as expected).

## Synthesis

### Basic Waveforms

Strudel includes four basic oscillator waveforms:

```javascript
note("c2 <eb2 <g2 g1>>".fast(2))
.sound("<sawtooth square triangle sine>")
```

- `sine` - Pure tone, fundamental frequency only
- `sawtooth` - Bright, harmonically rich
- `square` - Hollow, odd harmonics only
- `triangle` - Warm, soft harmonics (default for `note()`)

### Noise Types

Use noise as sound sources:

```javascript
sound("<white pink brown>")  // Different noise colors
```

- `white` - Full spectrum, harsh
- `pink` - Warmer, more musical
- `brown` - Softest, lowest frequency emphasis

**Noise in Musical Context:**
```javascript
// Noise hihats
sound("bd*2,<white pink brown>*8")
.decay(.04).sustain(0)

// Add noise to oscillators
note("c3").noise("<0.1 0.25 0.5>")

// Crackle effects
s("crackle*4").density("<0.01 0.04 0.2 0.5>")
```

### Additive Synthesis

Limit harmonics with the `n` parameter:

```javascript
note("c2 <eb2 <g2 g1>>".fast(2))
.sound("sawtooth")
.n("<32 16 8 4>")  // Number of harmonic partials
```

Can also be used in mini-notation:
```javascript
note("c2 <eb2 <g2 g1>>".fast(2))
.sound("sawtooth:<32 16 8 4>")
```

### FM Synthesis

Frequency Modulation creates complex timbres by modulating one oscillator with another:

```javascript
// Basic FM brightness control
note("c e g b g e")
.fm("<0 1 2 8 32>")  // Modulation index

// Harmonicity ratio (timbre)
note("c e g b g e")
.fm(4)
.fmh("<1 2 1.5 1.61>")  // Whole numbers = natural, decimals = metallic

// FM envelope controls
note("c e g b g e")
.fm(4)
.fmattack("<0 .05 .1 .2>")   // Attack time
.fmdecay("<.01 .05 .1 .2>")  // Decay time
.fmsustain("<1 .75 .5 0>")   // Sustain level
.fmenv("<exp lin>")          // Envelope curve
```

### Vibrato

Add pitch modulation:

```javascript
// Basic vibrato
note("a e")
.vib("<.5 1 2 4 8 16>")  // Vibrato frequency in Hz

// Control depth with colon notation
note("a e")
.vib("<.5 1 2 4 8 16>:12")  // 12 semitones depth

// Or use separate depth control
note("a e").vib(4)
.vibmod("<.25 .5 1 2 12>")  // Depth in semitones
```

### Wavetable Synthesis

Use custom waveforms from the AKWF wavetable collection:

```javascript
samples('bubo:waveforms');
note("<[g3,b3,e4]!2 [a3,c3,e4] [b3,d3,f#4]>")
.n("<1 2 3 4 5 6 7 8 9 10>/2")
.s('wt_flute')  // Any sample with 'wt_' prefix becomes wavetable
.release(0.125).decay(0.25).sustain(0)
```

### ZZFX Synthesis

Integrated "Zuper Zmall Zound Zynth" for retro game-style sounds:

```javascript
note("c2 eb2 f2 g2")
.s("z_sawtooth")  // z_ prefix for ZZFX
.zrand(0)         // Randomization
.curve(1)         // Waveshape 1-3
.slide(0)         // Pitch slide
.noise(0)         // Dirt/grit
.zmod(0)          // FM speed
.zcrush(0)        // Bit crush 0-1
.zdelay(0)        // Simple delay
.pitchJump(0)     // Pitch change
.lfo(0)           // LFO speed
.tremolo(0)       // Volume modulation
```

## Filters

Filters shape frequency content through subtractive synthesis:

### Low-Pass Filter (lpf)
Allows low frequencies to pass, cuts high frequencies:

```javascript
s("bd sd [~ bd] sd,hh*6").lpf("<4000 2000 1000 500 200 100>")

// With Q-factor (resonance) using colon notation
s("bd*16").lpf("1000:0 1000:10 1000:20 1000:30")

// Or separate Q control
s("bd sd [~ bd] sd,hh*8").lpf(2000).lpq("<0 10 20 30>")
```

### High-Pass Filter (hpf)
Allows high frequencies to pass, cuts low frequencies:

```javascript
s("bd sd [~ bd] sd,hh*8").hpf("<4000 2000 1000 500 200 100>")

// With Q-factor
s("bd sd [~ bd] sd,hh*8").hpf("<2000 2000:25>")
s("bd sd [~ bd] sd,hh*8").hpf(2000).hpq("<0 10 20 30>")
```

### Band-Pass Filter (bpf)
Only allows a specific frequency band to pass:

```javascript
s("bd sd [~ bd] sd,hh*6").bpf("<1000 2000 4000 8000>")

// With Q-factor
s("bd sd [~ bd] sd").bpf(500).bpq("<0 1 2 3>")
```

### Filter Types
Control filter character:

```javascript
note("c f g g a c d4").fast(2)
.sound('sawtooth')
.lpf(200)
.ftype("<0 1 2>")  // 0=12db, 1=ladder, 2=24db
.lpq(1)
```

### Vowel Filter
Formant filter for vocal sounds:

```javascript
note("[c2 <eb2 <g2 g1>>]*2").s('sawtooth')
.vowel("<a e i <o u>>")  // Available: a e i o u ae aa oe ue y uh un en an on

s("bd sd mt ht bd [~ cp] ht lt").vowel("[a|e|i|o|u]")
```

## Amplitude Processing

### ADSR Envelope
Controls volume over time:

```javascript
// Individual parameters
note("c3 e3 f3 g3")
.attack("<0 .1 .5>")     // Time to reach peak
.decay("<.1 .2 .3 .4>")  // Time to reach sustain level
.sustain("<0 .1 .4 .6>") // Hold level (0-1)
.release("<0 .1 .4 .6>") // Time to fade to zero

// Combined ADSR notation
note("[c3 bb2 f3 eb3]*2").sound("sawtooth")
.adsr(".1:.1:.5:.2")  // attack:decay:sustain:release
```

### Amplitude Modulation (Tremolo)
Periodic volume changes:

```javascript
// Sync tremolo to cycles
note("d d d# d".fast(4)).s("supersaw")
.tremolosync("4")           // Speed in cycles
.tremolodepth("<1 2 .7>")   // Modulation depth
.tremoloskew("<.5 0 1>")    // Waveform shape
.tremolophase("<0 .25 .66>") // Phase offset
.tremoloshape("<sine tri square>") // Waveform type
```

### Gain Control
Volume and dynamics:

```javascript
sound("hh*16").gain("[.25 1]*4")  // Pattern-based volume
note("c3 e3 g3").velocity(0.5)    // MIDI-style velocity
note("c3 e3 g3").postgain(1.5)    // Post-processing gain
```

## Filter Envelopes

Apply ADSR envelopes to filter cutoff:

```javascript
note("[c eb g <f bb>](3,8,<0 1>)".sub(12))
.s("sawtooth")
.lpf(1000)
.lpattack(0.005)    // Filter envelope attack
.lpdecay(0.1)       // Filter envelope decay
.lpsustain(0.5)     // Filter envelope sustain
.lprelease(0.2)     // Filter envelope release
.lpenv(4)           // Envelope depth/amount
```

## Distortion & Waveshaping

### Bit Manipulation
```javascript
s("bd sd").coarse("<1 2 4 8 16>")  // Sample rate reduction
s("bd sd").crush("<1 2 4 8 16>")   // Bit depth reduction
```

### Distortion
```javascript
s("bd sd").shape("<0 .2 .4 .6 .8>")   // Waveshape distortion (subtle)
s("bd sd").distort("<0 .2 .4 .6 .8>") // Normal distortion (aggressive)
```

## Global Effects (Sends)

### Delay
```javascript
s("bd rim").delay(.5)              // Simple delay amount
s("bd rim").delay(".8:.125")       // delay:time
s("bd rim").delay(".8:.06:.8")     // delay:time:feedback

// Individual controls
s("bd rim")
.delay(0.5)       // Amount sent to delay
.delaytime(0.125) // Delay time
.delayfeedback(0.8) // Feedback amount
```

### Reverb (Room)
```javascript
s("bd rim").room(.5)              // Simple reverb amount

// Advanced reverb controls
s("bd rim")
.room(0.5)        // Amount sent to reverb
.roomsize(10)     // Room size
.roomfade(0.8)    // Decay time
.roomlp(4000)     // High-frequency damping
.roomdim(0.8)     // Stereo width
```

### Phaser
```javascript
s("bd sd")
.phaser(0.5)         // Phaser amount
.phaserdepth(1)      // Modulation depth
.phasercenter(1000)  // Center frequency
.phasersweep(0.5)    // Sweep rate
```

## Spatial Effects

### Panning
```javascript
sound("bd rim bd cp").pan("0 1")     // Pan across stereo field
sound("bd rim bd cp").pan("<0 .5 1>") // Pattern panning

// Jux - split stereo with effect on right channel
n("0 2 4 6").scale("C:minor").jux(rev) // Reverse on right
```

### Ducking
Volume compression triggered by other patterns:

```javascript
s("bd*4").orbit(1)                    // Trigger pattern
s("pad").duckorbit(1)                 // Ducked pattern
.duckattack(0.01)                     // Duck response time
.duckdepth(0.8)                       // Duck amount
```

## Orbits and Routing

Orbits control signal routing and effects sends:

```javascript
// Default orbit is 1
s("bd sd").orbit(2)           // Route to orbit 2
s("white").orbit("2,3,4")     // Send to multiple orbits (triples volume!)

// Prevent orbit conflicts
$: s("triangle*4").room(1).roomsize(10).orbit(2)  // Dedicated orbit
$: s("bd*4").room(0.01).roomsize(0.01)            // Default orbit
```

## Continuous vs Event-Based Effects

Some effects only update on sound events, others are continuous:

**Event-Based (sampled on note trigger):**
- Most filters and modulation effects
- Requires more events for smooth changes: `.seg(16)`

**Continuous:**
- ADSR envelopes
- Pitch envelopes (penv)
- Filter envelopes (lpenv, hpenv, bpenv)
- FM envelopes (fmenv)
- Tremolo, phaser, vibrato
- Ducking

## Practical Examples

### Classic Acid Bass
```javascript
n("0 3 7 5".slow(2))
.scale("A:minor")
.s("sawtooth")
.lpf(sine.range(200, 2000).slow(4))
.lpq(10)
.lpenv(3)
.shape(0.3)
```

### Lush Pad
```javascript
stack(
  n("0 2 4 6").s("sine").attack(2).release(3),
  n("0 2 4 6".add(7)).s("sine").attack(2.5).release(3.5).gain(0.7)
)
.scale("C:major")
.room(0.8).roomsize(5)
.lpf(2000)
```

### Retro Pluck
```javascript
n("0 2 4 7 5 4 2 0")
.scale("E:minor")
.s("triangle")
.decay(0.3).sustain(0)
.lpf(1200).lpenv(2)
.room(0.3)
```

## Next Steps

- [Samples and Sounds](samples_and_sounds.md) for working with audio files
- [Musical Theory](musical_theory.md) for scales and harmony
- [Advanced Features](advanced_features.md) for MIDI, OSC, and motion control
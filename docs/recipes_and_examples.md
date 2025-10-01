# Strudel Recipes and Examples

**Generated from:** Strudel LLM Documentation

This document provides practical recipes and examples for common musical patterns and techniques in Strudel.

## Arpeggios

Play chord notes in sequence using various approaches.

### Manual Note Definition
```javascript
note("c eb g c4")
.clip(2).s("gm_electric_guitar_clean")
```

### Using Scales
```javascript
n("0 2 4 7").scale("C:minor")
.clip(2).s("gm_electric_guitar_clean")
```

### Using Chord Symbols
```javascript
n("0 1 2 3").chord("Cm").mode("above:c3").voicing()
.clip(2).s("gm_electric_guitar_clean")
```

### Using Off Function
```javascript
"0"
.off(1/3, add(2))
.off(1/2, add(4))
.n()
.scale("C:minor")
.s("gm_electric_guitar_clean")
```

## Break Chopping and Manipulation

Transform drum breaks and loops into new patterns.

### Basic Sample Chopping
```javascript
samples('github:yaxu/clean-breaks')
s("amen/4").fit().chop(32)  // Fit into cycles and chop into 32 pieces
```

### Advanced Break Manipulation
```javascript
samples('github:yaxu/clean-breaks')
s("amen/4").fit().chop(16).cut(1)
.sometimesBy(.5, ply("2"))           // 50% chance to double
.sometimesBy(.25, mul(speed("-1")))  // 25% chance to reverse
```

### Controlled Slice Order
```javascript
samples('github:yaxu/clean-breaks')
s("amen/4").fit()
.slice(8, "<0 1 2 3 4*2 5 6 [6 7]>*2")
.cut(1).rarely(ply("2"))
```

### Speed-Matched Splicing
```javascript
samples('github:yaxu/clean-breaks')
s("amen")
.splice(8, "<0 1 2 3 4*2 5 6 [6 7]>*2")
.cut(1).rarely(ply("2"))
```

## Filter Envelopes

Create movement and expression using filter automation.

### Basic Filter Envelope
```javascript
note("g1 bb1 <c2 eb2> d2")
.s("sawtooth")
.lpf(400).lpenv(4)  // Filter moves with note envelope
```

### Attack-Based Filter
```javascript
note("g1 bb1 <c2 eb2> d2")
.s("sawtooth").lpq(8)
.lpf(400).lpa(.2).lpenv(4)  // Filter attacks rather than decays
```

### Attack and Decay Filter
```javascript
note("g1 bb1 <c2 eb2> d2")
.s("sawtooth").lpq(8)
.lpf(400).lpa(.1).lpd(.1).lpenv(4)  // Both attack and decay
```

### Complex Filter Envelope
```javascript
note("[c eb g <f bb>](3,8,<0 1>)".sub(12))
.s("sawtooth")
.lpf(sine.range(300,2000).slow(16))
.lpa(0.005)                         // Quick attack
.lpd(perlin.range(.02,.2))          // Variable decay
.lps(perlin.range(0,.5).slow(3))    // Slow sustain changes
.lpq(sine.range(2,10).slow(32))     // Slow resonance changes
.lpenv(perlin.range(1,8).slow(2))   // Variable envelope depth
```

## Sound Layering

Combine multiple sounds for richer textures.

### Simple Layering
```javascript
note("<g1 bb1 d2 f1>")
.s("sawtooth, square")  // Layer sawtooth and square waves
```

### Layering with Gain Control
```javascript
note("<g1 bb1 d2 f1>")
.s("sawtooth, square:0:.5")  // Format: "name:number:gain"
```

### Advanced Layering with Layer Function
```javascript
note("<g1 bb1 d2 f1>").layer(
  x=>x.s("sawtooth").vib(4),          // Sawtooth with vibrato
  x=>x.s("square").add(note(12))      // Square wave one octave up
)
```

### Multi-Voice Chord Layering
```javascript
chord("<Am F C G>").layer(
  x=>x.voicing().struct("[~ x]*2"),          // Chord stabs
  x=>x.rootNotes(2).s("bass"),               // Bass line
  x=>x.n("0 2 4 2").voicing().gain(.7)      // Arpeggio
)
```

## Oscillator Detune and Chorus

Fatten sounds using slight pitch variations.

### Basic Chorus Effect
```javascript
note("<g1 bb1 d2 f1>")
.add(note("0,.1"))      // Add slightly detuned version
.s("sawtooth")
```

### Multi-Voice Detuning
```javascript
note("c3 e3 g3")
.add(note("0, .05, -.05, .1"))  // Multiple detuned voices
.s("sawtooth").gain(.7)
```

### Dynamic Detune with LFO
```javascript
note("c2 f2 g2 bb1")
.add(note(sine.range(-.1,.1).slow(4)))  // LFO-controlled detune
.s("sawtooth")
```

## Rhythmic Patterns

### Polyrhythms
Different tempos playing simultaneously:
```javascript
s("bd*2,hh*3")  // 2 against 3 polyrhythm
s("bd*4, cp*3, hh*5")  // Complex polyrhythm
```

### Polymeter
Different bar lengths at the same tempo:
```javascript
s("<bd rim, hh hh oh>*4")  // Different pattern lengths cycling
```

### Phasing
Same sequence at slightly different tempos:
```javascript
note("<C D G A Bb D C A G D Bb A>*[6,6.1]").piano()
```

### Euclidean Rhythms
```javascript
s("bd(3,8)")    // 3 beats distributed over 8 steps
s("hh(5,8,2)")  // 5 beats over 8 steps, offset by 2
s("cp(7,16)")   // 7 beats over 16 steps
```

## Sample Techniques

### Running Through Sample Banks
```javascript
samples('bubo:fox')
n(run(8)).s("ftabla")  // Play samples 0-7 in sequence

// Account for phrase start position
samples('bubo:fox')
n(run(8)).s("ftabla").early(2/8)

// Add randomness
samples('bubo:fox')
n(run(8)).s("ftabla").early(2/8)
.sometimes(mul(speed("1.5")))
```

### Tape Warble Effect
```javascript
note("<c4 bb f eb>*8")
.add(note(perlin.range(0,.5)))  // Pitch warble using Perlin noise
.clip(2).s("gm_electric_guitar_clean")
```

### Granular Sampling
```javascript
s("space")
.chop(16)                           // Chop into 16 grains
.n(irand(16))                       // Random grain selection
.speed(rand.range(.8,1.2))          // Random speed per grain
.pan(rand)                          // Random panning
```

## Duration Control

### Using Clip
```javascript
note("f ab bb c")
.clip("<2 1 .5 .25>")  // Duration relative to event length
```

### Using Release
```javascript
note("f ab bb c")
.release("<2 1 .5 .25>")  // Smooth fade out in seconds
```

### Using Decay Envelope
```javascript
note("f ab bb c")
.decay("<2 1 .5 .25>")  // Sharp fade out
```

### Sample-Specific Duration
```javascript
s("oh*4").end("<1 .5 .25 .1>")     // Cut sample relative to length
s("oh*4").clip("<1 .5 .25 .1>")    // Cut relative to event duration
s("oh*4").decay("<1 .5 .25 .1>")   // Envelope-based cutting
```

## Wavetable Synthesis

### Basic Wavetable Looping
```javascript
note("<c eb g f>").s("bd").loop(1).loopEnd(.05).gain(.2)
```

### Dedicated Wavetables
```javascript
samples('github:bubobubobubobubo/dough-waveforms')
note("c eb g bb").s("wt_dbass").clip(2)  // wt_ prefix auto-loops
```

### Wavetable Scanning
```javascript
samples('github:bubobubobubobubo/dough-waveforms')
note("c2*8").s("wt_dbass").n(run(8)).fast(2)
```

### Complex Wavetable Processing
```javascript
samples('github:bubobubobubobubo/dough-waveforms')
note("c2*8").s("wt_dbass").n(run(8))
.lpf(perlin.range(100,1000).slow(8))    // Slow filter movement
.lpenv(-3).lpa(.1)                      // Filter envelope
.room(.5).fast(2)                       // Reverb and speed
```

## Complete Song Arrangements

### Jazz Waltz
```javascript
setcpm(120/3)  // 3/4 time feel

// Chord progression
$: chord("<Am7 F^7 G7 C^7>")
   .voicing().struct("x ~ ~")
   .velocity(.7)

// Walking bass
$: chord("<Am7 F^7 G7 C^7>")
   .rootNotes(2).struct("x [~ x] ~")
   .s("bass").decay(.8)

// Melody
$: n("0 4 2 6 4 0")
   .scale("A:minor")
   .slow(2).struct("x ~ [~ x] ~ x ~")
   .s("piano").room(.3)
```

### Electronic Dance Pattern
```javascript
setcpm(128/4)

// Kick and snare
$: s("bd*4, [~ sd]*2")
   .bank("RolandTR909")

// Hi-hats
$: s("hh*8").bank("RolandTR909")
   .gain("[.3 1]*4")
   .lpf(sine.range(2000,8000).slow(8))

// Bass
$: n("0 ~ 3 ~ 0 ~ 5 ~")
   .scale("E:minor")
   .s("sawtooth").oct(2)
   .lpf(800).lpq(5).shape(.3)

// Lead
$: n("7 5 7 9 7 5 3 0")
   .scale("E:minor").slow(2)
   .s("square").oct(5)
   .delay(.25).room(.5)
```

### Ambient Texture
```javascript
setcpm(60/8)

// Pad layers
$: chord("<Am F C G>*0.5")
   .voicing().layer(
     x=>x.s("sine").attack(4).release(4),
     x=>x.add(7).s("triangle").attack(6).release(6).gain(.7),
     x=>x.add(12).s("sine").attack(8).release(8).gain(.5)
   ).room(.8).roomsize(10)

// Sparse melody
$: n("0 ~ ~ 4 ~ ~ 2 ~")
   .scale("A:minor").slow(4)
   .s("sine").oct(6)
   .attack(2).release(4)
   .delay(.5).room(.9)

// Texture sounds
$: s("~ ~ space ~ ~ wind ~")
   .slow(8).gain(.3)
   .lpf(rand.range(100,1000))
   .pan(rand)
```

## Generative Techniques

### Probabilistic Patterns
```javascript
note("c d e f g a b c4")
.sometimesBy(.3, add(7))        // 30% chance to add 7 semitones
.rarely(rev)                    // Rarely reverse
.often(fast(2))                 // Often double speed
.sometimes(ply(2))              // Sometimes repeat notes
```

### Markov-Style Chains
```javascript
let melody = cat(
  "c e g c4",
  "d f a d4",
  "e g b e4",
  "f a c4 f4"
).struct(pick("<x ~, x x ~, x ~ x>"))

melody.scale("C:major").s("piano")
```

### Feedback Loops
```javascript
let pattern = ref()

pattern.set(
  n("0 2 4 6")
  .scale("C:major")
  .superimpose(x=>x.late(.25).add(3))  // Echo with harmony
  .sometimes(x=>x.rev())               // Sometimes reverse
  .fast(sine.range(.5,2).slow(16))     // Slow tempo variation
)
```

## Performance Tips

### Live Coding Techniques
```javascript
// Use descriptive variable names
let chords = chord("<Am F C G>")
let bassline = chords.rootNotes(2)
let melody = n("0 2 4 2").set(chords)

// Build complexity gradually
$: chords.voicing().struct("x")           // Start simple
$: chords.voicing().struct("x ~ ~ ~")     // Add space
$: chords.voicing().struct("[~ x]*2")     // Add rhythm
```

### Smooth Transitions
```javascript
// Fade in/out using gain patterns
.gain(sine.range(0,1).slow(16))

// Gradual filter sweeps
.lpf(saw.range(200,4000).slow(32))

// Crossfade between patterns
stack(
  patternA.gain(sine.range(1,0).slow(16)),
  patternB.gain(sine.range(0,1).slow(16))
)
```

### Error Prevention
```javascript
// Wrap risky operations in try/catch
try {
  risky_pattern().play()
} catch(e) {
  note("c e g").piano()  // Fallback pattern
}

// Use silence for testing
silence.s("bd")  // Test without sound
```

## Integration Examples

### MIDI Controller Integration
```javascript
// Map controller to parameters
let cc = await midiin('Your Controller')
note("c e g b")
.lpf(cc(1).range(200,4000))     // CC 1 controls filter
.room(cc(2).range(0,.8))        // CC 2 controls reverb
.s("sawtooth")
```

### Motion Control
```javascript
enableMotion()

note("0 2 4 6").scale("C:major")
.lpf(gravityY.range(200,2000))    // Tilt device for filter
.delay(accX.range(0,.5))          // Movement for delay
.s("triangle")
```

### Hydra Visuals
```javascript
await initHydra()

// Audio-reactive visuals
$: note("c e g b").s("sine").gain(.5)

osc().scale(()=>a.fft[0]*4+1)      // Scale visuals to audio
.color(()=>a.fft[1], 0.5, 1)      // Color from frequency bins
.out()
```

## Next Steps

Explore combinations of these techniques to create your own unique patterns. Remember that Strudel's strength lies in live manipulation - start simple and build complexity in real-time!

- [Basics and Getting Started](basics_and_getting_started.md) for fundamental concepts
- [Patterns and Notation](patterns_and_notation.md) for rhythm programming
- [Musical Theory](musical_theory.md) for harmonic concepts
- [Advanced Features](advanced_features.md) for external integration
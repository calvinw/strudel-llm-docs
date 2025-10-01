# Strudel Advanced Features

**Generated from:** Strudel LLM Documentation

This document covers Strudel's advanced capabilities including MIDI/OSC integration, device motion controls, Hydra visuals, gamepad input, and external connectivity.

## Device Motion Control

Control musical parameters using mobile device sensors for expressive, movement-based interactions.

### Basic Setup

Enable motion sensing (requires user permission):

```javascript
enableMotion()
```

### Available Motion Parameters

| Motion Type | Parameters | Description |
|-------------|------------|-------------|
| **Acceleration** | `accelerationX` (`accX`), `accelerationY` (`accY`), `accelerationZ` (`accZ`) | Linear acceleration excluding gravity. Raw g-force values normalized 0-1. |
| **Gravity** | `gravityX` (`gravX`), `gravityY` (`gravY`), `gravityZ` (`gravZ`) | Device orientation relative to Earth's gravity. Raw ±9.81 m/s² values normalized 0-1. |
| **Rotation** | `rotationAlpha` (`rotA`, `rotZ`), `rotationBeta` (`rotB`, `rotX`), `rotationGamma` (`rotG`, `rotY`) | Rotation rate around each axis. Raw ±180°/s values normalized 0-1. |
| **Orientation** | `orientationAlpha` (`oriA`, `oriZ`), `orientationBeta` (`oriB`, `oriX`), `orientationGamma` (`oriG`, `oriY`) | Relative orientation from starting position. Alpha: 0°-360°, Beta: -180° to 180°, Gamma: -90° to 90°. |
| **Absolute Orientation** | `absoluteOrientationAlpha` (`absOriA`, `absOriZ`), etc. | Earth-referenced orientation using magnetometer. **Not available on iOS**. |

### Motion Control Examples

**Basic motion-controlled synthesizer:**
```javascript
enableMotion()

n("0 1 3 5")
.scale("C:major")
.lpf(gravityY.range(200,2000))      // Tilt for filter cutoff
.room(rotZ.range(0,0.8))            // Rotate for reverb
.gain(oriX.range(0.2,0.8))          // Tilt left/right for volume
.sound("sawtooth")
```

**Advanced motion mapping:**
```javascript
enableMotion()

$: n("0 2 4 6")
   .scale(["C:major", "D:minor", "F:major", "G:major"])
   .struct("x ~ x ~")
   .lpf(accX.range(200, 4000))      // Movement for brightness
   .delay(rotY.range(0, 0.8))       // Rotation for delay
   .sound("triangle")

$: sound("bd hh sd hh")
   .speed(gravityZ.range(0.8, 1.2)) // Tilt for drum speed
   .gain(absOriA.range(0.3, 1))     // Compass direction for volume
```

### Motion Debugging

Monitor sensor values:
```javascript
accX.segment(16).log()  // Log acceleration values
oriY.segment(16).log()  // Log orientation values
```

**Tips:**
- Use `.range(min, max)` to map sensor values to musically useful ranges
- Use `.segment()` to smooth rapid changes
- Test on target device type (mobile vs desktop)
- Consider sensor availability differences between devices

## MIDI Integration

Strudel supports comprehensive MIDI input/output without additional software.

### MIDI Output

**Basic MIDI output:**
```javascript
chord("<C^7 A7 Dm7 G7>").voicing().midi('IAC Driver')
```

**MIDI options:**
```javascript
note("d e c a f").midi('IAC Driver', {
  isController: true,    // Disable note messages for controllers
  latencyMs: 34,         // Alignment latency
  noteOffsetMs: 10,      // Note-off message offset
  midichannel: 1,        // Default MIDI channel (1-16)
  velocity: 0.9,         // Default velocity (0-1)
  gain: 1,               // Velocity multiplier
  midimap: 'default'     // Control change mapping
})
```

### MIDI Channels and Ports

```javascript
// Set MIDI channel
note("c e g b").midichan(2).midi()

// Select MIDI port
midiport('IAC Driver')
note('c a f e').midiport('<0 1 2 3>').midi()
```

### MIDI Control Changes

**Direct CC control:**
```javascript
note("c a f e").control([74, sine.slow(4)]).midi()

// Or separate CC number and value
note("c a f e").ccn(74).ccv(sine.slow(4)).midi()

// Independent CC patterns
$: note("c a f e").midi()
$: ccv(sine.segment(16).slow(4)).ccn(74).midi()
```

**MIDI mappings:**
```javascript
// Simple mapping
midimaps({ mymap: { lpf: 74 } })
note("c a f e")
.lpf(sine.slow(4))
.midimap('mymap')
.midi()

// Advanced mapping with scaling
midimaps({ advanced: {
  lpf: { ccn: 74, min: 0, max: 20000, exp: 0.5 }
}})
note("c a f e")
.lpf(sine.slow(2).range(400,2000))
.midimap('advanced')
.midi()

// Default mapping
defaultmidimap({ lpf: 74 })
note("c a f e").midi()
lpf(sine.slow(4).segment(16)).midi()
```

### Advanced MIDI Controls

**Program changes:**
```javascript
progNum("<0 1>").midi()                    // Switch programs
note("c3 e3 g3").progNum("<0 1 2>").midi() // Notes with program changes
```

**Pitch bend and aftertouch:**
```javascript
note("c a f e").midibend(sine.slow(4).range(-0.4,0.4)).midi()
note("c a f e").miditouch(sine.slow(4).range(0,1)).midi()
```

**System Exclusive (SysEx):**
```javascript
let id = 0x43  // Yamaha manufacturer ID
let data = "0x79:0x09:0x11:0x0A:0x00:0x00"  // Device-specific data
note("c a f e").sysex(id, data).midi()
```

**MIDI clock and transport:**
```javascript
midicmd("clock*48,<start stop>/2").midi('IAC Driver')
```

### MIDI Input

Receive MIDI control messages:
```javascript
let cc = await midiin('IAC Driver Bus 1')
note("c a f e")
.lpf(cc(0).range(0, 1000))    // CC 0 controls filter
.lpq(cc(1).range(0, 10))      // CC 1 controls resonance
.sound("sawtooth")
```

## OSC (Open Sound Control)

Connect to SuperCollider/SuperDirt or other OSC-enabled software.

### Prerequisites for SuperDirt

1. Install SuperCollider + sc3 plugins
2. Install SuperDirt or StrudelDirt
3. Install Node.js
4. Download Strudel repo and run `pnpm i`
5. Run `pnpm run osc` to start OSC server

### Usage

```javascript
s("bd sd").osc()  // Send to SuperDirt

// Set Audio Engine Target to 'OSC' in settings to avoid .osc() calls
s("bd sd")  // Works when OSC is default target
```

## MQTT (Internet of Things)

Send patterns to MQTT brokers for IoT integration.

### Basic MQTT Usage

```javascript
"hello world"
.mqtt(
  undefined,                           // username (undefined for public servers)
  undefined,                           // password
  '/strudel-pattern',                  // MQTT topic
  'wss://mqtt.eclipseprojects.io:443/mqtt', // MQTT server address
  'mystrudel',                         // client ID (random if not supplied)
  0                                    // latency/delay (0 = no delay)
)
```

### Control Pattern MQTT

```javascript
sound("sax(3,8)").speed("2 3")
.mqtt(undefined, undefined, '/strudel-pattern',
      'wss://mqtt.eclipseprojects.io:443/mqtt', 'mystrudel', 0)
```

Sends JSON messages like:
```json
{"s":"sax","speed":2}
{"s":"sax","speed":2}
{"s":"sax","speed":3}
```

## Gamepad Input

Use game controllers for musical interaction.

### Basic Setup

```javascript
// Gamepad automatically detected when connected
```

### Available Controls

**Buttons (0-1 values):**
- `gp0` through `gp15` - Standard gamepad buttons
- Common mappings: `gp0` (A/X), `gp1` (B/Circle), `gp2` (X/Square), `gp3` (Y/Triangle)

**Analog Sticks (-1 to 1 values):**
- `gpLStickX`, `gpLStickY` - Left stick axes
- `gpRStickX`, `gpRStickY` - Right stick axes

### Gamepad Examples

**Button-triggered patterns:**
```javascript
note("c e g b")
.mask(gp0)           // A/X button masks pattern
.sound("piano")
.gain(gp1.range(0.2, 1))  // B/Circle controls volume
```

**Analog stick control:**
```javascript
note("0 2 4 6")
.scale("C:major")
.lpf(gpLStickX.range(200, 4000))    // Left stick X for filter
.pan(gpRStickX)                      // Right stick X for panning
.room(gpLStickY.range(0, 0.8))      // Left stick Y for reverb
```

**Button sequences:**
```javascript
// Create patterns from button combinations
note(gp0.seq(gp1, gp2, gp3).range(60, 72))  // Button sequence as melody
```

### Multiple Gamepads

```javascript
// Access specific gamepad by index
gpLStickX(0)  // First gamepad
gpLStickX(1)  // Second gamepad
```

## Hydra Visual Integration

Integrate Hydra visual synthesis with Strudel patterns.

### Basic Hydra Setup

```javascript
await initHydra()

// Basic Hydra visual
osc(10, 0.9, 300)
.color(0.9, 0.7, 0.8)
.diff(osc(45, 0.3, 100).color(0.9, 0.9, 0.9).rotate(0.18))
.scrollX(10)
.colorama()
.luma()
.out()
```

### Audio-Reactive Visuals

```javascript
await initHydra()

// Use Strudel patterns to control Hydra
$: note("c e g b").sound("sine")
   .gain(0.5)

// Audio-reactive visuals
src(o0).scale(()=>a.fft[0]*2+1).out()
```

### H Patterns

Link Hydra parameters to Strudel patterns:

```javascript
await initHydra()

osc().freq(H("10 20 30 40")).out()  // H() creates Hydra-compatible pattern
```

### Audio Detection

```javascript
detectAudio()  // Enable audio analysis

// Use audio data in visuals
osc().scale(()=>a.fft[0]*2+1).out()
```

## Continuous Signals

Advanced signal generation for control and modulation.

### Basic Signals (0-1 range)

```javascript
saw        // Sawtooth wave
sine       // Sine wave
cosine     // Cosine wave
tri        // Triangle wave
square     // Square wave
rand       // Random values
perlin     // Smooth noise
```

### Bipolar Signals (-1 to 1 range)

```javascript
saw2, sine2, cosine2, tri2, square2, rand2
```

### Signal Applications

**Filter modulation:**
```javascript
s("[bd sd]*2,hh*8")
.cutoff(sine.range(500,4000))        // Linear range mapping
.cutoff(sine.rangex(500,4000))       // Exponential range mapping
.cutoff(sine2.range2(500,4000))      // Bipolar signal mapping
```

**Melodic generation:**
```javascript
n(sine.segment(16).range(0,15))
.scale("C:minor")

// Multiple signals for harmony
n(stack(sine,cosine).segment(16).range(0,15))
.scale("C:minor")
```

## CSound Integration

Load and use CSound instruments in Strudel.

### Loading .orc Files

```javascript
// Load CSound orchestra file
await loadOrc('path/to/instrument.orc')

// Use CSound instrument
note("c e g b").csound("myinstrument")
```

### Writing Custom Instruments

```javascript
// Define CSound instrument inline
csdefinstr('mysynth', `
  opcode mysynth, a, iiii
    ifreq, iamp, iattack, irelease xin
    aenv adsr iattack, 0.1, 0.7, irelease
    asig oscil iamp * aenv, ifreq, 1
    xout asig
  endop
`)

note("c e g b").csound("mysynth")
```

## Music Metadata

Add metadata to your compositions using comment tags:

```javascript
// @title My Composition
// @by Your Name
// @license CC BY-NC-SA
// @genre Electronic
// @details Created with Strudel live coding

note("c e g b").sound("piano")
```

**Available tags:**
- `@title` - Music title
- `@by` - Author(s)
- `@license` - License (e.g., CC BY-NC-SA)
- `@details` - Additional information
- `@url` - Related web pages
- `@genre` - Music genre(s)
- `@album` - Album name

**Alternative syntax:**
```javascript
/*
@title My Song
@by Artist Name <https://example.com>
@license CC BY-NC-SA
*/

// Or single line
// @title My Song @by Artist @license CC BY-NC-SA

// Title at beginning with quotes
// "My Song" @by Artist Name
```

## Offline Usage

### Standalone App

Download desktop, iOS, or Android apps for offline use.

### Sample Caching

Samples are cached automatically. Manage cache through browser settings or developer console.

### Progressive Web App

Install Strudel as a PWA for offline access to core functionality.

## Performance and Debugging

### Audio Analysis

```javascript
._scope()        // Visual waveform display
._spectrum()     // Frequency spectrum display
.log()          // Log pattern events to console
```

### Performance Monitoring

```javascript
// Monitor CPU usage
._cpu()

// Analyze pattern timing
._timing()
```

### Error Handling

```javascript
try {
  risky_pattern().play()
} catch(e) {
  console.log("Pattern error:", e)
}
```

## Next Steps

- [Samples and Sounds](samples_and_sounds.md) for audio file management
- [Musical Theory](musical_theory.md) for harmonic applications
- [Patterns and Notation](patterns_and_notation.md) for rhythm programming
- [Recipes and Examples](recipes_and_examples.md) for practical implementations
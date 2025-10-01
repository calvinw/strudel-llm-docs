# Strudel Patterns and Mini-Notation

**Generated from:** Strudel LLM Documentation

This document covers pattern creation, manipulation, and the comprehensive mini-notation system in Strudel.

## Mini-Notation Reference

Mini-notation is Strudel's powerful pattern language for creating rhythms and sequences.

### Core Mini-Notation Syntax

| Concept | Syntax | Example | Description |
|---------|---------|---------|-------------|
| Sequence | space | `sound("bd bd sd hh bd cp sd hh")` | Play sounds in sequence |
| Sample Number | :x | `sound("hh:0 hh:1 hh:2 hh:3")` | Select specific sample variant |
| Rests | ~ or - | `sound("metal ~ jazz jazz:1")` | Add silence/rests |
| Sub-Sequences | [] | `sound("bd wind [metal jazz] hh")` | Nest sequences within beats |
| Sub-Sub-Sequences | [[]] | `sound("bd [metal [jazz sd]]")` | Multiple nesting levels |
| Speed up | * | `sound("bd sd*2 cp*3")` | Multiply event frequency |
| Parallel | , | `sound("bd*2, hh*2 [hh oh]")` | Play patterns simultaneously |
| Slow down | / | `note("[c a f e]/2")` | Divide event frequency |
| Alternate | <> | `note("c <e g>")` | Cycle through options |
| Elongate | @ | `note("c@3 e")` | Extend event duration |
| Replicate | ! | `note("c!3 e")` | Repeat event multiple times |

### Advanced Mini-Notation

**Euclidean Rhythms:**
```
sound("bd(3,8)")  // 3 beats distributed over 8 steps
sound("hh(5,8,2)") // 5 beats over 8 steps, offset by 2
```

**Polymeter:**
```
sound("{bd sd, hh*3}")     // Different pattern lengths
sound("{bd sd cp, hh*4}%8") // Force to 8 steps
```

**Pattern Multiplication:**
```
sound("[bd sd]*2")    // Repeat pattern twice per cycle
sound("bd*<1 2 3 4>") // Variable repetition
```

## Pattern Creation Functions

These functions create patterns that correspond to mini-notation equivalents:

| Function | Mini-Notation | Example | Description |
|----------|---------------|---------|-------------|
| `cat(x, y)` | `"<x y>"` | `cat("c", "e", "g").note()` | Concatenate over cycles |
| `seq(x, y)` | `"x y"` | `seq("c", "e", "g").note()` | Sequence within cycle |
| `stack(x, y)` | `"x,y"` | `stack("bd", "hh*4").sound()` | Play simultaneously |
| `stepcat([3,x],[2,y])` | `"x@3 y@2"` | `stepcat([3,"e3"],[1,"g3"]).note()` | Proportional timing |
| `polymeter([a, b], [x, y])` | `"{a b, x y}"` | `polymeter("c eb g","c2 g2").note()` | Polymetric patterns |
| `silence` | `"~"` | `silence` | Empty pattern |

### Cat (Concatenation)
```javascript
cat("e5", "b4", ["d5", "c5"]).note()
// Same as: "<e5 b4 [d5 c5]>".note()
```

### Seq (Sequence)
```javascript
seq("e5", "b4", ["d5", "c5"]).note()
// Same as: "e5 b4 [d5 c5]".note()
```

### Stack (Layering)
```javascript
stack("g3","b3",["e4","d4"]).note()
// Same as: "g3,b3,[e4 d4]".note()
```

### Arrange (Song Structure)
```javascript
arrange(
  [4, "<c a f e>(3,8)"],
  [2, "<g a>(5,8)"]
).note()
```

## Pattern Effects

Pattern effects transform existing patterns in unique ways:

### Core Pattern Effects

| Name | Description | Example |
|------|-------------|---------|
| `rev()` | Reverse pattern | `n("0 2 4 6").scale("C:minor").rev()` |
| `jux(func)` | Split stereo, modify right | `n("0 2 4 6").scale("C:minor").jux(rev)` |
| `add(n)` | Add numbers/notes | `n("0 2 4 6".add("<0 1 2 1>")).scale("C:minor")` |
| `ply(n)` | Repeat each event n times | `s("bd sd").ply("<1 2 3>")` |
| `off(time, func)` | Copy, shift, and modify | `s("bd sd, hh*4").off(1/8, x=>x.speed(2))` |

### Reverse (rev)
```javascript
n("0 1 [4 3] 2 0 2 [~ 3] 4").sound("jazz").rev()
```

### Jux (Stereo Split)
```javascript
n("0 1 [4 3] 2 0 2 [~ 3] 4").sound("jazz").jux(rev)
```
This plays the original pattern on the left and the reversed version on the right.

### Add (Transposition)
```javascript
// Simple addition
note("c2 [eb3,g3]".add("<0 <1 -1>>"))
.sound("gm_acoustic_bass")

// With scales
n("0 [2 4] <3 5> [~ <4 1>]".add("<0 [0,2,4]>"))
.scale("C5:minor")
```

### Ply (Repetition)
```javascript
sound("hh hh, bd rim [~ cp] rim").ply(2)
// Same as: sound("hh*2 hh*2, bd*2 rim*2 [~ cp*2] rim*2")
```

### Off (Delayed Copy)
```javascript
n("0 [4 <3 2>] <2 3> [~ 1]")
.off(1/16, x=>x.add(4))
.scale("C5:minor")
```

## Accumulation Modifiers

Functions that layer and build upon patterns:

### Superimpose
Adds the function result on top of the original pattern:
```javascript
"<0 2 4 6 ~ 4 ~ 2 0!3 ~!5>*8"
.superimpose(x=>x.add(2))
.scale('C minor').note()
```

### Layer
Like superimpose, but without the original pattern:
```javascript
"<0 2 4 6 ~ 4 ~ 2 0!3 ~!5>*8"
.layer(x=>x.add("0,2"))
.scale('C minor').note()
```

### Echo
Superimpose multiple delayed copies with decreasing volume:
```javascript
s("bd sd").echo(3, 1/6, .8)
// times, offset time, feedback
```

### Echo With
Like echo, but with custom function per repetition:
```javascript
"<0 [2 4]>"
.echoWith(4, 1/8, (p,n)=>p.add(n*2))
.scale("C:minor").note()
```

## Conditional Modifiers

Functions that apply transformations conditionally:

### Time-Based Conditionals
```javascript
// Apply function every n cycles, starting from last cycle
note("c3 d3 e3 g3").lastOf(4, x=>x.rev())

// Apply function every n cycles, starting from first cycle
note("c3 d3 e3 g3").firstOf(4, x=>x.rev())

// Apply function when condition is true
note("c d e f").when(rand.range(0,1).gt(0.5), x=>x.rev())
```

### Pattern-Based Conditionals
```javascript
// Apply to chunks of the pattern
note("c d e f g a b c").chunk(4, x=>x.fast(2))

// Sometimes apply (probability-based)
note("c d e f").sometimes(x=>x.rev())
note("c d e f").often(x=>x.rev())     // higher probability
note("c d e f").rarely(x=>x.rev())    // lower probability

// With specific probability
note("c d e f").sometimesBy(0.3, x=>x.rev())
```

## Utility Patterns

### Run
Generate sequential numbers:
```javascript
n(run(4)).scale("C4:pentatonic")
// Same as: n("0 1 2 3").scale("C4:pentatonic")
```

### Binary
Convert numbers to binary patterns:
```javascript
"hh".s().struct(binary(5))
// Same as: "hh".s().struct("1 0 1")

// With specific bit length
"hh".s().struct(binaryN(55532, 16))
```

## Time Modifiers

### Fast and Slow
```javascript
sound("bd sd [~ bd] sd").fast(2)    // Double speed
sound("bd sd [~ bd] sd").slow(2)    // Half speed

// Pattern tempo changes
note("c2, eb3 g3 [bb3 c4]").sound("piano").slow("0.5,1,1.5")
```

### CPM (Cycles Per Minute)
```javascript
setcpm(45)  // Set global tempo
sound("bd sd [~ bd] sd")
```

## Practical Examples

### Complex Pattern Building
```javascript
$: n("0 [2 4] <3 5> [~ <4 1>]".add("<0 [0,2,4]>"))
   .scale("C5:minor")
   .sound("gm_xylophone")
   .room(.4).delay(.125)

$: note("c2 [eb3,g3]".add("<0 <1 -1>>"))
   .adsr("[.1 0]:.2:[1 0]")
   .sound("gm_acoustic_bass")
   .room(.5)

$: n("0 1 [2 3] 2").sound("jazz").jux(rev)
```

### Nested Off Effects
```javascript
s("bd sd [rim bd] sd,[~ hh]*4").bank("CasioRZ1")
.off(2/16, x=>x.speed(1.5).gain(.25)
  .off(3/16, y=>y.vowel("<a e i o>*8")))
```

## Pattern Combination Rules

**Mixing Mini-Notation and Functions:**
```javascript
stack(
  note("c2 eb2(3,8)").s('sawtooth').cutoff(800),
  s("bd(5,8), hh*8")
)
```

**Function vs Mini-Notation Choice:**
- Use mini-notation for individual rhythms and patterns
- Use functions for larger structures and transformations
- Functions are better when you need to pass patterns as variables

## Next Steps

- [Audio and Synthesis](audio_and_synthesis.md) for sound design
- [Musical Theory](musical_theory.md) for scales and harmony
- [Recipes and Examples](recipes_and_examples.md) for practical applications
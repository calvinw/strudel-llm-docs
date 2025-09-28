# Strudel Music Live Coding Documentation

**Generated on:** 2025-09-13 14:25:46 (Lightly Cleaned)

This is a comprehensive documentation for Strudel, a music live coding environment for the browser that ports the TidalCycles pattern language to JavaScript.

**Official Website:** https://strudel.cc

## Workshop Tutorials

### Unknown Title

**Source:** https://strudel.cc/workshop/first-effects

# First Effects

We have sounds, we have notes, now let’s look at effects!

## Some basic effects

**low-pass filter**

```
note("<[c2 c3]*4 [bb1 bb2]*4 [f2 f3]*4 [eb2 eb3]*4>")
.sound("sawtooth").lpf(800)
```

lpf = **l** ow **p** ass **f** ilter

- Change lpf to 200. Notice how it gets muffled. Think of it as standing in front of the club with the door closed 🚪.
- Now let’s open the door… change it to 5000. Notice how it gets brighter ✨🪩

**pattern the filter**

```
note("<[c2 c3]*4 [bb1 bb2]*4 [f2 f3]*4 [eb2 eb3]*4>")
.sound("sawtooth").lpf("200 1000 200 1000")
```

- Try adding more values
- Notice how the pattern in lpf does not change the overall rhythm

We will learn how to automate with waves later…

**vowel**

```
note("<[c3,g3,e4] [bb2,f3,d4] [a2,f3,c4] [bb2,g3,eb4]>")
.sound("sawtooth").vowel("<a e i o>")
```

**gain**

```
$: sound("hh*16").gain("[.25 1]*4")

$: sound("bd*4,[~ sd:1]*2")
```

Rhythm is all about dynamics!

- Remove `.gain(...)` and notice how flat it sounds.
- Bring it back by undoing (ctrl+z)

Let’s combine all of the above into a little tune:

```
$: sound("hh*8").gain("[.25 1]*4")

$: sound("bd*4,[~ sd:1]*2")

$: note("<[c2 c3]*4 [bb1 bb2]*4 [f2 f3]*4 [eb2 eb3]*4>")
.sound("sawtooth").lpf("200 1000 200 1000")

$: note("<[c3,g3,e4] [bb2,f3,d4] [a2,f3,c4] [bb2,g3,eb4]>")
.sound("sawtooth").vowel("<a e i o>")
```

**shape the sound with an adsr envelope**

```
note("c3 bb2 f3 eb3")
.sound("sawtooth").lpf(600)
.attack(.1)
.decay(.1)
.sustain(.25)
.release(.2)
```

Try to find out what the numbers do.. Compare the following

- attack: `.5` vs `0`
- decay: `.5` vs `0`
- sustain: `1` vs `.25` vs `0`
- release: `0` vs `.5` vs `1`

Can you guess what they do?

Click to see solution

- attack: time it takes to fade in
- decay: time it takes to fade to sustain
- sustain: level after decay
- release: time it takes to fade out after note is finished

![ADSR](https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/ADSR_parameter.svg/1920px-ADSR_parameter.svg.png)

**adsr short notation**

```
note("c3 bb2 f3 eb3")
.sound("sawtooth").lpf(600)
.adsr(".1:.1:.5:.2")
```

**delay**

```
$: note("[~ [<[d3,a3,f4]!2 [d3,bb3,g4]!2> ~]]*2")
.sound("gm_electric_guitar_muted").delay(.5)

$: sound("bd rim").bank("RolandTR707").delay(".5")
```

Try some `delay` values between 0 and 1. Btw, `.5` is short for `0.5`

What happens if you use `.delay(".8:.125")` ? Can you guess what the second number does?

What happens if you use `.delay(".8:.06:.8")` ? Can you guess what the third number does?

Click to see solution

`delay("a:b:c")`:

- a: delay volume
- b: delay time
- c: feedback (smaller number = quicker fade)

**room aka reverb**

```
n("<4 [3@3 4] [<2 0> ~@16] ~>")
.scale("D4:minor").sound("gm_accordion:2")
.room(2)
```

Try different values!

Add a delay too!

**little dub tune**

```
$: note("[~ [<[d3,a3,f4]!2 [d3,bb3,g4]!2> ~]]*2")
.sound("gm_electric_guitar_muted").delay(.5)

$: sound("bd rim").bank("RolandTR707").delay(.5)

$: n("<4 [3@3 4] [<2 0> ~@16] ~>")
.scale("D4:minor").sound("gm_accordion:2")
.room(2).gain(.5)
```

Let’s add a bass to make this complete:

```
$: note("[~ [<[d3,a3,f4]!2 [d3,bb3,g4]!2> ~]]*2")
.sound("gm_electric_guitar_muted").delay(.5)

$: sound("bd rim").bank("RolandTR707").delay(.5)

$: n("<4 [3@3 4] [<2 0> ~@16] ~>")
.scale("D4:minor").sound("gm_accordion:2")
.room(2).gain(.4)

$: n("[0 [~ 0] 4 [3 2] [0 ~] [0 ~] <0 2> ~]/2")
.scale("D2:minor")
.sound("sawtooth,triangle").lpf(800)
```

Try adding `.hush()` at the end of one of the patterns in the stack…

**pan**

```
sound("numbers:1 numbers:2 numbers:3 numbers:4")
.pan("0 0.3 .6 1")
```

**speed**

```
sound("bd rim [~ bd] rim").speed("<1 2 -1 -2>").room(.2)
```

**fast and slow**

We can use `fast` and `slow` to change the tempo of a pattern outside of Mini-Notation:

```
sound("bd*4,~ rim ~ cp").slow(2)
```

Change the `slow` value. Try replacing it with `fast`.

What happens if you use a pattern like `.fast("<1 [2 4]>")`?

By the way, inside Mini-Notation, `fast` is `*` and `slow` is `/`.

```
sound("[bd*4,~ rim ~ cp]*<1 [2 4]>")
```
## modulation with signals

Instead of changing values stepwise, we can also control them with signals:

```
sound("hh*16").gain(sine)
```

The basic waveforms for signals are `sine`, `saw`, `square`, `tri` 🌊

Try also random signals `rand` and `perlin`!

The gain is visualized as transparency in the pianoroll.

**setting a range**

By default, waves oscillate between 0 to 1. We can change that with `range`:

```
sound("hh*16").lpf(saw.range(500, 2000))
```

What happens if you flip the range values?

We can change the modulation speed with slow / fast:

```
note("<[c2 c3]*4 [bb1 bb2]*4 [f2 f3]*4 [eb2 eb3]*4>")
.sound("sawtooth")
.lpf(sine.range(100, 2000).slow(4))
```

The whole modulation will now take 8 cycles to repeat.

## Recap

| name | example |
| --- | --- |
| lpf | `note("c2 c3 c2 c3").s("sawtooth").lpf("<400 2000>")` |
| vowel | `note("c3 eb3 g3").s("sawtooth").vowel("<a e i o>")` |
| gain | `s("hh*16").gain("[.25 1]*2")` |
| delay | `s("bd rim bd cp").delay(.5)` |
| room | `s("bd rim bd cp").room(.5)` |
| pan | `s("bd rim bd cp").pan("0 1")` |
| speed | `s("bd rim bd cp").speed("<1 2 -1 -2>")` |
| signals | `sine`, `saw`, `square`, `tri`, `rand`, `perlin`
`s("hh*16").gain (saw)` |
| range | `s("hh*16").lpf(saw.range(200,4000))` |

Let us now take a look at some of Tidal’s typical [pattern effects](https://strudel.cc/workshop/pattern-effects/).
---

### Unknown Title

**Source:** https://strudel.cc/workshop/first-notes

# First Notes

Let’s look at how we can play notes

## numbers and notes

**play notes with numbers**

```
note("48 52 55 59").sound("piano")
```

Try out different numbers!

Try decimal numbers, like 55.5

**play notes with letters**

```
note("c e g b").sound("piano")
```

Try out different letters (a - g).

Can you find melodies that are actual words? Hint: ☕ 😉 ⚪

**add flats or sharps to play the black keys**

```
note("db eb gb ab bb").sound("piano")
```

```
note("c# d# f# g# a#").sound("piano")

```

**play notes with letters in different octaves**

```
note("c2 e3 g4 b5").sound("piano")
```

Try out different octaves (1-8)

If you are not comfortable with the note letter system, it should be easier to use numbers instead.
Most of the examples below will use numbers for that reason.
We will also look at ways to make it easier to play the right notes later.

## changing the sound

Just like with unpitched sounds, we can change the sound of our notes with `sound`:

```
note("36 43, 52 59 62 64").sound("piano")
```

Try out different sounds:

- gm\_electric\_guitar\_muted
- gm\_acoustic\_bass
- gm\_voice\_oohs
- gm\_blown\_bottle
- sawtooth
- square
- triangle
- how about bd, sd or hh?
- remove `.sound('...')` completely

**switch between sounds**

```
note("48 67 63 [62, 58]")
.sound("piano gm_electric_guitar_muted")
```

**stack multiple sounds**

```
note("48 67 63 [62, 58]")
.sound("piano, gm_electric_guitar_muted")
```

The `note` and `sound` patterns are combined!

We will see more ways to combine patterns later..

## Longer Sequences

**Divide sequences with `/` to slow them down**

```
note("[36 34 41 39]/4").sound("gm_acoustic_bass")
```

The `/4` plays the sequence in brackets over 4 cycles (=8s).

So each of the 4 notes is 2s long.

Try adding more notes inside the brackets and notice how it gets faster.

**Play one per cycle with `< ... >`**

In the last section, we learned that `< ... >` (angle brackets) can be used to play only one thing per cycle,
which is useful for longer melodies too:

```
note("<36 34 41 39>").sound("gm_acoustic_bass")
```

Try adding more notes inside the brackets and notice how the tempo stays the same.

The angle brackets are actually just a shortcut:

`<a b c>` = `[a b c]/3`

`<a b c d>` = `[a b c d]/4`

…

**Play one sequence per cycle**

We can combine the 2 types of brackets in all sorts of different ways.
Here is an example of a repetitive bassline:

```
note("<[36 48]*4 [34 46]*4 [41 53]*4 [39 51]*4>")
.sound("gm_acoustic_bass")
```

**Alternate between multiple things**

```
note("60 <63 62 65 63>")
.sound("gm_xylophone")
```

This is also useful for unpitched sounds:

```
sound("bd*4, [~ <sd cp>]*2, [~ hh]*4")
.bank("RolandTR909")
```
## Scales

Finding the right notes can be difficult.. Scales are here to help:

```
setcpm(60)
n("0 2 4 <[6,8] [7,9]>")
.scale("C:minor").sound("piano")
```

Try out different numbers. Any number should sound good!

Try out different scales:

- C:major
- A2:minor
- D:dorian
- G:mixolydian
- A2:minor:pentatonic
- F:major:pentatonic

**automate scales**

Just like anything, we can automate the scale with a pattern:

```
setcpm(60)
n("<0 -3>, 2 4 <[6,8] [7,9]>")
.scale("<C:major D:mixolydian>/4")
.sound("piano")
```

If you have no idea what these scale mean, don’t worry.
These are just labels for different sets of notes that go well together.

Take your time and you’ll find scales you like!

## Repeat & Elongate

**Elongate with @**

```
note("c@3 eb").sound("gm_acoustic_bass")
```

Not using `@` is like using `@1`. In the above example, c is 3 units long and eb is 1 unit long.

Try changing that number!

**Elongate within sub-sequences**

```
setcpm(60)
n("<[4@2 4] [5@2 5] [6@2 6] [5@2 5]>*2")
.scale("<C2:mixolydian F2:mixolydian>/4")
.sound("gm_acoustic_bass")
```

This groove is called a `shuffle`.
Each beat has two notes, where the first is twice as long as the second.
This is also sometimes called triplet swing. You’ll often find it in blues and jazz.

**Replicate**

```
setcpm(60)
note("c!2 [eb,<g a bb a>]").sound("piano")
```

Try switching between `!`, `*` and `@`

What’s the difference?

## Recap

Let’s recap what we’ve learned in this chapter:

| Concept | Syntax | Example |
| --- | --- | --- |
| Slow down | / | `note("[c a f e]/2")` |
| Alternate | <> | `note("c a f <e g>")` |
| Elongate | @ | `note("c@3 e")` |
| Replicate | ! | `note("c!3 e")` |

New functions:

| Name | Description | Example |
| --- | --- | --- |
| note | set pitch as number or letter | `note("b g e c").sound("piano")` |
| scale | interpret `n` as scale degree | `n("6 4 2 0").scale("C:minor").sound("piano")` |
| $: | play patterns in parallel | `$: s("bd sd")
$: note("c eb g")` |

## Examples

**Classy Bassline**

```
note("<[c2 c3]*4 [bb1 bb2]*4 [f2 f3]*4 [eb2 eb3]*4>")
.sound("gm_synth_bass_1")
.lpf(800) // <-- we'll learn about this soon
```

**Classy Melody**

```
n(`<
[~ 0] 2 [0 2] [~ 2]
[~ 0] 1 [0 1] [~ 1]
[~ 0] 3 [0 3] [~ 3]
[~ 0] 2 [0 2] [~ 2]
>*4`).scale("C4:minor")
.sound("gm_synth_strings_1")
```

**Classy Drums**

```
sound("bd*4, [~ <sd cp>]*2, [~ hh]*4")
.bank("RolandTR909")
```

**If there just was a way to play all the above at the same time…**

You can use `$:` 😙

## Playing multiple patterns

If you want to play multiple patterns at the same time, make sure to write `$:` before each:

```
$: note("<[c2 c3]*4 [bb1 bb2]*4 [f2 f3]*4 [eb2 eb3]*4>")
.sound("gm_synth_bass_1").lpf(800)

$: n(`<
[~ 0] 2 [0 2] [~ 2]
[~ 0] 1 [0 1] [~ 1]
[~ 0] 3 [0 3] [~ 3]
[~ 0] 2 [0 2] [~ 2]
>*4`).scale("C4:minor")
.sound("gm_synth_strings_1")

$: sound("bd*4, [~ <sd cp>]*2, [~ hh]*4")
.bank("RolandTR909")
```

Try changing `$` to `_$` to mute a part!

This is starting to sound like actual music! We have sounds, we have notes, now the last piece of the puzzle is missing: [effects](https://strudel.cc/workshop/first-effects/)

- [First Notes](https://strudel.cc/workshop/first-notes/#first-notes)

- [numbers and notes](https://strudel.cc/workshop/first-notes/#numbers-and-notes)

- [changing the sound](https://strudel.cc/workshop/first-notes/#changing-the-sound)
---

### Unknown Title

**Source:** https://strudel.cc/workshop/first-sounds

# First Sounds

This is the first chapter of the Strudel Workshop, nice to have you on board!

## Code Fields

The workshop is full of interactive code fields. Let’s learn how to use those. Here is one:

```
sound("casio")
```

1. ⬆️ click into the text field above ⬆️
2. press `ctrl` + `enter` to play
3. change `casio` to `metal`
4. press `ctrl` + `enter` to update
5. press `ctrl` + `.` to stop

Congratulations, you are now live coding!

## Sounds

We have just played a sound with `sound` like this:

```
sound("casio")
```

`casio` is one of many standard sounds.

Try out a few other sounds:

```
insect wind jazz metal east crow casio space numbers
```

You might hear a little pause while the sound is loading

**Change Sample Number with :**

One Sound can contain multiple samples (audio files).

You can select the sample by appending `:` followed by a number to the name:

```
sound("casio:1")
```

Try different sound / sample number combinations.

Not adding a number is like doing `:0`

Now you know how to use different sounds.
For now we’ll stick to this little selection of sounds, but we’ll find out how to load your own sounds later.

## Drum Sounds

By default, Strudel comes with a wide selection of drum sounds:

```
sound("bd hh sd oh")
```

These letter combinations stand for different parts of a drum set:

![](https://strudel.cc/img/drumset.png) [original image by Pbroks13](https://de.wikipedia.org/wiki/Schlagzeug#/media/Datei:Drum_set.svg)

- `bd` = **b** ass **d** rum
- `sd` = **s** nare **d** rum
- `rim` = **rim** shot
- `hh` = **h** i **h** at
- `oh` = **o** pen **h** ihat
- `lt` = **l** ow tom
- `mt` = **m** iddle tom
- `ht` = **h** igh tom
- `rd` = **r** i **d** e cymbal
- `cr` = **cr** ash cymbal

Try out different drum sounds!

To change the sound character of our drums, we can use `bank` to change the drum machine:

```
sound("bd hh sd oh").bank("RolandTR909")
```

In this example `RolandTR909` is the name of the drum machine that we’re using.
It is a famous drum machine for house and techno beats.

Try changing `RolandTR909` to one of

- `AkaiLinn`
- `RhythmAce`
- `RolandTR808`
- `RolandTR707`
- `ViscoSpaceDrum`

There are a lot more, but let’s keep it simple for now

🦥 Pro-Tip: Mark a name via double click. Then just copy and paste!

## Sequences

In the last example, we already saw that you can play multiple sounds in a sequence by separating them with a space:

```
sound("bd hh sd hh")
```

Notice how the currently playing sound is highlighted in the code and also visualized below.

Try adding more sounds to the sequence!

**The longer the sequence, the faster it runs**

```
sound("bd bd hh bd rim bd hh bd")
```

The content of a sequence will be squished into what’s called a cycle. A cycle is 2s long by default.

**One per cycle with `< .. >`**

Here is the same sequence, but this time sourrounded with `< .. >` (angle brackets):

```
sound("<bd bd hh bd rim bd hh bd>")
```

This will play only one sound per cycle. With these brackets, the tempo doesn’t change when we add or remove elements!

Because this is now very slow, we can speed it up again like this:

```
sound("<bd bd hh bd rim bd hh bd>*8")
```

Here, the `*8` means we make the whole thing 8 times faster.

Wait a minute, isn’t this the same as without `< ... >*8`? Why do we need it then?

That’s true, the special thing about this notation is that the tempo won’t change when you add or remove elements, try it!

Try also changing the number at the end to change the tempo!

**changing the tempo with setcpm**

```
setcpm(90/4)
sound("<bd hh rim hh>*8")
```

cpm = cycles per minute

By default, the tempo is 30 cycles per minute = 120/4 = 1 cycle every 2 seconds

In western music terms, you could say the above are 8ths notes at 90bpm in 4/4 time.
But don’t worry if you don’t know these terms, as they are not required to make music with Strudel.

**Add a rests in a sequence with ’-’ or ’~’**

```
sound("bd hh - rim - bd hh rim")
```

**Sub-Sequences with \[brackets\]**

```
sound("bd [hh hh] sd [hh bd] bd - [hh sd] cp")
```

Try adding more sounds inside a bracket!

Similar to the whole sequence, the content of a sub-sequence will be squished to its own length.

**Multiplication: Speed things up**

```
sound("bd hh*2 rim hh*3 bd [- hh*2] rim hh*2")
```

**Multiplication: Speed up subsequences**

```
sound("bd [hh rim]*2 bd [hh rim]*1.5")
```

**Multiplication: Speeeeeeeeed things up**

```
sound("bd hh*32 rim hh*16")
```

Pitch = really fast rhythm

**Sub-Sub-Sequences with \[\[brackets\]\]**

```
sound("bd [[rim rim] hh] bd cp")
```

You can go as deep as you want!

**Play sequences in parallel with comma**

```
sound("hh hh hh, bd casio")
```

You can use as many commas as you want:

```
sound("hh hh hh, bd bd, - casio")
```

Commas can also be used inside sub-sequences:

```
sound("hh hh hh, bd [bd,casio]")
```

Notice how the 2 above are the same?

It is quite common that there are many ways to express the same idea.

**Multiple Lines with backticks**

```
sound(`bd*2, - cp,
- - - oh, hh*4,
[- casio]*2`)
```

**selecting sample numbers separately**

Instead of using ”:”, we can also use the `n` function to select sample numbers:

```
n("0 1 [4 2] 3*2").sound("jazz")
```

This is shorter and more readable than:

```
sound("jazz:0 jazz:1 [jazz:4 jazz:2] jazz:3*2")
```
## Recap

Now we’ve learned the basics of the so called Mini-Notation, the rhythm language of Tidal.
This is what we’ve learned so far:

| Concept | Syntax | Example |
| --- | --- | --- |
| Sequence | space | `sound("bd bd sd hh")` |
| Sample Number | :x | `sound("hh:0 hh:1 hh:2 hh:3")` |
| Rests | \- or ~ | `sound("metal - jazz jazz:1")` |
| Alternate | <> | `sound("<bd hh rim oh bd rim>")` |
| Sub-Sequences | \[\] | `sound("bd wind [metal jazz] hh")` |
| Sub-Sub-Sequences | \[\[\]\] | `sound("bd [metal [jazz [sd cp]]]")` |
| Speed up | \* | `sound("bd sd*2 cp*3")` |
| Parallel | , | `sound("bd*2, hh*2 [hh oh]")` |

The Mini-Notation is usually used inside some function. These are the functions we’ve seen so far:

| Name | Description | Example |
| --- | --- | --- |
| sound | plays the sound of the given name | `sound("bd sd [- bd] sd")` |
| bank | selects the sound bank | `sound("bd sd [- bd] sd").bank("RolandTR909")` |
| setcpm | sets the tempo in cycles per minute | `setcpm(45); sound("bd sd [- bd] sd")` |
| n | select sample number | `n("0 1 4 2 0 6 3 2").sound("jazz")` |

## Examples

**Basic rock beat**

```
setcpm(100/4)
sound("[bd sd]*2, hh*8").bank("RolandTR505")
```

**Classic house**

```
sound("bd*4, [- cp]*2, [- hh]*4").bank("RolandTR909")
```

Notice that the two patterns are extremely similar.
Certain drum patterns are reused across genres.

We Will Rock you

```
setcpm(81/2)
sound("bd*2 cp").bank("RolandTR707")
```

**Yellow Magic Orchestra - Firecracker**

```
setcpm(120/2)
sound("bd sd, - - - hh - hh - -, - perc - perc:1*2")
.bank("RolandCompurhythm1000")
```

**Imitation of a 16 step sequencer**

```
setcpm(90/4)
sound(`
[- - oh - ] [- - - - ] [- - - - ] [- - - - ],
[hh hh - - ] [hh - hh - ] [hh - hh - ] [hh - hh - ],
[- - - - ] [cp - - - ] [- - - - ] [cp - - - ],
[bd - - - ] [- - - bd] [- - bd - ] [- - - bd]
`)
```

**Another one**

```
setcpm(88/4)
sound(`
[- - - - ] [- - - - ] [- - - - ] [- - oh:1 - ],
[hh hh hh hh] [hh hh hh hh] [hh hh hh hh] [hh hh - - ],
[- - - - ] [cp - - - ] [- - - - ] [~ cp - - ],
[bd bd - - ] [- - bd - ] [bd bd - bd ] [- - - - ]
`).bank("RolandTR808")
```

**Not your average drums**

```
setcpm(100/2)
s(`jazz*2,
insect [crow metal] - -,
- space:4 - space:1,
- wind`)
```

Now that we know the basics of how to make beats, let’s look at how we can play [notes](https://strudel.cc/workshop/first-notes/)

- [First Sounds](https://strudel.cc/workshop/first-sounds/#first-sounds)
---

### Unknown Title

**Source:** https://strudel.cc/workshop/getting-started

# Welcome

![Strudel Icon](https://strudel.cc/icons/strudel_icon.png)

Welcome to the Strudel documentation pages!
You’ve come to the right place if you want to learn how to make music with code.

## What is Strudel?

With Strudel, you can expressively write dynamic music pieces.

It is an official port of the [Tidal Cycles](https://tidalcycles.org/) pattern language to JavaScript.

You don’t need to know JavaScript or Tidal Cycles to make music with Strudel.
This interactive tutorial will guide you through the basics of Strudel.

The best place to actually make music with Strudel is the [Strudel REPL](https://strudel.cc/)

## What can you do with Strudel?

- live code music: make music with code in real time
- algorithmic composition: compose music using tidal’s unique approach to pattern manipulation
- teaching: focussing on a low barrier of entry, Strudel is a good fit for teaching music and code at the same time.
- integrate into your existing music setup: either via MIDI or OSC, you can use Strudel as a really flexible sequencer

## Examples

Here are some examples of how strudel can sound:

```
// "coastline" @by eddyflux

// @version 1.0

samples('github:eddyflux/crate')

setcps(.75)

letchords=chord("<Bbm9 Fm9>/4").dict('ireal')

stack(
```

stack(// DRUMS

s("bd").struct("<\[x\*<1 2> \[~@3 x\]\] x>"),

s("~ \[rim, sd:<2 3>\]").room("<0 .2>"),

n("\[0 <1 3>\]\*<2!3 4>").s("hh"),

s("rd:<1!3 2>\*2").mask("<0 0 1 1>/16").gain(.5)

).bank('crate')

.mask("<\[0 1\] 1 1 1>/16".early(.5))

,// CHORDS

chords.offset(-1).voicing().s("gm\_epiano1:1")

.phaser(4).room(.5)

,// MELODY

n("<0!3 1\*2>").set(chords).mode("root:g2")

.voicing().s("gm\_acoustic\_bass"),

chords.n("\[0 <4 3 <2 5>>\*2\](<3 5>,8)")

.anchor("D5").voicing()

.segment(4).clip(rand.range(.4,.8))

.room(.75).shape(.3).delay(.25)

.fm(sine.range(3,8).slow(8))

.lpf(sine.range(500,1000).slow(8)).lpq(5)

.rarely(ply("2")).chunk(4,fast(2))

.gain(perlin.range(.6,.9))

.mask("<0 1 1 0>/16")

)

.late("\[0 .01\]\*4").late("\[0 .01\]\*2").size(4)

These examples cannot fully encompass the variety of things you can do, so [check out the showcase](https://strudel.cc/intro/showcase/) for some videos of how people use Strudel.

## Getting Started

The best way to start learning Strudel is the workshop.
If you’re ready to dive in, let’s start with your [first sounds](https://strudel.cc/workshop/first-sounds/)
---

### Unknown Title

**Source:** https://strudel.cc/workshop/pattern-effects

# Pattern Effects

Up until now, most of the functions we’ve seen are what other music programs are typically capable of: sequencing sounds, playing notes, controlling effects.

In this chapter, we are going to look at functions that are more unique to tidal.

**reverse patterns with rev**

```
n("0 1 [4 3] 2 0 2 [~ 3] 4").sound("jazz").rev()
```

**play pattern left and modify it right with jux**

```
n("0 1 [4 3] 2 0 2 [~ 3] 4").sound("jazz").jux(rev)
```

This is the same as:

```
$: n("0 1 [4 3] 2 0 2 [~ 3] 4").sound("jazz").pan(0)
$: n("0 1 [4 3] 2 0 2 [~ 3] 4").sound("jazz").pan(1).rev()
```

Let’s visualize what happens here:

```
$: n("0 1 [4 3] 2 0 2 [~ 3] 4").sound("jazz").pan(0).color("cyan")
$: n("0 1 [4 3] 2 0 2 [~ 3] 4").sound("jazz").pan(1).color("magenta").rev()
```

Try commenting out one of the two by adding `//` before a line

**multiple tempos**

```
note("c2, eb3 g3 [bb3 c4]").sound("piano").slow("0.5,1,1.5")
```

This is like doing

```
$: note("c2, eb3 g3 [bb3 c4]").s("piano").slow(0.5).color('cyan')
$: note("c2, eb3 g3 [bb3 c4]").s("piano").slow(1).color('magenta')
$: note("c2, eb3 g3 [bb3 c4]").s("piano").slow(1.5).color('yellow')
```

Try commenting out one or more by adding `//` before a line

**add**

```
setcpm(60)
note("c2 [eb3,g3] ".add("<0 <1 -1>>"))
.color("<cyan <magenta yellow>>").adsr("[.1 0]:.2:[1 0]")
.sound("gm_acoustic_bass").room(.5)
```

If you add a number to a note, the note will be treated as if it was a number

We can add as often as we like:

```
setcpm(60)
note("c2 [eb3,g3]".add("<0 <1 -1>>").add("0,7"))
.color("<cyan <magenta yellow>>").adsr("[.1 0]:.2:[1 0]")
.sound("gm_acoustic_bass").room(.5)
```

**add with scale**

```
n("0 [2 4] <3 5> [~ <4 1>]".add("<0 [0,2,4]>"))
.scale("C5:minor").release(.5)
.sound("gm_xylophone").room(.5)
```

**time to stack**

```
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

**ply**

```
sound("hh hh, bd rim [~ cp] rim").bank("RolandTR707").ply(2)
```

this is like writing:

```
sound("hh*2 hh*2, bd*2 rim*2 [~ cp*2] rim*2").bank("RolandTR707")
```

Try patterning the `ply` function, for example using `"<1 2 1 3>"`

**off**

```
n("0 [4 <3 2>] <2 3> [~ 1]"
.off(1/16, x=>x.add(4))
//.off(1/8, x=>x.add(7))
).scale("<C5:minor Db5:mixolydian>/2")
.s("triangle").room(.5).dec(.1)
```

In the notation `.off(1/16, x=>x.add(4))`, says:

- take the original pattern named as `x`
- modify `x` with `.add(4)`, and
- play it offset to the original pattern by `1/16` of a cycle.

off is also useful for modifying other sounds, and can even be nested:

```
s("bd sd [rim bd] sd,[~ hh]*4").bank("CasioRZ1")
.off(2/16, x=>x.speed(1.5).gain(.25)
.off(3/16, y=>y.vowel("<a e i o>*8")))
```

| name | description | example |
| --- | --- | --- |
| rev | reverse | `n("0 2 4 6 ~ 7 9 5").scale("C:minor").rev()` |
| jux | split left/right, modify right | `n("0 2 4 6 ~ 7 9 5").scale("C:minor").jux(rev)` |
| add | add numbers / notes | `n("0 2 4 6 ~ 7 9 5".add("<0 1 2 1>")).scale("C:minor")` |
| ply | speed up each event n times | `s("bd sd [~ bd] sd").ply("<1 2 3>")` |
| off | copy, shift time & modify | `s("bd sd [~ bd] sd, hh*8").off(1/16, x=>x.speed(2))` |
---

### Unknown Title

**Source:** https://strudel.cc/workshop/recap

# Workshop Recap
This page is just a listing of all functions covered in the workshop!
## Mini Notation
| Concept | Syntax | Example |
| --- | --- | --- |
| Sequence | space | `sound("bd bd sd hh bd cp sd hh")` |
| Sample Number | :x | `sound("hh:0 hh:1 hh:2 hh:3")` |
| Rests | ~ | `sound("metal ~ jazz jazz:1")` |
| Sub-Sequences | \[\] | `sound("bd wind [metal jazz] hh")` |
| Sub-Sub-Sequences | \[\[\]\] | `sound("bd [metal [jazz sd]]")` |
| Speed up | \* | `sound("bd sd*2 cp*3")` |
| Parallel | , | `sound("bd*2, hh*2 [hh oh]")` |
| Slow down | / | `note("[c a f e]/2")` |
| Alternate | <> | `note("c <e g>")` |
| Elongate | @ | `note("c@3 e")` |
| Replicate | ! | `note("c!3 e")` |
## Sounds
| Name | Description | Example |
| --- | --- | --- |
| sound | plays the sound of the given name | `sound("bd sd")` |
| bank | selects the sound bank | `sound("bd sd").bank("RolandTR909")` |
| n | select sample number | `n("0 1 4 2").sound("jazz")` |
## Notes
| Name | Description | Example |
| --- | --- | --- |
| note | set pitch as number or letter | `note("b g e c").sound("piano")` |
| n + scale | set note in scale | `n("6 4 2 0").scale("C:minor").sound("piano")` |
| $: | play patterns in parallel | `$: s("bd sd")
$: note("c eb g")` |
## Audio Effects
| name | example |
| --- | --- |
| lpf | `note("c2 c3 c2 c3").s("sawtooth").lpf("400 2000")` |
| vowel | `note("c3 eb3 g3").s("sawtooth").vowel("<a e i o>")` |
| gain | `s("hh*16").gain("[.25 1]*4")` |
| delay | `s("bd rim bd cp").delay(.5)` |
| room | `s("bd rim bd cp").room(.5)` |
| pan | `s("bd rim bd cp").pan("0 1")` |
| speed | `s("bd rim bd cp").speed("<1 2 -1 -2>")` |
| range | `s("hh*32").lpf(saw.range(200,4000))` |
## Pattern Effects
| name | description | example |
| --- | --- | --- |
| setcpm | sets the tempo in cycles per minute | `setcpm(45); sound("bd sd [~ bd] sd")` |
| fast | speed up | `sound("bd sd [~ bd] sd").fast(2)` |
| slow | slow down | `sound("bd sd [~ bd] sd").slow(2)` |
| rev | reverse | `n("0 2 4 6").scale("C:minor").rev()` |
| jux | split left/right, modify right | `n("0 2 4 6").scale("C:minor").jux(rev)` |
| add | add numbers / notes | `n("0 2 4 6".add("<0 1 2 1>")).scale("C:minor")` |
| ply | speed up each event n times | `s("bd sd").ply("<1 2 3>")` |
| off | copy, shift time & modify | `s("bd sd, hh*4").off(1/8, x=>x.speed(2))` |
---

## Core Learning

### Unknown Title

**Source:** https://strudel.cc/learn/accumulation

# Accumulation Modifiers

## superimpose

Superimposes the result of the given function(s) on top of the original pattern:

```
"<0 2 4 6 ~ 4 ~ 2 0!3 ~!5>\*8"

.superimpose(x=>x.add(2))

.scale('C minor').note()
```
## layer

Synonyms: `apply`

Layers the result of the given function(s). Like `superimpose`, but without the original pattern:

```
"<0 2 4 6 ~ 4 ~ 2 0!3 ~!5>\*8"

.layer(x=>x.add("0,2"))

.scale('C minor').note()
```
## off

Superimposes the function result on top of the original pattern, delayed by the given time.

- time (Pattern\|number): offset time
- func (function): function to apply

```
"c3 eb3 g3".off(1/8,x=>x.add(7)).note()
```
## echo

Superimpose and offset multiple times, gradually decreasing the velocity

- times (number): how many times to repeat
- time (number): cycle offset between iterations
- feedback (number): velocity multiplicator for each iteration

```
s("bd sd").echo(3,1/6,.8)
```
## echoWith

Synonyms: `echowith, stutWith, stutwith`

Superimpose and offset multiple times, applying the given function each time.

- times (number): how many times to repeat
- time (number): cycle offset between iterations
- func (function): function to apply, given the pattern and the iteration index

```
"<0 \[2 4\]>"

.echoWith(4,1/8,(p,n)=>p.add(n\*2))

.scale("C:minor").note()
```
## stut

Deprecated. Like echo, but the last 2 parameters are flipped.

- times (number): how many times to repeat
- feedback (number): velocity multiplicator for each iteration
- time (number): cycle offset between iterations

```
s("bd sd").stut(3,.8,1/6)

There are also [Tonal Functions](https://strudel.cc/learn/tonal/).

- [Accumulation Modifiers](https://strudel.cc/learn/accumulation/#accumulation-modifiers)

- [superimpose](https://strudel.cc/learn/accumulation/#superimpose)

```

---

### Unknown Title

**Source:** https://strudel.cc/learn/code

# Coding Syntax

Let’s take a step back and understand how the syntax in Strudel works.

Take a look at this simple example:

```
note("c a f e").s("piano")

- We have a word `note` which is followed by some brackets `()` with some words/letters/numbers inside, surrounded by quotes `"c a f e"`
- Then we have a dot `.` followed by another similar piece of code `s("piano")`.
- We can also see these texts are _highlighted_ using colours: word `note` is purple, the brackets `()` are grey, and the content inside the `""` are green. (The colors could be different if you’ve changed the default theme)

What happens if we try to ‘break’ this pattern in different ways?
```

```
note(c afe).s(piano)
```

```
note("c a f e")s("piano")
```

```
note\["c a f e"\].s{"piano"}

Ok, none of these seem to work…
```

```
s("piano").note("c a f e")

This one does work, but now we only hear the first note…

So what is going on here?
```
# Functions, arguments and chaining

So far, we’ve seen the following syntax:

```
xxx("foo").yyy("bar")
```

Generally, `xxx` and `yyy` are called [_functions_](https://en.wikipedia.org/wiki/Function_(computer_programming)), while `foo` and `bar` are called function [_arguments_ or _parameters_](https://en.wikipedia.org/wiki/Parameter_(computer_programming)).
So far, we’ve used the functions to declare which aspect of the sound we want to control, and their arguments for the actual data.
The `yyy` function is called a [_chained_ function](https://en.wikipedia.org/wiki/Method_chaining), because it is appended with a dot ( `.`).

Generally, the idea with chaining is that code such as `a("this").b("that").c("other")` allows `a`, `b` and `c` functions to happen in a specified order, without needing to write them as three separate lines of code.
You can think of this as being similar to chaining audio effects together using guitar pedals or digital audio effects.

Strudel makes heavy use of chained functions. Here is a more sophisticated example:

```
note("a3 c#4 e4 a4")

.s("sawtooth")

.cutoff(500)

//.delay(0.5)

.room(0.5)
```
# Comments

The `//` in the example above is a line comment, resulting in the `delay` function being ignored.
It is a handy way to quickly turn code on and off.
Try uncommenting this line by deleting `//` and refreshing the pattern.
You can also use the keyboard shortcut `cmd-/` to toggle comments on and off.

You might noticed that some comments in the REPL samples include some words starting with a ”@”, like `@by` or `@license`.
Those are just a convention to define some information about the music. We will talk about it in the [Music metadata](https://strudel.cc/learn/metadata/) section.

# Strings

Ok, so what about the content inside the quotes (e.g. `"c a f e"`)?
In JavaScript, as in most programming languages, this content is referred to as being a [_string_](https://en.wikipedia.org/wiki/String_(computer_science)).
A string is simply a sequence of individual characters.
In TidalCycles, double quoted strings are used to write _patterns_ using the mini-notation, and you may hear the phrase _pattern string_ from time to time.
If you want to create a regular string and not a pattern, you can use single quotes, e.g. `'C minor'` will not be parsed as Mini Notation.

The good news is, that this covers most of the JavaScript syntax needed for Strudel!
---

### Unknown Title

**Source:** https://strudel.cc/learn/conditional-modifiers

# Conditional Modifiers

## lastOf

Applies the given function every n cycles, starting from the last cycle.

- n (number): how many cycles
- func (function): function to apply

```
note("c3 d3 e3 g3").lastOf(4,x=>x.rev())
```
## firstOf

Applies the given function every n cycles, starting from the first cycle.

- n (number): how many cycles
- func (function): function to apply

```
note("c3 d3 e3 g3").firstOf(4, x=>x.rev())
```
## when

Applies the given function whenever the given pattern is in a true state.

- binary\_pat (Pattern):
- func (function):

```
"c3 eb3 g3".when("<0 1>/2",x=>x.sub("5")).note()
```
## chunk

Synonyms: `slowChunk, slowchunk`

Divides a pattern into a given number of parts, then cycles through those parts in turn, applying the given function to each part in turn (one part per cycle).

```
"0 1 2 3".chunk(4,x=>x.add(7))

.scale("A:minor").note()
```
### chunkBack

Synonyms: `chunkback`

Like `chunk`, but cycles through the parts in reverse order. Known as chunk' in tidalcycles

```
"0 1 2 3".chunkBack(4, x=>x.add(7))
.scale("A:minor").note()
```
### fastChunk

Synonyms: `fastchunk`

Like `chunk`, but the cycles of the source pattern aren't repeated
for each set of chunks.

```
"<0 8> 1 2 3 4 5 6 7"

.fastChunk(4,x=>x.color('red')).slow(2)

.scale("C2:major").note()
```
## arp

Selects indices in in stacked notes.

```
note("<[c,eb,g]!2 [c,f,ab] [d,f,ab]>")
.arp("0 [0,2] 1 [0,2]")
```
## arpWith 🧪

Selects indices in in stacked notes.

```
note("<\[c,eb,g\]!2 \[c,f,ab\] \[d,f,ab\]>")

.arpWith(haps=>haps\[2\])
```
## struct

Applies the given structure to the pattern:

```
note("c,eb,g")
 .struct("x ~ x ~ ~ x ~ x ~ ~ ~ x ~ x ~ ~")
 .slow(2)
```
## mask

Returns silence when mask is 0 or "~"

```
note("c [eb,g] d [eb,g]").mask("<1 [0 1]>")
```
## reset

Resets the pattern to the start of the cycle for each onset of the reset pattern.

```
s("[<bd lt> sd]*2, hh*8").reset("<x@3 x(5,8)>")
```
## restart

Restarts the pattern for each onset of the restart pattern.
While reset will only reset the current cycle, restart will start from cycle 0.

```
s("[<bd lt> sd]*2, hh*8").restart("<x@3 x(5,8)>")
```
## hush

Silences a pattern.

```
stack(
 s("bd").hush(),
 s("hh*3")
)
```
## invert

Synonyms: `inv`

Swaps 1s and 0s in a binary pattern.

```
s("bd").struct("1 0 0 1 0 0 1 0".lastOf(4, invert))
```
## pick

Picks patterns (or plain values) either from a list (by index) or a lookup table (by name).
Similar to `inhabit`, but maintains the structure of the original patterns.

- pat (Pattern):
- xs (\*):

```
note("<0 1 2!2 3>".pick(["g a", "e f", "f g f g" , "g c d"]))
```

```
sound("<0 1 [2,0]>".pick(["bd sd", "cp cp", "hh hh"]))
```

```
sound("<0!2 [0,1] 1>".pick(["bd(3,8)", "sd sd"]))
```

```
s("<a!2 [a,b] b>".pick({a: "bd(3,8)", b: "sd sd"}))
```
## pickmod

The same as `pick`, but if you pick a number greater than the size of the list,
it wraps around, rather than sticking at the maximum value.
For example, if you pick the fifth pattern of a list of three, you'll get the
second one.

- pat (Pattern):
- xs (\*):

## pickF

pickF lets you use a pattern of numbers to pick which function to apply to another pattern.

- pat (Pattern):
- lookup (Pattern): a pattern of indices
- funcs (Array.<function()>): the array of functions from which to pull

```
s("bd [rim hh]").pickF("<0 1 2>", [rev,jux(rev),fast(2)])
```

```
note("<c2 d2>(3,8)").s("square")
 .pickF("<0 2> 1", [jux(rev),fast(2),x=>x.lpf(800)])
```
## pickmodF

The same as `pickF`, but if you pick a number greater than the size of the functions list,
it wraps around, rather than sticking at the maximum value.

- pat (Pattern):
- lookup (Pattern): a pattern of indices
- funcs (Array.<function()>): the array of functions from which to pull

## pickRestart

Similar to `pick`, but the choosen pattern is restarted when its index is triggered.

- pat (Pattern):
- xs (\*):

## pickmodRestart

The same as `pickRestart`, but if you pick a number greater than the size of the list,
it wraps around, rather than sticking at the maximum value.

- pat (Pattern):
- xs (\*):

```
"<a@2 b@2 c@2 d@2>".pickRestart({
 a: n("0 1 2 0"),
 b: n("2 3 4 ~"),
 c: n("[4 5] [4 3] 2 0"),
 d: n("0 -3 0 ~")
 }).scale("C:major").s("piano")
```
## pickReset

Similar to `pick`, but the choosen pattern is reset when its index is triggered.

- pat (Pattern):
- xs (\*):

## pickmodReset

The same as `pickReset`, but if you pick a number greater than the size of the list,
it wraps around, rather than sticking at the maximum value.

- pat (Pattern):
- xs (\*):

## inhabit

Synonyms: `pickSqueeze`

Picks patterns (or plain values) either from a list (by index) or a lookup table (by name).
Similar to `pick`, but cycles are squeezed into the target ('inhabited') pattern.

- pat (Pattern):
- xs (\*):

```
"<a b [a,b]>".inhabit({a: s("bd(3,8)"),
 b: s("cp sd")
 })
```

```
s("a@2 [a b] a".inhabit({a: "bd(3,8)", b: "sd sd"})).slow(4)
```
## inhabitmod

Synonyms: `pickmodSqueeze`

The same as `inhabit`, but if you pick a number greater than the size of the list,
it wraps around, rather than sticking at the maximum value.
For example, if you pick the fifth pattern of a list of three, you'll get the
second one.

- pat (Pattern):
- xs (\*):

## squeeze

Pick from the list of values (or patterns of values) via the index using the given
pattern of integers. The selected pattern will be compressed to fit the duration of the selecting event

- pat (Pattern):
- xs (\*):

```
note(squeeze("<0@2 [1!2] 2>", ["g a", "f g f g" , "g a c d"]))
```

After Conditional Modifiers, let’s see what [Accumulation Modifiers](https://strudel.cc/learn/accumulation/) have to offer.

- [Conditional Modifiers](https://strudel.cc/learn/conditional-modifiers/#conditional-modifiers)

- [lastOf](https://strudel.cc/learn/conditional-modifiers/#lastof)

- [firstOf](https://strudel.cc/learn/conditional-modifiers/#firstof)

- [when](https://strudel.cc/learn/conditional-modifiers/#when)

- [chunk](https://strudel.cc/learn/conditional-modifiers/#chunk)

- [chunkBack](https://strudel.cc/learn/conditional-modifiers/#chunkback)

- [fastChunk](https://strudel.cc/learn/conditional-modifiers/#fastchunk)

- [arp](https://strudel.cc/learn/conditional-modifiers/#arp)

- [arpWith 🧪](https://strudel.cc/learn/conditional-modifiers/#arpwith-)

- [struct](https://strudel.cc/learn/conditional-modifiers/#struct)

- [mask](https://strudel.cc/learn/conditional-modifiers/#mask)

- [reset](https://strudel.cc/learn/conditional-modifiers/#reset)

- [restart](https://strudel.cc/learn/conditional-modifiers/#restart)

- [hush](https://strudel.cc/learn/conditional-modifiers/#hush)

- [invert](https://strudel.cc/learn/conditional-modifiers/#invert)

- [pick](https://strudel.cc/learn/conditional-modifiers/#pick)

- [pickmod](https://strudel.cc/learn/conditional-modifiers/#pickmod)

- [pickF](https://strudel.cc/learn/conditional-modifiers/#pickf)

- [pickmodF](https://strudel.cc/learn/conditional-modifiers/#pickmodf)

- [pickRestart](https://strudel.cc/learn/conditional-modifiers/#pickrestart)
---

### Unknown Title

**Source:** https://strudel.cc/learn/csound

# Using CSound with Strudel

🧪 Strudel has experimental support for csound, using [@csound/browser](https://www.npmjs.com/package/@csound/browser).

## Importing .orc files

To use existing csound instruments, you can load and use an orc file from an URL like this:

```
// livecode.orc by Steven Yi

awaitloadOrc('github:kunstmusik/csound-live-code/master/livecode.orc')

note("c a f e").csound('FM1')

Note that the above url uses the `github:` shortcut, which resolves to the raw file on github, but you can use any URL you like.

The awesome [`livecode.orc by Steven Yi`](https://github.com/kunstmusik/csound-live-code) comes packed with many sounds ready for use:
```

```
// livecode.orc by Steven Yi

awaitloadOrc('github:kunstmusik/csound-live-code/master/livecode.orc')

note("c a f e").csound(cat(

"Sub1",// Substractive Synth, 3osc

"Sub2",// Subtractive Synth, two saws, fifth freq apart

"Sub3",// Subtractive Synth, three detuned saws, swells in
```

"Sub4",// Subtractive Synth, detuned square/saw, stabby. Nice as a lead in octave 2, nicely grungy in octave -2, -1

"Sub5",// Subtractive Synth, detuned square/triangle

"Sub6",// Subtractive Synth, saw, K35 filters

"Sub7",// Subtractive Synth, saw + tri, K35 filters

"Sub8",// Subtractive Synth, square + saw + tri, diode ladder filter

"SynBrass",// SynthBrass subtractive synth

"SynHarp",// Synth Harp subtracitve Synth

"SSaw",// SuperSaw sound using 9 bandlimited saws (3 sets of detuned saws at octaves)

"Mode1",// Modal Synthesis Instrument: Percussive/organ-y sound

"Plk",// Pluck sound using impulses, noise, and waveguides

"Organ1",// Wavetable Organ sound using additive synthesis

"Organ2",// Organ sound based on M1 Organ 2 patch

"Organ3",// Wavetable Organ using Flute 8' and Flute 4', wavetable based on Claribel Flute http://www.pykett.org.uk/the\_tonal\_structure\_of\_organ\_flutes.htm

"Bass",// Subtractive Bass sound

"ms20\_bass",// MS20-style Bass Sound

"VoxHumana",// VoxHumana Patch

"FM1",// FM 3:1 C:M ratio, 2->0.025 index, nice for bass

"Noi",// Filtered noise, exponential envelope

"Wobble",// Wobble patched based on Jacob Joaquin's "Tempo-Synced Wobble Bass"

"Sine",// Simple Sine-wave instrument with exponential envelope

"Square",// Simple Square-wave instrument with exponential envelope

"Saw",// Simple Sawtooth-wave instrument with exponential envelope

"Squine1",// Squinewave Synth, 2 osc

"Form1",// Formant Synth, buzz source, soprano ah formants

"Mono",// Monophone synth using sawtooth wave and 4pole lpf. Use "start("Mono") to run the monosynth, then use MonoNote instrument to play the instrument.

"MonoNote",// Note playing instrument for Mono synth. Be careful to use this and not try to create multiple Mono instruments!

"Click",// Bandpass-filtered impulse glitchy click sound. p4 = center frequency (e.g., 3000, 6000)

"NoiSaw",// Highpass-filtered noise+saw sound. Use NoiSaw.cut channel to adjust cutoff.

"Clap",// Modified clap instrument by Istvan Varga (clap1.orc)

"BD",// Bass Drum - From Iain McCurdy's TR-808.csd

"SD",// Snare Drum - From Iain McCurdy's TR-808.csd

"OHH",// Open High Hat - From Iain McCurdy's TR-808.csd

"CHH",// Closed High Hat - From Iain McCurdy's TR-808.csd

"HiTom",// High Tom - From Iain McCurdy's TR-808.csd

"MidTom",// Mid Tom - From Iain McCurdy's TR-808.csd

"LowTom",// Low Tom - From Iain McCurdy's TR-808.csd

"Cymbal",// Cymbal - From Iain McCurdy's TR-808.csd

"Rimshot",// Rimshot - From Iain McCurdy's TR-808.csd

"Claves",// Claves - From Iain McCurdy's TR-808.csd

"Cowbell",// Cowbell - From Iain McCurdy's TR-808.csd

"Maraca",// Maraca - from Iain McCurdy's TR-808.csd

"HiConga",// High Conga - From Iain McCurdy's TR-808.csd

"MidConga",// Mid Conga - From Iain McCurdy's TR-808.csd

"LowConga",// Low Conga - From Iain McCurdy's TR-808.csd

))

## Writing your own instruments

You can define your own instrument(s) with `loadCsound` like this:

awaitloadCsound\`

instr CoolSynth

iduration = p3

ifreq = p4

igain = p5

ioct = octcps(ifreq)

kpwm = oscili(.05, 8)

asig = vco2(igain, ifreq, 4, .5 + kpwm)

asig += vco2(igain, ifreq \* 2)

idepth = 2

acut = transegr:a(0, .005, 0, idepth, .06, -4.2, 0.001, .01, -4.2, 0) ; filter envelope

asig = zdf\_2pole(asig, cpsoct(ioct + acut + 2), 0.5)

iattack = .01

isustain = .5

idecay = .1

irelease = .1

asig \*= linsegr:a(0, iattack, 1, idecay, isustain, iduration, isustain, irelease, 0)

out(asig, asig)

endin\`

"<0 2 \[4 6\](3,4,2) 3\*2>"

.off(1/4,add(2))

.off(1/2,add(6))

.scale('D minor')

.note()

.csound('CoolSynth')

## Parameters

The `.csound` function sends the following p values:

| | |
| --- | --- |
| p1 | instrument name e.g. `CoolSynth` |
| p2 | time offset, when it should play |
| p3 | the duration of the event / hap |
| p4 | frequency in Hertz |
| p5 | normalized `gain`, 0-1 |

There is an alternative `.csoundm` function with a different flavor:

| | |
| --- | --- |
| p4 | midi key number, unrounded, 0-127 |
| p5 | midi velocity, 0-127 |

In both cases, p4 is derived from the value of `freq` or `note`.

## Limitations / Future Plans

Apart from the above listed p values, no other parameter can be patterned so far.
This also means that [audio effects](https://strudel.cc/learn/effects/) will not work.
In the future, the integration could be improved by passing all patterned control parameters to the csound instrument.
This could work by a unique [channel](https://kunstmusik.github.io/icsc2022-csound-web/tutorial2-interacting-with-csound/#step-4---writing-continuous-data-channels)

for each value. Channels could be read [like this](https://github.com/csound/csound/blob/master/Android/CsoundForAndroid/CsoundAndroidExamples/src/main/res/raw/multitouch_xy.csd).
Also, it might make sense to have a standard library of csound instruments for strudel’s effects.

Now, let’s dive into the [Functional JavaScript API](https://strudel.cc/functions/intro/)
---

### Unknown Title

**Source:** https://strudel.cc/learn/devicemotion

# Device Motion

Devicemotion module allows you to use your mobile device’s motion sensors (accelerometer, gyroscope, and orientation sensors) to control musical parameters in real-time. This creates opportunities for expressive, movement-based musical interactions.

## Basic Setup

First, you need to enable device motion sensing:

```
enableMotion()

This will prompt the user for permission to access device motion sensors.
```
## Available Motion Parameters

You can access different types of motion data:

| Motion | Long Names & Aliases | Description |
| --- | --- | --- |
| Acceleration | accelerationX (accX), accelerationY (accY), accelerationZ (accZ) | Measures linear acceleration of the device, excluding gravity. Raw values are normalized from g-force. |
| Gravity | gravityX (gravX), gravityY (gravY), gravityZ (gravZ) | Indicates device’s orientation relative to Earth’s gravity. Raw values are normalized from ±9.81 m/s². |
| Rotation | rotationAlpha (rotA, rotZ), rotationBeta (rotB, rotX), rotationGamma (rotG, rotY) | Measures rotation rate around each axis. Raw values (±180°/s) are normalized. |
| Orientation | orientationAlpha (oriA, oriZ), orientationBeta (oriB, oriX), orientationGamma (oriG, oriY) | Relative orientation from its starting device position. Normalized from:<br>\- Alpha: 0° to 360°<br>\- Beta: -180° to 180°<br>\- Gamma: -90° to 90° |
| Absolute Orientation | absoluteOrientationAlpha (absOriA, absOriZ), absoluteOrientationBeta (absOriB, absOriX), absoluteOrientationGamma (absOriG, absOriY) | **Not available for iOS**<br> Earth-referenced orientation using magnetometer. Same normalization as Orientation. |

Note:

- All motion values are normalized to a range of 0 to 1.
- Not all devices have the same sensors available
Check [DeviceMotionEvent API](https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent) for browser compatibility
- Refer to [Oritentation and motion data explained](https://developer.mozilla.org/en-US/docs/Web/API/Device_orientation_events/Orientation_and_motion_data_explained) for more details

### Orientation vs Absolute Orientation

The key difference between regular orientation and absolute orientation is:

- Regular orientation ( `oriX/Y/Z`) measures relative changes in device orientation from its starting position
- Absolute orientation ( `absOriX/Y/Z`) measures orientation relative to Earth’s magnetic field and gravity, providing consistent absolute values regardless of starting position

For example, if you rotate your device 90 degrees clockwise and then back:

- Regular orientation will show a change during rotation but return to initial values
- Absolute orientation will show the actual compass heading throughout

This makes absolute orientation particularly useful for creating direction-based musical interactions - for example, performers facing north could play one melody while those facing south play another, creating spatially-aware ensemble performances. Regular orientation, on the other hand, is better suited for detecting relative motion and gestures regardless of which direction the performer is facing.

## Basic Example

Here’s a simple example that uses device motion to control a synthesizer:

```
enableMotion()

// Create a simple melody

$:n("0 1 3 5")

.scale("C:major")

// Use tilt (gravity) to control filter

.lpf(gravityY.range(200,2000))// tilt forward/back for filter cutoff
```

// Use rotation to control effects

.room(rotZ.range(0,0.8))// rotate device for reverb amount

.gain(oriX.range(0.2,0.8))// tilt left/right for volume

.sound("sawtooth")

## Tips for Using Motion Controls

1. Use `.range(min, max)` to map sensor values to musically useful ranges
2. Consider using `.segment()` to smooth out rapid changes in sensor values

## Debugging

You can use `segment(16).log()` to see the raw values from any motion sensor:

```
$_: accX.segment(16).log(); // logs acceleration values to the console
```

This is helpful when calibrating your ranges and understanding how your device responds to different movements.

Remember that device motion works best on mobile devices and may not be available on all desktop browsers. Always test your motion-controlled pieces on the target device type!
---

### Unknown Title

**Source:** https://strudel.cc/learn/effects

# Audio Effects

Whether you’re using a synth or a sample, you can apply any of the following built-in audio effects.
As you might suspect, the effects can be chained together, and they accept a pattern string as their argument.

# Signal chain

![](https://strudel.cc/img/strudel-signal-flow.png)

The signal chain in Strudel is as follows:

- An sound-generating event is triggered by a pattern
 - This has a start time and a duration, which is usually
 controlled by the note length and ADSR parameters
 - If we exceed the max polyphony, old sounds begin to die off
 - Muted sounds (one whose `s` value is `-`, `~`, or `_`) are skipped
- A sound is produced (through, say, a sample or an oscillator)
 - This is where detune-based effects (like `detune`, `penv`, etc. occur)
- The following will occur _in order_ and only if they’ve been called in the pattern. Note that all of these are
single use effects, meaning that multiple occurrences of them in a pattern will simply override the values
(e.g. you can’t do `s("bd").lpf(100).distort(2).lpf(800)` to lowpass, distort, and then lowpass
again)

 - Phase vocoder ( `stretch`)
 - Gain is applied ( `gain`)

 - This is where the main (volume) ADSR happens
 - A lowpass filter ( `lpf`)
 - A highpass filter ( `hpf`)
 - A bandpass filter ( `bandpass`)
 - A vowel filter ( `vowel`)
 - Sample rate reduction ( `coarse`)
 - Bit crushing ( `crush`)
 - Waveshape distortion ( `shape`)
 - Normal distortion ( `distort`)
 - Tremolo ( `tremolo`)
 - Compressor ( `compressor`)
 - Panning ( `pan`)
 - Phaser ( `phaser`)
 - Postgain ( `post`)
- The sound is then split into multiple destinations
 - Dry output (amount controlled by `dry` parameter)
 - The sends
 - Analyzers
 - These are used for tooling like `scope` and `spectrum` and their setup usually happens behind the scenes
 - Delay (amount controlled by `delay` parameter)
 - Reverb (amount controlled by `room` parameter)
- The dry output, delay, and reverb are joined into what is called the “orbit” of the pattern (see more in the section below)
 - The `duck` effect affects the volume of all signals in the orbit
 - The orbit is then sent to the mixer

## Orbits

Orbits are the way in which outputs are handled in Strudel. They also prescribe which delay and reverb to associate with the dry signal.
By default, all orbits are mixed down to channels `1` and `2` in stereo, however with the “Multi Channel Orbits” setting
(under Settings at the right) you can use them as individual 2 channel stereo outs (orbit `i` will be mapped to
to channels `2i` and `2i + 1`). You can then use routers like Blackhole 16 to retrieve and record all of the channels in a DAW for later processing.

The default orbit is `1` and it is set with `orbit`. You may send a sound to multiple orbits via mininotation

```
s("white").orbit("2,3,4").gain(0.2)
```

but please be careful as this will create three copies of the sound behind the scenes, meaning that if they are mixed
down to a single output, they will triple the volume. We’ve reduced the gain here to save your ears.

⚠️ There is only one delay and reverb per orbit, so please be aware that if you attempt to change the parameters on two
patterns pointing to the same orbit, it can lead to unpredictable results. Compare, for example, this pretty pluck
with a large reverb:

```
$: s("triangle*4").decay(0.5).n(irand(12)).scale('C minor')
.room(1).roomsize(10)
```

versus the same pluck with a muted kick drum coming in and overwriting the `roomsize` value:

```
$: s("triangle*4").decay(0.5).n(irand(12)).scale('C minor')
.room(1).roomsize(10)

$: s("bd*4").room(0.01).roomsize(0.01).postgain(0)
```

This is due to them sharing the same orbit: the default of `1`. It can be corrected simply by updating the orbits to be
distinct:

```
$: s("triangle*4").decay(0.5).n(irand(12)).scale('C minor')
.room(1).roomsize(10).orbit(2)

$: s("bd*4").room(0.01).roomsize(0.01).postgain(0)
```
## Continuous changes

As all of the above is triggered by a _sound occurring_, it is often the case that parameters may not be
modified continuously in time. For example,

```
s("supersaw").lpf(tri.range(100, 5000).slow(2))
```

Will not produce a continually LFO’d low-pass filter due to the `tri` only being sampled every time the note hits
(in this case the default of once per cycle). You can fake it by introducing more sound-generating events, e.g.:

```
s("supersaw").seg(16).lpf(tri.range(100, 5000).slow(2))
```

Some parameters _do_ induce continuous variations in time, though:

- The ADSR curve (governed by `attack`, `sustain`, `decay`, `release`)
- The pitch envelope curve (governed by `penv` and its associated ADSR)
- The FM curve ( `fmenv`)
- The filter envelopes ( `lpenv`, `hpenv`, `bpenv`)
- Tremolo ( `tremolo`)
- Phaser ( `phaser`)
- Vibrato ( `vib`)
- Ducking ( `duckorbit`)

# Filters

Filters are an essential building block of [subtractive synthesis](https://en.wikipedia.org/wiki/Subtractive_synthesis).
Strudel comes with 3 types of filters:

- low-pass filter: low frequencies may _pass_, high frequencies are cut off
- high-pass filter: high frequencies may _pass_, low frequencies are cut off
- band-pass filters: only a frequency band may _pass_, low and high frequencies around are cut off

Each filter has 2 parameters:

- cutoff: the frequency at which the filter starts to work. e.g. a low-pass filter with a cutoff of 1000Hz allows frequencies below 1000Hz to pass.
- q-value: Controls the resonance of the filter. Higher values sound more aggressive. Also see [Q-Factor](https://en.wikipedia.org/wiki/Q_factor)

## lpf

Synonyms: `cutoff, ctf, lp`

Applies the cutoff frequency of the **l** ow- **p** ass **f** ilter.

When using mininotation, you can also optionally add the 'lpq' parameter, separated by ':'.

- frequency (number\|Pattern): audible between 0 and 20000

```
s("bd sd [~ bd] sd,hh*6").lpf("<4000 2000 1000 500 200 100>")
```

```
s("bd*16").lpf("1000:0 1000:10 1000:20 1000:30")
```
## lpq

Synonyms: `resonance`

Controls the **l** ow- **p** ass **q**-value.

- q (number\|Pattern): resonance factor between 0 and 50

```
s("bd sd [~ bd] sd,hh*8").lpf(2000).lpq("<0 10 20 30>")
```
## hpf

Synonyms: `hp, hcutoff`

Applies the cutoff frequency of the **h** igh- **p** ass **f** ilter.

When using mininotation, you can also optionally add the 'hpq' parameter, separated by ':'.

- frequency (number\|Pattern): audible between 0 and 20000

```
s("bd sd [~ bd] sd,hh*8").hpf("<4000 2000 1000 500 200 100>")
```

```
s("bd sd [~ bd] sd,hh*8").hpf("<2000 2000:25>")
```
## hpq

Synonyms: `hresonance`

Controls the **h** igh- **p** ass **q**-value.

- q (number\|Pattern): resonance factor between 0 and 50

```
s("bd sd [~ bd] sd,hh*8").hpf(2000).hpq("<0 10 20 30>")
```
## bpf

Synonyms: `bandf, bp`

Sets the center frequency of the **b** and- **p** ass **f** ilter. When using mininotation, you
can also optionally supply the 'bpq' parameter separated by ':'.

- frequency (number\|Pattern): center frequency

```
s("bd sd [~ bd] sd,hh*6").bpf("<1000 2000 4000 8000>")
```
## bpq

Synonyms: `bandq`

Sets the **b** and- **p** ass **q**-factor (resonance).

- q (number\|Pattern): q factor

```
s("bd sd [~ bd] sd").bpf(500).bpq("<0 1 2 3>")
```
## ftype

Sets the filter type. The ladder filter is more aggressive. More types might be added in the future.

- type (number\|Pattern): 12db (0), ladder (1), or 24db (2)

```
note("{f g g c d a a#}%8").s("sawtooth").lpenv(4).lpf(500).ftype("<0 1 2>").lpq(1)

```

```
note("c f g g a c d4").fast(2)

.sound('sawtooth')

.lpf(200).fanchor(0)

.lpenv(3).lpq(1)

.ftype("<ladder 12db 24db>")
```
## vowel

Formant filter to make things sound like vowels.

- vowel (string\|Pattern): You can use a e i o u ae aa oe ue y uh un en an on, corresponding to \[a\] \[e\] \[i\] \[o\] \[u\] \[æ\] \[ɑ\] \[ø\] \[y\] \[ɯ\] \[ʌ\] \[œ̃\] \[ɛ̃\] \[ɑ̃\] \[ɔ̃\]. Aliases: aa = å = ɑ, oe = ø = ö, y = ı, ae = æ.

```
note("[c2 <eb2 <g2 g1>>]*2").s('sawtooth')
.vowel("<a e i <o u>>")
```

```
s("bd sd mt ht bd [~ cp] ht lt").vowel("[a|e|i|o|u]")
```
# Amplitude Modulation

Amplitude modulation changes the amplitude (gain) periodically over time.

## am

## tremolosync

Synonyms: `tremsync`

modulate the amplitude of a sound with a continuous waveform

- cycles (number\|Pattern): modulation speed in cycles

```
note("d d d# d".fast(4)).s("supersaw").tremolosync("4").tremoloskew("<1 .5 0>")

```
## tremolodepth

Synonyms: `tremdepth`

depth of amplitude modulation

- depth (number\|Pattern):

```
note("a1 a1 a#1 a1".fast(4)).s("pulse").tremsync(4).tremolodepth("<1 2 .7>")

```
## tremoloskew

Synonyms: `tremskew`

alter the shape of the modulation waveform

- amount (number\|Pattern): between 0 &amp; 1, the shape of the waveform

```
note("{f a c e}%16").s("sawtooth").tremsync(4).tremoloskew("<.5 0 1>")
```
## tremolophase

Synonyms: `tremphase`

alter the phase of the modulation waveform

- offset (number\|Pattern): the offset in cycles of the modulation

```
note("{f a c e}%16").s("sawtooth").tremsync(4).tremolophase("<0 .25 .66>")
```
## tremoloshape

shape of amplitude modulation

- shape (number\|Pattern): tri \| square \| sine \| saw \| ramp

```
note("{f g c d}%16").tremsync(4).tremoloshape("<sine tri square>").s("sawtooth")
```
# Amplitude Envelope

The amplitude [envelope](https://en.wikipedia.org/wiki/Envelope_(music)) controls the dynamic contour of a sound.
Strudel uses ADSR envelopes, which are probably the most common way to describe an envelope:

![ADSR](https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/ADSR_parameter.svg/1920px-ADSR_parameter.svg.png)

[image link](https://commons.wikimedia.org/wiki/File:ADSR_parameter.svg)

## attack

Synonyms: `att`

Amplitude envelope attack time: Specifies how long it takes for the sound to reach its peak value, relative to the onset.

- attack (number\|Pattern): time in seconds.

```
note("c3 e3 f3 g3").attack("<0 .1 .5>")
```
## decay

Synonyms: `dec`

Amplitude envelope decay time: the time it takes after the attack time to reach the sustain level.
Note that the decay is only audible if the sustain value is lower than 1.

- time (number\|Pattern): decay time in seconds

```
note("c3 e3 f3 g3").decay("<.1 .2 .3 .4>").sustain(0)
```
## sustain

Synonyms: `sus`

Amplitude envelope sustain level: The level which is reached after attack / decay, being sustained until the offset.

- gain (number\|Pattern): sustain level between 0 and 1

```
note("c3 e3 f3 g3").decay(.2).sustain("<0 .1 .4 .6 1>")
```
## release

Synonyms: `rel`

Amplitude envelope release time: The time it takes after the offset to go from sustain level to zero.

- time (number\|Pattern): release time in seconds

```
note("c3 e3 g3 c4").release("<0 .1 .4 .6 1>/2")
```
## adsr

ADSR envelope: Combination of Attack, Decay, Sustain, and Release.

- time (number\|Pattern): attack time in seconds
- time (number\|Pattern): decay time in seconds
- gain (number\|Pattern): sustain level (0 to 1)
- time (number\|Pattern): release time in seconds

```
note("[c3 bb2 f3 eb3]*2").sound("sawtooth").lpf(600).adsr(".1:.1:.5:.2")
```
# Filter Envelope

Each filter can receive an additional filter envelope controlling the cutoff value dynamically. It uses an ADSR envelope similar to the one used for amplitude. There is an additional parameter to control the depth of the filter modulation: `lpenv` \| `hpenv` \| `bpenv`. This allows you to play subtle or huge filter modulations just the same by only increasing or decreasing the depth.

```
note("[c eb g <f bb>](3,8,<0 1>)".sub(12))
.s("<sawtooth>/64")
.lpf(sine.range(300,2000).slow(16))
.lpa(0.005)
.lpd(perlin.range(.02,.2))
.lps(perlin.range(0,.5).slow(3))
.lpq(sine.range(2,10).slow(32))
.release(.5)
.lpenv(perlin.range(1,8).slow(2))
.ftype('24db')
.room(1)
.juxBy(.5,rev)
.sometimes(add(note(12)))
.stack(s("bd*2").bank('RolandTR909'))
.gain(.5).fast(2)
```

There is one filter envelope for each filter type and thus one set of envelope filter parameters preceded either by `lp`, `hp` or `bp`:

- `lpattack`, `lpdecay`, `lpsustain`, `lprelease`, `lpenv`: filter envelope for the lowpass filter.

 - alternatively: `lpa`, `lpd`, `lps`, `lpr` and `lpe`.
- `hpattack`, `hpdecay`, `hpsustain`, `hprelease`, `hpenv`: filter envelope for the highpass filter.

 - alternatively: `hpa`, `hpd`, `hps`, `hpr` and `hpe`.
- `bpattack`, `bpdecay`, `bpsustain`, `bprelease`, `bpenv`: filter envelope for the bandpass filter.

 - alternatively: `bpa`, `bpd`, `bps`, `bpr` and `bpe`.

## lpattack

Synonyms: `lpa`

Sets the attack duration for the lowpass filter envelope.

- attack (number\|Pattern): time of the filter envelope

```
note("c2 e2 f2 g2")

.sound('sawtooth')

.lpf(300)

.lpa("<.5 .25 .1 .01>/4")

.lpenv(4)
```
## lpdecay

Synonyms: `lpd`

Sets the decay duration for the lowpass filter envelope.

- decay (number\|Pattern): time of the filter envelope

```
note("c2 e2 f2 g2")

.sound('sawtooth')

.lpf(300)

.lpd("<.5 .25 .1 0>/4")

.lpenv(4)
```
## lpsustain

Synonyms: `lps`

Sets the sustain amplitude for the lowpass filter envelope.

- sustain (number\|Pattern): amplitude of the lowpass filter envelope

```
note("c2 e2 f2 g2")

.sound('sawtooth')

.lpf(300)

.lpd(.5)

.lps("<0 .25 .5 1>/4")

.lpenv(4)
```
## lprelease

Synonyms: `lpr`

Sets the release time for the lowpass filter envelope.

- release (number\|Pattern): time of the filter envelope

```
note("c2 e2 f2 g2")
.sound('sawtooth')
.clip(.5)
.lpf(300)
.lpenv(4)
.lpr("<.5 .25 .1 0>/4")
.release(.5)
```
## lpenv

Synonyms: `lpe`

Sets the lowpass filter envelope modulation depth.

- modulation (number\|Pattern): depth of the lowpass filter envelope between 0 and n

```
note("c2 e2 f2 g2")
.sound('sawtooth')
.lpf(300)
.lpa(.5)
.lpenv("<4 2 1 0 -1 -2 -4>/4")
```
# Pitch Envelope

You can also control the pitch with envelopes!
Pitch envelopes can breathe life into static sounds:

```
n("<-4,0 5 2 1>\*<2!3 4>")

.scale("<C F>/8:pentatonic")

.s("gm\_electric\_guitar\_jazz")

.penv("<.5 0 7 -2>\*2").vib("4:.1")

.phaser(2).delay(.25).room(.3)

.size(4).fast(1.5)
```

You also create some lovely chiptune-style sounds:

```
n(run("<4 8>/16")).jux(rev)
.chord("<C^7 <Db^7 Fm7>>")
.dict('ireal')
.voicing().add(note("<0 1>/8"))
.dec(.1).room(.2)
.segment("<4 [2 8]>")
.penv("<0 <2 -2>>").patt(.02).fast(2)
```

Let’s break down all pitch envelope controls:

## pattack

Synonyms: `patt`

Attack time of pitch envelope.

- time (number\|Pattern): time in seconds

```
note("c eb g bb").pattack("0 .1 .25 .5").slow(2)
```
## pdecay

Synonyms: `pdec`

Decay time of pitch envelope.

- time (number\|Pattern): time in seconds

```
note("<c eb g bb>").pdecay("<0 .1 .25 .5>")
```
## prelease

Synonyms: `prel`

Release time of pitch envelope

- time (number\|Pattern): time in seconds

```
note("<c eb g bb> ~")

.release(.5)// to hear the pitch release

.prelease("<0 .1 .25 .5>")
```
## penv

Amount of pitch envelope. Negative values will flip the envelope.
If you don't set other pitch envelope controls, `pattack:.2` will be the default.

- semitones (number\|Pattern): change in semitones

```
note("c")
.penv("<12 7 1 .5 0 -1 -7 -12>")
```
## pcurve

Curve of envelope. Defaults to linear. exponential is good for kicks

- type (number\|Pattern): 0 = linear, 1 = exponential

```
note("g1*4")
.s("sine").pdec(.5)
.penv(32)
.pcurve("<0 1>")
```
## panchor

Sets the range anchor of the envelope:

- anchor 0: range = \[note, note + penv\]
- anchor 1: range = \[note - penv, note\]
If you don't set an anchor, the value will default to the psustain value.

- anchor (number\|Pattern): anchor offset

```
note("c c4").penv(12).panchor("<0 .5 1 .5>")
```
# Dynamics

## gain

Controls the gain by an exponential amount.

- amount (number\|Pattern): gain.

```
s("hh\*8").gain(".4!2 1 .4!2 1 .4 1").fast(2)
```
## velocity

Sets the velocity from 0 to 1. Is multiplied together with gain.

```
s("hh\*8")

.gain(".4!2 1 .4!2 1 .4 1")

.velocity(".4 1")
```
## compressor

Dynamics Compressor. The params are `compressor("threshold:ratio:knee:attack:release")`
More info [here](https://developer.mozilla.org/en-US/docs/Web/API/DynamicsCompressorNode?retiredLocale=de#instance_properties)

```
s("bd sd [~ bd] sd,hh*8")
.compressor("-20:20:10:.002:.02")
```
## postgain

Gain applied after all effects have been processed.

```
s("bd sd \[~ bd\] sd,hh\*8")

.compressor("-20:20:10:.002:.02").postgain(1.5)
```
## xfade

Cross-fades between left and right from 0 to 1:

- 0 = (full left, no right)
- .5 = (both equal)
- 1 = (no left, full right)

```
xfade(s("bd*2"), "<0 .25 .5 .75 1>", s("hh*8"))
```
# Panning

## jux

The jux function creates strange stereo effects, by applying a function to a pattern, but only in the right-hand channel.

```
s("bd lt [~ ht] mt cp ~ bd hh").jux(rev)
```

```
s("bd lt [~ ht] mt cp ~ bd hh").jux(press)
```

```
s("bd lt [~ ht] mt cp ~ bd hh").jux(iter(4))
```
## juxBy

Synonyms: `juxby`

Jux with adjustable stereo width. 0 = mono, 1 = full stereo.

```
s("bd lt [~ ht] mt cp ~ bd hh").juxBy("<0 .5 1>/2", rev)
```
## pan

Sets position in stereo.

- pan (number\|Pattern): between 0 and 1, from left to right (assuming stereo), once round a circle (assuming multichannel)

```
s("[bd hh]*2").pan("<.5 1 .5 0>")
```

```
s("bd rim sd rim bd ~ cp rim").pan(sine.slow(2))
```
# Waveshaping

## coarse

fake-resampling for lowering the sample rate. Caution: This effect seems to only work in chromium based browsers

- factor (number\|Pattern): 1 for original 2 for half, 3 for a third and so on.

```
s("bd sd \[~ bd\] sd,hh\*8").coarse("<1 4 8 16 32>")
```
## crush

bit crusher effect.

- depth (number\|Pattern): between 1 (for drastic reduction in bit-depth) to 16 (for barely no reduction).

```
s("<bd sd>,hh*3").fast(2).crush("<16 8 7 6 5 4 3 2>")
```
## distort

Synonyms: `dist`

Wave shaping distortion. CAUTION: it can get loud.
Second option in optional array syntax (ex: ".9:.5") applies a postgain to the output.
Most useful values are usually between 0 and 10 (depending on source gain). If you are feeling adventurous, you can turn it up to 11 and beyond ;)

- distortion (number\|Pattern):

```
s("bd sd [~ bd] sd,hh*8").distort("<0 2 3 10:.5>")
```

```
note("d1!8").s("sine").penv(36).pdecay(.12).decay(.23).distort("8:.4")
```
# Global Effects

## Local vs Global Effects

While the above listed “local” effects will always create a separate effects chain for each event,
global effects use the same chain for all events of the same orbit:

## orbit

An `orbit` is a global parameter context for patterns. Patterns with the same orbit will share the same global effects.

- number (number\|Pattern):

```
stack(
 s("hh*6").delay(.5).delaytime(.25).orbit(1),
 s("~ sd ~ sd").delay(.5).delaytime(.125).orbit(2)
)
```
## Delay

### delay

Sets the level of the delay signal.

When using mininotation, you can also optionally add the 'delaytime' and 'delayfeedback' parameter,
separated by ':'.

- level (number\|Pattern): between 0 and 1

```
s("bd bd").delay("<0 .25 .5 1>")
```

```
s("bd bd").delay("0.65:0.25:0.9 0.65:0.125:0.7")
```
### delaytime

### delayfeedback

Synonyms: `delayfb, dfb`

Sets the level of the signal that is fed back into the delay.
Caution: Values >= 1 will result in a signal that gets louder and louder! Don't do it

- feedback (number\|Pattern): between 0 and 1

```
s("bd").delay(.25).delayfeedback("<.25 .5 .75 1>")
```
## Reverb

### room

Sets the level of reverb.

When using mininotation, you can also optionally add the 'size' parameter, separated by ':'.

- level (number\|Pattern): between 0 and 1

```
s("bd sd [~ bd] sd").room("<0 .2 .4 .6 .8 1>")
```

```
s("bd sd [~ bd] sd").room("<0.9:1 0.9:4>")
```
### roomsize

Synonyms: `rsize, sz, size`

Sets the room size of the reverb, see `room`.
When this property is changed, the reverb will be recaculated, so only change this sparsely..

- size (number\|Pattern): between 0 and 10

```
s("bd sd [~ bd] sd").room(.8).rsize(1)
```

```
s("bd sd [~ bd] sd").room(.8).rsize(4)
```
### roomfade

Synonyms: `rfade`

Reverb fade time (in seconds).
When this property is changed, the reverb will be recaculated, so only change this sparsely..

- seconds (number): for the reverb to fade

```
s("bd sd [~ bd] sd").room(0.5).rlp(10000).rfade(0.5)
```

```
s("bd sd [~ bd] sd").room(0.5).rlp(5000).rfade(4)
```
### roomlp

Synonyms: `rlp`

Reverb lowpass starting frequency (in hertz).
When this property is changed, the reverb will be recaculated, so only change this sparsely..

- frequency (number): between 0 and 20000hz

```
s("bd sd [~ bd] sd").room(0.5).rlp(10000)
```

```
s("bd sd [~ bd] sd").room(0.5).rlp(5000)
```
### roomdim

Synonyms: `rdim`

Reverb lowpass frequency at -60dB (in hertz).
When this property is changed, the reverb will be recaculated, so only change this sparsely..

- frequency (number): between 0 and 20000hz

```
s("bd sd \[~ bd\] sd").room(0.5).rlp(10000).rdim(8000)
```

```
s("bd sd \[~ bd\] sd").room(0.5).rlp(5000).rdim(400)
```
### iresponse

Synonyms: `ir`

Sets the sample to use as an impulse response for the reverb.

- sample (string\|Pattern): to use as an impulse response

```
s("bd sd \[~ bd\] sd").room(.8).ir("<shaker\_large:0 shaker\_large:2>")
```
## Phaser

### phaser

Synonyms: `ph`

Phaser audio effect that approximates popular guitar pedals.

- speed (number\|Pattern): speed of modulation

```
n(run(8)).scale("D:pentatonic").s("sawtooth").release(0.5)
.phaser("<1 2 4 8>")
```
### phaserdepth

Synonyms: `phd`

The amount the signal is affected by the phaser effect. Defaults to 0.75

- depth (number\|Pattern): number between 0 and 1

```
n(run(8)).scale("D:pentatonic").s("sawtooth").release(0.5)
.phaser(2).phaserdepth("<0 .5 .75 1>")
```
### phasercenter

Synonyms: `phc`

The center frequency of the phaser in HZ. Defaults to 1000

- centerfrequency (number\|Pattern): in HZ

```
n(run(8)).scale("D:pentatonic").s("sawtooth").release(0.5)
.phaser(2).phasercenter("<800 2000 4000>")
```
### phasersweep

Synonyms: `phs`

The frequency sweep range of the lfo for the phaser effect. Defaults to 2000

- phasersweep (number\|Pattern): most useful values are between 0 and 4000

```
n(run(8)).scale("D:pentatonic").s("sawtooth").release(0.5)
.phaser(2).phasersweep("<800 2000 4000>")
```
## Duck

### duckorbit

modulate the amplitude of an orbit to create a "sidechain" like effect

- orbit (number\|Pattern): target orbit

```
$: n(run(16)).scale("c:minor:pentatonic").s("sawtooth").delay(.7).orbit(2)
$: s("bd:4!4").beat("0,4,8,11,14",16).duckorbit(2).duckattack(0.2).duckdepth(1)
```
### duckattack

the attack time of the duck effect

- time (number\|Pattern):

```
stack( n(run(8)).scale("c:minor").s("sawtooth").delay(.7).orbit(2), s("bd:4!4").beat("0,4,8,11,14",16).duckorbit(2).duckattack("<0.2 0 0.4>").duckdepth(1))
```
### duckdepth

the amount of ducking applied to target orbit

- depth (number\|Pattern): depth of modulation from 0 to 1

```
stack( n(run(8)).scale("c:minor").s("sawtooth").delay(.7).orbit(2), s("bd:4!4").beat("0,4,8,11,14",16).duckorbit(2).duckattack(0.2).duckdepth("<1 .9 .6 0>"))
```

Next, we’ll look at input / output via [MIDI, OSC and other methods](https://strudel.cc/learn/input-output/).

- [Audio Effects](https://strudel.cc/learn/effects/#audio-effects)

- [Signal chain](https://strudel.cc/learn/effects/#signal-chain)

- [Orbits](https://strudel.cc/learn/effects/#orbits)

- [Continuous changes](https://strudel.cc/learn/effects/#continuous-changes)

- [Filters](https://strudel.cc/learn/effects/#filters)

- [lpf](https://strudel.cc/learn/effects/#lpf)

- [lpq](https://strudel.cc/learn/effects/#lpq)

- [hpf](https://strudel.cc/learn/effects/#hpf)

- [hpq](https://strudel.cc/learn/effects/#hpq)

- [bpf](https://strudel.cc/learn/effects/#bpf)

- [bpq](https://strudel.cc/learn/effects/#bpq)

- [ftype](https://strudel.cc/learn/effects/#ftype)

- [vowel](https://strudel.cc/learn/effects/#vowel)

- [Amplitude Modulation](https://strudel.cc/learn/effects/#amplitude-modulation)

- [am](https://strudel.cc/learn/effects/#am)

- [tremolosync](https://strudel.cc/learn/effects/#tremolosync)

- [tremolodepth](https://strudel.cc/learn/effects/#tremolodepth)

- [tremoloskew](https://strudel.cc/learn/effects/#tremoloskew)

- [tremolophase](https://strudel.cc/learn/effects/#tremolophase)

- [tremoloshape](https://strudel.cc/learn/effects/#tremoloshape)

- [Amplitude Envelope](https://strudel.cc/learn/effects/#amplitude-envelope)

- [attack](https://strudel.cc/learn/effects/#attack)

- [decay](https://strudel.cc/learn/effects/#decay)

- [sustain](https://strudel.cc/learn/effects/#sustain)

- [release](https://strudel.cc/learn/effects/#release)

- [adsr](https://strudel.cc/learn/effects/#adsr)

- [Filter Envelope](https://strudel.cc/learn/effects/#filter-envelope)

- [lpattack](https://strudel.cc/learn/effects/#lpattack)

- [lpdecay](https://strudel.cc/learn/effects/#lpdecay)

- [lpsustain](https://strudel.cc/learn/effects/#lpsustain)

- [lprelease](https://strudel.cc/learn/effects/#lprelease)

- [lpenv](https://strudel.cc/learn/effects/#lpenv)

- [Pitch Envelope](https://strudel.cc/learn/effects/#pitch-envelope)

- [pattack](https://strudel.cc/learn/effects/#pattack)

- [pdecay](https://strudel.cc/learn/effects/#pdecay)

- [prelease](https://strudel.cc/learn/effects/#prelease)

- [penv](https://strudel.cc/learn/effects/#penv)

- [pcurve](https://strudel.cc/learn/effects/#pcurve)

- [panchor](https://strudel.cc/learn/effects/#panchor)

- [Dynamics](https://strudel.cc/learn/effects/#dynamics)

- [gain](https://strudel.cc/learn/effects/#gain)

- [velocity](https://strudel.cc/learn/effects/#velocity)

- [compressor](https://strudel.cc/learn/effects/#compressor)

- [postgain](https://strudel.cc/learn/effects/#postgain)

- [xfade](https://strudel.cc/learn/effects/#xfade)

- [Panning](https://strudel.cc/learn/effects/#panning)

- [jux](https://strudel.cc/learn/effects/#jux)

- [juxBy](https://strudel.cc/learn/effects/#juxby)

- [pan](https://strudel.cc/learn/effects/#pan)

- [Waveshaping](https://strudel.cc/learn/effects/#waveshaping)

- [coarse](https://strudel.cc/learn/effects/#coarse)

- [crush](https://strudel.cc/learn/effects/#crush)

- [distort](https://strudel.cc/learn/effects/#distort)

- [Global Effects](https://strudel.cc/learn/effects/#global-effects)

- [Local vs Global Effects](https://strudel.cc/learn/effects/#local-vs-global-effects)

- [orbit](https://strudel.cc/learn/effects/#orbit)

- [Delay](https://strudel.cc/learn/effects/#delay)

- [delay](https://strudel.cc/learn/effects/#delay-1)

- [delaytime](https://strudel.cc/learn/effects/#delaytime)

- [delayfeedback](https://strudel.cc/learn/effects/#delayfeedback)

- [Reverb](https://strudel.cc/learn/effects/#reverb)

- [room](https://strudel.cc/learn/effects/#room)

- [roomsize](https://strudel.cc/learn/effects/#roomsize)

- [roomfade](https://strudel.cc/learn/effects/#roomfade)

- [roomlp](https://strudel.cc/learn/effects/#roomlp)

- [roomdim](https://strudel.cc/learn/effects/#roomdim)

- [iresponse](https://strudel.cc/learn/effects/#iresponse)

- [Phaser](https://strudel.cc/learn/effects/#phaser)

- [phaser](https://strudel.cc/learn/effects/#phaser-1)

- [phaserdepth](https://strudel.cc/learn/effects/#phaserdepth)
---

### Unknown Title

**Source:** https://strudel.cc/learn/factories

# Creating Patterns

The following functions will return a pattern.
These are the equivalents used by the Mini Notation:

| function | mini |
| --- | --- |
| `cat(x, y)` | `"<x y>"` |
| `seq(x, y)` | `"x y"` |
| `stack(x, y)` | `"x,y"` |
| `stepcat([3,x],[2,y])` | `"x@3 y@2"` |
| `polymeter([a, b, c], [x, y])` | `"{a b c, x y}"` |
| `polymeterSteps(2, x, y, z)` | `"{x y z}%2"` |
| `silence` | `"~"` |

## cat

Synonyms: `slowcat`

The given items are con **cat** enated, where each one takes one cycle.

- items (any): The items to concatenate

```
cat("e5", "b4", \["d5", "c5"\]).note()

// "<e5 b4 \[d5 c5\]>".note()
```

```
// As a chained function:

s("hh\*4").cat(

note("c4(5,8)")

)
```
## seq

Synonyms: `sequence, fastcat`

Like **cat**, but the items are crammed into one cycle.

```
seq("e5", "b4", ["d5", "c5"]).note()
// "e5 b4 [d5 c5]".note()
```

```
// As a chained function:
s("hh*4").seq(
 note("c4(5,8)")
)
```
## stack

Synonyms: `polyrhythm, pr`

The given items are played at the same time at the same length.

```
stack("g3","b3",\["e4","d4"\]).note()

// "g3,b3,\[e4 d4\]".note()
```

```
// As a chained function:

s("hh\*4").stack(

note("c4(5,8)")

)
```
## stepcat

Synonyms: `timeCat, timecat`

'Concatenates' patterns like `fastcat`, but proportional to a number of steps per cycle.
The steps can either be inferred from the pattern, or provided as a \[length, pattern\] pair.
Has the alias `timecat`.

```
stepcat(\[3,"e3"\],\[1,"g3"\]).note()

// the same as "e3@3 g3".note()
```

```
stepcat("bd sd cp","hh hh").sound()

// the same as "bd sd cp hh hh".sound()
```
## arrange

Allows to arrange multiple patterns together over multiple cycles.
Takes a variable number of arrays with two elements specifying the number of cycles and the pattern to use.

```
arrange(
 [4, "<c a f e>(3,8)"],
 [2, "<g a>(5,8)"]
).note()
```
## polymeter

Synonyms: `pm`

_Experimental_

Aligns the steps of the patterns, creating polymeters. The patterns are repeated until they all fit the cycle. For example, in the below the first pattern is repeated twice, and the second is repeated three times, to fit the lowest common multiple of six steps.

```
// The same as note("{c eb g, c2 g2}%6")

polymeter("c eb g","c2 g2").note()
```
## polymeterSteps

## silence

Does absolutely nothing..

```
silence // "~"
```
## run

A discrete pattern of numbers from 0 to n-1

```
n(run(4)).scale("C4:pentatonic")
// n("0 1 2 3").scale("C4:pentatonic")
```
## binary

Creates a pattern from a binary number.

- n (number): input number to convert to binary

```
"hh".s().struct(binary(5))

// "hh".s().struct("1 0 1")
```
## binaryN

Creates a pattern from a binary number, padded to n bits long.

- n (number): input number to convert to binary
- nBits (number): pattern length, defaults to 16

```
"hh".s().struct(binaryN(55532, 16))
// "hh".s().struct("1 1 0 1 1 0 0 0 1 1 1 0 1 1 0 0")
```

After Pattern Constructors, let’s see what [Time Modifiers](https://strudel.cc/learn/time-modifiers/) are available.

- [Creating Patterns](https://strudel.cc/learn/factories/#creating-patterns)

- [cat](https://strudel.cc/learn/factories/#cat)

- [seq](https://strudel.cc/learn/factories/#seq)

- [stack](https://strudel.cc/learn/factories/#stack)

- [stepcat](https://strudel.cc/learn/factories/#stepcat)

- [arrange](https://strudel.cc/learn/factories/#arrange)
---

### Unknown Title

**Source:** https://strudel.cc/learn/hydra

# Using Hydra inside Strudel

You can write [hydra](https://hydra.ojack.xyz/) code in strudel! All you have to do is to call `await initHydra()` at the top:

```
await initHydra()
// licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
// by Zach Krall
// http://zachkrall.online/

osc(10, 0.9, 300)
.color(0.9, 0.7, 0.8)
.diff(
osc(45, 0.3, 100)
.color(0.9, 0.9, 0.9)
.rotate(0.18)
.pixelate(12)
.kaleid()
)
.scrollX(10)
.colorama()
.luma()
.repeatX(4)
.repeatY(4)
.modulate(
osc(1, -0.9, 300)
)
.scale(2)
.out()

note("[a,c,e,<a4 ab4 g4 gb4>,b4]/2")
.s("sawtooth").vib(2)
.lpf(600).lpa(2).lpenv(6)
```
## H patterns

There is a special function `H` that allows you to use a pattern as an input to hydra:

```
awaitinitHydra()

letpattern="3 4 5 \[6 7\]\*2"

shape(H(pattern)).out(o0)

n(pattern).scale("A:minor").piano().room(1)
```
## detectAudio

To use hydra audio capture, call `initHydra` with `{detectAudio:true}` configuration param:

```
await initHydra({detectAudio:true})
let pattern = "<3 4 5 [6 7]*2>"
shape(H(pattern)).repeat()
.scrollY(
 ()=> a.fft[0]*.25
)
.add(src(o0).color(.71 ).scrollX(.005),.95)
.out(o0)
n(pattern).scale("A:minor").piano().room(1)
```

You might now be able to see this properly here: [open in REPL](https://strudel.cc/#YXdhaXQgaW5pdEh5ZHJhKCkKbGV0IHBhdHRlcm4gPSAiMyA0IDUgWzYgN10qMiIKc2hhcGUoSChwYXR0ZXJuKSkub3V0KG8wKQpuKHBhdHRlcm4pLnNjYWxlKCJBOm1pbm9yIikucGlhbm8oKS5yb29tKDEpIA%3D%3D)

Similar to `detectAudio`, all the [available hydra options](https://github.com/hydra-synth/hydra-synth#api) can be passed to `initHydra`.

## feedStrudel

Using the `feedStrudel` option, you can transform strudel visualizations with hydra:

```
awaitinitHydra({feedStrudel:1})

//

src(s0).kaleid(H("<4 5 6>"))

.diff(osc(1,0.5,5))

.modulateScale(osc(2,-0.25,1))

.out()
```

//

$:s("bd\*4,\[hh:0:<.5 1>\]\*8,~ rim").bank("RolandTR909").speed(.9)

$:note("\[<g1!3 <bb1 <f1 d1>>>\]\*3").s("sawtooth")

.room(.75).sometimes(add(note(12))).clip(.3)

.lpa(.05).lpenv(-4).lpf(2000).lpq(8).ftype('24db')

all(x=>x.fft(4).scope({pos:0,smear:.95}))
---

### Unknown Title

**Source:** https://strudel.cc/learn/input-devices

# Input Devices

Strudel supports various input devices like Gamepads and MIDI controllers to manipulate patterns in real-time.

# Gamepad

The Gamepad module allows you to integrate gamepad input functionality into your musical patterns. This can be particularly useful for live performances or interactive installations where you want to manipulate sounds using a game controller.

## Getting Started

Initialize a gamepad by calling the gamepad() function with an optional index parameter.

```
// Initialize gamepad (optional index parameter, defaults to 0)
const gp = gamepad(0)
note("c a f e").mask(gp.a)
```
## Available Controls

The gamepad module provides access to buttons and analog sticks as normalized signals (0-1) that can modulate your patterns.

### Buttons

| Type | Controls |
| --- | --- |
| Face Buttons | `a`, `b`, `x`, `y` (or uppercase `A`, `B`, `X`, `Y`) |
| | Toggle versions: `tglA`, `tglB`, `tglX`, `tglY` |
| Shoulder Buttons | `lb`, `rb`, `lt`, `rt` (or uppercase `LB`, `RB`, `LT`, `RT`) |
| | Toggle versions: `tglLB`, `tglRB`, `tglLT`, `tglRT` |
| D-Pad | `up`, `down`, `left`, `right` (or `u`, `d`, `l`, `r` or uppercase) |
| | Toggle versions: `tglUp`, `tglDown`, `tglLeft`, `tglRight` (or `tglU`, `tglD`, `tglL`, `tglR`) |

### Analog Sticks

| Stick | Controls |
| --- | --- |
| Left Stick | `x1`, `y1` (0 to 1 range) |
| | `x1_2`, `y1_2` (-1 to 1 range) |
| Right Stick | `x2`, `y2` (0 to 1 range) |
| | `x2_2`, `y2_2` (-1 to 1 range) |

### Button Sequence

| Stick | Controls |
| --- | --- |
| Button Sequence | `btnSequence()`, `btnSeq()`, `btnseq()` |

## Using Gamepad Inputs

Once initialized, you can use various gamepad inputs in your patterns. Here are some examples:

### Button Inputs

You can use button inputs to control different aspects of your music, such as gain or triggering events.

```
constgp=gamepad(0)

setcpm(120)

// Use button values to control amplitude

$:stack(

s("\[\[hh hh\] oh hh oh\]/2").mask(gp.tglX).bank("RolandTR909"),// X btn for HH

s("cr\*1").mask(gp.Y).bank("RolandTR909"),// LB btn for CR
```

s("bd").mask(gp.tglA).bank("RolandTR909"),// A btn for BD

s("\[ht - - mt - - lt - \]/2").mask(gp.tglB).bank("RolandTR909"),// B btn for Toms

s("sd\*4").mask(gp.RB).bank("RolandTR909"),// RB btn for SD

)

### Analog Stick Inputs

Analog sticks can be used for continuous control, such as pitch shifting or panning.

```
constgp=gamepad(0)

setcpm(120)

// Use analog stick for continuous control

$:note("c4 d3 a3 e3").sound("sawtooth")

.lpf(gp.x1.range(100,4000))

.lpq(gp.y1.range(5,30))
```

.decay(gp.y2.range(0.1,2))

.lpenv(gp.x2.range(-5,5))

### Button Sequences

You can define button sequences to trigger specific actions, like playing a sound when a sequence is detected.

```
constgp=gamepad(0)

setcpm(120)

// Define button sequences

constHADOUKEN=\[\
\
'd',// Down\
\
'r',// Right\
```

\
'a',// A\
\
\]

constKONAMI='uuddlrlrba'//Konami Code ↑↑↓↓←→←→BA

// Check butto-n sequence (returns 1 while detected, 0 when not within last 1 second)

$:s("free\_hadouken -").slow(2)

.mask(gp.btnSequence(HADOUKEN)).room(1)

// hadouken.wav by Syna-Max

//https://freesound.org/people/Syna-Max/sounds/67674/

samples({free\_hadouken:'https://cdn.freesound.org/previews/67/67674\_111920-lq.mp3'})

## Multiple Gamepads

Strudel supports multiple gamepads. You can specify the gamepad index to connect to different devices.

```
const pad1 = gamepad(0); // First gamepad
const pad2 = gamepad(1); // Second gamepad
```

---

### Unknown Title

**Source:** https://strudel.cc/learn/input-output

# MIDI, OSC and MQTT

Normally, Strudel is used to pattern sound, using its own ‘ [web audio](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)’-based synthesiser called [SuperDough](https://codeberg.org/uzu/strudel/src/branch/main/packages/superdough).

It is also possible to pattern other things with Strudel, such as software and hardware synthesisers with MIDI, other software using Open Sound Control/OSC (including the [SuperDirt](https://github.com/musikinformatik/SuperDirt/) synthesiser commonly used with Strudel’s sibling [TidalCycles](https://tidalcycles.org/)), or the MQTT ‘internet of things’ protocol.

# MIDI

Strudel supports MIDI without any additional software (thanks to [webmidi](https://npmjs.com/package/webmidi)), just by adding methods to your pattern:

## midiin(inputName?)

MIDI input: Opens a MIDI input port to receive MIDI control change messages.

- input (string\|number): MIDI device name or index defaulting to 0

```
let cc = await midin('IAC Driver Bus 1')
note("c a f e").lpf(cc(0).range(0, 1000)).lpq(cc(1).range(0, 10)).sound("sawtooth")
```
## midi(outputName?,options?)

Either connect a midi device or use the IAC Driver (Mac) or Midi Through Port (Linux) for internal midi messages.
If no outputName is given, it uses the first midi output it finds.

```
$: chord("<C^7 A7 Dm7 G7>").voicing().midi('IAC Driver')
```

In the console, you will see a log of the available MIDI devices as soon as you run the code,
e.g.

```
 `Midi connected! Using "Midi Through Port-0".`
```

The `.midi()` function accepts an options object with the following properties:

```
$: note("d e c a f").midi('IAC Driver', { isController: true, midimap: 'default'})
```

Available Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| isController | boolean | false | When true, disables sending note messages. Useful for MIDI controllers |
| latencyMs | number | 34 | Latency in milliseconds to align MIDI with audio engine |
| noteOffsetMs | number | 10 | Offset in milliseconds for note-off messages to prevent glitching |
| midichannel | number | 1 | Default MIDI channel (1-16) |
| velocity | number | 0.9 | Default note velocity (0-1) |
| gain | number | 1 | Default gain multiplier for velocity (0-1) |
| midimap | string | ’default’ | Name of MIDI mapping to use for control changes |
| midiport | string/number | - | MIDI device name or index |

### midiport(outputName)

Selects the MIDI output device to use, pattern can be used to switch between devices.

```
$: midiport('IAC Driver');
$: note('c a f e').midiport('<0 1 2 3>').midi();
```

MIDI port: Sets the MIDI port for the event.

- port (number\|Pattern): MIDI port

```
note("c a f e").midiport("<0 1 2 3>").midi()
```
## midichan(number)

Selects the MIDI channel to use. If not used, `.midi` will use channel 1 by default.

## midicmd(command)

`midicmd` sends MIDI system real-time messages to control timing and transport on MIDI devices.

It supports the following commands:

- `clock`/ `midiClock` \- Sends MIDI timing clock messages
- `start` \- Sends MIDI start message
- `stop` \- Sends MIDI stop message
- `continue` \- Sends MIDI continue message

// You can control the clock with a pattern and ensure it starts in sync when the repl begins.
// Note: It might act unexpectedly if MIDI isn’t set up initially.

```
$:stack(
midicmd("clock*48,<start stop>/2").midi('IAC Driver')
)
```
## control, ccn && ccv

- `control` sends MIDI control change messages to your MIDI device.
- `ccn` sets the cc number. Depends on your synths midi mapping
- `ccv` sets the cc value. normalized from 0 to 1.

```
note("c a f e").control([74, sine.slow(4)]).midi()
```

```
note("c a f e").ccn(74).ccv(sine.slow(4)).midi()
```

In the above snippet, `ccn` is set to 74, which is the filter cutoff for many synths. `ccv` is controlled by a saw pattern.
Having everything in one pattern, the `ccv` pattern will be aligned to the note pattern, because the structure comes from the left by default.
But you can also control cc messages separately like this:

```
$: note("c a f e").midi()
$: ccv(sine.segment(16).slow(4)).ccn(74).midi()
```

Instead of setting `ccn` and `ccv` directly, you can also create mappings with `midimaps`:

## midimaps

Adds midimaps to the registry. Inside each midimap, control names (e.g. lpf) are mapped to cc numbers.

```
midimaps({ mymap: { lpf: 74 } })
$: note("c a f e")
.lpf(sine.slow(4))
.midimap('mymap')
.midi()
```

```
midimaps({ mymap: {
 lpf: { ccn: 74, min: 0, max: 20000, exp: 0.5 }
}})
$: note("c a f e")
.lpf(sine.slow(2).range(400,2000))
.midimap('mymap')
.midi()
```
## defaultmidimap

configures the default midimap, which is used when no "midimap" port is set

```
defaultmidimap({ lpf: 74 })
$: note("c a f e").midi();
$: lpf(sine.slow(4).segment(16)).midi();
```
## progNum (Program Change)

`progNum` sends MIDI program change messages to switch between different presets/patches on your MIDI device.
Program change values should be numbers between 0 and 127.

```
// Switch between programs 0 and 1 every cycle
progNum("<0 1>").midi()

// Play notes while changing programs
note("c3 e3 g3").progNum("<0 1 2>").midi()
```

Program change messages are useful for switching between different instrument sounds or presets during a performance.
The exact sound that each program number maps to depends on your MIDI device’s configuration.

## sysex, sysexid && sysexdata (System Exclusive Message)

`sysex` sends MIDI System Exclusive (SysEx) messages to your MIDI device.
ysEx messages are device-specific commands that allow deeper control over synthesizer parameters.
The value should be an array of numbers between 0-255 representing the SysEx data bytes.

```
// Send a simple SysEx message
let id = 0x43; //Yamaha
//let id = "0x00:0x20:0x32"; //Behringer ID can be an array of numbers
let data = "0x79:0x09:0x11:0x0A:0x00:0x00"; // Set NSX-39 voice to say "Aa"
$: note("c a f e").sysex(id, data).midi();
$: note("c a f e").sysexid(id).sysexdata(data).midi();
```

The exact format of SysEx messages depends on your MIDI device’s specification.
Consult your device’s MIDI implementation guide for details on supported SysEx messages.

## midibend && miditouch

`midibend` sets MIDI pitch bend (-1 - 1)
`miditouch` sets MIDI key after touch (0-1)

```
note("c a f e").midibend(sine.slow(4).range(-0.4,0.4)).midi()
```

```
note("c a f e").miditouch(sine.slow(4).range(0,1)).midi()
```
# OSC/SuperDirt/StrudelDirt

In TidalCycles, sound is usually generated using [SuperDirt](https://github.com/musikinformatik/SuperDirt/), which runs inside SuperCollider. Strudel also supports using SuperDirt, although it requires installing some additional software.

There is also [StrudelDirt](https://github.com/daslyfe/StrudelDirt) which is SuperDirt with some optimisations for working with Strudel. (A longer term aim is to merge these optimisations back into mainline SuperDirt)

## Prequisites

To get SuperDirt to work with Strudel, you need to

1. install SuperCollider + sc3 plugins, see [Tidal Docs](https://tidalcycles.org/docs/) (Install Tidal) for more info.
2. install SuperDirt, or the [StrudelDirt](https://github.com/daslyfe/StrudelDirt) fork which is optimised for use with Strudel
3. install [node.js](https://nodejs.org/en/)
4. download [Strudel Repo](https://codeberg.org/uzu/strudel/) (or git clone, if you have git installed)
5. run `pnpm i` in the strudel directory
6. run `pnpm run osc` to start the osc server, which forwards OSC messages from Strudel REPL to SuperCollider

Now you’re all set!

## Usage

1. Start SuperCollider, either using SuperCollider IDE or by running `sclang` in a terminal
2. Open the [Strudel REPL](https://strudel.cc/#cygiYmQgc2QiKS5vc2MoKQ%3D%3D)

…or test it here:

```
s("bd sd").osc()

If you now hear sound, congratulations! If not, you can get help on the [#strudel channel in the TidalCycles discord](https://discord.com/invite/HGEdXmRkzT).

Note: if you have the ‘Audio Engine Target’ in settings set to ‘OSC’, you do not need to add .osc() to the end of your pattern.
```
### Pattern.osc

Sends each hap as an OSC message, which can be picked up by SuperCollider or any other OSC-enabled software.
For more info, read [MIDI & OSC in the docs](https://strudel.cc/learn/input-output/)

## SuperDirt Params

Please refer to [Tidal Docs](https://tidalcycles.org/) for more info.

But can we use Strudel [offline](https://strudel.cc/learn/pwa/)?

# MQTT

MQTT is a lightweight network protocol, designed for ‘internet of things’ devices. For use with strudel, you will
need access to an MQTT server known as a ‘broker’ configured to accept secure ‘websocket’ connections. You could
run one yourself (e.g. by running [mosquitto](https://mosquitto.org/)), although getting an SSL certificate that
your web browser will trust might be a bit tricky for those without systems administration experience.
Alternatively, you can use [a public broker](https://www.hivemq.com/mqtt/public-mqtt-broker/).

Strudel does not yet support receiving messages over MQTT, only sending them.

## Usage

The following example shows how to send a pattern to an MQTT broker:

```
"hello world"

.mqtt(undefined,// username (undefined for open/public servers)

undefined,// password

'/strudel-pattern',// mqtt 'topic'

'wss://mqtt.eclipseprojects.io:443/mqtt',// MQTT server address

'mystrudel',// MQTT client id - randomly generated if not supplied
```

0// latency / delay before sending messages (0 = no delay)

)

Other software can then receive the messages. For example using the [mosquitto](https://mosquitto.org/) commandline client tools:

```
> mosquitto_sub -h mqtt.eclipseprojects.io -p 1883 -t "/strudel-pattern"
> hello
> world
> hello
> world
> ...
```

Control patterns will be encoded as JSON, for example:

```
sound("sax(3,8)").speed("2 3")

.mqtt(undefined,// username (undefined for open/public servers)

undefined,// password

'/strudel-pattern',// mqtt 'topic'

'wss://mqtt.eclipseprojects.io:443/mqtt',// MQTT server address

'mystrudel',// MQTT client id - randomly generated if not supplied
```

0// latency / delay before sending messages (0 = no delay)

)

Will send messages like the following:

```
{"s":"sax","speed":2}
{"s":"sax","speed":2}
{"s":"sax","speed":3}
{"s":"sax","speed":2}
...
```

Libraries for receiving MQTT are available for many programming languages.

```
```

- [MIDI, OSC and MQTT](https://strudel.cc/learn/input-output/#midi-osc-and-mqtt)

- [MIDI](https://strudel.cc/learn/input-output/#midi)

- [midiin(inputName?)](https://strudel.cc/learn/input-output/#midiininputname)

- [midi(outputName?,options?)](https://strudel.cc/learn/input-output/#midioutputnameoptions)

- [midiport(outputName)](https://strudel.cc/learn/input-output/#midiportoutputname)

- [midichan(number)](https://strudel.cc/learn/input-output/#midichannumber)

- [midicmd(command)](https://strudel.cc/learn/input-output/#midicmdcommand)

- [control, ccn && ccv](https://strudel.cc/learn/input-output/#control-ccn--ccv)

- [midimaps](https://strudel.cc/learn/input-output/#midimaps)

- [defaultmidimap](https://strudel.cc/learn/input-output/#defaultmidimap)

- [progNum (Program Change)](https://strudel.cc/learn/input-output/#prognum-program-change)

- [sysex, sysexid && sysexdata (System Exclusive Message)](https://strudel.cc/learn/input-output/#sysex-sysexid--sysexdata-system-exclusive-message)

- [midibend && miditouch](https://strudel.cc/learn/input-output/#midibend--miditouch)

- [OSC/SuperDirt/StrudelDirt](https://strudel.cc/learn/input-output/#oscsuperdirtstrudeldirt)
---

### Unknown Title

**Source:** https://strudel.cc/learn/metadata

# Music metadata

You can optionally add some music metadata in your Strudel code, by using tags in code comments:

```
// @title Hey Hoo
// @by Sam Tagada
// @license CC BY-NC-SA
```

Like other comments, those are ignored by Strudel, but it can be used by other tools to retrieve some information about the music.

## Alternative syntax

You can also use comment blocks:

```
/*
@title Hey Hoo
@by Sam Tagada
@license CC BY-NC-SA
*/
```

Or define multiple tags in one line:

```
// @title Hey Hoo @by Sam Tagada @license CC BY-NC-SA
```

The `title` tag has an alternative syntax using quotes (must be defined at the very begining):

```
// "Hey Hoo" @by Sam Tagada
```
## Tags list

Available tags are:

- `@title`: music title
- `@by`: music author(s), separated by comma, eventually followed with a link in `<>` (ex: `@by John Doe <https://example.com>`)
- `@license`: music license(s), e.g. CC BY-NC-SA. Unsure? [Choose a creative commons license here](https://creativecommons.org/choose/)
- `@details`: some additional information about the music
- `@url`: web page(s) related to the music (git repo, soundcloud link, etc.)
- `@genre`: music genre(s) (pop, jazz, etc)
- `@album`: music album name

## Multiple values

Some of them accepts several values, using the comma or new line separator, or duplicating the tag:

```
/*
@by Sam Tagada
 Jimmy
@genre pop, jazz
@url https://example.com
@url https://example.org
*/
```

You can also add optional prefixes and use tags where you want:

```
/*
song @by Sam Tagada
samples @by Jimmy
*/
...
note("a3 c#4 e4 a4") // @by Sandy

```
## Multiline

If a tag doesn’t accept a list, it can take multi-line values:

```
/*
@details I wrote this song in February 19th, 2023.
 It was around midnight and I was lying on
 the sofa in the living room.
*/
```

---

### Unknown Title

**Source:** https://strudel.cc/learn/notes

# Notes

Pitches are an important building block in many musical traditions.
In Strudel, pitches can be expressed as note names, note numbers or frequencies.
Here’s the same pattern written in three different ways:

- `note`: letter notation, good for those who are familiar with western music theory:

```
note("a3 c#4 e4 a4")

```

- `note`: number notation, good for those who want to use recognisable pitches, but don’t care about music theory:

```
note("57 61 64 69")

- `freq`: frequency notation, good for those who want to go beyond standardised tuning systems:
```

```
freq("220 275 330 440")

Let’s look at those in more detail…
```
## `note` names

Notes names can be notated with the note letter, followed by the octave number. You can notate flats with `b` and sharps with `#`.

```
note("a3 c#4 e4 a4")

By the way, you can edit the contents of the player, and press “update” to hear your change!
You can also press “play” on the next player without needing to stop the last one.
```
## `note` numbers

If you prefer, you can also use numbers with `note` instead:

```
note("57 61 64 69")
```

These numbers are interpreted as so called [MIDI numbers](https://www.inspiredacoustics.com/en/MIDI_note_numbers_and_center_frequencies), where adjacent whole numbers are one ‘semitone’ apart.

You could also write decimal numbers to get ‘microtonal’ pitches (in between the black and white piano notes):

```
note("74.5 75 75.5 76")
```
## `freq`

To get maximum freedom, you can also use `freq` to directly control the frequency:

```
freq("220 275 330 440")
```
## Hearing and frequency

In the above example, we play A3 (220Hz), C#4 natural (275Hz), E4 (330Hz) and A4 (440Hz), mirroring our previous examples.

But can you hear the difference between these individual frequencies?

```
freq("220 221 223 224")

How about these?
```

```
freq("2020 2021 2023 2024")

The higher we go up…
```

```
freq("5020 5021 5023 5024")

The less distance we can hear between the frequencies!
```

```
freq("10020 10021 10023 10024")

Why is this? [Human hearing operates logarithmically](https://www.audiocheck.net/soundtests_nonlinear.php).
```
## From notes to sounds

In this page, when we played a pattern of notes like this:

```
note("a3 c#4 e4 a4")

```

We heard a simple synthesised sound, in fact we heard a [triangle wave oscillator](https://en.wikipedia.org/wiki/Triangle_wave).

This is the default synthesiser used by Strudel, but how do we then make different sounds in Strudel?

Let’s find out in the next page on [Sounds](https://strudel.cc/learn/sounds/).
---

### Unknown Title

**Source:** https://strudel.cc/learn/pwa

# Using Strudel Offline

You can use Strudel even without a network! When you first visit the [Strudel REPL](https://strudel.cc/),
your browser will download the whole web app including documentation.
When the download is finished (<1MB), you can visit the website even when offline,
getting the downloaded website instead of the online one.

When the site gets updated, your browser will download that update on the next online visit.
When an update is available, the site will refresh after the download is finished.

This works because Strudel is implemented as progessive web app (using [Vite PWA](https://vite-pwa-org.netlify.app/)).

## Samples

While the browser will download the app itself, samples are only downloaded when you’re actively using them.
So to make sure a specific set of samples is available when offline, just use them.
Also, only samples from these domains will be cached for offline use:

- `https://raw.githubusercontent.com/*` for samples uploaded to github
- `https://freesound.org/*` / `https://cdn.freesound.org/*` for freesound
- `https://shabda.ndre.gr/.*` for shabda

## Inspecting / Clearing Cache

You can view all cached files in your browser.

### Firefox

- Open the Developer Tools ( `Tools > Web Developer > Web Developer Tools`)
- go to `Storage` tab and expand `Cache Storage > https://strudel.cc`.
- or go to the `Application` tab and view the latest updates in `Service Workers`

### Chromium based Browsers

- Open Developer Tools ( `Right Click > Inspect`)
- go to the `Application` tab
- view downloaded files under `Cache > Cache Storage`
- view the latest updates in `Service Workers`

## Strudel Standalone App

You can also install Strudel as a standalone app on most devices.
A standalone app has its own desktop / homescreen icon and launches in a separate window,
without the browser ui.

![Strudel on MacOS](https://strudel.cc/pwa/strudel-macos.png)

Strudel on MacOS

### Desktop

With a chromium based browser:

1. go to the [Strudel REPL](https://strudel.cc/).
2. on the right of the adress bar, click `install Strudel REPL`
3. the REPL should now run as a standalone chromium app

Without a chromium based browser, you can use [nativefier](https://github.com/nativefier/nativefier) to generate a desktop app:

1. make sure you have NodeJS installed
2. run `npx nativefier strudel.cc`

![Strudel on Linux](https://strudel.cc/pwa/strudel-linux.png)

Strudel on Linux

### iOS

1. open to the [Strudel REPL](https://strudel.cc/) in safari
2. press the share icon and tab `Add to homescreen`
3. You should now have a strudel app icon that opens the repl in full screen

### Android

1. open to the [Strudel REPL](https://strudel.cc/)
2. Tab the install button at the bottom

Ok, what are [Patterns](https://strudel.cc/technical-manual/patterns/) all about?

- [Using Strudel Offline](https://strudel.cc/learn/pwa/#using-strudel-offline)

- [Samples](https://strudel.cc/learn/pwa/#samples)

- [Inspecting / Clearing Cache](https://strudel.cc/learn/pwa/#inspecting--clearing-cache)
---

### Unknown Title

**Source:** https://strudel.cc/learn/random-modifiers

# Random Modifiers

These methods add random behavior to your Patterns.

## choose

Chooses randomly from the given list of elements.

- xs (any): values / patterns to choose from.

```
note("c2 g2!2 d2 f1").s(choose("sine","triangle","bd:6"))
```
## wchoose

Chooses randomly from the given list of elements by giving a probability to each element

- pairs (any): arrays of value and weight

```
note("c2 g2!2 d2 f1").s(wchoose(["sine",10], ["triangle",1], ["bd:6",1]))
```
## chooseCycles

Synonyms: `randcat`

Picks one of the elements at random each cycle.

```
chooseCycles("bd", "hh", "sd").s().fast(8)
```

```
s("bd | hh | sd").fast(8)
```
## wchooseCycles

Synonyms: `wrandcat`

Picks one of the elements at random each cycle by giving a probability to each element

```
wchooseCycles(["bd",10], ["hh",1], ["sd",1]).s().fast(8)
```

```
wchooseCycles(["bd bd bd",5], ["hh hh hh",3], ["sd sd sd",1]).fast(4).s()
```

```
// The probability can itself be a pattern
wchooseCycles(["bd(3,8)","<5 0>"], ["hh hh hh",3]).fast(4).s()
```
## degradeBy

Randomly removes events from the pattern by a given amount.
0 = 0% chance of removal
1 = 100% chance of removal

- amount (number): a number between 0 and 1

```
s("hh*8").degradeBy(0.2)
```

```
s("[hh?0.2]*8")
```

```
//beat generator
s("bd").segment(16).degradeBy(.5).ribbon(16,1)
```
## degrade

Randomly removes 50% of events from the pattern. Shorthand for `.degradeBy(0.5)`

```
s("hh\*8").degrade()
```

```
s("\[hh?\]\*8")
```
## undegradeBy

Inverse of `degradeBy`: Randomly removes events from the pattern by a given amount.
0 = 100% chance of removal
1 = 0% chance of removal
Events that would be removed by degradeBy are let through by undegradeBy and vice versa (see second example).

- amount (number): a number between 0 and 1

```
s("hh*8").undegradeBy(0.2)
```

```
s("hh*10").layer(
 x => x.degradeBy(0.2).pan(0),
 x => x.undegradeBy(0.8).pan(1)
)
```
## undegrade

Inverse of `degrade`: Randomly removes 50% of events from the pattern. Shorthand for `.undegradeBy(0.5)`
Events that would be removed by degrade are let through by undegrade and vice versa (see second example).

```
s("hh\*8").undegrade()
```

```
s("hh\*10").layer(

x=>x.degrade().pan(0),

x=>x.undegrade().pan(1)

)
```
## sometimesBy

Randomly applies the given function by the given probability.
Similar to `someCyclesBy`

- probability (number\|Pattern): a number between 0 and 1
- function (function): the transformation to apply

```
s("hh*8").sometimesBy(.4, x=>x.speed("0.5"))
```
## sometimes

Applies the given function with a 50% chance

- function (function): the transformation to apply

```
s("hh*8").sometimes(x=>x.speed("0.5"))
```
## someCyclesBy

Randomly applies the given function by the given probability on a cycle by cycle basis.
Similar to `sometimesBy`

- probability (number\|Pattern): a number between 0 and 1
- function (function): the transformation to apply

```
s("bd,hh*8").someCyclesBy(.3, x=>x.speed("0.5"))
```
## someCycles

Shorthand for `.someCyclesBy(0.5, fn)`

```
s("bd,hh\*8").someCycles(x=>x.speed("0.5"))
```
## often

Shorthand for `.sometimesBy(0.75, fn)`

```
s("hh\*8").often(x=>x.speed("0.5"))
```
## rarely

Shorthand for `.sometimesBy(0.25, fn)`

```
s("hh*8").rarely(x=>x.speed("0.5"))
```
## almostNever

Shorthand for `.sometimesBy(0.1, fn)`

```
s("hh*8").almostNever(x=>x.speed("0.5"))
```
## almostAlways

Shorthand for `.sometimesBy(0.9, fn)`

```
s("hh*8").almostAlways(x=>x.speed("0.5"))
```
## never

Shorthand for `.sometimesBy(0, fn)` (never calls fn)

```
s("hh*8").never(x=>x.speed("0.5"))
```
## always

Shorthand for `.sometimesBy(1, fn)` (always calls fn)

```
s("hh*8").always(x=>x.speed("0.5"))
```

Next up: [Conditional Modifiers](https://strudel.cc/learn/conditional-modifiers/)

- [Random Modifiers](https://strudel.cc/learn/random-modifiers/#random-modifiers)

- [choose](https://strudel.cc/learn/random-modifiers/#choose)

- [wchoose](https://strudel.cc/learn/random-modifiers/#wchoose)

- [chooseCycles](https://strudel.cc/learn/random-modifiers/#choosecycles)

- [wchooseCycles](https://strudel.cc/learn/random-modifiers/#wchoosecycles)

- [degradeBy](https://strudel.cc/learn/random-modifiers/#degradeby)

- [degrade](https://strudel.cc/learn/random-modifiers/#degrade)

- [undegradeBy](https://strudel.cc/learn/random-modifiers/#undegradeby)

- [undegrade](https://strudel.cc/learn/random-modifiers/#undegrade)

- [sometimesBy](https://strudel.cc/learn/random-modifiers/#sometimesby)

- [sometimes](https://strudel.cc/learn/random-modifiers/#sometimes)

- [someCyclesBy](https://strudel.cc/learn/random-modifiers/#somecyclesby)

- [someCycles](https://strudel.cc/learn/random-modifiers/#somecycles)
---

### Unknown Title

**Source:** https://strudel.cc/learn/samples

# Samples

Samples are the most common way to make sound with tidal and strudel.
A sample is a (commonly short) piece of audio that is used as a basis for sound generation, undergoing various transformations.
Music that is based on samples can be thought of as a collage of sound. [Read more about Sampling](https://en.wikipedia.org/wiki/Sampling_(music))

Strudel allows loading samples in the form of audio files of various formats (wav, mp3, ogg) from any publicly available URL.

# Default Samples

By default, strudel comes with a built-in “sample map”, providing a solid base to play with.

```
s("bd sd \[~ bd\] sd,hh\*16, misc")

Here, we are using the `s` function to play back different default samples ( `bd`, `sd`, `hh` and `misc`) to get a drum beat.

For drum sounds, strudel uses the comprehensive [tidal-drum-machines](https://github.com/ritchse/tidal-drum-machines) library, with the following naming convention:

| Drum | Abbreviation |
| --- | --- |
| Bass drum, Kick drum | bd |
| Snare drum | sd |
| Rimshot | rim |
```

| Clap | cp |
| Closed hi-hat | hh |
| Open hi-hat | oh |
| Crash | cr |
| Ride | rd |
| High tom | ht |
| Medium tom | mt |
| Low tom | lt |

![](https://strudel.cc/img/drumset.png) [original von Pbroks13](https://de.wikipedia.org/wiki/Schlagzeug#/media/Datei:Drum_set.svg)

More percussive sounds:

| Source | Abbreviation |
| --- | --- |
| Shakers (and maracas, cabasas, etc) | sh |
| Cowbell | cb |
| Tambourine | tb |
| Other percussions | perc |
| Miscellaneous samples | misc |
| Effects | fx |

Furthermore, strudel also loads instrument samples from [VCSL](https://github.com/sgossner/VCSL) by default.

To see which sample names are available, open the `sounds` tab in the [REPL](https://strudel.cc/).

Note that only the sample maps (mapping names to URLs) are loaded initially, while the audio samples themselves are not loaded until they are actually played.
This behaviour of loading things only when they are needed is also called `lazy loading`.
While it saves resources, it can also lead to sounds not being audible the first time they are triggered, because the sound is still loading.
[This might be fixed in the future](https://codeberg.org/uzu/strudel/issues/187)

# Sound Banks

If we open the `sounds` tab and then `drum-machines`, we can see that the drum samples are all prefixed with drum machine names: `RolandTR808_bd`, `RolandTR808_sd`, `RolandTR808_hh` etc..

We _could_ use them like this:

```
s("RolandTR808_bd RolandTR808_sd,RolandTR808_hh*16")
```

… but thats obviously a bit much to write. Using the `bank` function, we can shorten this to:

```
s("bd sd,hh*16").bank("RolandTR808")
```

You could even pattern the bank to switch between different drum machines:

```
s("bd sd,hh*16").bank("<RolandTR808 RolandTR909>")
```

Behind the scenes, `bank` will just prepend the drum machine name to the sample name with `_` to get the full name.
This of course only works because the name after `_` ( `bd`, `sd` etc..) is standardized.
Also note that some banks won’t have samples for all sounds!

# Selecting Sounds

If we open the `sounds` tab again, followed by tab `drum machines`, there is also a number behind each name, indicating how many individual samples are available.
For example `RolandTR909_hh(4)` means there are 4 samples of a TR909 hihat available.
By default, `s` will play the first sample, but we can select the other ones using `n`, starting from 0:

```
s("hh*8").bank("RolandTR909").n("0 1 2 3")
```

Numbers that are too high will just wrap around to the beginning

```
s("hh*8").bank("RolandTR909").n("0 1 2 3 4 5 6 7")
```

Here, 0-3 will play the same sounds as 4-7, because `RolandTR909_hh` only has 4 sounds.

Selecting sounds also works inside the mini notation, using “ `:`” like this:

```
s("bd\*4,hh:0 hh:1 hh:2 hh:3 hh:4 hh:5 hh:6 hh:7")

.bank("RolandTR909")
```
# Loading Custom Samples

You can load a non-standard sample map using the `samples` function.

## Loading samples from file URLs

In this example we assign names `bassdrum`, `hihat` and `snaredrum` to specific audio files on a server:

```
samples({
bassdrum: 'bd/BT0AADA.wav',
hihat: 'hh27/000_hh27closedhh.wav',
snaredrum: ['sd/rytm-01-classic.wav', 'sd/rytm-00-hard.wav'],
}, 'https://raw.githubusercontent.com/tidalcycles/Dirt-Samples/master/');

s("bassdrum snaredrum:0 bassdrum snaredrum:1, hihat*16")
```

You can freely choose any combination of letters for each sample name. It is even possible to override the default sounds.
The names you pick will be made available in the `s` function.
Make sure that the URL and each sample path form a correct URL!

In the above example, `bassdrum` will load:

```
https://raw.githubusercontent.com/tidalcycles/Dirt-Samples/master/bd/BT0AADA.wav
|----------------------base path --------------------------------|--sample path-|
```

Note that we can either load a single file, like for `bassdrum` and `hihat`, or a list of files like for `snaredrum`!
As soon as you run the code, your chosen sample names will be listed in `sounds` -\> `user`.

## Loading Samples from a strudel.json file

The above way to load samples might be tedious to write out / copy paste each time you write a new pattern.
To avoid that, you can simply pass a URL to a `strudel.json` file somewhere on the internet:

```
samples('https://raw.githubusercontent.com/tidalcycles/Dirt-Samples/master/strudel.json')
s("bd sd bd sd,hh*16")
```

The file is expected to define a sample map using JSON, in the same format as described above.
Additionally, the base path can be defined with the `_base` key.
The last section could be written as:

```
{
 "_base": "https://raw.githubusercontent.com/tidalcycles/Dirt-Samples/master/",
 "bassdrum": "bd/BT0AADA.wav",
 "snaredrum": "sd/rytm-01-classic.wav",
 "hihat": "hh27/000_hh27closedhh.wav"
}
```

Please note that browsers will often cache `strudel.json` on first load, and keep using the cached
version even if the orginal has been updated. If this bites you (for example while developing a new
sample pack), you can force the browser to download a new copy by i.e. changing capitalization of one
character in the URL, or adding a URL attribute, such as:

```
samples('https://raw.githubusercontent.com/tidalcycles/Dirt-Samples/master/strudel.json?version=2');
```

that gets ignored by GitHub (but changes the URL, forcing the browser to reload every time we increase
the version number).

It is also possible, of course, to just remove it from cache (deleting cache in browser Privacy settings,
or from the dev console if you’re technically minded, or by using a cache deleting extension).

## Generating strudel.json

You can use [@strudel/sampler](https://www.npmjs.com/package/@strudel/sampler) to generate a strudel.json file for you, by running:

```
npx --yes @strudel/sampler --json > strudel.json
```

See other uses of strudel/sampler further below, under “From Disk via @strudel/sampler”.

## Github Shortcut

Because loading samples from github is common, there is a shortcut:

```
samples('github:tidalcycles/dirt-samples')
s("bd sd bd sd,hh*16")
```

The format is `samples('github:<user>/<repo>/<branch>')`. If you omit `branch` (like above), the `main` branch will be used.
It assumes a `strudel.json` file to be present at the root of the repository:

```
https://raw.githubusercontent.com/<user>/<repo>/<branch>/strudel.json
```
## From Disk via “Import Sounds Folder”

If you don’t want to upload your samples to the internet, you can also load them from your local disk.
Go to the `sounds` tab in the REPL and open the `import-sounds` tab below the search bar.
Press the “import sounds folder” button and select a folder that contains audio files.
The folder you select can also contain subfolders with audio files.
Example:

```
└─ samples
 ├─ swoop
 │ ├─ swoopshort.wav
 │ ├─ swooplong.wav
 │ └─ swooptight.wav
 └─ smash
 ├─ smashhigh.wav
 ├─ smashlow.wav
 └─ smashmiddle.wav
```

In the above example the folder `samples` contains 2 subfolders `swoop` and `smash`, which contain audio files.
If you select that `samples` folder, the `user` tab (next to the `import-sounds` tab) will then contain 2 new sounds: `swoop(3) smash(3)`
The individual samples can the be played normally like `s("swoop:0 swoop:1 smash:2")`.
The samples within each sound use zero-based indexing in alphabetical order.

## From Disk via @strudel/sampler

Instead of loading your samples into your browser with the “import sounds folder” button, you can also serve the samples from a local file server.
The easiest way to do this is using [@strudel/sampler](https://www.npmjs.com/package/@strudel/sampler):

```
cd samples
npx @strudel/sampler
```

Then you can load it via:

```
samples('http://localhost:5432/');

n("<0 1 2>").s("swoop smash")

The handy thing about `@strudel/sampler` is that it auto-generates the `strudel.json` file based on your folder structure.
You can see what it generated by going to `http://localhost:5432` with your browser.

Note: You need [NodeJS](https://nodejs.org/) installed on your system for this to work.
```
## Specifying Pitch

To make sure your samples are in tune when playing them with `note`, you can specify a base pitch like this:

```
samples({
'gtr': 'gtr/0001_cleanC.wav',
'moog': { 'g3': 'moog/005_Mighty%20Moog%20G3.wav' },
}, 'github:tidalcycles/dirt-samples');
note("g3 [bb3 c4] <g4 f4 eb4 f3>@2").s("gtr,moog").clip(1)
.gain(.5)
```

We can also declare different samples for different regions of the keyboard:

```
setcpm(60)
samples({
'moog': {
 'g2': 'moog/004_Mighty%20Moog%20G2.wav',
 'g3': 'moog/005_Mighty%20Moog%20G3.wav',
 'g4': 'moog/006_Mighty%20Moog%20G4.wav',
}}, 'github:tidalcycles/dirt-samples')

note("g2!2 <bb2 c3>!2, <c4@3 [<eb4 bb3> g4 f4]>")
.s('moog').clip(1)
.gain(.5)
```

The sampler will always pick the closest matching sample for the current note!

Note that this notation for pitched sounds also works inside a `strudel.json` file.

## Shabda

If you don’t want to select samples by hand, there is also the wonderful tool called [shabda](https://shabda.ndre.gr/).
With it, you can enter any sample name(s) to query from [freesound.org](https://freesound.org/). Example:

```
samples('shabda:bass:4,hihat:4,rimshot:2')

$: n("0 1 2 3 0 1 2 3").s('bass')
$: n("0 1*2 2 3*2").s('hihat').clip(1)
$: n("~ 0 ~ 1 ~ 0 0 1").s('rimshot')
```

You can also generate artificial voice samples with any text, in multiple languages.
Note that the language code and the gender parameters are optional and default to `en-GB` and `f`

```
samples('shabda/speech:the_drum,forever')
samples('shabda/speech/fr-FR/m:magnifique')

$: s("the_drum*2").chop(16).speed(rand.range(0.85,1.1))
$: s("forever magnifique").slow(4).late(0.125)
```
# Sampler Effects

Sampler effects are functions that can be used to change the behaviour of sample playback.

### begin

a pattern of numbers from 0 to 1. Skips the beginning of each sample, e.g. `0.25` to cut off the first quarter from each sample.

- amount (number\|Pattern): between 0 and 1, where 1 is the length of the sample

```
samples({ rave: 'rave/AREUREADY.wav' }, 'github:tidalcycles/dirt-samples')
s("rave").begin("<0 .25 .5 .75>").fast(2)
```
### end

The same as .begin, but cuts off the end off each sample.

- length (number\|Pattern): 1 = whole sample, .5 = half sample, .25 = quarter sample etc..

```
s("bd\*2,oh\*4").end("<.1 .2 .5 1>").fast(2)
```
### loop

Loops the sample.
Note that the tempo of the loop is not synced with the cycle tempo.
To change the loop region, use loopBegin / loopEnd.

- on (number\|Pattern): If 1, the sample is looped

```
s("casio").loop(1)
```
### loopBegin

Synonyms: `loopb`

Begin to loop at a specific point in the sample (inbetween `begin` and `end`).
Note that the loop point must be inbetween `begin` and `end`, and before `loopEnd`!
Note: Samples starting with wt\_ will automatically loop! (wt = wavetable)

- time (number\|Pattern): between 0 and 1, where 1 is the length of the sample

```
s("space").loop(1)
.loopBegin("<0 .125 .25>")._scope()
```
### loopEnd

Synonyms: `loope`

End the looping section at a specific point in the sample (inbetween `begin` and `end`).
Note that the loop point must be inbetween `begin` and `end`, and after `loopBegin`!

- time (number\|Pattern): between 0 and 1, where 1 is the length of the sample

```
s("space").loop(1)
.loopEnd("<1 .75 .5 .25>")._scope()
```
### cut

In the style of classic drum-machines, `cut` will stop a playing sample as soon as another samples with in same cutgroup is to be played. An example would be an open hi-hat followed by a closed one, essentially muting the open.

- group (number\|Pattern): cut group number

```
s("\[oh hh\]\*4").cut(1)
```
### clip

Synonyms: `legato`

Multiplies the duration with the given number. Also cuts samples off at the end if they exceed the duration.

- factor (number\|Pattern):
= 0

```
note("c a f e").s("piano").clip("<.5 1 2>")
```
### loopAt

Makes the sample fit the given number of cycles by changing the speed.

```
samples({rhodes:'https://cdn.freesound.org/previews/132/132051\_316502-lq.mp3'})

s("rhodes").loopAt(2)
```
### fit

Makes the sample fit its event duration. Good for rhythmical loops like drum breaks.
Similar to `loopAt`.

```
samples({ rhodes: 'https://cdn.freesound.org/previews/132/132051_316502-lq.mp3' })
s("rhodes/2").fit()
```
### chop

Cuts each sample into the given number of parts, allowing you to explore a technique known as 'granular synthesis'.
It turns a pattern of samples into a pattern of parts of samples.

```
samples({rhodes:'https://cdn.freesound.org/previews/132/132051\_316502-lq.mp3'})

s("rhodes")

.chop(4)

.rev()// reverse order of chops

.loopAt(2)// fit sample into 2 cycles
```
### striate

Cuts each sample into the given number of parts, triggering progressive portions of each sample at each loop.

```
s("numbers:0 numbers:1 numbers:2").striate(6).slow(3)
```
### slice

Chops samples into the given number of slices, triggering those slices with a given pattern of slice numbers.
Instead of a number, it also accepts a list of numbers from 0 to 1 to slice at specific points.

```
samples('github:tidalcycles/dirt-samples')

s("breaks165").slice(8,"0 1 <2 2\*2> 3 \[4 0\] 5 6 7".every(3,rev)).slow(0.75)
```

```
samples('github:tidalcycles/dirt-samples')

s("breaks125").fit().slice(\[0,.25,.5,.75\],"0 1 1 <2 3>")
```
### splice

Works the same as slice, but changes the playback speed of each slice to match the duration of its step.

```
samples('github:tidalcycles/dirt-samples')
s("breaks165")
.splice(8, "0 1 [2 3 0]@2 3 0@2 7")
```
### scrub

Allows you to scrub an audio file like a tape loop by passing values that represents the position in the audio file
in the optional array syntax ex: "0.5:2", the second value controls the speed of playback

```
samples('github:switchangel/pad')
s("swpad:0").scrub("{0.1!2 .25@3 0.7!2 <0.8:1.5>}%8")
```

```
samples('github:yaxu/clean-breaks/main');
s("amen/4").fit().scrub("{0@3 0@2 4@3}%8".div(16))
```
### speed

Changes the speed of sample playback, i.e. a cheap way of changing pitch.

- speed (number\|Pattern): inf to inf, negative numbers play the sample backwards.

```
s("bd*6").speed("1 2 4 1 -2 -4")
```

```
speed("1 1.5*2 [2 1.1]").s("piano").clip(1)
```

After samples, let’s see what [Synths](https://strudel.cc/learn/synths/) afford us.

- [Samples](https://strudel.cc/learn/samples/#samples)

- [Default Samples](https://strudel.cc/learn/samples/#default-samples)

- [Sound Banks](https://strudel.cc/learn/samples/#sound-banks)

- [Selecting Sounds](https://strudel.cc/learn/samples/#selecting-sounds)

- [Loading Custom Samples](https://strudel.cc/learn/samples/#loading-custom-samples)

- [Loading samples from file URLs](https://strudel.cc/learn/samples/#loading-samples-from-file-urls)

- [Loading Samples from a strudel.json file](https://strudel.cc/learn/samples/#loading-samples-from-a-strudeljson-file)

- [Generating strudel.json](https://strudel.cc/learn/samples/#generating-strudeljson)

- [Github Shortcut](https://strudel.cc/learn/samples/#github-shortcut)

- [From Disk via “Import Sounds Folder”](https://strudel.cc/learn/samples/#from-disk-via-import-sounds-folder)

- [From Disk via @strudel/sampler](https://strudel.cc/learn/samples/#from-disk-via-strudelsampler)

- [Specifying Pitch](https://strudel.cc/learn/samples/#specifying-pitch)

- [Shabda](https://strudel.cc/learn/samples/#shabda)

- [Sampler Effects](https://strudel.cc/learn/samples/#sampler-effects)

- [begin](https://strudel.cc/learn/samples/#begin)

- [end](https://strudel.cc/learn/samples/#end)

- [loop](https://strudel.cc/learn/samples/#loop)

- [loopBegin](https://strudel.cc/learn/samples/#loopbegin)

- [loopEnd](https://strudel.cc/learn/samples/#loopend)

- [cut](https://strudel.cc/learn/samples/#cut)

- [clip](https://strudel.cc/learn/samples/#clip)

- [loopAt](https://strudel.cc/learn/samples/#loopat)

- [fit](https://strudel.cc/learn/samples/#fit)
---

### Unknown Title

**Source:** https://strudel.cc/learn/signals

# Continuous Signals

Signals are patterns with continuous values, meaning they have theoretically infinite steps.
They can provide streams of numbers that can be sampled at discrete points in time.

## saw

A sawtooth signal between 0 and 1.

```
note("<c3 [eb3,g3] g2 [g3,bb3]>*8")
.clip(saw.slow(2))
```

```
n(saw.range(0,8).segment(8))
.scale('C major')
```
## sine

A sine signal between 0 and 1.

```
n(sine.segment(16).range(0,15))
.scale("C:minor")
```
## cosine

A cosine signal between 0 and 1.

```
n(stack(sine,cosine).segment(16).range(0,15))

.scale("C:minor")
```
## tri

A triangle signal between 0 and 1.

```
n(tri.segment(8).range(0,7)).scale("C:minor")
```
## square

A square signal between 0 and 1.

```
n(square.segment(4).range(0,7)).scale("C:minor")
```
## rand

A continuous pattern of random numbers, between 0 and 1.

```
// randomly change the cutoff
s("bd*4,hh*8").cutoff(rand.range(500,8000))
```
## Ranges from -1 to 1

There is also `saw2`, `sine2`, `cosine2`, `tri2`, `square2` and `rand2` which have a range from -1 to 1!

## perlin

Generates a continuous pattern of [perlin noise](https://en.wikipedia.org/wiki/Perlin_noise), in the range 0..1.

```
// randomly change the cutoff
s("bd*4,hh*8").cutoff(perlin.range(500,8000))
```
## irand

A continuous pattern of random integers, between 0 and n-1.

- n (number): max value (exclusive)

```
// randomly select scale notes from 0 - 7 (= C to C)
n(irand(8)).struct("x x*2 x x*3").scale("C:minor")
```
## brand

A continuous pattern of 0 or 1 (binary random)

```
s("hh\*10").pan(brand)
```
## brandBy

A continuous pattern of 0 or 1 (binary random), with a probability for the value being 1

- probability (number): a number between 0 and 1

```
s("hh*10").pan(brandBy(0.2))
```
## mouseX

The mouse's x position value ranges from 0 to 1.

```
n(mousex.segment(4).range(0,7)).scale("C:minor")
```
## mouseY

The mouse's y position value ranges from 0 to 1.

```
n(mousey.segment(4).range(0,7)).scale("C:minor")
```

Next up: [Random Modifiers](https://strudel.cc/learn/random-modifiers/)

- [Continuous Signals](https://strudel.cc/learn/signals/#continuous-signals)

- [saw](https://strudel.cc/learn/signals/#saw)

- [sine](https://strudel.cc/learn/signals/#sine)

- [cosine](https://strudel.cc/learn/signals/#cosine)

- [tri](https://strudel.cc/learn/signals/#tri)

- [square](https://strudel.cc/learn/signals/#square)

- [rand](https://strudel.cc/learn/signals/#rand)

- [Ranges from -1 to 1](https://strudel.cc/learn/signals/#ranges-from--1-to-1)
---

### Unknown Title

**Source:** https://strudel.cc/learn/sounds

# Sounds

We can play sounds with `s`, in two different ways:

- `s` can trigger audio samples, where a sound file is loaded in the background and played back:

```
s("bd hh sd hh")
```

- `s` can trigger audio synthesisers, which are synthesised in real-time using code also running in the background:

```
s("sawtooth square triangle sine")

You can learn more about both of these approaches in the pages [Synths](https://strudel.cc/learn/synths/) and [Samples](https://strudel.cc/learn/samples/).
```
# Combining notes and sounds

In both of the above cases, we are no longer directly controlling the `note`/ `freq` of the sound heard via `s`, as we were in the [Notes](https://strudel.cc/workshop/first-notes/) page.

So how can we both control the sound and the pitch? We can _combine_ `note`/ `freq` with `s` to change the sound of our pitches:

```
note("a3 c#4 e4 a4").s("sawtooth")

```

```
note("57 61 64 69").s("sine")
```

freq("220 275 330 440").s("triangle")

```
The last example will actually sound the same with or without `s`, because `triangle` is the default value for `s`.

What about combining different notes with different sounds at the same time?
```

```
freq("220 275 330 440 550").s("triangle sawtooth sine")

Hmm, something interesting is going on there, related to there being five notes and three sounds.

Let’s now take a step back and think about the Strudel [Code](https://strudel.cc/learn/code/) we’ve been hearing so far.

```

---

### Unknown Title

**Source:** https://strudel.cc/learn/stepwise

# Stepwise patterning (experimental)

This is a developing area of strudel, and behaviour might change or be renamed in future versions. Feedback and ideas are welcome!

## Introduction

Usually in strudel, the only reference point for most pattern transformations is the _cycle_. Now it is possible to also work with _steps_, via a growing range of functions.

For example usually when you `fastcat` two patterns together, the cycles will be squashed into half a cycle each:

```
fastcat("bd hh hh", "bd hh hh cp hh").sound()
```

With the new stepwise `stepcat` function, the steps of the two patterns will be evenly distributed across the cycle:

```
stepcat("bd hh hh", "bd hh hh cp hh").sound()
```

By default, steps are counted according to the ‘top level’ in mini-notation. For example `"a [b c] d e"` has five events in it per cycle, but is counted as four steps, where `[b c]` is counted as a single step.

However, you can mark a different metrical level to count steps relative to, using a `^` at the start of a sub-pattern. If we do this to the subpattern in our example: `"a [^b c] d e"`, then the pattern is now counted as having _eight_ steps. This is because ‘b’ and ‘c’ are each counted as single steps, and the events in the pattern are twice as long, and so counted as two steps each.

## Pacing the steps

Some stepwise functions don’t appear to do very much on their own, for example these two examples of the `expand` function sound exactly the same despite being expanded by different amounts:

```
"c a f e".expand(2).note().sound("folkharp")
```

```
"c a f e".expand(4).note().sound("folkharp")
```

The number of steps per cycle is being changed behind the scenes, but on its own, that doesn’t do anything. You will hear a difference however, once you use another stepwise function with it, for example `stepcat`:

```
stepcat("c a f e".expand(2),"g d").note()

.sound("folkharp")
```

stepcat("c a f e".expand(4), "g d").note()
.sound("folkharp")

```
You should be able to hear that `expand` increases the duration of the steps of the first subpattern, proportionally to the second one.
```

You can also change the speed of a pattern to match a given number of steps per cycle, with the `pace` function:

```
stepcat("c a f e".expand(2),"g d").note()

.sound("folkharp")

.pace(8)
```

stepcat("c a f e".expand(4), "g d").note()
.sound("folkharp")
.pace(8)

```
```

The first example has ten steps, and the second example has 18 steps, but are then both played a rate of 8 steps per cycle.

The argument to `expand` can also be patterned, and will be treated in a stepwise fashion. This means that the patterns from the changing values in the argument will be `stepcat` ted together:

```
note("c a f e").sound("folkharp").expand("3 2 1 1 2 3")
```

This results in a dense pattern, because the different expanded versions are squashed into a single cycle. `pace` is again handy here for slowing down the pattern to a particular number of steps per cycle:

```
note("c a f e").sound("folkharp").expand("3 2 1 1 2 3").pace(8)
```

Earlier versions of many of these functions had `s_` prefixes, and the `pace` function was previously known as `steps`. These still exist as aliases, but may have changed behaviour and will soon be removed. Please update your patterns!

## Stepwise functions

### pace

_Experimental_

Speeds a pattern up or down, to fit to the given number of steps per cycle.

```
sound("bd sd cp").pace(4)
// The same as sound("{bd sd cp}%4") or sound("<bd sd cp>*4")
```
### stepcat

Synonyms: `timeCat, timecat`

'Concatenates' patterns like `fastcat`, but proportional to a number of steps per cycle.
The steps can either be inferred from the pattern, or provided as a \[length, pattern\] pair.
Has the alias `timecat`.

```
stepcat([3,"e3"],[1, "g3"]).note()
// the same as "e3@3 g3".note()
```

```
stepcat("bd sd cp","hh hh").sound()
// the same as "bd sd cp hh hh".sound()
```
### stepalt

_Experimental_

Concatenates patterns stepwise, according to an inferred 'steps per cycle'.
Similar to `stepcat`, but if an argument is a list, the whole pattern will alternate between the elements in the list.

```
stepalt(\["bd cp","mt"\],"bd").sound()

// The same as "bd cp bd mt bd".sound()
```
### expand

_Experimental_

Expands the step size of the pattern by the given factor.

```
sound("tha dhi thom nam").bank("mridangam").expand("3 2 1 1 2 3").pace(8)
```
### contract

_Experimental_

Contracts the step size of the pattern by the given factor. See also `expand`.

```
sound("tha dhi thom nam").bank("mridangam").contract("3 2 1 1 2 3").pace(8)
```
### extend

_Experimental_

`extend` is similar to `fast` in that it increases its density, but it also increases the step count
accordingly. So `stepcat("a b".extend(2), "c d")` would be the same as `"a b a b c d"`, whereas
`stepcat("a b".fast(2), "c d")` would be the same as `"[a b] [a b] c d"`.

```
stepcat(
 sound("bd bd - cp").extend(2),
 sound("bd - sd -")
).pace(8)
```
### take

_Experimental_

Takes the given number of steps from a pattern (dropping the rest).
A positive number will take steps from the start of a pattern, and a negative number from the end.

```
"bd cp ht mt".take("2").sound()
// The same as "bd cp".sound()
```

```
"bd cp ht mt".take("1 2 3").sound()
// The same as "bd bd cp bd cp ht".sound()
```

```
"bd cp ht mt".take("-1 -2 -3").sound()
// The same as "mt ht mt cp ht mt".sound()
```
### drop

_Experimental_

Drops the given number of steps from a pattern.
A positive number will drop steps from the start of a pattern, and a negative number from the end.

```
"tha dhi thom nam".drop("1").sound().bank("mridangam")
```

```
"tha dhi thom nam".drop("-1").sound().bank("mridangam")
```

```
"tha dhi thom nam".drop("0 1 2 3").sound().bank("mridangam")
```

```
"tha dhi thom nam".drop("0 -1 -2 -3").sound().bank("mridangam")
```
### polymeter

Synonyms: `pm`

_Experimental_

Aligns the steps of the patterns, creating polymeters. The patterns are repeated until they all fit the cycle. For example, in the below the first pattern is repeated twice, and the second is repeated three times, to fit the lowest common multiple of six steps.

```
// The same as note("{c eb g, c2 g2}%6")

polymeter("c eb g","c2 g2").note()
```
### shrink

_Experimental_

Progressively shrinks the pattern by 'n' steps until there's nothing left, or if a second value is given (using mininotation list syntax with `:`),
that number of times.
A positive number will progressively drop steps from the start of a pattern, and a negative number from the end.

```
"tha dhi thom nam".shrink("1").sound()
.bank("mridangam")
```

```
"tha dhi thom nam".shrink("-1").sound()
.bank("mridangam")
```

```
"tha dhi thom nam".shrink("1 -1").sound().bank("mridangam").pace(4)
```

```
note("0 1 2 3 4 5 6 7".scale("C:ritusen")).sound("folkharp")
 .shrink("1 -1").pace(8)
```
### grow

_Experimental_

Progressively grows the pattern by 'n' steps until the full pattern is played, or if a second value is given (using mininotation list syntax with `:`),
that number of times.
A positive number will progressively grow steps from the start of a pattern, and a negative number from the end.

```
"tha dhi thom nam".grow("1").sound()

.bank("mridangam")
```

```
"tha dhi thom nam".grow("-1").sound()

.bank("mridangam")
```

```
"tha dhi thom nam".grow("1 -1").sound().bank("mridangam").pace(4)
```

```
note("0 1 2 3 4 5 6 7".scale("C:ritusen")).sound("folkharp")

.grow("1 -1").pace(8)
```
### tour

_Experimental_

Inserts a pattern into a list of patterns. On the first repetition it will be inserted at the end of the list, then moved backwards through the list
on successive repetitions. The patterns are added together stepwise, with all repetitions taking place over a single cycle. Using `pace` to set the
number of steps per cycle is therefore usually recommended.

```
"\[c g\]".tour("e f","e f g","g f e c").note()

.sound("folkharp")

.pace(8)
```
### zip

_Experimental_

'zips' together the steps of the provided patterns. This can create a long repetition, taking place over a single, dense cycle.
Using `pace` to set the number of steps per cycle is therefore usually recommended.

```
zip("e f","e f g","g \[f e\] a f4 c").note()

.sound("folkharp")

.pace(8)

- [Stepwise patterning (experimental)](https://strudel.cc/learn/stepwise/#stepwise-patterning-experimental)

```

- [Introduction](https://strudel.cc/learn/stepwise/#introduction)

- [Pacing the steps](https://strudel.cc/learn/stepwise/#pacing-the-steps)

- [Stepwise functions](https://strudel.cc/learn/stepwise/#stepwise-functions)

- [pace](https://strudel.cc/learn/stepwise/#pace)

- [stepcat](https://strudel.cc/learn/stepwise/#stepcat)

- [stepalt](https://strudel.cc/learn/stepwise/#stepalt)

- [expand](https://strudel.cc/learn/stepwise/#expand)

- [contract](https://strudel.cc/learn/stepwise/#contract)

- [extend](https://strudel.cc/learn/stepwise/#extend)

- [take](https://strudel.cc/learn/stepwise/#take)
---

### Unknown Title

**Source:** https://strudel.cc/learn/synths

# Synths

In addition to the sampling engine, strudel comes with a synthesizer to create sounds on the fly.

## Basic Waveforms

The basic waveforms are `sine`, `sawtooth`, `square` and `triangle`, which can be selected via `sound` (or `s`):

```
note("c2 <eb2 <g2 g1>>".fast(2))
.sound("<sawtooth square triangle sine>")
._scope()
```

If you don’t set a `sound` but a `note` the default value for `sound` is `triangle`!

## Noise

You can also use noise as a source by setting the waveform to: `white`, `pink` or `brown`. These are different
flavours of noise, here written from hard to soft.

```
sound("<white pink brown>")._scope()
```

Here’s a more musical example of how to use noise for hihats:

```
sound("bd*2,<white pink brown>*8")
.decay(.04).sustain(0)._scope()
```

Some amount of pink noise can also be added to any oscillator by using the `noise` paremeter:

```
note("c3").noise("<0.1 0.25 0.5>")._scope()
```

You can also use the `crackle` type to play some subtle noise crackles. You can control noise amount by using the `density` parameter:

```
s("crackle*4").density("<0.01 0.04 0.2 0.5>".slow(2))._scope()
```
### Additive Synthesis

To tame the harsh sound of the basic waveforms, we can set the `n` control to limit the overtones of the waveform:

```
note("c2 <eb2 <g2 g1>>".fast(2))
.sound("sawtooth")
.n("<32 16 8 4>")
._scope()
```

When the `n` control is used on a basic waveform, it defines the number of harmonic partials the sound is getting.
You can also set `n` directly in mini notation with `sound`:

```
note("c2 <eb2 <g2 g1>>".fast(2))
.sound("sawtooth:<32 16 8 4>")
._scope()
```

Note for tidal users: `n` in tidal is synonymous to `note` for synths only.
In strudel, this is not the case, where `n` will always change timbre, be it though different samples or different waveforms.

## Vibrato

### vib

Synonyms: `vibrato, v`

Applies a vibrato to the frequency of the oscillator.

- frequency (number\|Pattern): of the vibrato in hertz

```
note("a e")
.vib("<.5 1 2 4 8 16>")
._scope()
```

```
// change the modulation depth with ":"
note("a e")
.vib("<.5 1 2 4 8 16>:12")
._scope()
```
### vibmod

Synonyms: `vmod`

Sets the vibrato depth in semitones. Only has an effect if `vibrato` \| `vib` \| `v` is is also set

- depth (number\|Pattern): of vibrato (in semitones)

```
note("a e").vib(4)
.vibmod("<.25 .5 1 2 12>")
._scope()
```

```
// change the vibrato frequency with ":"
note("a e")
.vibmod("<.25 .5 1 2 12>:8")
._scope()
```
## FM Synthesis

FM Synthesis is a technique that changes the frequency of a basic waveform rapidly to alter the timbre.

You can use fm with any of the above waveforms, although the below examples all use the default triangle wave.

### fm

Synonyms: `fmi`

Sets the Frequency Modulation of the synth.
Controls the modulation index, which defines the brightness of the sound.

- brightness (number\|Pattern): modulation index

```
note("c e g b g e")
.fm("<0 1 2 8 32>")
._scope()
```
### fmh

Sets the Frequency Modulation Harmonicity Ratio.
Controls the timbre of the sound.
Whole numbers and simple ratios sound more natural,
while decimal numbers and complex ratios sound metallic.

- harmonicity (number\|Pattern):

```
note("c e g b g e")
.fm(4)
.fmh("<1 2 1.5 1.61>")
._scope()
```
### fmattack

Attack time for the FM envelope: time it takes to reach maximum modulation

- time (number\|Pattern): attack time

```
note("c e g b g e")
.fm(4)
.fmattack("<0 .05 .1 .2>")
._scope()
```
### fmdecay

Decay time for the FM envelope: seconds until the sustain level is reached after the attack phase.

- time (number\|Pattern): decay time

```
note("c e g b g e")
.fm(4)
.fmdecay("<.01 .05 .1 .2>")
.fmsustain(.4)
._scope()
```
### fmsustain

Sustain level for the FM envelope: how much modulation is applied after the decay phase

- level (number\|Pattern): sustain level

```
note("c e g b g e")
.fm(4)
.fmdecay(.1)
.fmsustain("<1 .75 .5 0>")
._scope()
```
### fmenv

Ramp type of fm envelope. Exp might be a bit broken..

- type (number\|Pattern): lin \| exp

```
note("c e g b g e")
.fm(4)
.fmdecay(.2)
.fmsustain(0)
.fmenv("<exp lin>")
._scope()
```
## Wavetable Synthesis

Strudel can also use the sampler to load custom waveforms as a replacement of the default waveforms used by WebAudio for the base synth. A default set of more than 1000 wavetables is accessible by default (coming from the [AKWF](https://www.adventurekid.se/akrt/waveforms/adventure-kid-waveforms/) set). You can also import/use your own. A wavetable is a one-cycle waveform, which is then repeated to create a sound at the desired frequency. It is a classic but very effective synthesis technique.

Any sample preceded by the `wt_` prefix will be loaded as a wavetable. This means that the `loop` argument will be set to `1` by default. You can scan over the wavetable by using `loopBegin` and `loopEnd` as well.

```
samples('bubo:waveforms');
note("<[g3,b3,e4]!2 [a3,c3,e4] [b3,d3,f#4]>")

.n("<1 2 3 4 5 6 7 8 9 10>/2").room(0.5).size(0.9)
.s('wt_flute').velocity(0.25).often(n => n.ply(2))
.release(0.125).decay("<0.1 0.25 0.3 0.4>").sustain(0)
.cutoff(2000).cutoff("<1000 2000 4000>").fast(4)
._scope()
```
## ZZFX

The “Zuper Zmall Zound Zynth” [ZZFX](https://github.com/KilledByAPixel/ZzFX) is also integrated in strudel.
Developed by [Frank Force](https://frankforce.com/), it is a synth and FX engine originally intended to be used for size coding games.

It has 20 parameters in total, here is a snippet that uses all:

```
note("c2 eb2 f2 g2") // also supports freq
.s("{z_sawtooth z_tan z_noise z_sine z_square}%4")
.zrand(0) // randomization
// zzfx envelope
.attack(0.001)
.decay(0.1)
.sustain(.8)
.release(.1)
// special zzfx params
.curve(1) // waveshape 1-3
.slide(0) // +/- pitch slide
.deltaSlide(0) // +/- pitch slide (?)
.noise(0) // make it dirty
.zmod(0) // fm speed
.zcrush(0) // bit crush 0 - 1
.zdelay(0) // simple delay
.pitchJump(0) // +/- pitch change after pitchJumpTime
.pitchJumpTime(0) // >0 time after pitchJump is applied
.lfo(0) // >0 resets slide + pitchJump + sets tremolo speed
.tremolo(0) // 0-1 lfo volume modulation amount
//.duration(.2) // overwrite strudel event duration
//.gain(1) // change volume
._scope() // vizualise waveform (not zzfx related)
```

Note that you can also combine zzfx with all the other audio fx (next chapter).

Next up: [Audio Effects](https://strudel.cc/learn/effects/)…

- [Synths](https://strudel.cc/learn/synths/#synths)

- [Basic Waveforms](https://strudel.cc/learn/synths/#basic-waveforms)

- [Noise](https://strudel.cc/learn/synths/#noise)

- [Additive Synthesis](https://strudel.cc/learn/synths/#additive-synthesis)

- [Vibrato](https://strudel.cc/learn/synths/#vibrato)

- [vib](https://strudel.cc/learn/synths/#vib)

- [vibmod](https://strudel.cc/learn/synths/#vibmod)

- [FM Synthesis](https://strudel.cc/learn/synths/#fm-synthesis)

- [fm](https://strudel.cc/learn/synths/#fm)

- [fmh](https://strudel.cc/learn/synths/#fmh)
---

### Unknown Title

**Source:** https://strudel.cc/learn/tonal

# Tonal Functions

These functions use [tonaljs](https://github.com/tonaljs/tonal) to provide helpers for musical operations.

### voicing()

Turns chord symbols into voicings. You can use the following control params:

- `chord`: Note, followed by chord symbol, e.g. C Am G7 Bb^7
- `dict`: voicing dictionary to use, falls back to default dictionary
- `anchor`: the note that is used to align the chord
- `mode`: how the voicing is aligned to the anchor

 - `below`: top note <= anchor
 - `duck`: top note <= anchor, anchor excluded
 - `above`: bottom note >= anchor
- `offset`: whole number that shifts the voicing up or down to the next voicing
- `n`: if set, the voicing is played like a scale. Overshooting numbers will be octaved

All of the above controls are optional, except `chord`.
If you pass a pattern of strings to voicing, they will be interpreted as chords.

```
n("0 1 2 3").chord("<C Am F G>").voicing()
```

Here’s an example of how you can play chords and a bassline:

```
chord("<C^7 A7b13 Dm7 G7>*2")
.dict('ireal').layer(
x=>x.struct("[~ x]*2").voicing()
,
x=>n("0*4").set(x).mode("root:g2").voicing()
.s('sawtooth').cutoff("800:4:2")
)
```
### scale(name)

Turns numbers into notes in the scale (zero indexed). Also sets scale for other scale operations, like [Pattern#scaleTranspose](https://strudel.cc/#pattern-scaleTranspose).

A scale consists of a root note (e.g. `c4`, `c`, `f#`, `bb4`) followed by semicolon (':') and then a [scale type](https://github.com/tonaljs/tonal/blob/main/packages/scale-type/data.ts).

The root note defaults to octave 3, if no octave number is given.

- scale (string): Name of scale

```
n("0 2 4 6 4 2").scale("C:major")
```

```
n("[0,7] 4 [2,7] 4")
.scale("C:<major minor>/2")
.s("piano")
```

```
n(rand.range(0,12).segment(8))
.scale("C:ritusen")
.s("piano")
```
### transpose(semitones)

Transposes all notes to the given number of semitones:

```
"\[c2 c3\]\*4".transpose("<0 -2 5 3>").note()

This method gets really exciting when we use it with a pattern as above.

Instead of numbers, scientific interval notation can be used as well:
```

```
"\[c2 c3\]\*4".transpose("<1P -2M 4P 3m>").note()
```
### scaleTranspose(steps)

Transposes notes inside the scale by the number of steps:

```
"[-8 [2,4,6]]*2"
.scale('C4 bebop major')
.scaleTranspose("<0 -1 -2 -3 -4 -5 -6 -4>*2")
.note()
```
### rootNotes(octave = 2)

Turns chord symbols into root notes of chords in given octave.

```
"<C^7 A7b13 Dm7 G7>\*2".rootNotes(3).note()

Together with layer, struct and voicings, this can be used to create a basic backing track:
```

```
"<C^7 A7b13 Dm7 G7>\*2".layer(

x=>x.voicings('lefthand').struct("\[~ x\]\*2").note(),

x=>x.rootNotes(2).note().s('sawtooth').cutoff(800)

)

```

---

## Function Reference

### Unknown Title

**Source:** https://strudel.cc/functions/intro

# Pattern Functions
Let’s learn all about functions to create and modify patterns.
At the core of Strudel, everything is made of functions.
For example, everything you can do with the Mini-Notation can also be done with a function.
This Pattern in Mini Notation:

```
note("c3 eb3 g3")
```

is equivalent to this Pattern without Mini Notation:

```
note(seq("c3","eb3","g3"))
Similarly, there is an equivalent function for every aspect of the mini notation.
Which representation to use is a matter of context. As a rule of thumb, functions
are better suited in a larger context, while mini notation is more practical for individual rhythms.
```
## Limits of Mini Notation
While the Mini Notation is a powerful way to write rhythms concisely, it also has its limits. Take this example:

```
stack(
note("c2 eb2(3,8)").s('sawtooth').cutoff(800),
s("bd(5,8), hh\*8")
)
Here, we are using mini notation for the individual rhythms, while using the function `stack` to mix them.
While stack is also available as `,` in mini notation, we cannot use it here, because we have different types of sounds.
```
## Combining Patterns
You can freely mix JS patterns, mini patterns and values! For example, this pattern:

```
cat(
stack("g3","b3","e4"),
stack("a3","c3","e4"),
stack("b3","d3","fs4"),
stack("b3","e4","g4")
).note()
```

…is equivalent to:

```
cat(
"g3,b3,e4",
"a3,c3,e4",
"b3,d3,f#4",
"b3,e4,g4"
).note()
```

… as well as:

```
note("<[g3,b3,e4] [a3,c3,e4] [b3,d3,f#4] [b3,e4,g4]>")
```

While mini notation is almost always shorter, it only has a handful of modifiers: \* / ! @.
When using JS patterns, there is a lot more you can do.
Next, let’s look at how you can [create patterns](https://strudel.cc/learn/factories/)
---

### Unknown Title

**Source:** https://strudel.cc/functions/value-modifiers

# Control Parameters

Besides functions that control time, we saw earlier that functions like `note` and `cutoff` control different parameters (short params) of an event.
Let’s now look more closely at how these `param(eter) functions` work.

# Parameter Functions

A very powerful feature of tidal patterns is that each parameter can be controlled independently:

```
note("c a f e")

.cutoff("<500 1000 2000 \[4000 8000\]>")

.gain(.8)

.s('sawtooth')

.log()

In this example, the parameters `note`, `cutoff`, `gain` and `s` are controlled independently by either patterns or plain values (numbers / text).
```

After pressing play, we can observe the time and parameter values of each event (hap) in the output created by `.log()`.

## Plain vs Parameterized Values

Patterns that are not wrapped inside a param function will contain unlabeled `plain values`:

```
"<c e g>".log()
```

This will not generate any sound output, because Strudel could only guess which param is meant by these letters.

Now compare that to the version wrapped in `note`:

```
note("<c e g>").log()
```

Now it is clear that these letters are meant to be played as notes.
Under the hood, the `note` function (as well as all other param functions)
will wrap each plain value in an object. If the note function did not exist, we would need to write:

```
cat({note:'c'},{note:'e'},{note:'g'}).log()
```

This will have the same output, though it is rather unwieldy to read and write.

## Wrapping Parameter Functions

To avoid too much nesting, param functions can also be chained like this:

```
cat('c', 'e', 'g').note().log()
```

This is equivalent to `note(cat('c','e','g')).log()`.

You can use this with any function that declares a type (like `n`, `s`, `note`, `freq` etc), just make sure to leave the parens empty!

## Plain Value Modification

Patterns of plain values can be modified with any of the following operators:

```
"50 60 70".add("<0 1 2>").log()
```

Here, the add function modifies the numbers on the left.
Again, there is no output because these numbers have no meaning without a param.

## Param Value Modification

To modify a parameter value, you can either:

- Use the operator on the plain value pattern, inside the param function:

```
note("50 60 70".add("<0 1 2>")).room(.1).log()
```

- Similarly, use the operator on the plain value pattern and wrap it later:

```
"50 60 70".add("<0 1 2>").note().room(.1).log()
```

- Specify which param should be modified inside the operator function:

```
note("50 60 70").room(.1).add(note("<0 1 2>")).log()
```

Remember the execution of the chained functions goes from left to right.

# Operators

This group of functions allows to modify the value of events.

## add

Assumes a pattern of numbers. Adds the given number to each item in the pattern.

```
// Here, the triad 0, 2, 4 is shifted by different amounts

n("0 2 4".add("<0 3 4 0>")).scale("C:major")

// Without add, the equivalent would be:

// n("<\[0 2 4\] \[3 5 7\] \[4 6 8\] \[0 2 4\]>").scale("C:major")
```

```
// You can also use add with notes:

note("c3 e3 g3".add("<0 5 7 0>"))

// Behind the scenes, the notes are converted to midi numbers:

// note("48 52 55".add("<0 5 7 0>"))
```
## sub

Like add, but the given numbers are subtracted.

```
n("0 2 4".sub("<0 1 2 3>")).scale("C4:minor")
// See add for more information.
```
## mul

Multiplies each number by the given factor.

```
"<1 1.5 [1.66, <2 2.33>]>*4".mul(150).freq()
```
## div

Divides each number by the given factor.

## round

Assumes a numerical pattern. Returns a new pattern with all values rounded
to the nearest integer.

```
n("0.5 1.5 2.5".round()).scale("C:major")
```
## floor

Assumes a numerical pattern. Returns a new pattern with all values set to
their mathematical floor. E.g. `3.7` replaced with to `3`, and `-4.2`
replaced with `-5`.

```
note("42 42.1 42.5 43".floor())
```
## ceil

Assumes a numerical pattern. Returns a new pattern with all values set to
their mathematical ceiling. E.g. `3.2` replaced with `4`, and `-4.2`
replaced with `-4`.

```
note("42 42.1 42.5 43".ceil())
```
## range

Assumes a numerical pattern, containing unipolar values in the range 0 .. 1.
Returns a new pattern with values scaled to the given min/max range.
Most useful in combination with continuous patterns.

```
s("\[bd sd\]\*2,hh\*8")

.cutoff(sine.range(500,4000))
```
## rangex

Assumes a numerical pattern, containing unipolar values in the range 0 .. 1
Returns a new pattern with values scaled to the given min/max range,
following an exponential curve.

```
s("[bd sd]*2,hh*8")
.cutoff(sine.rangex(500,4000))
```
## range2

Assumes a numerical pattern, containing bipolar values in the range -1 .. 1
Returns a new pattern with values scaled to the given min/max range.

```
s("\[bd sd\]\*2,hh\*8")

.cutoff(sine2.range2(500,4000))
```
## ratio

Allows dividing numbers via list notation using ":".
Returns a new pattern with just numbers.

```
ratio("1, 5:4, 3:2").mul(110)

.freq().s("piano")
```
## as

Sets properties in a batch.

- mapping (String\|Array): the control names that are set

```
"c:.5 a:1 f:.25 e:.8".as("note:clip")
```

```
"{0@2 0.25 0 0.5 .3 .5}%8".as("begin").s("sax_vib").clip(1)
```
# Custom Parameters

You can also create your own parameters:

```
letx=createParam('x')

x(sine.range(0,200))

Multiple params can also be created in a more consice way, using `createParams`:
```

```
let{x,y}=createParams('x','y');

x(sine.range(0,200)).y(cosine.range(0,200));

Note that these params will not do anything until you give them meaning in your custom output!

From modifying parameters we transition to the concept of [Signals](https://strudel.cc/learn/signals/).

```

- [Control Parameters](https://strudel.cc/functions/value-modifiers/#control-parameters)

- [Parameter Functions](https://strudel.cc/functions/value-modifiers/#parameter-functions)

- [Plain vs Parameterized Values](https://strudel.cc/functions/value-modifiers/#plain-vs-parameterized-values)

- [Wrapping Parameter Functions](https://strudel.cc/functions/value-modifiers/#wrapping-parameter-functions)

- [Plain Value Modification](https://strudel.cc/functions/value-modifiers/#plain-value-modification)

- [Param Value Modification](https://strudel.cc/functions/value-modifiers/#param-value-modification)

- [Operators](https://strudel.cc/functions/value-modifiers/#operators)

- [add](https://strudel.cc/functions/value-modifiers/#add)

- [sub](https://strudel.cc/functions/value-modifiers/#sub)

- [mul](https://strudel.cc/functions/value-modifiers/#mul)

- [div](https://strudel.cc/functions/value-modifiers/#div)

- [round](https://strudel.cc/functions/value-modifiers/#round)

- [floor](https://strudel.cc/functions/value-modifiers/#floor)

- [ceil](https://strudel.cc/functions/value-modifiers/#ceil)
---

## Code Recipes

### Unknown Title

**Source:** https://strudel.cc/recipes/recipes

# Recipes

This page shows possible ways to achieve common (or not so common) musical goals.
There are often many ways to do a thing and there is no right or wrong.
The fun part is that each representation will give you different impulses when improvising.

## Arpeggios

An arpeggio is when the notes of a chord are played in sequence.
We can either write the notes by hand:

```
note("c eb g c4")
.clip(2).s("gm_electric_guitar_clean")
```

…or use scales:

```
n("0 2 4 7").scale("C:minor")
.clip(2).s("gm_electric_guitar_clean")
```

…or chord symbols:

```
n("0 1 2 3").chord("Cm").mode("above:c3").voicing()
.clip(2).s("gm_electric_guitar_clean")
```

…using off:

```
"0"
.off(1/3, add(2))
.off(1/2, add(4))
.n()
.scale("C:minor")
.s("gm_electric_guitar_clean")
```
## Chopping Breaks

A sample can be looped and chopped like this:

```
samples('github:yaxu/clean-breaks')
s("amen/4").fit().chop(32)
```

This fits the break into 8 cycles + chops it in 16 pieces.
The chops are not audible yet, because we’re not doing any manipulation.
Let’s add randmized doubling + reversing:

```
samples('github:yaxu/clean-breaks')
s("amen/4").fit().chop(16).cut(1)
.sometimesBy(.5, ply("2"))
.sometimesBy(.25, mul(speed("-1")))
```

If we want to specify the order of samples, we can replace `chop` with `slice`:

```
samples('github:yaxu/clean-breaks')
s("amen/4").fit()
.slice(8, "<0 1 2 3 4*2 5 6 [6 7]>*2")
.cut(1).rarely(ply("2"))
```

If we use `splice` instead of `slice`, the speed adjusts to the duration of the event:

```
samples('github:yaxu/clean-breaks')
s("amen")
.splice(8, "<0 1 2 3 4*2 5 6 [6 7]>*2")
.cut(1).rarely(ply("2"))
```

Note that we don’t need `fit`, because `splice` will do that by itself.

## Filter Envelopes

Using `lpenv`, we can make the filter move:

```
note("g1 bb1 <c2 eb2> d2")
.s("sawtooth")
.lpf(400).lpenv(4)
.scope()
```

The type of envelope depends on the methods you’re setting. Let’s set `lpa`:

```
note("g1 bb1 <c2 eb2> d2")
.s("sawtooth").lpq(8)
.lpf(400).lpa(.2).lpenv(4)
.scope()
```

Now the filter is attacking, rather than decaying as before (decay is the default). We can also do both

```
note("g1 bb1 <c2 eb2> d2")
.s("sawtooth").lpq(8)
.lpf(400).lpa(.1).lpd(.1).lpenv(4)
.scope()
```

You can play around with `lpa` \| `lpd` \| `lps` \| `lpd` to see what the filter envelope will do.

## Layering Sounds

We can layer sounds by separating them with ”,”:

```
note("<g1 bb1 d2 f1>")
.s("sawtooth, square") // <------
.scope()
```

We can control the gain of individual sounds like this:

```
note("<g1 bb1 d2 f1>")
.s("sawtooth, square:0:.5") // <--- "name:number:gain"
.scope()
```

For more control over each voice, we can use `layer`:

```
note("<g1 bb1 d2 f1>").layer(
x=>x.s("sawtooth").vib(4),
x=>x.s("square").add(note(12))
).scope()
```

Here, we give the sawtooth a vibrato and the square is moved an octave up.
With `layer`, you can use any pattern method available on each voice, so sky is the limit..

## Oscillator Detune

We can fatten a sound by adding a detuned version to itself:

```
note("<g1 bb1 d2 f1>")
.add(note("0,.1")) // <------ chorus
.s("sawtooth").scope()
```

Try out different values, or add another voice!

## Polyrhythms

Here is a simple example of a polyrhythm:

```
s("bd*2,hh*3")
```

A polyrhythm is when 2 different tempos happen at the same time.

## Polymeter

This is a polymeter:

```
s("<bd rim, hh hh oh>*4")
```

A polymeter is when 2 different bar lengths play at the same tempo.

## Phasing

This is a phasing:

```
note("<C D G A Bb D C A G D Bb A>*[6,6.1]").piano()
```

Phasing happens when the same sequence plays at slightly different tempos.

## Running through samples

Using `run` with `n`, we can rush through a sample bank:

```
samples('bubo:fox')
n(run(8)).s("ftabla")
```

This works great with sample banks that contain similar sounds, like in this case different recordings of a tabla.
Often times, you’ll hear the beginning of the phrase not where the pattern begins.
In this case, I hear the beginning at the third sample, which can be accounted for with `early`.

```
samples('bubo:fox')
n(run(8)).s("ftabla").early(2/8)
```

Let’s add some randomness:

```
samples('bubo:fox')
n(run(8)).s("ftabla").early(2/8)
.sometimes(mul(speed("1.5")))
```
## Tape Warble

We can emulate a pitch warbling effect like this:

```
note("<c4 bb f eb>*8")
.add(note(perlin.range(0,.5))) // <------ warble
.clip(2).s("gm_electric_guitar_clean")
```
## Sound Duration

There are a number of ways to change the sound duration. Using clip:

```
note("f ab bb c")
.clip("<2 1 .5 .25>")
```

The value of clip is relative to the duration of each event.
We can also create overlaps using release:

```
note("f ab bb c")
.release("<2 1 .5 .25>")
```

This will smoothly fade out each sound for the given number of seconds.
We could also make the notes shorter by using a decay envelope:

```
note("f ab bb c")
.decay("<2 1 .5 .25>")
```

When using samples, we also have `.end` to cut relative to the sample length:

```
s("oh*4").end("<1 .5 .25 .1>")
```

Compare that to clip:

```
s("oh*4").clip("<1 .5 .25 .1>")
```

or decay:

```
s("oh*4").decay("<1 .5 .25 .1>")
```
## Wavetable Synthesis

You can loop a sample with `loop` / `loopEnd`:

```
note("<c eb g f>").s("bd").loop(1).loopEnd(.05).gain(.2)
```

This allows us to play the first 5% of the bass drum as a synth!
To simplify loading wavetables, any sample that starts with `wt_` will be looped automatically:

```
samples('github:bubobubobubobubo/dough-waveforms')
note("c eb g bb").s("wt_dbass").clip(2)
```

Running through different wavetables can also give interesting variations:

```
samples('github:bubobubobubobubo/dough-waveforms')
note("c2*8").s("wt_dbass").n(run(8)).fast(2)
```

…adding a filter envelope + reverb:

```
samples('github:bubobubobubobubo/dough-waveforms')
note("c2*8").s("wt_dbass").n(run(8))
.lpf(perlin.range(100,1000).slow(8))
.lpenv(-3).lpa(.1).room(.5).fast(2)
```

- [Recipes](https://strudel.cc/recipes/recipes/#recipes)

- [Arpeggios](https://strudel.cc/recipes/recipes/#arpeggios)

- [Chopping Breaks](https://strudel.cc/recipes/recipes/#chopping-breaks)

- [Filter Envelopes](https://strudel.cc/recipes/recipes/#filter-envelopes)

- [Layering Sounds](https://strudel.cc/recipes/recipes/#layering-sounds)

- [Oscillator Detune](https://strudel.cc/recipes/recipes/#oscillator-detune)

- [Polyrhythms](https://strudel.cc/recipes/recipes/#polyrhythms)
---

## Concepts & Theory

### Unknown Title

**Source:** https://strudel.cc/understand/cycles

# Understanding Cycles
The concept of cycles is very central to be able to understand how Strudel works.
Strudel’s mother language, TidalCycles, even has it in its name.
## Cycles and BPM
In most music software, the unit BPM (beats per minute) is used to set the tempo.
Strudel expresses tempo as CPS (cycles per second), with a default of 0.5 CPS:

```
s("bd")
```

Here we can hear the 0.5CPS in action: The kick repeats once every two seconds.
Let’s make it 4 kicks:

```
s("bd bd bd bd")
```

Now we have 4 kicks per cycle, but the whole pattern still plays at 0.5CPS.
In terms of BPM, most musicians would tell you this is playing at 120bpm.
What about this one:

```
s("bd hh bd hh")
```

Because the second sound is now a hihat, the tempo feels slower again.
This brings us to an important realization:
Tempo is based on perception.
The choice of sounds also has an impact on the tempo feel.
This is why the same CPS can produce different perceived tempos.
## Setting CPM
If you’re familiar with BPM, you can use the `setcpm` method to set the global tempo in cycles per minute:

```
setcpm(110)
s("bd hh")
```

If you want to add more beats per cycle, you might want to divide the cpm:

```
setcpm(110/4)
s("bd sd bd rim, hh*8")
```

Or using 2 beats per cycle:

```
setcpm(110/2)
s("bd sd, hh*4")
```

You can use the `setcps` method to set the global tempo in cycles per second. `setcpm(x)` is the same as `setcps(x / 60)`.
To set a specific bpm, use `setcpm(bpm/bpc)`
- bpm: the target beats per minute
- bpc: the number of perceived beats per cycle
## Cycles and Bars
Also in most music software, multiple beats form a bar (or measure).
The so called time signature specifies how many beats are in each bar.
In many types of music, it is common to use 4 beats per bar, also known as 4/4 time.
Many music programs use it as a default.
Strudel does not a have concept of bars or measures, there are only cycles.
How you use them is up to you. Above, we’ve had this example:

```
setcpm(110/4)
s("bd sd bd rim, hh*8")
```

This could be interpreted as 4/4 time with a tempo of 110bpm.
We could write out multiple bars like this:

```
setcpm(110/4)
s(`<
[bd sd bd rim, hh*8]
[bd sd bd rim*2, hh*8]
>`)
```

Instead of writing out each bar separately, we could express this much shorter:

```
setcpm(110/2)
s("bd <sd rim*<1 2>>,hh*4")
```

Here we can see that thinking in cycles rather than bars simplifies things a lot!
These types of simplifications work because of the repetitive nature of rhythm.
In computational terms, you could say the former notation has a lot of redundancy.
## Time Signatures
To get a time signature, just change the number of elements per bar. Here is a rhythm with 7 beats:

```
s("bd ~ rim bd bd rim ~")
```

or with 5:

```
s("bd hh hh bd hh hh bd rim bd hh")
```

We could also write multiple bars with different time signatures:

```
setcpm(110*2)
s(`<
[bd hh rim]@3
[bd hh rim sd]@4
>`)
```

Here we switch between 3/4 and 4/4, keeping the same tempo.
If we don’t specify the length, we get what’s called a metric modulation:

```
setcpm(110/2)
s(`<
[bd hh rim]
[bd hh rim sd]
>`)
```

Now the 3 elements get the same time as the 4 elements, which is why the tempo changes.
---

### Unknown Title

**Source:** https://strudel.cc/understand/pitch

# Understanding Pitch
Let’s learn how pitch works! The slider below controls the frequency of an oscillator, producing a pitch:
220Hz
- Drag the slider to hear a pitch
- Move the slider to change the pitch
- Observe how the Hz number changes
- Caution: The higher frequencies could be disturbing for children or animals!
The Hz number is the frequency of the pitch you’re hearing.
The higher the frequency, the higher the pitch and vice versa.
A pitch occurs whenever something is vibrating / oscillating at a frequency, in this case it’s your speaker.
The unit **Hz** describes how many times that oscillation happens per second.
Our eyes are too slow to actually see the oscillation on the speaker, but we can [see it in slow motion](https://www.youtube.com/watch?v=CDMBWw7OuJQ).
The hearing range of a newborn is said to be between 20Hz and 20000Hz.
The upper limit decreases with age. What’s your upper limit?
In Strudel, we can play frequencies directly with the `freq` control:

```
freq("<200 [300,500] 400 [500,<600 670 712 670>]>*8")
```
## Frequency vs Pitch Perception
Maybe you have already noticed that the frequency slider is “lopsided”,
meaning the pitch changes more in the left region and less in the right region.
To make that more obvious, let’s add a pitch slider
that controls the frequency on a different scale:
220Hz = 55Hz \* 22
Frequency SweepPitch Sweep
Try out the buttons above to sweep through the frequency range in 2 different ways:
- Frequency Sweep: frequency rises linear , pitch rises logarithmic
- Pitch Sweep: frequency rises exponential , pitch rises linear
Don’t be scared of these mathematical terms:
- “logarithmic” is just a fancy way of saying “it starts fast and slows down”
- “exponential” is just a fancy way of saying “it starts slow and gets faster”
Most of the time, we might want to control pitch in a way that matches our perception,
which is what the pitch slider does.
## From Hz to Semitones
Because Hz does not match our perception, let’s try to find a unit for pitch that matches.
To approach that unit of pitch, let’s look at how frequency behaves when it is doubled:
220Hz = 55Hz \* 22
- Use the now stepped pitch slider above
- Can you hear how these pitches seem related to each other?
In musical terms, a pitch with double the frequency of another is an `octave` higher.
Because octaves are pretty far apart, octaves are typically divided into 12 smaller parts:
440Hz = 440Hz \* 20
This step is also called a semitone, which is the most common division of pitched music.
For example, the keys on a piano keyboard are also divided into semitones.
In Strudel, we could do that with `freq` like this:

```
freq(
"0 4 7 12"
.fmap(n => 440 * 2**(n/12))
)
```

Of course, this can be written shorter with note, as we will see below.
## From Semitones to MIDI numbers
Now we know what the distance of a semitone is.
Above, we used an arbitrary base frequency of 440Hz, which means the exponent 0 is equal to 440Hz.
Typically, 440Hz is standardized to the number 69, which leads to this calculation:
440Hz = 440Hz \* 2(69 \- 69)/12
The yellow number is now a MIDI number, covering more than the whole human hearing range with numbers from 0 to 127.
In Strudel, we can use MIDI numbers inside `note`:

```
note("69 73 76 81")
```
## From MIDI numbers to notes
In western music theory, notes are used instead of numbers.
For each midi number, there is at least one note label:
440Hz = 440Hz \* 2(69 \- 69)/12= A4
A4A4
A full note label consists of a letter (A-G), 0 or more accidentals (b \| #) and an octave number.
This system is also known as [Scientific Pitch Notation](https://en.wikipedia.org/wiki/Scientific_pitch_notation).
In Strudel, these note labels can also be used inside `note` as an alternative to midi numbers:

```
note("A4 C#5 E5 A5").piano()
```
## Open Questions
Now that we have learned about different representations of pitch, there are still open questions:
- Why 12 notes? What about different divisions of the octave?
- Why are notes labeled as they are? Why only 7 letters?
- Are there other labeling systems?
- What about Just Intonation Systems?
- What about Timbre?
All those questions are important to ask and will be answered in another article.
## Definition
At first, I wanted to start this article with a definition, but then thought it might be a good idea to focus on intuitive exploration.
Maybe you now understand this definition much better:
From [wikipedia](https://en.wikipedia.org/wiki/Pitch_(music)): “Pitch is a perceptual property of sounds that allows their ordering on a frequency-related scale, or more commonly, pitch is the quality that makes it possible to judge sounds as “higher” and “lower” in the sense associated with musical melodies.”
---

### Unknown Title

**Source:** https://strudel.cc/understand/voicings

# Understanding Chords and Voicings
Let’s dig deeper into how chords and voicings work in strudel.
I’ll try to keep theory jargon to a minimum, so hopefully this is approachable for anyone interested.
## What is a chord
Playing more than one note at a time is generally called a `chord`. Here’s an example:

```
note("<[c3,eb3,g3] [f3,a3,c4]>").room(.5)
```

Here’s the same with midi numbers:

```
note("<[48,51,55] [53,57,60]>").room(.5)
```

Here, we have two 3-note chords played in a loop.
You could already stop here and write chords in this style, which is totally fine and gives you control over individual notes.
One downside is that it can be difficult to find good sounding chords and maybe you’re yearning for a way to organize chords in some other way.
## Labeling Chords
Chords are typically given different labels depending on the relationship of the notes within.
In the number example above, we have `48,51,55` and `53,57,60`.
To analyze the relationship of those notes, they are typically compared to some `root`, which is often the lowest note.
In our case, the `roots` would be `48` (= `c3`) and `53` (= `f3`).
We can express the same chords relative to those `roots` like this:

```
note("<[0,3,7] [0,4,7]>".add("<48 53>")).room(.5)
```

Now within each chord, each number represents the distance from the root.
A distance between pitches is typically called `interval`, but let’s stick to distance for now.
Now we can see that our 2 chords are actually quite similar, as the only difference is the middle note (and the root of course).
They are part of a group of chords called `triads` which are chords with 3 notes.
### Triads
These 4 shapes are the most common types of `triads` you will encounter:
| shape | label |
| --- | --- |
| 0,4,7 | major |
| 0,3,7 | minor |
| 0,3,6 | diminished |
| 0,4,8 | augmented |
Here they are in succession:

```
note("<[0,4,7] [0,3,7] [0,3,6] [0,4,8]>".add("60"))
.room(.5)._pitchwheel()
```

Many types of music often only use minor and major chords, so we already have the knowledge to accompany songs. Here’s one:

```
note(`<
[0,3,7] [0,4,7] [0,4,7] [0,4,7]
[0,3,7] [0,4,7] [0,3,7] [0,4,7]
>`.add(`<
a c d f
a e a e
>`)).room(.5)
```

These are the chords for “The House of the Rising Sun” by The Animals.
So far, it doesn’t sound too exciting, but at least it’s recognizable.
## Voicings
A `voicing` is one of many ways a certain chord shape can be arranged.
The term comes from choral music, where chords can be sung in different ways by assigning different notes to each voice.
For example we could add 12 semitones to one or more notes in the chord:

```
note("<[0,3,7] [12,3,7] [12,15,7] [12,15,19]>".add("48"))
.room(.5)
```

Notes that are 12 semitone steps apart (= 1 `octave`) are considered to be equal in a harmonic sense, which is why they get the same note letter.
Here’s the same example with note letters:

```
note("<[c3,eb3,g3] [c4,eb3,g3] [c4,eb4,g3] [c4,eb4,g4]>")
.room(.5)
```

These types of voicings are also called `inversions`. There are many other ways we could `voice` this minor chord:

```
note("<[0,3,7,12] [0,15,24] [0,3,12]>".add("48"))
.room(.5)
```

Here we are changing the flavour of the chord slightly by
1. doubling notes 12 steps higher,
2. using very wide distances
3. omitting notes
## Voice Leading
When we want to meaningfully connect chords in a sequence, the chosen voicings affect the way each chord transitions to the next.
Let’s revisit “The House of the Rising Sun”, this time using our newly acquired voicing techniques:

```
note(`<
[0,3,7] [7,12,16] [0,7,16] [4,7,12]
[0,3,7] [4,7,12] [0,3,7] [4,7,12]
>`.add(`<
a c d f
a e a e
>`)).room(.5)
```

These voicings make the chords sound more connected and less jumpy, compared to the earlier version, which didn’t focus on voicing.
The way chords interact is also called `voice leading`, reminiscent of how an
individual choir voice would move through a sequence of chords.
For example, try singing the top voice in the above example. Then try the same
on the example not focusing on voice leading. Which one’s easier?
Naturally, there are many ways a progression of chords could be voiced and there is no definitive right or wrong.
## Chord Symbols
Musicians playing chord-based music often use a `lead sheet`, which is a simplified notation for a piece of music.
These sheets condense the essential elements, such as chords, into symbols that make the music easy to read and follow.
For example, a lead sheet for “The House of the Rising Sun” might include chords written like this:

```
Am | C | D | F
Am | E | Am | E
```

Here, each symbol consists of the `root` of the chord and optionally an `m` to signal it’s a minor chord (just the root note means it’s major).
We could mirror that notation in strudel using the `pick` function:

```
"<Am C D F Am E Am E>"
.pick({
 Am: "57,60,64",
 C: "55,60,64",
 D: "50,57,66",
 F: "57,60,65",
 E: "56,59,64",
})
.note().room(.5)
```
## The voicing function
Coming up with good sounding voicings that connect well can be a difficult and time consuming process.
The `chord` and `voicing` functions can be used to automate that:

```
chord("<Am C D F Am E Am E>").voicing().room(.5)
```

Here we’re also using chord symbols but the voicings will be automatically generated with smooth `voice leading`, minimizing jumps.
It is inspired by the way a piano or guitar player would pick chords to accompany a song.
## Voicing Dictionaries
The voicing function internally uses so called `voicing dictionaries`, which can also be customized:

```
addVoicings('house', {
'': ['7 12 16', '0 7 16', '4 7 12'],
'm': ['0 3 7']
})
chord("<Am C D F Am E Am E>")
.dict('house').anchor(66)
.voicing().room(.5)
```

In a `voicing dictionary`, each chord symbol is assigned one or more voicings.
The `voicing` function then picks the voicing that is closest to the `anchor` (defaults to `c5`).
The handy thing about this approach is that a `voicing dictionary` can be used to play any chord progression with automated voice leading!
## The default dictionary
When using the default dictionary, you can use these chord symbols:

```
2 5 6 7 9 11 13 69 add9
o h sus ^ - ^7 -7 7sus
h7 o7 ^9 ^13 ^7#11 ^9#11
^7#5 -6 -69 -^7 -^9 -9
-add9 -11 -7b5 h9 -b6 -#5
7b9 7#9 7#11 7b5 7#5 9#11
9b5 9#5 7b13 7#9#5 7#9b5
7#9#11 7b9#11 7b9b5 7b9#5
7b9#9 7b9b13 7alt 13#11
13b9 13#9 7b9sus 7susadd3
9sus 13sus 7b13sus
aug M m M7 m7 M9 M13
M7#11 M9#11 M7#5 m6 m69
m^7 -M7 m^9 -M9 m9 madd9
m11 m7b5 mb6 m#5 mM7 mM9
```

The available chords and the format is very much inspired by [ireal pro chords](https://technimo.helpshift.com/hc/en/3-ireal-pro/faq/88-chord-symbols-used-in-ireal-pro/).
Some symbols are synonymous:
- ”-” is the same as “m”, for example C-7 = Cm7
- ”^” is the same as “M”, for example C^7 = CM7
- ”+” is the same as “aug”
You can decide which ones you prefer. There is no international standard for these symbols.
To get a full chord, the symbols have to be prefixed with a root pitch, e.g. D7#11 is the 7#11 chord relative to the pitch D.
Here are all possible chords with root C:

```
chord(`<
C2 C5 C6 C7 C9 C11 C13 C69
Cadd9 Co Ch Csus C^ C- C^7
C-7 C7sus Ch7 Co7 C^9 C^13
C^7#11 C^9#11 C^7#5 C-6 C-69
C-^7 C-^9 C-9 C-add9 C-11
C-7b5 Ch9 C-b6 C-#5 C7b9
C7#9 C7#11 C7b5 C7#5 C9#11
C9b5 C9#5 C7b13 C7#9#5 C7#9b5
C7#9#11 C7b9#11 C7b9b5 C7b9#5
C7b9#9 C7b9b13 C7alt C13#11
C13b9 C13#9 C7b9sus C7susadd3
C9sus C13sus C7b13sus C Caug
CM Cm CM7 Cm7 CM9 CM13 CM7#11
CM9#11 CM7#5 Cm6 Cm69 Cm^7
C-M7 Cm^9 C-M9 Cm9 Cmadd9
Cm11 Cm7b5 Cmb6 Cm#5
>`).voicing().room(.5)
```

Note that the default dictionary contains multiple ways (= `voicings`) to play each chord symbol.
By default, the `voicing` function tries to minimize jumps.
You can alter the picked voicings in various ways, which are now explained in further detail:
## anchor
The `anchor` is a note that is used to align the voicings to:

```
anchor("<c4 g4 c5 g5>").chord("C").voicing().room(.5)
```

By default, the anchor is the highest possible note the voicing can contain.
When deciding which voicing of the dictionary to pick for a certain chord, the voicing with a top note closest to the anchor wins.
Note that the anchors in the above example match up with the top notes in the pianoroll.
Like `note`, anchor accepts either midi numbers or note names.
## mode
With `mode`, you can change the way the voicing relates to the `anchor`:

```
mode("<below above duck root>").chord("C").anchor("c5").voicing().room(.5)
```

The modes are:
- `below`: the top note of the voicing is lower than or equal to the anchor (default)
- `above`: the bottom note of the voicing is higher than or equal to the anchor
- `duck`: the top note of the voicing is lower than the anchor
- `root`: the bottom note of the voicing is always the root note closest to the anchor
The `anchor` can also be set from within the `mode` function:

```
mode("<below above duck root>:c5").chord("C").voicing().room(.5)
```
## n
The `n` control can be used with `voicing` to select individual notes:

```
n("0 3 1 2").chord("<C <Fm Db>>").voicing()
.clip("4 3 2 1").room(.5)
```
## Example
Here’s an example of a Jazz Blues in F:

```
let chords = chord(`<
F7 Bb7 F7 [Cm7 F7]
Bb7 Bo F7 [Am7 D7]
Gm7 C7 [F7 D7] [Gm7 C7]
>`)
$: n("7 8 [10 9] 8").set(chords).voicing().dec(.2)
$: chords.struct("- x - x").voicing().room(.5)
$: n("0 - 1 -").set(chords).mode("root:g2").voicing()
```

The chords are reused for melody, chords and bassline of the tune.

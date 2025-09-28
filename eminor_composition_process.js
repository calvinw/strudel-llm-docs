// This shows how Claude and I created this composition 

//First I ask it to start with some simple chord progressions in E:minor

//Heres the prompt I use:

/********************************************************
Make a stack with 4 pianos in the key desired.

The 1st and 2nd instruments should have 4 steps and have notes in each step from the scale chosen. 
These two instruments should have notes that come from chords for that key and so they harmonize.

The 3rd and 4th instruments will harmonize with instruments 1 and 2 on every 3rd step of their 12 steps. 
So first step 1 will harmonize with the first step in instruments 1 and then the 4th step will harmonize 
with step 2 of piano 1 and 2. 

Remember when instruments have a number of steps they all fit into the same cycle so the instruments 3 and 4 
are playing three times as fast as instrument 1 and 2. 

First create a version that has these "anchor" notes matching for all 4 instruments and then fill in the 
rest of the notes in instrument 3 and 4 with rests for now. 
**********************************************************/

//Im sure this is all standard Music Comp 101, but I dont know it that well
// and its fun to learn from Claude, it understands all the chords and scales, etc
// And the melodies and little edits are super easy to get Claude to do with you.
// Just ask it to redo it for you if it doesnt turn out sounding decent.


const g_scale = "E:minor"

//Step 0: Claude produced this set of piano chords for E:minor
// I think we looked about a dozen different examples of keys and these progressions 
// before I found one I liked.
const em_step0 = stack(
    // Instrument 1: 4-step chord progression (mid-range)
    n("0 2 1 3").scale(g_scale).sound("piano").gain(.6),

    // Instrument 2: 4-step harmonizing bass (moderate low range)
    n("-7 -5 -6 -4").scale(g_scale).sound("piano").gain(.6),

    // Instrument 3: 12-step (anchor on steps 1,4,7,10) 
    n("-2 ~ ~ 4 ~ ~ 3 ~ ~ 5 ~ ~").scale(g_scale).sound("piano").gain(.6),

    // Instrument 4: 12-step (anchor on steps 1,4,7,10)
    n("7 ~ ~ 7 ~ ~ 5 ~ ~ 3 ~ ~").scale(g_scale).sound("piano").gain(.8)
);

//Step 1: I picked some instruments (claudes not good at this)
const em_step1 = stack(
    // Instrument 1: 4-step chord progression (mid-range)
    n("0 2 1 3").scale(g_scale).sound("gm_pad_sweep").gain(.6),

    // Instrument 2: 4-step harmonizing bass (moderate low range)
    n("-7 -5 -6 -4").scale(g_scale).sound("gm_pad_warm").gain(.6),

    // Instrument 3: 12-step (anchor on steps 1,4,7,10) 
    n("-2 ~ ~ 4 ~ ~ 3 ~ ~ 5 ~ ~").scale(g_scale).sound("gm_synth_bass_1").gain(.6),

    // Instrument 4: 12-step (anchor on steps 1,4,7,10)
    n("7 ~ ~ 7 ~ ~ 5 ~ ~ 3 ~ ~").scale(g_scale).sound("supersaw").gain(.8)
);

//Step 2: Claude builts a melody for Instrument 3, keeping harmony with  Instrument 4, 
// I probably asked it for a few of these before we got one I liked.
const em_step2 = stack(

    n("0 2 1 3").scale(g_scale).sound("gm_pad_sweep").gain(.6),

    n("-7 -5 -6 -4").scale(g_scale).sound("gm_pad_warm").gain(.6),

    n("-2 -1 0 4 3 2 3 4 5 5 4 3").scale(g_scale).sound("gm_synth_bass_1").gain(.6),

    n("7 ~  ~  7 ~ ~ 5 ~ ~ 3 ~ ~").scale(g_scale).sound("supersaw").gain(.8),
  
);

//Step 3: Claude adds some simple syncopation (randomly) keeping harmony with Instrument 4
// This comes from a little set of edits I tell claude it can make. This could be more complex, but here we stay simple.
// I tell it to pick randomly a couple of these to apply.
//    note ->  [~ note]
//    note ->  [note ~]
//    note ->  [note@2 ~]
//    note ->  [~ note@2]


const em_step3 = stack(

    n("0 2 1 3").scale(g_scale).sound("gm_pad_sweep").gain(.6),

    n("-7 -5 -6 -4").scale(g_scale).sound("gm_pad_warm").gain(.6),

    n("-2 [-1 ~] 0 4 3 [~ 2@2] 3 4 [5 ~] 5 4 3").scale(g_scale).sound("gm_synth_bass_1").gain(.6),

    n("7 ~ ~ 7 ~ ~ 5 ~ ~ 3 ~ ~").scale(g_scale).sound("supersaw").gain(.8),
  
);

//Step 4: Claude adds a few notes to Instrument 4 and also some syncopation, 
// and harmonizes any non-anchor steps with Instrument 3
const em_step4 = stack(

    n("0 2 1 3").scale(g_scale).sound("gm_pad_sweep").gain(.6),

    n("-7 -5 -6 -4").scale(g_scale).sound("gm_pad_warm").gain(.6),

    n("-2 [-1 ~] 0 4 3 [~ 2@2] 3 4 [5 ~] 5 4 3").scale(g_scale).sound("gm_synth_bass_1").gain(.6),

    n("7 ~ [~ 7@2] ~ 5 ~ ~ 4 ~ 3 2 -2").scale(g_scale).sound("supersaw").gain(.8),
  
);

//Step 5: Claude  adds some simple syncopation for Instruments 1 and 2
const em_step5 = stack(

    n("0 [2@2 ~] 1 3").scale(g_scale).sound("gm_pad_sweep").gain(.6),

    n("-7 -5 [~ -6] -4").scale(g_scale).sound("gm_pad_warm").gain(.6),

    n("-2 [-1 ~] 0 4 3 [~ 2@2] 3 4 [5 ~] 5 4 3").scale(g_scale).sound("gm_synth_bass_1").gain(.6),

    n("7 ~ [~ 7@2] ~ 5 ~ ~ 4 ~ 3 2 -2").scale(g_scale).sound("supersaw").gain(.8),
  
);

//Step 5: I added reverb using room then shape() to sharpen the sound
const em_step6 = stack(

    n("0 [2@2 ~] 1 3").scale(g_scale).sound("gm_pad_sweep").gain(.6).room(2).shape(.1),

    n("-7 -5 [~ -6] -4").scale(g_scale).sound("gm_pad_warm").gain(.6).room(2).shape(.1),

    n("-2 [-1 ~] 0 4 3 [~ 2@2] 3 4 [5 ~] 5 4 3").scale(g_scale).sound("gm_synth_bass_1").gain(.6).room(2).shape(.1),

    n("7 ~ [~ 7@2] ~ 5 ~ ~ 4 ~ 3 2 -2").scale(g_scale).sound("supersaw").gain(.8).shape(.1),
);

//Step 5: Add some drums 
const em_step7 = stack(

    n("0 [2@2 ~] 1 3").scale(g_scale).sound("gm_pad_sweep").gain(.6).room(2).shape(.1),

    n("-7 -5 [~ -6] -4").scale(g_scale).sound("gm_pad_warm").gain(.6).room(2).shape(.1),

    n("-2 [-1 ~] 0 4 3 [~ 2@2] 3 4 [5 ~] 5 4 3").scale(g_scale).sound("gm_synth_bass_1").gain(.6).room(2).shape(.1),

    n("7 ~ [~ 7@2] ~ 5 ~ ~ 4 ~ 3 2 -2").scale(g_scale).sound("supersaw").gain(.8).shape(.1),

    s("[bd bd] <hh oh hh> [hh hh?] <bd sd> hh? <hh oh> [bd bd] [sd hh?] [<hh oh>? bd] [sd <sd cp>] hh <hh oh>").gain(rand.range(1, 1.6))
);


arrange(
  [2, em_step0],
  [2, em_step1],
  [2, em_step2],
  [2, em_step3],
  [2, em_step4],
  [2, em_step5],
  [2, em_step6],
  [10, em_step7],
  
).slow(1.6)

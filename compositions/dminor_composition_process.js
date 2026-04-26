// D Minor Composition Process - Final Version with Piano Intro
// Created using the anchor framework methodology with descending melody

const g_scale = "D:minor"

// Step 0: Basic piano framework with anchors
const dm_step0 = stack(
    // Instrument 1: 4-step melody line
    n("0 3 4 0").scale(g_scale).sound("piano").gain(.7),

    // Instrument 2: 4-step harmonizing line
    n("2 5 6 2").scale(g_scale).sound("piano").gain(.5),

    // Instrument 3: 12-step (anchor on steps 1,4,7,10)
    n("4 ~ ~ 7 ~ ~ 8 ~ ~ 4 ~ ~").scale(g_scale).sound("piano").gain(.5),

    // Instrument 4: 12-step bass (anchor on steps 1,4,7,10)
    n("-7 ~ ~ -4 ~ ~ -3 ~ ~ -7 ~ ~").scale(g_scale).sound("piano").gain(.8)
);

// Step 1: Add different instruments
const dm_step1 = stack(
    // Instrument 1: 4-step melody line - warm pad
    n("0 3 4 0").scale(g_scale).sound("gm_pad_warm").gain(.6),

    // Instrument 2: 4-step harmonizing line - strings
    n("2 5 6 2").scale(g_scale).sound("gm_string_ensemble_1").gain(.4),

    // Instrument 3: 12-step - electric bass (anchors only)
    n("4 ~ ~ 7 ~ ~ 8 ~ ~ 4 ~ ~").scale(g_scale).sound("gm_electric_bass_finger").gain(.7),

    // Instrument 4: 12-step bass - synth bass (anchors only)
    n("-7 ~ ~ -4 ~ ~ -3 ~ ~ -7 ~ ~").scale(g_scale).sound("supersaw").gain(.8)
);

// Step 2: Add DESCENDING melody to Instrument 3, keeping anchor harmony
const dm_step2 = stack(
    // Instrument 1: 4-step melody line
    n("0 3 4 0").scale(g_scale).sound("gm_pad_warm").gain(.6),

    // Instrument 2: 4-step harmonizing line
    n("2 5 6 2").scale(g_scale).sound("gm_string_ensemble_1").gain(.4),

    // Instrument 3: 12-step with DESCENDING melody - new anchors: 9,7,5,2
    n("9 8 7 7 6 5 5 4 3 2 1 0").scale(g_scale).sound("gm_electric_bass_finger").gain(.7),

    // Instrument 4: 12-step bass - keeping anchors
    n("-7 ~ ~ -4 ~ ~ -3 ~ ~ -7 ~ ~").scale(g_scale).sound("supersaw").gain(.8)
);

// Step 3: Add syncopation to Instrument 3 using the standard transforms:
//    note ->  [~ note]
//    note ->  [note ~]
//    note ->  [note@2 ~]
//    note ->  [~ note@2]
const dm_step3 = stack(
    // Instrument 1: 4-step melody line
    n("0 3 4 0").scale(g_scale).sound("gm_pad_warm").gain(.6),

    // Instrument 2: 4-step harmonizing line
    n("2 5 6 2").scale(g_scale).sound("gm_string_ensemble_1").gain(.4),

    // Instrument 3: 12-step with syncopation - randomly applied transforms
    n("9 [8 ~] 7 7 [~ 6@2] 5 5 4 [3 ~] 2 1 0").scale(g_scale).sound("gm_electric_bass_finger").gain(.7),

    // Instrument 4: 12-step bass - keeping anchors
    n("-7 ~ ~ -4 ~ ~ -3 ~ ~ -7 ~ ~").scale(g_scale).sound("supersaw").gain(.8)
);

// Step 4: Add sparse melody to instrument 4, echoing instrument 3's syncopation
const dm_step4 = stack(
    // Instrument 1: 4-step melody line
    n("0 3 4 0").scale(g_scale).sound("gm_pad_warm").gain(.6),

    // Instrument 2: 4-step harmonizing line
    n("2 5 6 2").scale(g_scale).sound("gm_string_ensemble_1").gain(.4),

    // Instrument 3: 12-step with syncopation
    n("9 [8 ~] 7 7 [~ 6@2] 5 5 4 [3 ~] 2 1 0").scale(g_scale).sound("gm_electric_bass_finger").gain(.7),

    // Instrument 4: 12-step bass with sparse melody - echoing syncopation
    n("-7 ~ [-6 ~] -4 ~ -5 -3 -4 ~ -7 [-8 ~] -9").scale(g_scale).sound("supersaw").gain(.8)
);

// Step 5: Add syncopation to Instruments 1 and 2
const dm_step5 = stack(
    // Instrument 1: 4-step melody with syncopation
    n("0 [3 ~] 4 0").scale(g_scale).sound("gm_pad_warm").gain(.6),

    // Instrument 2: 4-step harmony with syncopation
    n("2 5 [~ 6@2] 2").scale(g_scale).sound("gm_string_ensemble_1").gain(.4),

    // Instrument 3: 12-step with syncopation
    n("9 [8 ~] 7 7 [~ 6@2] 5 5 4 [3 ~] 2 1 0").scale(g_scale).sound("gm_electric_bass_finger").gain(.7),

    // Instrument 4: 12-step bass with sparse melody
    n("-7 ~ [-6 ~] -4 ~ -5 -3 -4 ~ -7 [-8 ~] -9").scale(g_scale).sound("supersaw").gain(.8)
);

// Step 6: Add reverb and effects
const dm_step6 = stack(
    // Instrument 1: 4-step melody with reverb
    n("0 [3 ~] 4 0").scale(g_scale).sound("gm_pad_warm").gain(.6).room(2).shape(.1),

    // Instrument 2: 4-step harmony with reverb
    n("2 5 [~ 6@2] 2").scale(g_scale).sound("gm_string_ensemble_1").gain(.4).room(2).shape(.1),

    // Instrument 3: 12-step with reverb
    n("9 [8 ~] 7 7 [~ 6@2] 5 5 4 [3 ~] 2 1 0").scale(g_scale).sound("gm_electric_bass_finger").gain(.7).room(2).shape(.1),

    // Instrument 4: 12-step bass with shape
    n("-7 ~ [-6 ~] -4 ~ -5 -3 -4 ~ -7 [-8 ~] -9").scale(g_scale).sound("supersaw").gain(.8).shape(.1)
);

// Step 7: Add drums for the full composition
const dm_step7 = stack(
    // Instrument 1: 4-step melody with reverb
    n("0 [3 ~] 4 0").scale(g_scale).sound("gm_pad_warm").gain(.6).room(2).shape(.1),

    // Instrument 2: 4-step harmony with reverb
    n("2 5 [~ 6@2] 2").scale(g_scale).sound("gm_string_ensemble_1").gain(.4).room(2).shape(.1),

    // Instrument 3: 12-step with reverb
    n("9 [8 ~] 7 7 [~ 6@2] 5 5 4 [3 ~] 2 1 0").scale(g_scale).sound("gm_electric_bass_finger").gain(.7).room(2).shape(.1),

    // Instrument 4: 12-step bass with shape
    n("-7 ~ [-6 ~] -4 ~ -5 -3 -4 ~ -7 [-8 ~] -9").scale(g_scale).sound("supersaw").gain(.8).shape(.1),

    // Drums: Complex pattern with steady gain
    s("[bd bd] <hh oh hh> [hh hh?] <bd sd> hh? <hh oh> [bd bd] [sd hh?] [<hh oh>? bd] [sd <sd cp>] hh <hh oh>").gain(1)
);

// Final arrangement - showcasing the complete development process
arrange(
  [2, dm_step0],  // Basic piano framework
  [2, dm_step1],  // Different instruments with anchors
  [2, dm_step2],  // Descending melody added
  [2, dm_step3],  // Syncopation in instrument 3
  [2, dm_step4],  // Melody added to instrument 4
  [2, dm_step5],  // Syncopation in instruments 1&2
  [2, dm_step6],  // Effects added
  [10, dm_step7]  // Full composition with drums
).slow(1.6)
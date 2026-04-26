const g_scale = "Bb:lydian"

const bb_step0 = stack(
    n("0 2 4 1").scale(g_scale).sound("piano"),
    n("2 4 6 3").scale(g_scale).sound("piano"),
    n("4 ~ ~ 6 ~ ~ 7 ~ ~ 4 ~ ~").scale(g_scale).sound("piano"),
    n("-7 ~ ~ -5 ~ ~ -7 ~ ~ -4 ~ ~").scale(g_scale).sound("piano")
);

const bb_step1 = stack(
    n("0 2 4 1").scale(g_scale).sound("piano"),
    n("2 4 6 3").scale(g_scale).sound("piano"),
    n("4 5 6 6 7 8 7 6 5 4 3 2").scale(g_scale).sound("piano"),
    n("-7 ~ ~ -5 ~ ~ -7 ~ ~ -4 ~ ~").scale(g_scale).sound("piano")
);

const bb_step2 = stack(
    n("0 2 4 1").scale(g_scale).sound("piano"),
    n("2 4 6 3").scale(g_scale).sound("piano"),
    n("4 5 6 6 7 8 7 6 5 4 3 2").scale(g_scale).sound("piano"),
    n("-7 -6 -5 -5 -4 -3 -7 -6 -5 -4 -5 -6").scale(g_scale).sound("piano"),
    n("11 10 9 8 7 6 6 5 4 3 2 1").scale(g_scale).sound("piano")
);

const bb_step3 = stack(
    n("0 2 4 1").scale(g_scale).sound("gm_pad_warm").room(1),
    n("2 4 6 3").scale(g_scale).sound("gm_string_ensemble_1").room(1),
    n("4 5 6 6 7 8 7 6 5 4 3 2").scale(g_scale).sound("gm_lead_7_fifths"),
    n("-7 -6 -5 -5 -4 -3 -7 -6 -5 -4 -5 -6").scale(g_scale).sound("gm_synth_bass_1:3").gain(.6).lpf(1000),
    n("11 10 9 8 7 6 6 5 4 3 2 1").scale(g_scale).sound("piano")
);

const bb_step4 = stack(
    n("0 2 4 1").scale(g_scale).sound("gm_pad_warm").room(1),
    n("2 4 6 3").scale(g_scale).sound("gm_string_ensemble_1").room(1),
    n("4 5 6 6 7 8 7 6 5 4 3 2").scale(g_scale).sound("gm_lead_7_fifths"),
    n("-7 [~ -6] -5 [-5 ~] [~ -4@2] -3 -7 [-6 ~] -5 [-4@2 ~] -5 [~ -6]").scale(g_scale).sound("gm_synth_bass_1:3").room(2).gain(.5).lpf(1000),
    n("11 10 9 8 7 6 6 5 4 3 2 1").scale(g_scale).sound("piano")
);

const bb_step5 = stack(
    n("0 [2 ~] 4 1").scale(g_scale).sound("gm_pad_warm").room(1),
    n("2 4 [~ 6@2] 3").scale(g_scale).sound("gm_string_ensemble_1").room(1),
    n("4 5 6 6 7 8 7 6 5 4 3 2").scale(g_scale).sound("gm_lead_7_fifths"),
    n("-7 [~ -6] -5 [-5 ~] [~ -4@2] -3 -7 [-6 ~] -5 [-4@2 ~] -5 [~ -6]").scale(g_scale).sound("gm_synth_bass_1:3").room(2).gain(.5).lpf(1000),
    n("11 10 9 8 7 6 6 5 4 3 2 1").scale(g_scale).sound("piano").room(2)
);

const bb_step6 = stack(
    n("0 [2 ~] 4 1").scale(g_scale).sound("gm_pad_warm").room(1),
    n("2 4 [~ 6@2] 3").scale(g_scale).sound("gm_string_ensemble_1").room(1),
    n("4 5 6 6 7 8 7 6 5 4 3 2").scale(g_scale).sound("gm_lead_7_fifths"),
    n("-7 [~ -6] -5 [-5 ~] [~ -4@2] -3 -7 [-6 ~] -5 [-4@2 ~] -5 [~ -6]").scale(g_scale).sound("gm_synth_bass_1:3").room(2).gain(.5).lpf(1000),
    n("11 [~ 10] 9 [8 ~] [~ 7@2] 6 6 [5 ~] 4 [3@2 ~] 2 [~ 1]").scale(g_scale).sound("piano").room(2)
);

const bb_step7 = stack(
    n("0 [2 ~] 4 1").scale(g_scale).sound("gm_pad_warm").room(1),
    n("2 4 [~ 6@2] 3").scale(g_scale).sound("gm_string_ensemble_1").room(1),
    n("4 5 5 6 6 6 7 7 8 8 9 8 8 7 7 6 6 5 5 4 4 3 2 2").scale(g_scale).sound("gm_lead_7_fifths").gain(1.0).shape(.25).room(.4),
    n("-7 [~ -6] -5 [-5 ~] [~ -4@2] -3 -7 [-6 ~] -5 [-4@2 ~] -5 [~ -6]").scale(g_scale).sound("gm_synth_bass_1:3").room(2).gain(.5).lpf(1200),
    n("11 [~ 10] 9 [8 ~] [~ 7@2] 6 6 [5 ~] 4 [3@2 ~] 2 [~ 1]").scale(g_scale).sound("piano").room(2)
);

const bb_step8 = stack(
    n("0 [2 ~] 4 1").scale(g_scale).sound("gm_pad_warm").room(1),
    n("2 4 [~ 6@2] 3").scale(g_scale).sound("gm_string_ensemble_1").room(1),
    n("4 6 5 7 6 8 7 9 8 10 9 7 8 6 7 5 6 4 5 3 4 2 3 1").scale(g_scale).sound("gm_lead_7_fifths").gain(1.0).shape(.1).room(.4),
    n("-7 [~ -6] -5 [-5 ~] [~ -4@2] -3 -7 [-6 ~] -5 [-4@2 ~] -5 [~ -6]").scale(g_scale).sound("gm_synth_bass_1:3").room(2).gain(.5).lpf(1200),
    n("11 [~ 10] 9 [8 ~] [~ 7@2] 6 6 [5 ~] 4 [3@2 ~] 2 [~ 1]").scale(g_scale).sound("piano").room(2)
);

const bb_step9 = stack(
    n("0 [2 ~] 4 1").scale(g_scale).sound("gm_pad_warm").room(1),
    n("2 4 [~ 6@2] 3").scale(g_scale).sound("gm_string_ensemble_1").room(1),
    n("4 7 0 8 2 6 0 9 7 5 4 2 6 8 6 4  7 0 8 3 6 5 3").scale(g_scale).sound("gm_lead_7_fifths").gain(1.0).shape(.1).room(.4),
    n("-7 [~ -6] -5 [-5 ~] [~ -4@2] -3 -7 [-6 ~] -5 [-4@2 ~] -5 [~ -6]").scale(g_scale).sound("gm_synth_bass_1:3").room(2).gain(.5).lpf(1200),
    n("11 [~ 10] 9 [8 ~] [~ 7@2] 6 6 [5 ~] 4 [3@2 ~] 2 [~ 1]").scale(g_scale).sound("piano").room(2)
);

const bb_step10 = stack(
    n("0 [2 ~] 4 1").scale(g_scale).sound("gm_pad_warm").room(1),
    n("2 4 [~ 6@2] 3").scale(g_scale).sound("gm_string_ensemble_1").room(1),
    n("0 4 7 0 2 4 6 4 2 6 8 4 1 4 6 8 6 4 5 3 1 5 7 3").scale(g_scale).sound("gm_lead_7_fifths").gain(1.0).shape(.1).room(.4),
    n("-7 [~ -6] -5 [-5 ~] [~ -4@2] -3 -7 [-6 ~] -5 [-4@2 ~] -5 [~ -6]").scale(g_scale).sound("gm_synth_bass_1:3").room(2).gain(.5).lpf(1200),
    n("11 [~ 10] 9 [8 ~] [~ 7@2] 6 6 [5 ~] 4 [3@2 ~] 2 [~ 1]").scale(g_scale).sound("piano").room(2)
);

const bb_step11 = stack(
    n("0 [2 ~] 4 1").scale(g_scale).sound("gm_pad_warm").room(1).gain(.4),
    n("3@2 4 8 2 9@2 10 3 8@2 9 7 4@2 8 2 6@2 7 1 5@2 0").scale(g_scale).sound("gm_lead_7_fifths").gain(.4).lpf(1000)
);

const bb_step12 = stack(
    n("0 [2 ~] 4 1").scale(g_scale).sound("gm_pad_warm").room(1).gain(.6),
    n("2 4 [~ 6@2] 3").scale(g_scale).sound("gm_string_ensemble_1").room(1).gain(.6),
    n("3@2 4 8 2 9@2 10 3 8@2 9 7 4@2 8 2 6@2 7 1 5@2 0").scale(g_scale).sound("gm_lead_7_fifths").gain(.8).lpf(1000)
);

const bb_step13 = stack(
    n("0 [2 ~] 4 1").scale(g_scale).sound("gm_pad_warm").room(1).gain(.8),
    n("2 4 [~ 6@2] 3").scale(g_scale).sound("gm_string_ensemble_1").room(1).gain(.8),
    n("3@2 4 8 2 9@2 10 3 8@2 9 7 4@2 8 2 6@2 7 1 5@2 0").scale(g_scale).sound("gm_lead_7_fifths").gain(1.2).lpf(1000),
    n("11 [~ 10] 9 [8 ~] [~ 7@2] 6 6 [5 ~] 4 [3@2 ~] 2 [~ 1]").scale(g_scale).sound("piano").room(2)
);

const bb_step14 = stack(
    n("0 [2 ~] 4 1").scale(g_scale).sound("gm_pad_warm").room(1),
    n("2 4 [~ 6@2] 3").scale(g_scale).sound("gm_string_ensemble_1").room(1),
    n("3@2 4 8 2 9@2 10 3 8@2 9 7 4@2 8 2 6@2 7 1 5@2 0").scale(g_scale).sound("gm_lead_7_fifths").gain(1.4),
    n("-7 [~ -6] -5 [-5 ~] [~ -4@2] -3 -7 [-6 ~] -5 [-4@2 ~] -5 [~ -6]").scale(g_scale).sound("gm_synth_bass_1:3").room(4 ).gain(.4).lpf(1000),
    n("11 [~ 10] 9 [8 ~] [~ 7@2] 6 6 [5 ~] 4 [3@2 ~] 2 [~ 1]").scale(g_scale).sound("piano").room(2)
);

arrange(
  [1, bb_step0],
  [1, bb_step1],
  [1, bb_step2],
  [1, bb_step3],
  [1, bb_step4],
  [1, bb_step5],
  [1, bb_step6],
  [4, bb_step7],
  [4, bb_step8],
  [4, bb_step9],
  [4, bb_step10],
  [4, bb_step11],
  [4, bb_step12],
  [4, bb_step13],
  [4, bb_step14],
).slow(1.75)

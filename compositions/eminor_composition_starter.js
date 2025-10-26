// E Minor Composition Starter
// Basic piano framework with anchor points - ready for your development!
// Ask your LLM to choose different chord progressions and harmonizing anchors

const g_scale = "E:minor"

// Step 0: Basic piano framework with anchors
const em_step0 = stack(
    // Instrument 1: 4-step chord progression (mid-range)
    n("0 2 1 3").scale(g_scale).sound("piano"),

    // Instrument 2: 4-step harmonizing bass (moderate low range)
    n("-7 -5 -6 -4").scale(g_scale).sound("piano"),

    // Instrument 3: 12-step (anchor on steps 1,4,7,10)
    n("-2 ~ ~ 4 ~ ~ 3 ~ ~ 5 ~ ~").scale(g_scale).sound("piano"),

    // Instrument 4: 12-step (anchor on steps 1,4,7,10)
    n("7 ~ ~ 7 ~ ~ 5 ~ ~ 3 ~ ~").scale(g_scale).sound("piano"));

arrange(
  [2, em_step0],

).slow(1.6)
// D Minor Composition Starter
// Basic piano framework with anchor points - ready for your development!
// Ask your LLM to choose different chord progressions and harmonizing anchors

const g_scale = "D:minor"

// Step 0: Basic piano framework with anchors
const dm_step0 = stack(
    // Instrument 1: 4-step melody line
    n("0 3 4 0").scale(g_scale).sound("piano"),

    // Instrument 2: 4-step harmonizing line
    n("2 5 6 2").scale(g_scale).sound("piano"),

    // Instrument 3: 12-step (anchor on steps 1,4,7,10)
    n("4 ~ ~ 7 ~ ~ 8 ~ ~ 4 ~ ~").scale(g_scale).sound("piano"),

    // Instrument 4: 12-step bass (anchor on steps 1,4,7,10)
    n("-7 ~ ~ -4 ~ ~ -3 ~ ~ -7 ~ ~").scale(g_scale).sound("piano"));

arrange(
  [2, dm_step0],

).slow(1.6)
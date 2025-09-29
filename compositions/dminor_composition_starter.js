// D Minor Composition Starter
// Basic piano framework with anchor points - ready for your development!
// Ask your LLM to choose different chord progressions and harmonizing anchors

const g_scale = "D:minor"

// Basic piano framework with anchors
const dm_starter = stack(
    // Instrument 1: 4-step melody line
    n("0 3 4 0").scale(g_scale).sound("piano").gain(.7),

    // Instrument 2: 4-step harmonizing line
    n("2 5 6 2").scale(g_scale).sound("piano").gain(.5),

    // Instrument 3: 12-step (anchor on steps 1,4,7,10)
    n("4 ~ ~ 7 ~ ~ 8 ~ ~ 4 ~ ~").scale(g_scale).sound("piano").gain(.5),

    // Instrument 4: 12-step bass (anchor on steps 1,4,7,10)
    n("-7 ~ ~ -4 ~ ~ -3 ~ ~ -7 ~ ~").scale(g_scale).sound("piano").gain(.8)
);

dm_starter
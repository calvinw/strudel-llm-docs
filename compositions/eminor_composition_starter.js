// E Minor Composition Starter
// Basic piano framework with anchor points - ready for your development!
// Ask your LLM to choose different chord progressions and harmonizing anchors

const g_scale = "E:minor"

// Basic piano framework with anchors
const em_starter = stack(
    // Instrument 1: 4-step chord progression (mid-range)
    n("0 2 1 3").scale(g_scale).sound("piano").gain(.6),

    // Instrument 2: 4-step harmonizing bass (moderate low range)
    n("-7 -5 -6 -4").scale(g_scale).sound("piano").gain(.6),

    // Instrument 3: 12-step (anchor on steps 1,4,7,10)
    n("-2 ~ ~ 4 ~ ~ 3 ~ ~ 5 ~ ~").scale(g_scale).sound("piano").gain(.6),

    // Instrument 4: 12-step (anchor on steps 1,4,7,10)
    n("7 ~ ~ 7 ~ ~ 5 ~ ~ 3 ~ ~").scale(g_scale).sound("piano").gain(.8)
);

em_starter
import { linTo, expTo, setTarget, setCurveValue } from "../../src/AudioParam";

describe("AudioParam:calc", () => {
  it("linTo(v, v0, v1, t, t0, t1): number", () => {
    assert(closeTo(linTo(0, -10, +10, 0.800, 1.000, 2.000), -10, 1e-6));
    assert(closeTo(linTo(0, -10, +10, 1.000, 1.000, 2.000), -10, 1e-6));
    assert(closeTo(linTo(0, -10, +10, 1.200, 1.000, 2.000), -6, 1e-6));
    assert(closeTo(linTo(0, -10, +10, 1.400, 1.000, 2.000), -2, 1e-6));
    assert(closeTo(linTo(0, -10, +10, 1.600, 1.000, 2.000), +2, 1e-6));
    assert(closeTo(linTo(0, -10, +10, 1.800, 1.000, 2.000), +6, 1e-6));
    assert(closeTo(linTo(0, -10, +10, 2.000, 1.000, 2.000), +10, 1e-6));
    assert(closeTo(linTo(0, -10, +10, 2.200, 1.000, 2.000), +10, 1e-6));

    assert(closeTo(linTo(0, +10, -10, 0.800, 1.000, 2.000), +10, 1e-6));
    assert(closeTo(linTo(0, +10, -10, 1.000, 1.000, 2.000), +10, 1e-6));
    assert(closeTo(linTo(0, +10, -10, 1.200, 1.000, 2.000), +6, 1e-6));
    assert(closeTo(linTo(0, +10, -10, 1.400, 1.000, 2.000), +2, 1e-6));
    assert(closeTo(linTo(0, +10, -10, 1.600, 1.000, 2.000), -2, 1e-6));
    assert(closeTo(linTo(0, +10, -10, 1.800, 1.000, 2.000), -6, 1e-6));
    assert(closeTo(linTo(0, +10, -10, 2.000, 1.000, 2.000), -10, 1e-6));
    assert(closeTo(linTo(0, +10, -10, 2.200, 1.000, 2.000), -10, 1e-6));
  });
  it("expTo(v, v0, v1, t, t0, t1): number", () => {
    assert(closeTo(expTo(0, 0, 0, 0.800, 1.000, 2.000), 0, 1e-6));
    assert(closeTo(expTo(0, 0, 0, 1.000, 1.000, 2.000), 0, 1e-6));
    assert(closeTo(expTo(0, 0, 0, 1.200, 1.000, 2.000), 0, 1e-6));
    assert(closeTo(expTo(0, 0, 0, 1.400, 1.000, 2.000), 0, 1e-6));
    assert(closeTo(expTo(0, 0, 0, 1.600, 1.000, 2.000), 0, 1e-6));
    assert(closeTo(expTo(0, 0, 0, 1.800, 1.000, 2.000), 0, 1e-6));
    assert(closeTo(expTo(0, 0, 0, 2.000, 1.000, 2.000), 0, 1e-6));
    assert(closeTo(expTo(0, 0, 0, 2.200, 1.000, 2.000), 0, 1e-6));

    assert(closeTo(expTo(0, 1e-3, 10, 0.800, 1.000, 2.000), 1e-3, 1e-6));
    assert(closeTo(expTo(0, 1e-3, 10, 1.000, 1.000, 2.000), 1e-3, 1e-6));
    assert(closeTo(expTo(0, 1e-3, 10, 1.200, 1.000, 2.000), 0.0063095735386013, 1e-6));
    assert(closeTo(expTo(0, 1e-3, 10, 1.400, 1.000, 2.000), 0.0398107171058654, 1e-6));
    assert(closeTo(expTo(0, 1e-3, 10, 1.600, 1.000, 2.000), 0.2511886358261108, 1e-6));
    assert(closeTo(expTo(0, 1e-3, 10, 1.800, 1.000, 2.000), 1.5848932266235352, 1e-6));
    assert(closeTo(expTo(0, 1e-3, 10, 2.000, 1.000, 2.000), 10, 1e-6));
    assert(closeTo(expTo(0, 1e-3, 10, 2.200, 1.000, 2.000), 10, 1e-6));

    assert(closeTo(expTo(0, 10, 1e-3, 0.800, 1.000, 2.000), 10, 1e-6));
    assert(closeTo(expTo(0, 10, 1e-3, 1.000, 1.000, 2.000), 10, 1e-6));
    assert(closeTo(expTo(0, 10, 1e-3, 1.200, 1.000, 2.000), 1.5848932266235352, 1e-6));
    assert(closeTo(expTo(0, 10, 1e-3, 1.400, 1.000, 2.000), 0.2511886358261108, 1e-6));
    assert(closeTo(expTo(0, 10, 1e-3, 1.600, 1.000, 2.000), 0.0398107171058654, 1e-6));
    assert(closeTo(expTo(0, 10, 1e-3, 1.800, 1.000, 2.000), 0.0063095735386013, 1e-6));
    assert(closeTo(expTo(0, 10, 1e-3, 2.000, 1.000, 2.000), 1e-3, 1e-6));
    assert(closeTo(expTo(0, 10, 1e-3, 2.200, 1.000, 2.000), 1e-3, 1e-6));

    assert(closeTo(expTo(0, -1e-3, -10, 0.800, 1.000, 2.000), -1e-3, 1e-6));
    assert(closeTo(expTo(0, -1e-3, -10, 1.000, 1.000, 2.000), -1e-3, 1e-6));
    assert(closeTo(expTo(0, -1e-3, -10, 1.200, 1.000, 2.000), -0.0063095735386013, 1e-6));
    assert(closeTo(expTo(0, -1e-3, -10, 1.400, 1.000, 2.000), -0.0398107171058654, 1e-6));
    assert(closeTo(expTo(0, -1e-3, -10, 1.600, 1.000, 2.000), -0.2511886358261108, 1e-6));
    assert(closeTo(expTo(0, -1e-3, -10, 1.800, 1.000, 2.000), -1.5848932266235352, 1e-6));
    assert(closeTo(expTo(0, -1e-3, -10, 2.000, 1.000, 2.000), -10, 1e-6));
    assert(closeTo(expTo(0, -1e-3, -10, 2.200, 1.000, 2.000), -10, 1e-6));

    assert(closeTo(expTo(0, -10, -1e-3, 0.800, 1.000, 2.000), -10, 1e-6));
    assert(closeTo(expTo(0, -10, -1e-3, 1.000, 1.000, 2.000), -10, 1e-6));
    assert(closeTo(expTo(0, -10, -1e-3, 1.200, 1.000, 2.000), -1.5848932266235352, 1e-6));
    assert(closeTo(expTo(0, -10, -1e-3, 1.400, 1.000, 2.000), -0.2511886358261108, 1e-6));
    assert(closeTo(expTo(0, -10, -1e-3, 1.600, 1.000, 2.000), -0.0398107171058654, 1e-6));
    assert(closeTo(expTo(0, -10, -1e-3, 1.800, 1.000, 2.000), -0.0063095735386013, 1e-6));
    assert(closeTo(expTo(0, -10, -1e-3, 2.000, 1.000, 2.000), -1e-3, 1e-6));
    assert(closeTo(expTo(0, -10, -1e-3, 2.200, 1.000, 2.000), -1e-3, 1e-6));

    assert(closeTo(expTo(0, -10, +10, 1.500, 1.000, 2.000), 0, 1e-6));
    assert(closeTo(expTo(0, +10, -10, 1.500, 1.000, 2.000), 0, 1e-6));
  });
  it("setTarget(v0, v1, t, t0, timeConstant): number", () => {
    assert(closeTo(setTarget(0, 10, 0.000, 1.000, 1.0), 0, 1e-6));
    assert(closeTo(setTarget(0, 10, 0.200, 1.000, 1.0), 0, 1e-6));
    assert(closeTo(setTarget(0, 10, 0.400, 1.000, 1.0), 0, 1e-6));
    assert(closeTo(setTarget(0, 10, 0.600, 1.000, 1.0), 0, 1e-6));
    assert(closeTo(setTarget(0, 10, 0.800, 1.000, 1.0), 0, 1e-6));
    assert(closeTo(setTarget(0, 10, 1.000, 1.000, 1.0), 0, 1e-6));
    assert(closeTo(setTarget(0, 10, 1.200, 1.000, 1.0), 1.81269252300262, 1e-6));
    assert(closeTo(setTarget(0, 10, 1.400, 1.000, 1.0), 3.29679942131042, 1e-6));
    assert(closeTo(setTarget(0, 10, 1.600, 1.000, 1.0), 4.51188373565673, 1e-6));
    assert(closeTo(setTarget(0, 10, 1.800, 1.000, 1.0), 5.50671052932739, 1e-6));
    assert(closeTo(setTarget(0, 10, 2.000, 1.000, 1.0), 6.32120561599731, 1e-6));
    assert(closeTo(setTarget(0, 10, 2.200, 1.000, 1.0), 6.98805809020996, 1e-6));
    assert(closeTo(setTarget(0, 10, 2.400, 1.000, 1.0), 7.53403043746948, 1e-6));
    assert(closeTo(setTarget(0, 10, 2.600, 1.000, 1.0), 7.98103475570678, 1e-6));
    assert(closeTo(setTarget(0, 10, 2.800, 1.000, 1.0), 8.34701156616211, 1e-6));
    assert(closeTo(setTarget(0, 10, 3.000, 1.000, 1.0), 8.64664745330810, 1e-6));
    assert(closeTo(setTarget(0, 10, 3.200, 1.000, 1.0), 8.89196872711181, 1e-6));
    assert(closeTo(setTarget(0, 10, 3.400, 1.000, 1.0), 9.09282016754150, 1e-6));
    assert(closeTo(setTarget(0, 10, 3.800, 1.000, 1.0), 9.39189910888671, 1e-6));
    assert(closeTo(setTarget(0, 10, 4.000, 1.000, 1.0), 9.50212955474853, 1e-6));
    assert(closeTo(setTarget(0, 10, 4.200, 1.000, 1.0), 9.59237766265869, 1e-6));
    assert(closeTo(setTarget(0, 10, 4.400, 1.000, 1.0), 9.66626739501953, 1e-6));
    assert(closeTo(setTarget(0, 10, 4.800, 1.000, 1.0), 9.77629184722900, 1e-6));
    assert(closeTo(setTarget(0, 10, 5.000, 1.000, 1.0), 9.81684398651123, 1e-6));
  });
  it("setCurveValue(v, t, t0, t1, curve): number", () => {
    let curve = new Float32Array([ 440, 660, 880, 220 ]);

    assert(closeTo(setCurveValue(0, 0.000, 1.000, 4.000, curve), 440, 1e-6));
    assert(closeTo(setCurveValue(0, 0.200, 1.000, 4.000, curve), 440, 1e-6));
    assert(closeTo(setCurveValue(0, 0.400, 1.000, 4.000, curve), 440, 1e-6));
    assert(closeTo(setCurveValue(0, 0.600, 1.000, 4.000, curve), 440, 1e-6));
    assert(closeTo(setCurveValue(0, 0.800, 1.000, 4.000, curve), 440, 1e-6));
    assert(closeTo(setCurveValue(0, 1.000, 1.000, 4.000, curve), 440, 1e-6));
    assert(closeTo(setCurveValue(0, 1.200, 1.000, 4.000, curve), 440, 1e-6));
    assert(closeTo(setCurveValue(0, 1.400, 1.000, 4.000, curve), 440, 1e-6));
    assert(closeTo(setCurveValue(0, 1.600, 1.000, 4.000, curve), 440, 1e-6));
    assert(closeTo(setCurveValue(0, 1.800, 1.000, 4.000, curve), 660, 1e-6));
    assert(closeTo(setCurveValue(0, 2.000, 1.000, 4.000, curve), 660, 1e-6));
    assert(closeTo(setCurveValue(0, 2.200, 1.000, 4.000, curve), 660, 1e-6));
    assert(closeTo(setCurveValue(0, 2.400, 1.000, 4.000, curve), 660, 1e-6));
    assert(closeTo(setCurveValue(0, 2.600, 1.000, 4.000, curve), 880, 1e-6));
    assert(closeTo(setCurveValue(0, 2.800, 1.000, 4.000, curve), 880, 1e-6));
    assert(closeTo(setCurveValue(0, 3.000, 1.000, 4.000, curve), 880, 1e-6));
    assert(closeTo(setCurveValue(0, 3.200, 1.000, 4.000, curve), 880, 1e-6));
    assert(closeTo(setCurveValue(0, 3.400, 1.000, 4.000, curve), 220, 1e-6));
    assert(closeTo(setCurveValue(0, 3.600, 1.000, 4.000, curve), 220, 1e-6));
    assert(closeTo(setCurveValue(0, 3.800, 1.000, 4.000, curve), 220, 1e-6));
    assert(closeTo(setCurveValue(0, 4.000, 1.000, 4.000, curve), 220, 1e-6));
    assert(closeTo(setCurveValue(0, 4.200, 1.000, 4.000, curve), 220, 1e-6));
    assert(closeTo(setCurveValue(0, 4.400, 1.000, 4.000, curve), 220, 1e-6));
    assert(closeTo(setCurveValue(0, 4.600, 1.000, 4.000, curve), 220, 1e-6));
    assert(closeTo(setCurveValue(0, 4.800, 1.000, 4.000, curve), 220, 1e-6));
    assert(closeTo(setCurveValue(0, 5.000, 1.000, 4.000, curve), 220, 1e-6));
  });
});

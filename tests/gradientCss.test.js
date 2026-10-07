import assert from "node:assert/strict";
import test from "node:test";
import { createGradientCss, cssGradientPresets } from "../src/utils/gradientCss.js";

const stops = [{ color: "#f0c0d0", position: 0 }, { color: "#7964dc", position: 100 }];

test("creates a linear CSS background declaration", () => {
    assert.equal(createGradientCss("linear", 135, stops), "background: linear-gradient(135deg, #F0C0D0 0%, #7964DC 100%);");
});

test("creates a centered radial CSS background declaration", () => {
    assert.equal(createGradientCss("radial", 45, stops), "background: radial-gradient(circle at center, #F0C0D0 0%, #7964DC 100%);");
});

test("sorts stops by their position before creating CSS", () => {
    const css = createGradientCss("linear", 0, [...stops].reverse());
    assert.ok(css.indexOf("#F0C0D0 0%") < css.indexOf("#7964DC 100%"));
});

test("includes five curated presets with valid stop values", () => {
    assert.equal(cssGradientPresets.length, 5);
    for (const preset of cssGradientPresets) assert.doesNotThrow(() => createGradientCss(preset.type, preset.angle, preset.stops));
});

test("rejects invalid types, angles, stop counts, colors, and positions", () => {
    assert.throws(() => createGradientCss("conic", 90, stops), /linear or radial/);
    assert.throws(() => createGradientCss("linear", 361, stops), /0 to 360/);
    assert.throws(() => createGradientCss("radial", 45, [stops[0]]), /two and five/);
    assert.throws(() => createGradientCss("linear", 20, [{ color: "red", position: 0 }, stops[1]]), /six-digit/);
    assert.throws(() => createGradientCss("linear", 20, [stops[0], { color: "#FFFFFF", position: 101 }]), /0 to 100/);
});

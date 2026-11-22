import { describe, expect, it } from "vitest";
import { jendelaPenuh, viewportTablet } from "../dunia";

describe("viewport tablet", () => {
  const ipad = { w: 820, h: 1180 };
  it("jendela penuh berdiri maupun miring boleh diperbesar", () => {
    expect(jendelaPenuh(ipad, 820)).toBe(true);
    expect(jendelaPenuh(ipad, 1180)).toBe(true);
    expect(jendelaPenuh(ipad, 0)).toBe(true);
  });
  it("Split View dan Slide Over tidak diperbesar", () => {
    for (const w of [320, 375, 507, 585, 678]) expect(jendelaPenuh(ipad, w)).toBe(false);
  });
  it("iPad mini berdiri tetap apa adanya, iPad miring diperbesar", () => {
    expect(viewportTablet({ w: 744, h: 1133 }, false)).toBeNull();
    expect(viewportTablet(ipad, true)).toContain("width=1007");
  });
});

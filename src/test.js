const util = require("./util");

describe("extractNumber", () => {
  describe("with a prefixed number in the input string", () => {
    test("it should return the prefixed number", () => {
      expect(util.extractNumber("123")).toBe(123);
      expect(util.extractNumber("123abc")).toBe(123);
      expect(util.extractNumber("123 abc")).toBe(123);
    });
  });

  describe("when there is no number in the input string", () => {
    test("it should return null", () => {
      expect(util.extractNumber("abc")).toBe(null);
      expect(util.extractNumber("")).toBe(null);
      expect(util.extractNumber(null)).toBe(null);
    });
  });

  describe("when there is a number not at the beginning of a string", () => {
    test("it should return null", () => {
      expect(util.extractNumber("abc123def")).toBe(null);
      expect(util.extractNumber("abc123")).toBe(null);
    });
  });
});

describe("extractCharString", () => {
  describe("when there is no number in the input string", () => {
    test("should return the whole string", () => {
      expect(util.extractCharString("abc")).toBe("abc");
    });
  });

  describe("when there is a number prefixed in the input string", () => {
    expect(util.extractCharString("123abc")).toBe("abc");
    expect(util.extractCharString("123 abc")).toBe("abc");
  });

  describe("when there is no text in the input string", () => {
    test("it should return the empty string", () => {
      expect(util.extractCharString("123")).toBe("");
    });
  });

  describe("when the input string is null", () => {
    test("it should return null", () => {
      expect(util.extractCharString(null)).toBe(null);
    });
  });
});

describe("compareNumeralPrefixedStrings", () => {
  describe("with a single element array", () => {
    test("it should return the same array", () => {
      const input = ["abc"];
      const expected = ["abc"];

      expect(input.sort(util.compareNumeralPrefixedStrings)).toEqual(expected);
    });
  });

  describe("with a blend of number prefixed and non-number prefixed strings", () => {
    test("it should return the sorted array", () => {
      const input = ["100000 xyz", "bcd", "123abc", "abc", "23 abc"];
      const expected = ["23 abc", "123abc", "100000 xyz", "abc", "bcd"];

      expect(input.sort(util.compareNumeralPrefixedStrings)).toEqual(expected);
    });
  });

  describe("with strings containing unicode characters", () => {
    test("it should sort the unicode strings without throwing an error", () => {
      const input = ["🍎", "🍏", "🍊", "🍋"];
      const expected = ["🍊", "🍋", "🍎", "🍏"];

      expect(input.sort(util.compareNumeralPrefixedStrings)).toEqual(expected);
    });
  });
});

import { getDateForDay, getDaysForMonth } from "./common.mjs";
import assert from "node:assert";
import { describe, test } from "node:test";

describe("getDateForDay", () => {
  test("Ada Lovelace Day 2024 is October 8", () => {
    const day = {
      monthName: "October",
      dayName: "Tuesday",
      occurrence: "second",
    };
    const result = getDateForDay(day, 2024);
    assert.strictEqual(result.getDate(), 8);
    assert.strictEqual(result.getMonth(), 9);
    assert.strictEqual(result.getFullYear(), 2024);
  });

  test("Ada Lovelace Day 2020 is October 13", () => {
    const day = {
      monthName: "October",
      dayName: "Tuesday",
      occurrence: "second",
    };
    const result = getDateForDay(day, 2020);
    assert.strictEqual(result.getDate(), 13);
    assert.strictEqual(result.getMonth(), 9);
  });

  test("Ada Lovelace Day 2025 is October 14", () => {
    const day = {
      monthName: "October",
      dayName: "Tuesday",
      occurrence: "second",
    };
    const result = getDateForDay(day, 2025);
    assert.strictEqual(result.getDate(), 14);
    assert.strictEqual(result.getMonth(), 9);
  });
});

describe("getDaysForMonth", () => {
  test("returns correct entries for October 2024", () => {
    const days = [
      {
        name: "Ada Lovelace Day",
        monthName: "October",
        dayName: "Tuesday",
        occurrence: "second",
      },
      {
        name: "World Lemur Day",
        monthName: "October",
        dayName: "Friday",
        occurrence: "last",
      },
    ];
    const result = getDaysForMonth(days, 9, 2024);
    assert.strictEqual(result.size, 2);
    assert.strictEqual(result.get(8)[0].name, "Ada Lovelace Day");
    assert.strictEqual(result.get(25)[0].name, "World Lemur Day");
  });
});

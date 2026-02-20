// This is a placeholder file which shows how you can access functions and data defined in other files. You can delete the contents of the file once you have understood how it works.
// It can be run with `node`.

import fs from "fs";
import days from "./days.json" with { type: "json" };
import { getDateForDay } from "./common.mjs";

/**
 * Format a Date object as YYYYMMDD for iCalendar all-day events.
 *
 * @param {Date} date
 * @returns {string}
 */
function formatDate(date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}${mm}${dd}`;
}

/**
 * Generate a deterministic UID for an iCalendar event.
 *
 * @param {string} name
 * @param {string} ymd
 * @returns {string}
 */
function generateUID(name, ymd) {
  return `${ymd}-${name.replace(/\s+/g, "-")}@cyf`;
}

const lines = [
  "BEGIN:VCALENDAR",
  "VERSION:2.0",
  "PRODID:-//CYF Days Calendar//EN",
];

for (let year = 2020; year <= 2030; year++) {
  for (const day of days) {
    const date = getDateForDay(day, year);
    const ymd = formatDate(date);
    const uid = generateUID(day.name, ymd);

    lines.push("BEGIN:VEVENT");
    lines.push(`UID:${uid}`);
    lines.push(`DTSTAMP:${ymd}T000000Z`);
    lines.push(`DTSTART;VALUE=DATE:${ymd}`);
    lines.push(`SUMMARY:${day.name}`);
    lines.push("END:VEVENT");
  }
}

lines.push("END:VCALENDAR");

fs.writeFileSync("days.ics", lines.join("\r\n"));

console.log("days.ics generated successfully.");

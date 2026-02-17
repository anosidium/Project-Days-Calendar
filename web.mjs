// This is a placeholder file which shows how you can access functions and data defined in other files.
// It can be loaded into index.html.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getGreeting } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };

function previousMonth() {}

function nextMonth() {}

function changeMonth(event) {}

function changeYear(event) {}

function populateYearSelectControl(element) {
  for (let i = 1900; i <= 2050; i++) {
    const option = new Option(i.toString(), i);
    element.add(option);
  }
}

function getCurrentMonthAndYear() {
  const date = new Date();
  return date.toLocaleString(undefined, { month: "long", year: "numeric" });
}

window.addEventListener("load", () => {
  const currentMonthYear = document.getElementById("current-month-year");
  const previousMonthButton = document.getElementById("prev-month");
  const nextMonthButton = document.getElementById("next-month");
  const monthSelectControl = document.getElementById("month-select");
  const yearSelectControl = document.getElementById("year-select");

  currentMonthYear.textContent = getCurrentMonthAndYear();
  populateYearSelectControl(yearSelectControl);

  previousMonthButton.addEventListener("click", previousMonth);
  nextMonthButton.addEventListener("click", nextMonth);
  monthSelectControl.addEventListener("change", changeMonth);
  yearSelectControl.addEventListener("change", changeYear);
});

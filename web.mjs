// This is a placeholder file which shows how you can access functions and data defined in other files.
// It can be loaded into index.html.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getGreeting } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };

const currentMonthYear = document.getElementById("current-month-year");
const previousMonthButton = document.getElementById("prev-month");
const nextMonthButton = document.getElementById("next-month");
const monthSelectControl = document.getElementById("month-select");
const yearSelectControl = document.getElementById("year-select");
const calendarGrid = document.getElementById("calendar-grid");

const calendar = {
  month: null,
  year: null,
};

function previousMonth() {
  if (calendar.month === 0) {
    calendar.month = 11;
    calendar.year -= 1;
  } else {
    calendar.month -= 1;
  }

  renderCalendar();
}

function nextMonth() {
  if (calendar.month === 11) {
    calendar.month = 0;
    calendar.year += 1;
  } else {
    calendar.month += 1;
  }

  renderCalendar();
}

function changeMonth(event) {
  setCalendar(event.target.value);
}

function changeYear(event) {
  setCalendar(calendar.month, event.target.value);
}

function populateYearSelectControl(element) {
  for (let i = 1900; i <= 2050; i++) {
    const option = new Option(i.toString(), i);
    element.add(option);
  }
}

function formatMonthYear(month, year) {
  return new Date(year, month).toLocaleString(undefined, { month: "long", year: "numeric" });
}

function updateHeader() {
  currentMonthYear.textContent = formatMonthYear(calendar.month, calendar.year);
}

function setCalendar(month, year = calendar.year) {
  calendar.month = Number(month);
  calendar.year = Number(year);
  renderCalendar();
}

function synchroniseControls() {
  monthSelectControl.value = calendar.month;
  yearSelectControl.value = calendar.year;
}

function renderGrid() {
  // Remove old day cells but keep 7 weekday headers
  while (calendarGrid.children.length > 7) {
    calendarGrid.removeChild(calendarGrid.lastChild);
  }

  const firstDay = new Date(calendar.year, calendar.month, 1).getDay();
  const daysInMonth = new Date(calendar.year, calendar.month + 1, 0).getDate();

  // Leading empty cells
  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement("div");
    emptyCell.setAttribute("role", "gridcell");
    calendarGrid.appendChild(emptyCell);
  }

  // Actual days
  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement("div");
    cell.textContent = day;
    cell.setAttribute("role", "gridcell");
    calendarGrid.appendChild(cell);
  }
}

function renderCalendar() {
  updateHeader();
  synchroniseControls();
  renderGrid();
}

window.addEventListener("load", () => {
  previousMonthButton.addEventListener("click", previousMonth);
  nextMonthButton.addEventListener("click", nextMonth);
  monthSelectControl.addEventListener("change", changeMonth);
  yearSelectControl.addEventListener("change", changeYear);

  const today = new Date();
  calendar.month = today.getMonth();
  calendar.year = today.getFullYear();

  populateYearSelectControl(yearSelectControl);
  renderCalendar();
});

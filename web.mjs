import { getDaysForMonth } from "./common.mjs";

const currentMonthYear = document.getElementById("current-month-year");
const previousMonthButton = document.getElementById("prev-month");
const nextMonthButton = document.getElementById("next-month");
const monthSelectControl = document.getElementById("month-select");
const yearSelectControl = document.getElementById("year-select");
const calendarGrid = document.getElementById("calendar-grid");

let commemorativeDays = [];

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
  return new Date(year, month).toLocaleString(undefined, {
    month: "long",
    year: "numeric",
  });
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
  const specialDays = getDaysForMonth(
    commemorativeDays,
    calendar.month,
    calendar.year
  );

  // Leading empty cells
  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement("div");
    emptyCell.setAttribute("role", "gridcell");
    calendarGrid.appendChild(emptyCell);
  }

  // Actual days
  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement("div");
    const dayNumber = document.createElement("div");
    dayNumber.className = "day-number";
    dayNumber.textContent = day;
    cell.appendChild(dayNumber);
    cell.setAttribute("role", "gridcell");

    if (specialDays.has(day)) {
      for (const special of specialDays.get(day)) {
        const label = document.createElement("div");
        label.className = "day-event";
        label.textContent = special.name;
        cell.appendChild(label);
      }
    }

    calendarGrid.appendChild(cell);
  }
}

function renderCalendar() {
  updateHeader();
  synchroniseControls();
  renderGrid();
}

window.addEventListener("DOMContentLoaded", async () => {
  previousMonthButton.addEventListener("click", previousMonth);
  nextMonthButton.addEventListener("click", nextMonth);
  monthSelectControl.addEventListener("change", changeMonth);
  yearSelectControl.addEventListener("change", changeYear);

  const today = new Date();
  calendar.month = today.getMonth();
  calendar.year = today.getFullYear();

  populateYearSelectControl(yearSelectControl);

  const response = await fetch("days.json");
  commemorativeDays = await response.json();

  renderCalendar();
});

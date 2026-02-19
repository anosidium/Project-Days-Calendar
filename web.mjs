import { getDaysForMonth } from "./common.mjs";

const currentMonthYear = document.getElementById("current-month-year");
const previousMonthButton = document.getElementById("prev-month");
const nextMonthButton = document.getElementById("next-month");
const monthSelectControl = document.getElementById("month-select");
const yearSelectControl = document.getElementById("year-select");
const calendarBody = document.getElementById("calendar-body");

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
  // Remove old day rows but keep the header rowgroup
  while (calendarBody.firstChild) {
    calendarBody.removeChild(calendarBody.firstChild);
  }

  const firstDay = new Date(calendar.year, calendar.month, 1).getDay();
  const daysInMonth = new Date(calendar.year, calendar.month + 1, 0).getDate();
  const specialDays = getDaysForMonth(
    commemorativeDays,
    calendar.month,
    calendar.year
  );

  const totalCells = firstDay + daysInMonth;
  const totalRows = Math.ceil(totalCells / 7);

  for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
    const row = document.createElement("div");
    row.setAttribute("role", "row");

    for (let colIndex = 0; colIndex < 7; colIndex++) {
      const cellIndex = rowIndex * 7 + colIndex;
      const cell = document.createElement("div");
      cell.setAttribute("role", "gridcell");

      if (cellIndex >= firstDay && cellIndex < firstDay + daysInMonth) {
        const day = cellIndex - firstDay + 1;
        const dayNumber = document.createElement("div");
        dayNumber.className = "day-number";
        dayNumber.textContent = day;
        cell.appendChild(dayNumber);

        if (specialDays.has(day)) {
          for (const special of specialDays.get(day)) {
            const label = document.createElement("div");
            label.className = "day-event";
            label.textContent = special.name;
            cell.appendChild(label);
          }
        }
      }

      row.appendChild(cell);
    }

    calendarBody.appendChild(row);
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

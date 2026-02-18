const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const OCCURRENCE_MAP = {
  first: 1,
  second: 2,
  third: 3,
  fourth: 4,
};

export function getDateForDay(day, year) {
  const month = MONTH_NAMES.indexOf(day.monthName);
  const targetDay = DAY_NAMES.indexOf(day.dayName);

  if (day.occurrence === "last") {
    // Start from last day of month and go backwards
    const lastDate = new Date(year, month + 1, 0);
    const diff = (lastDate.getDay() - targetDay + 7) % 7;
    return new Date(year, month, lastDate.getDate() - diff);
  }

  const occurrenceNumber = OCCURRENCE_MAP[day.occurrence];
  const firstOfMonth = new Date(year, month, 1);
  const firstDayOfWeek = firstOfMonth.getDay();
  // How many days until the first occurrence of targetDay
  const daysUntilTarget = (targetDay - firstDayOfWeek + 7) % 7;
  const date = 1 + daysUntilTarget + (occurrenceNumber - 1) * 7;
  return new Date(year, month, date);
}

export function getDaysForMonth(days, month, year) {
  const result = new Map();
  const monthName = MONTH_NAMES[month];
  const daysInMonth = days.filter((d) => d.monthName === monthName);

  for (const day of daysInMonth) {
    const date = getDateForDay(day, year);
    const dayOfMonth = date.getDate();
    if (!result.has(dayOfMonth)) {
      result.set(dayOfMonth, []);
    }
    result.get(dayOfMonth).push(day);
  }

  return result;
}

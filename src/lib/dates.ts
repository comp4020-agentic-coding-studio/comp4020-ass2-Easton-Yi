const longDate = new Intl.DateTimeFormat("en-AU", {
  dateStyle: "long",
  timeZone: "UTC",
});

const dayMonth = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "long",
  timeZone: "UTC",
});

const withTime = new Intl.DateTimeFormat("en-AU", {
  dateStyle: "long",
  timeStyle: "short",
  timeZone: "Australia/Sydney",
});

const weekdayOnly = new Intl.DateTimeFormat("en-AU", {
  weekday: "long",
  timeZone: "Australia/Sydney",
});

const dayMonthYear = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Australia/Sydney",
});

const hoursMinutes = new Intl.DateTimeFormat("en-AU", {
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
  timeZone: "Australia/Sydney",
});

/** Format a date-only value without letting the viewer's timezone move it. */
export function formatCourseDate(value: Date | string): string {
  const date = typeof value === "string" ? new Date(`${value}T00:00:00Z`) : value;
  return longDate.format(date);
}

/** Short "22 February" form, for compact schedule-table cells. */
export function formatWeekBeginning(value: Date | string): string {
  const date = typeof value === "string" ? new Date(`${value}T00:00:00Z`) : value;
  return dayMonth.format(date);
}

/** Full date and AET time, for a deadline shown alongside a project link. */
export function formatCourseDateTime(value: Date | string): string {
  const date = typeof value === "string" ? new Date(value) : value;
  return `${withTime.format(date)} AET`;
}

/** "Sunday 21 March 2027, 23:59 AET" --- the Home-page project-card deadline form. */
export function formatCourseDeadline(value: Date | string): string {
  const date = typeof value === "string" ? new Date(value) : value;
  return `${weekdayOnly.format(date)} ${dayMonthYear.format(date)}, ${hoursMinutes.format(date)} AET`;
}

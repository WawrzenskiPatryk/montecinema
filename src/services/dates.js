export function getWeekdayName(dayId) {
  const errorMessage = `
    No matching ID to weekday. 
    Used ID: ${dayId}, while possible IDs are from 0 to 6.
  `;
  if (dayId === 0) return 'Sunday';
  if (dayId === 1) return 'Monday';
  if (dayId === 2) return 'Tuesday';
  if (dayId === 3) return 'Wednesday';
  if (dayId === 4) return 'Thursday';
  if (dayId === 5) return 'Friday';
  if (dayId === 6) return 'Saturday';
  else throw new Error(errorMessage);
}

export function getDateObject(date) {
  let today;

  if (!date || date.trim().length === 0 || typeof date !== 'string') {
    today = new Date();
  } else {
    today = new Date(date);
  }

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const weekday = getWeekdayName(today.getDay());

  return {
    year: year.toString(),
    month: month.toString().padStart(2, '0'),
    day: day.toString().padStart(2, '0'),
    weekday: weekday,
  };
}

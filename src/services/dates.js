function getWeekdayName(dayId) {
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

export function getApiDateFormat(yearString, monthString, dayString) {
  return `${yearString}-${monthString}-${dayString}`;
}

export function getDisplayDateFormat(yearString, monthString, dayString) {
  return `${dayString}/${monthString}/${yearString}`;
}

function getFollowingDays(year, month, day, weekdayIndex) {
  const followingDays = [];

  for (let i = 1; i <= 5; i++) {
    const followingDayInstance = new Date(year, month, day + i);
    const resultYear = followingDayInstance.getFullYear();
    const resultMonth = (followingDayInstance.getMonth() + 1).toString().padStart(2, '0');
    const resultDay = followingDayInstance.getDate().toString().padStart(2, '0');
    const followingDayIndex = (weekdayIndex + i) % 7;

    const followingDay = {
      apiDate: getApiDateFormat(resultYear, resultMonth, resultDay),
      displayDate: getDisplayDateFormat(resultYear, resultMonth, resultDay),
      weekday: getWeekdayName(followingDayIndex),
      shortWeekday: getWeekdayName(followingDayIndex).slice(0, 3),
    };

    followingDays.push(followingDay);
  }

  return followingDays;
}

export function getDateObject() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();
  const formattedYear = year.toString();
  const formattedMonth = (month + 1).toString().padStart(2, '0');
  const formattedDay = day.toString().padStart(2, '0');
  const weekdayIndex = now.getDay();

  const dateObject = {
    apiDate: getApiDateFormat(formattedYear, formattedMonth, formattedDay),
    displayDate: getDisplayDateFormat(formattedYear, formattedMonth, formattedDay),
    weekday: getWeekdayName(weekdayIndex),
    shortWeekday: getWeekdayName(weekdayIndex).slice(0, 3),
    followingDays: getFollowingDays(year, month, day, weekdayIndex),
  };

  return dateObject;
}

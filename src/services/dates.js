export const weekdayShortNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

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

function padStartFormat(number) {
  return number.toString().padStart(2, '0');
}

function getApiDateFormat(year, month, day) {
  return `${year}-${padStartFormat(month)}-${padStartFormat(day)}`;
}

function getDisplayDateFormat(year, month, day) {
  return `${padStartFormat(day)}/${padStartFormat(month)}/${year}`;
}

export function getFormattedDateObject(newDateInstance) {
  const year = newDateInstance.getFullYear();
  const month = newDateInstance.getMonth();
  const actualMonth = month + 1;
  const day = newDateInstance.getDate();
  const weekdayIndex = newDateInstance.getDay();
  return {
    meta: {
      year,
      month,
      day,
    },
    apiDate: getApiDateFormat(year, actualMonth, day),
    displayDate: getDisplayDateFormat(year, actualMonth, day),
    weekday: getWeekdayName(weekdayIndex),
    shortWeekday: getWeekdayName(weekdayIndex).slice(0, 3),
  };
}

function getFollowingDays(todaysYear, todaysMonth, todaysDay) {
  const followingDays = [];
  for (let i = 1; i <= 5; i++) {
    const followingDayInstance = new Date(todaysYear, todaysMonth, todaysDay + i);
    const followingDay = getFormattedDateObject(followingDayInstance);
    followingDays.push(followingDay);
  }
  return followingDays;
}

export function getTodaysDateObject() {
  const currentMomentInstance = new Date();
  const todaysDateObject = getFormattedDateObject(currentMomentInstance);
  const { year, month, day } = todaysDateObject.meta;
  return {
    ...todaysDateObject,
    followingDays: getFollowingDays(year, month, day),
  };
}

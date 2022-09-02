export const weekdayShortNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

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

function getApiDateFormat(year, month, day) {
  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
}

function getDisplayDateFormat(year, month, day) {
  return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
}

function getFollowingDays(todaysYear, todaysMonth, todaysDay, todaysWeekdayIndex) {
  const followingDays = [];

  for (let i = 1; i <= 5; i++) {
    const followingDayInstance = new Date(todaysYear, todaysMonth, todaysDay + i);
    const year = followingDayInstance.getFullYear();
    const month = followingDayInstance.getMonth().toString().padStart(2, '0');
    const day = followingDayInstance.getDate().toString().padStart(2, '0');
    const weekdayIndex = (todaysWeekdayIndex + i) % 7;

    const followingDay = {
      apiDate: getApiDateFormat(year, month, day),
      displayDate: getDisplayDateFormat(year, month, day),
      weekday: getWeekdayName(weekdayIndex),
      shortWeekday: getWeekdayName(weekdayIndex).slice(0, 3),
    };

    followingDays.push(followingDay);
  }

  return followingDays;
}

export function getDateObjectData(newDate) {
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  const weekdayIndex = newDate.getDay();

  const dateObjectData = {
    year,
    month,
    day,
    weekdayIndex,
    apiDate: getApiDateFormat(year, month, day),
    displayDate: getDisplayDateFormat(year, month, day),
    weekday: getWeekdayName(weekdayIndex),
    shortWeekday: getWeekdayName(weekdayIndex).slice(0, 3),
  };

  return dateObjectData;
}

export function getTodaysDateObject() {
  const now = new Date();
  const dateObjectData = getDateObjectData(now);
  const { year, month, day, weekdayIndex } = dateObjectData;

  const dateObject = {
    ...dateObjectData,
    followingDays: getFollowingDays(year, month, day, weekdayIndex),
  };

  return dateObject;
}

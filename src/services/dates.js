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

function padStartFormat(number) {
  return number.toString().padStart(2, '0');
}

function getApiDateFormat(year, month, day) {
  return `${year}-${padStartFormat(month)}-${padStartFormat(day)}`;
}

function getDisplayDateFormat(year, month, day) {
  return `${padStartFormat(day)}/${padStartFormat(month)}/${year}`;
}

export function getDateObjectData(year, month, day, weekdayIndex) {
  const dateObjectData = {
    apiDate: getApiDateFormat(year, month, day),
    displayDate: getDisplayDateFormat(year, month, day),
    weekday: getWeekdayName(weekdayIndex),
    shortWeekday: getWeekdayName(weekdayIndex).slice(0, 3),
  };

  return dateObjectData;
}

function getFollowingDays(todaysYear, todaysMonth, todaysDay, todaysWeekdayIndex) {
  const followingDays = [];

  for (let i = 1; i <= 5; i++) {
    const followingDayInstance = new Date(todaysYear, todaysMonth, todaysDay + i);
    const year = followingDayInstance.getFullYear();
    const month = followingDayInstance.getMonth();
    const actualMonth = month + 1;
    const day = followingDayInstance.getDate();
    const weekdayIndex = (todaysWeekdayIndex + i) % 7;

    const followingDay = getDateObjectData(year, actualMonth, day, weekdayIndex);
    followingDays.push(followingDay);
  }

  return followingDays;
}

export function getTodaysDateObject() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const actualMonth = month + 1;
  const day = now.getDate();
  const weekdayIndex = now.getDay();

  const todaysDayObject = {
    ...getDateObjectData(year, actualMonth, day, weekdayIndex),
    followingDays: getFollowingDays(year, month, day, weekdayIndex),
  };

  console.log(todaysDayObject);
  return todaysDayObject;
}

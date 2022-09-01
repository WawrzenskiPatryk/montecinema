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

function getFollowingDays(year, month, day, weekdayIndex) {
  const followingDays = [];

  for (let i = 1; i <= 5; i++) {
    const followingDayInstance = new Date(year, month, day + i);

    let followingDayIndex = weekdayIndex + i;
    if (followingDayIndex > 6) followingDayIndex = followingDayIndex - 7;

    const resultYear = followingDayInstance.getFullYear();
    const resultMonth = (followingDayInstance.getMonth() + 1).toString().padStart(2, '0');
    const resultDay = followingDayInstance.getDate().toString().padStart(2, '0');

    const followingDay = {
      apiDate: `${resultYear}-${resultMonth}-${resultDay}`,
      displayDate: `${resultDay}/${resultMonth}/${resultYear}`,
      weekday: getWeekdayName(followingDayIndex),
      shortWeekday: getWeekdayName(followingDayIndex).slice(0, 3),
    };

    followingDays.push(followingDay);
  }

  return followingDays;
}

export function getDateObject(date) {
  let now;

  if (!date || date.trim().length === 0 || typeof date !== 'string') {
    now = new Date();
  } else {
    now = new Date(date);
  }

  const year = now.getFullYear();
  const month = now.getMonth();
  const formattedMonth = (month + 1).toString().padStart(2, '0');
  const day = now.getDate();
  const formattedDay = day.toString().padStart(2, '0');
  const weekdayIndex = now.getDay();
  const weekday = getWeekdayName(weekdayIndex);
  const shortWeekday = weekday.slice(0, 3);
  const followingDays = getFollowingDays(year, month, day, weekdayIndex);

  const dateObject = {
    apiDate: `${year}-${formattedMonth}-${formattedDay}`,
    displayDate: `${formattedDay}/${formattedMonth}/${year}`,
    weekday,
    shortWeekday,
    followingDays,
  };

  console.log(dateObject);
  return dateObject;
}

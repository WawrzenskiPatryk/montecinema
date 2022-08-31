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

export function getDateObject(date) {
  let now;

  if (!date || date.trim().length === 0 || typeof date !== 'string') {
    now = new Date();
  } else {
    now = new Date(date);
  }

  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();
  const weekdayIndex = now.getDay();
  const weekday = getWeekdayName(weekdayIndex);
  const followingDays = [];

  for (let i = 1; i <= 5; i++) {
    const followingDayInstance = new Date(year, month, day + i);

    let followingDayIndex = weekdayIndex + i;
    if (followingDayIndex > 6) followingDayIndex = followingDayIndex - 7;

    const currentYear = followingDayInstance.getFullYear();
    const currentMonth = (followingDayInstance.getMonth() + 1).toString().padStart(2, '0');
    const currentDay = followingDayInstance.getDate().toString().padStart(2, '0');

    const followingDay = {
      fulldate: `${currentYear}-${currentMonth}-${currentDay}`,
      name: getWeekdayName(followingDayIndex),
      shortname: getWeekdayName(followingDayIndex).slice(0, 3),
    };

    followingDays.push(followingDay);
  }

  const dateObject = {
    year: year.toString(),
    month: (month + 1).toString().padStart(2, '0'),
    day: day.toString().padStart(2, '0'),
    weekday: weekday,
    apidate: `${year}-${(month + 1).toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')}`,
    displayDate: `${day.toString().padStart(2, '0')}/${(month + 1)
      .toString()
      .padStart(2, '0')}/${year}`,
    followingDays: followingDays,
  };

  console.log(dateObject);
  return dateObject;
}

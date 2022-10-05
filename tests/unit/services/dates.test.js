import { describe, expect, it } from 'vitest';
import { weekdayShortNames, getWeekdayName, getFormattedDateObject } from '@/services/dates.js';

describe('dates.js', () => {
  describe('weekdayShortNames', () => {
    it('returns weekday short names', () => {
      expect(weekdayShortNames).toStrictEqual(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
    });
  });
  describe('getWeekdayName', () => {
    it('returns correct weekday name for given id number (range 0 - 6)', () => {
      expect(getWeekdayName(0)).toBe('Sunday');
      expect(getWeekdayName(1)).toBe('Monday');
      expect(getWeekdayName(2)).toBe('Tuesday');
      expect(getWeekdayName(3)).toBe('Wednesday');
      expect(getWeekdayName(4)).toBe('Thursday');
      expect(getWeekdayName(5)).toBe('Friday');
      expect(getWeekdayName(6)).toBe('Saturday');
    });

    it('throws an error for id outside the range of 0 to 6', () => {
      expect(() => getWeekdayName(-1)).toThrowError();
      expect(() => getWeekdayName(7)).toThrowError();
    });
  });
  describe('getFormattedDateObject', () => {
    it('returns correctly formatted date object', () => {
      const date = new Date(1990, 0, 1);
      const formattedDateObject = getFormattedDateObject(date);
      const expectedObject = {
        meta: { year: 1990, month: 0, day: 1 },
        apiDate: '1990-01-01',
        displayDate: '01/01/1990',
        weekday: 'Monday',
        shortWeekday: 'Mon',
      };
      expect(formattedDateObject).toStrictEqual(expectedObject);
    });
  });
});

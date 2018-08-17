import { GET_REMINDERS } from './actionTypes';

export const getReminders = (month, year) => ({
  type: GET_REMINDERS,
  month,
  year
});

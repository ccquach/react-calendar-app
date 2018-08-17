import { GET_REMINDERS, ADD_REMINDER } from './actionTypes';

export const getReminders = (month, year) => ({
  type: GET_REMINDERS,
  month,
  year
});

export const addReminder = (reminder, activeDate) => ({
  type: ADD_REMINDER,
  reminder,
  activeDate
});

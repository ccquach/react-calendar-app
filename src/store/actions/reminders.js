import {
  GET_REMINDERS,
  ADD_REMINDER,
  UPDATE_REMINDER,
  DELETE_REMINDER
} from '../actionTypes';

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

export const updateReminder = (item, activeDate) => ({
  type: UPDATE_REMINDER,
  item,
  activeDate
});

export const deleteReminder = id => ({
  type: DELETE_REMINDER,
  id
});

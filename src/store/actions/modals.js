import { TOGGLE_FORM, TOGGLE_LIST } from '../actionTypes';

export const toggleForm = (activeDate, reminder) => ({
  type: TOGGLE_FORM,
  activeDate,
  reminder
});

export const toggleList = activeDate => ({
  type: TOGGLE_LIST,
  activeDate
});

import moment from 'moment';

export const getFilteredReminders = (reminders, month, year) => {
  return reminders.filter(
    r => moment(r.date).month() === month && moment(r.date).year() === year
  );
};

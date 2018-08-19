export const getRemindersList = (reminders, activeDate) =>
  reminders.filter(r => r.date === activeDate)[0].items;

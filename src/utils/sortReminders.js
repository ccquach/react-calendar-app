export function sortReminders(reminders) {
  return reminders.sort((a, b) => {
    return a.time < b.time ? -1 : a.time > b.time ? 1 : 0;
  });
}

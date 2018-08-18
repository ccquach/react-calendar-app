import moment from 'moment';

export const getDaysOfWeek = (days, firstWeek, i) =>
  days.filter(
    day =>
      moment(day)
        .startOf('week')
        .isoWeek() ===
      firstWeek + i
  );

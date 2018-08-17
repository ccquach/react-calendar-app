import { GET_REMINDERS, ADD_REMINDER } from './actionTypes';
import moment from 'moment';

const DEFAULT_STATE = [
  {
    date: '2018-08-20',
    items: [
      { time: '11:00', text: 'Bio Final', color: 'red' },
      { time: '08:00', text: 'Calc final', color: 'red' }
    ]
  },
  {
    date: '2018-08-05',
    items: [
      { time: '16:00', text: 'Lunch with Dan', color: 'blue' },
      { time: '11:00', text: 'Gym session', color: 'red' },
      { time: '14:00', text: "Bob's birthday party", color: 'purple' }
    ]
  },
  {
    date: '2017-08-10',
    items: [{ time: '13:00', text: 'Marathon', color: 'orange' }]
  },
  {
    date: '2018-07-29',
    items: [{ time: '18:00', text: 'Family dinner', color: 'green' }]
  },
  {
    date: '2018-06-04',
    items: [{ time: '20:00', text: 'Game night', color: 'blue' }]
  }
];

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case GET_REMINDERS:
      return DEFAULT_STATE.filter(
        r =>
          moment(r.date).month() === action.month &&
          moment(r.date).year() === action.year
      );
    case ADD_REMINDER:
      return [...DEFAULT_STATE, action.reminder];
    default:
      return state;
  }
};

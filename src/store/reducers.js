import { GET_REMINDERS, ADD_REMINDER } from './actionTypes';

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
    case ADD_REMINDER:
      // search store for existing date object
      const dateCollection = state.filter(r => r.date === action.activeDate);

      // create new date object if doesn't exist
      if (!dateCollection.length) {
        return [
          ...state,
          { date: action.activeDate, items: [action.reminder] }
        ];
      } else {
        // otherwise, push to existing date object's items array
        return state.map(obj => {
          if (obj.date === action.activeDate) obj.items.push(action.reminder);
          return obj;
        });
      }
    case GET_REMINDERS:
    default:
      return state;
  }
};

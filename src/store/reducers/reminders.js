import {
  GET_REMINDERS,
  ADD_REMINDER,
  UPDATE_REMINDER,
  DELETE_REMINDER
} from '../actionTypes';

const DEFAULT_STATE = [
  {
    date: '2018-08-20',
    items: [
      { id: 1, time: '11:00', text: 'Bio Final', color: 'Crimson' },
      { id: 2, time: '08:00', text: 'Calc final', color: 'Crimson' }
    ]
  },
  {
    date: '2018-08-05',
    items: [
      { id: 3, time: '16:00', text: 'Lunch with Dan', color: 'DodgerBlue' },
      { id: 4, time: '11:00', text: 'Gym session', color: 'Crimson' },
      {
        id: 5,
        time: '14:00',
        text: "Bob's birthday party",
        color: 'BlueViolet'
      }
    ]
  },
  {
    date: '2017-08-10',
    items: [{ id: 6, time: '13:00', text: 'Marathon', color: 'DarkOrange' }]
  },
  {
    date: '2018-07-29',
    items: [
      { id: 7, time: '18:00', text: 'Family dinner', color: 'ForestGreen' }
    ]
  },
  {
    date: '2018-06-04',
    items: [{ id: 8, time: '20:00', text: 'Game night', color: 'DodgerBlue' }]
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
    case UPDATE_REMINDER:
      return state.map(obj => {
        if (obj.date === action.activeDate) {
          const newItems = obj.items.map(
            item => (item.id === action.item.id ? action.item : item)
          );
          return { ...obj, items: newItems };
        }
        return obj;
      });
    case DELETE_REMINDER:
      return state.map(obj => {
        const newItems = obj.items.filter(item => item.id !== action.id);
        return { ...obj, items: newItems };
      });
    case GET_REMINDERS:
    default:
      return state;
  }
};

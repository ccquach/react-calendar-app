import { TOGGLE_FORM, TOGGLE_LIST } from '../actionTypes';

const DEFAULT_STATE = {
  form: { isOpen: false, reminder: null },
  list: { isOpen: false },
  activeDate: null
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case TOGGLE_FORM:
      return {
        ...state,
        form: {
          isOpen: !state.form.isOpen,
          reminder: !!Object.keys(action.reminder).length
            ? action.reminder
            : null
        },
        activeDate: state.list.isOpen
          ? state.activeDate
          : action.activeDate || ''
      };
    case TOGGLE_LIST:
      return {
        ...state,
        list: { isOpen: !state.list.isOpen },
        activeDate: action.activeDate
      };
    default:
      return state;
  }
};

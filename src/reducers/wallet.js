// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  SET_CURRENCY,
  SET_EXPENSE,
  DELETE_EXPENSE,
  EDIT_TARGET_ID,
  EDIT_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editId: '',
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_CURRENCY:
    return { ...state, currencies: action.payload };
  case SET_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.payload] };
  case DELETE_EXPENSE:
    return { ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.payload) };
  case EDIT_TARGET_ID:
    return { ...state, editId: action.payload };
  case EDIT_EXPENSE:
    return { ...state,
      expenses: state.expenses.map((expense) => {
        if (expense.id !== action.payload.id) {
          return expense;
        }
        return action.payload;
      }) };
  default:
    return state;
  }
}

export default wallet;

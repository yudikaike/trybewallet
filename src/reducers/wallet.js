// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { SET_CURRENCY, SET_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_CURRENCY:
    return { ...state, currencies: action.payload };
  case SET_EXPENSE:
    return { ...state, expenses: action.payload };
  default:
    return state;
  }
}

export default wallet;
// Coloque aqui suas actions
export const SET_USER_EMAIL = 'SET_USER_EMAIL';
export const SET_CURRENCY = 'SET_CURRENCY';
export const SET_EXPENSE = 'SET_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const setUserEmail = (payload) => (
  {
    type: SET_USER_EMAIL,
    payload,
  }
);

export const setCurrency = (payload) => (
  {
    type: SET_CURRENCY,
    payload,
  }
);

export const setExpense = (payload) => (
  {
    type: SET_EXPENSE,
    payload,
  }
);

export const deleteExpense = (payload) => (
  {
    type: DELETE_EXPENSE,
    payload,
  }
);

// Coloque aqui suas actions
export const SET_USER_EMAIL = 'SET_USER_EMAIL';
export const SET_CURRENCY = 'SET_CURRENCY';
export const SET_EXPENSE = 'SET_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_TARGET_ID = 'EDIT_TARGET_ID';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

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

export const editTargetId = (payload) => (
  {
    type: EDIT_TARGET_ID,
    payload,
  }
);

export const editExpense = (payload) => (
  {
    type: EDIT_EXPENSE,
    payload,
  }
);

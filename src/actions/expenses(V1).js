import uuid from 'uuid';
// import database from '../firebase/firebase';

// FLUXO DE DADOS SEM FIREBASE
// 01: COMPONENTE CHAMA O ACTION GENERATOR
// 02: ACTION GENERATOR RETORNA UM OBJETO
// 03: COMPONENTE DISPACHA A AÇÃO ATRAVES DO MAP-DISPATCH-TO-PROPS
// 04: REDUX GUARDA AS MUDANÇAS

// FLUXO DE DADOS COM FIREBASE
// 01: COMPONENTE CHAMA O ACTION GENERATOR
// 02: ACTION GENERATOR RETORNA UMA FUNÇÃO
// 03: COMPONENTE DISPACHA FUNÇÃO (REDUX THUNK)
// 04: FUNÇÃO DISPARA UMA AÇÃO QUALQUER PREDETERMINADA

// 01: CRIAR AS ACTIONS PARA CADA AÇÃO DO USUÁRIO (COM IDENTIFICADOR UNICO)
// ADD_EXPENSE
export const addExpense = expense => ({
  type: 'ADD_EXPENSE',
  expense
});

// CONSIDERAÇÕES:
// 01: DATABASE UPDATE COM SUCESSO
// 02: DISPATCH O ACTION GENERATOR CORRETO
export const startAddExpense = (expenseData = {}) => {
  return dispatch => {
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData;
    const expense = { description, note, amount, createdAt };

    return database
      .ref('expenses')
      .push(expense)
      .then(ref => {
        dispatch(
          addExpense({
            id: ref.key,
            ...expense
          })
        );
      });
  };
};

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

// SET_EXPENSES
export const setExpenses = expenses => ({
  type: 'SET_EXPENSES',
  expenses
});

export const startSetExpenses = () => {
  return dispatch => {
    return database
      .ref('expenses')
      .once('value')
      .then(snapshot => {
        const expenses = [];
        snapshot.forEach(childSnapshot => {
          expenses.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        dispatch(setExpenses(expenses));
      });
  };
};

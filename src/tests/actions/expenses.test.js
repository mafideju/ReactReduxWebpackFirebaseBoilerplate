import {
  startAddExpense,
  startRemoveExpense,
  startEditExpense,
  addExpense,
  editExpense,
  removeExpense,
  setExpenses,
  startSetExpenses
} from '../../actions/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expenses from '../fixture/expenses';
import database from '../../firebase/firebase';

const uid = 'id-de-teste';
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach(done => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });
  database
    .ref(`users/${uid}/expenses`)
    .set(expensesData)
    .then(() => done());
});

test('remove expense action object', () => {
  const action = removeExpense({ id: '1234abcd' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '1234abcd'
  });
});

test('edit expense action object', () => {
  const action = editExpense('1234abcd', { note: 'qualquer coisa' });
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '1234abcd',
    updates: {
      note: 'qualquer coisa'
    }
  });
});

test('add expense action object CUSTOM', () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  });
});

// TEST CASE ASSINCRONO - PROMISE CHAINING E DONE()
test('EXPENSES PARA O DATABASE E O STORE', done => {
  const store = createMockStore(defaultAuthState);
  const expenseData = {
    description: 'Mouse',
    amount: 4900,
    note: 'Mouse Ótico',
    createdAt: 7777777777
  };

  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });
    database
      .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
      .once('value')
      .then(snapshot => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
      });
  });
});

test('TESTE PARA VERIFICAR CONEXÃO AO BANCO DE DADOS', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  });
});

test('BUSCAR AS DESPESAS DO FIREBASE', done => {
  const store = createMockStore(defaultAuthState);

  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });
    done();
  });
});

// REMOVENDO DESPESAS DO BANCO DE DADOS E DA STORE
test('REMOVER AS DESPESAS DO FIREBASE', done => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[0].id;
  store
    .dispatch(startRemoveExpense({ id }))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'REMOVE_EXPENSE',
        id
      });
      return database.ref(`users/${uid}/expenses/${id}`).once('value');
    })
    .then(snapshot => {
      expect(snapshot.val()).toBeFalsy();
      done();
    });
});

test('EDITAR DESPESAS NO FIREBASE', done => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[0].id;
  const updates = { amount: 1234 };
  store
    .dispatch(startEditExpense(id, updates))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'EDIT_EXPENSE',
        id,
        updates
      });
      return database.ref(`users/${uid}/expenses/${id}`).once('value');
    })
    .then(snapshot => {
      expect(snapshot.val().amount).toBe(updates.amount);
      done();
    });
});

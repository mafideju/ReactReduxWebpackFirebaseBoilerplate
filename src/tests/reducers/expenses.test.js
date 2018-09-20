import expensesReducer from '../../reducers/expenses';
import expenses from '../fixture/expenses';

test('DEFAULT REDUX STORE STATE', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('REMOVER PELO ID', () => {
  const state = expensesReducer(expenses, {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  });
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test('NÃO REMOVER PELO ID SE NÃO ENCONTRADO', () => {
  const state = expensesReducer(expenses, {
    type: 'REMOVE_EXPENSE',
    id: -1
  });
  expect(state).toEqual(expenses);
});

test('ADICIONAR UMA DESPESA', () => {
  const expense = {
    id: '109',
    description: 'Notebook',
    note: '',
    createdAt: 20000,
    amount: 29500
  };
  const state = expensesReducer(expenses, { type: 'ADD_EXPENSE', expense });
  expect(state).toEqual([...expenses, expense]);
});

test('EDITAR UMA DESPESA', () => {
  const amount = 125000;
  const state = expensesReducer(expenses, {
    type: 'EDIT_EXPENSE',
    id: expenses[1].id,
    updates: { amount }
  });
  expect(state[1].amount).toBe(amount);
});

test('NÃO EDITAR UMA DESPESA SE ELA NÃO EXISTE', () => {
  const amount = 125000;
  const state = expensesReducer(expenses, {
    type: 'EDIT_EXPENSE',
    id: -1,
    updates: { amount }
  });
  expect(state).toEqual(expenses);
});

test('SET EXPENSES', () => {
  const action = {
    type: 'SET_EXPENSES',
    expenses: [expenses[1]]
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[1]]);
});

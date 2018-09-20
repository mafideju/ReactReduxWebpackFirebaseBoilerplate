import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixture/expenses';
import ExpenseForm from '../../components/ExpenseForm';

// PRINCIPIOS DO DRY, LIFECYCLE METHODS DO JEST
// let onSubmit, history, wrapper;

// beforeEach(() => {
//   const onSubmit = jest.fn();
//   const history = { push: jest.fn() };
//   const wrapper = shallow(
//     <AddExpensePage onSubmit={onSubmit} history={history} />
//   );
// });

test('RENDER ADD-EXPENSE-PAGE', () => {
  // CRIAR A JEST.FN (SPIER) PARA TESTAR FUNÇÃO
  // E O HISTORY, POIS SÃO AS DUAS PROPS A SEREM TESTADAS
  const startAddExpense = jest.fn();
  const history = { push: jest.fn() };
  // IMPORTAR O SHALLOW NO WRAPPER DO COMPONENTE
  const wrapper = shallow(
    <AddExpensePage startAddExpense={startAddExpense} history={history} />
  );
  // FAZER O SNAPSHOT DO COMPONENTE
  expect(wrapper).toMatchSnapshot();
});

test('RENDER ADD-EXPENSE-PAGE WITH INFO', () => {
  const startAddExpense = jest.fn();
  const history = { push: jest.fn() };
  const wrapper = shallow(
    <AddExpensePage startAddExpense={startAddExpense} history={history} />
  );
  wrapper.find(ExpenseForm).prop('onSubmit')(expenses[1]);
  expect(history.push).toHaveBeenLastCalledWith('/dashboard');
  expect(startAddExpense).toHaveBeenLastCalledWith(expenses[1]);
});

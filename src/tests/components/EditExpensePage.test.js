import React from 'react';
import { shallow } from 'enzyme';
import expenses from '../fixture/expenses';
import { EditExpensePage } from '../../components/EditExpensePage';
import ExpenseForm from '../../components/ExpenseForm';

let startEditExpense, startRemoveExpense, history, wrapper;

beforeEach(() => {
  startEditExpense = jest.fn();
  startRemoveExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditExpensePage
      startEditExpense={startEditExpense}
      startRemoveExpense={startRemoveExpense}
      history={history}
      expense={expenses[2]}
    />
  );
});

test('RENDER EDIT EXPENSE PAGE', () => {
  expect(wrapper).toMatchSnapshot();
});

test('HANDLE EDIT EXPENSE', () => {
  wrapper.find(ExpenseForm).prop('onSubmit')(expenses[2]);
  expect(history.push).toHaveBeenLastCalledWith('/dashboard');
  expect(startEditExpense).toHaveBeenLastCalledWith(
    expenses[2].id,
    expenses[2]
  );
});

test('HANDLE REMOVE EXPENSE', () => {
  wrapper.find('button').simulate('click');
  expect(history.push).toHaveBeenLastCalledWith('/dashboard');
  expect(startRemoveExpense).toHaveBeenLastCalledWith({
    id: expenses[2].id
  });
});

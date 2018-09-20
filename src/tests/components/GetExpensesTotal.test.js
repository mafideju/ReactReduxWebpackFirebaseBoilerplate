import React from 'react';
import { shallow } from 'enzyme';
import expenses from '../fixture/expenses';
import GetExpensesTotal from '../../selectors/GetExpensesTotal';

test('RETURN 0 PARA NO EXPENSES', () => {
  const res = GetExpensesTotal([]);
  expect(res).toBe(0);
});

test('RETURN OK PARA UMA EXPENSES', () => {
  const res = GetExpensesTotal([expenses[0]]);
  expect(res).toBe(1200);
});

test('RETURN OK PARA VARIAS EXPENSES', () => {
  const res = GetExpensesTotal(expenses);
  expect(res).toBe(2030);
});

import React from 'react';
import { shallow } from 'enzyme';
import expenses from '../fixture/expenses';
import ExpenseListItem from '../../components/ExpenseListItem';

test('EXPENSE LIST ITEM TEST SUITE', () => {
  const wrapper = shallow(<ExpenseListItem {...expenses[0]} />);
  expect(wrapper).toMatchSnapshot();
});

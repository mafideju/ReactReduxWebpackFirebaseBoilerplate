import 'react-dates/initialize';
import React, { Component } from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixture/filters';
import { DateRangePicker } from 'react-dates';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters
      filters={filters}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  );
});

// test('TESTE EXPENSE-LIST-FILTERS', () => {
//   expect(wrapper).toMatchSnapshot();
// });

// test('TESTE EXPENSE-LIST-ALTERED-FILTERS', () => {
//   wrapper.setProps({
//     filters: altFilters
//   });
//   expect(wrapper).toMatchSnapshot();
// });

test('TESTE EXPENSE-LIST-FILTERS TEXT CHANGE', () => {
  const value = 'Aluguel';
  wrapper.find('input').simulate('change', { target: { value } });
  expect(setTextFilter).toHaveBeenCalledWith(value);
});

test('TESTE EXPENSE-LIST-FILTERS SORT BY DATE', () => {
  const value = 'date';
  wrapper.setProps({
    filters: altFilters
  });
  wrapper.find('select').simulate('change', {
    target: { value }
  });
  expect(sortByDate).toHaveBeenCalled();
});

test('TESTE EXPENSE-LIST-FILTERS SORT BY AMOUNT', () => {
  const value = 'amount';
  wrapper.find('select').simulate('change', {
    target: { value }
  });
  expect(sortByAmount).toHaveBeenCalled();
});

test('TESTE EXPENSE-LIST-FILTERS DATE-CHANGES', () => {
  const startDate = moment(0).add(4, 'years');
  const endDate = moment(0).add(8, 'years');
  wrapper.find(DateRangePicker).prop('onDatesChange')({ startDate, endDate });
  expect(setStartDate).toHaveBeenLastCalledWith(startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('TESTE EXPENSE-LIST-FILTERS ON FOCUS', () => {
  const calendarFocused = 'endDate';
  wrapper.find(DateRangePicker).prop('onFocusChange')(calendarFocused);
  expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});

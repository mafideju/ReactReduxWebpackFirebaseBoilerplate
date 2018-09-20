import moment from 'moment';
import {
  setStartDate,
  setEndDate,
  setTextFilter,
  sortByAmount,
  sortByDate
} from '../../actions/filters';

test('Start Date ACtion Object', () => {
  const action = setStartDate(moment(0));
  expect(action).toEqual({
    type: 'SET_START_DATE',
    startDate: moment(0)
  });
});

test('End Date ACtion Object', () => {
  const action = setEndDate(moment(0));
  expect(action).toEqual({
    type: 'SET_END_DATE',
    endDate: moment(0)
  });
});

test('Text Filter Default', () => {
  const action = setTextFilter();
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: ''
  });
});

test('Text Filter Custom', () => {
  const textAction = {
    text: 'Qualquer coisa'
  };
  const action = setTextFilter(textAction);
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: textAction
  });
});

test('TESTE PARA SORT BY DATE', () => {
  expect(sortByDate()).toEqual({ type: 'SORT_BY_DATE' });
});

test('TESTE PARA SORT BY AMOUNT', () => {
  const action = sortByAmount();
  expect(action).toEqual({
    type: 'SORT_BY_AMOUNT'
  });
});

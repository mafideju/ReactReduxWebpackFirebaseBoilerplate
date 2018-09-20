import filtersReducer from '../../reducers/filters';
import moment from 'moment';

test('REDUCERS - FILTERS', () => {
  const state = filtersReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});

test('SORT BY AMOUNT', () => {
  const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });
  expect(state.sortBy).toBe('amount');
});

test('SORT BY DATE', () => {
  const currentState = {
    text: '',
    startDate: undefined,
    endDate: undefined,
    sortBy: 'amount'
  };
  const action = { type: 'SORT_BY_DATE' };
  const state = filtersReducer(currentState, action);
  expect(state.sortBy).toBe('date');
});

test('TEXT FILTER', () => {
  const text = 'Isto é um filtro';
  const state = filtersReducer(undefined, { type: 'SET_TEXT_FILTER', text });
  expect(state.text).toBe(text);
});

test('START DATE', () => {
  const startDate = moment();
  const state = filtersReducer(undefined, {
    type: 'SET_START_DATE',
    startDate
  });
  expect(state.startDate).toBe(startDate);
});

test('END DATE', () => {
  const endDate = moment();
  const state = filtersReducer(undefined, { type: 'SET_END_DATE', endDate });
  expect(state.endDate).toBe(endDate);
});

import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import ExpenseForm from '../../components/ExpenseForm';
import { SingleDatePicker } from 'react-dates';
import expenses from '../fixture/expenses';

test('EXPENSE FORM MOCKED TOTAL', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test('EXPENSE FORM MOCKED WITH DATA', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
  expect(wrapper).toMatchSnapshot();
});

test('EXPENSE FORM INVALID SUBMISSION', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  });
  expect(wrapper.state('error').length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test('EXPENSE FORM DESCRIPTION ON INPUT CHANGE', () => {
  const value = 'texto aleatório';
  const wrapper = shallow(<ExpenseForm />);
  wrapper
    .find('input')
    .at(0)
    .simulate('change', {
      target: { value }
    });
  expect(wrapper.state('description')).toBe(value);
});

test('EXPENSE FORM TEXTAREA NOTES', () => {
  const value = 'notas sobre despesas';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('textarea').simulate('change', {
    target: { value }
  });
  expect(wrapper.state('note')).toBe(value);
});

// amount valid input 23.50
test('EXPENSE FORM AMOUNT VALID', () => {
  const value = '23.5';
  const wrapper = shallow(<ExpenseForm />);
  wrapper
    .find('input')
    .at(1)
    .simulate('change', {
      target: { value }
    });
  expect(wrapper.state('amount')).toBe(value);
});

// amount not valid input 12.122
test('EXPENSE FORM AMOUNT NOT VALID', () => {
  const value = '1.235';
  const wrapper = shallow(<ExpenseForm />);
  wrapper
    .find('input')
    .at(1)
    .simulate('change', {
      target: { value }
    });
  expect(wrapper.state('amount')).toBe('');
});

//  SPIES   //
test('ONSUBMIT PROPS PARA FORMS VALIDOS', () => {
  // CRIA A FUNÇÃO SPY
  const onSubmitSpy = jest.fn();
  // TRAZ O ELEMENTO QUE VAI SER TESTADO
  const wrapper = shallow(
    <ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />
  );
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  });
  // COMPARA COM O QUE DEVE SER
  expect(wrapper.state('error')).toBe('');
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expenses[0].description,
    amount: expenses[0].amount,
    note: expenses[0].note,
    createdAt: expenses[0].createdAt
  });
  // onSubmitSpy('Marcio', 'Sampa');
  // expect(onSubmitSpy).toHaveBeenCalledWith('Marcio', 'Sampa');
});

test('COLOCAR NOVA DATA NA PROPS ONDATECHANGE', () => {
  const now = moment();
  // RENDERING THE COMPONENT
  const wrapper = shallow(<ExpenseForm />);
  // TRIGGER THE PROPS FROM THE CHILD COMPONENT - FIND PELO COMPONENT
  wrapper.find(SingleDatePicker).prop('onDateChange')(now);
  // CHECAR SE O STATE ESTA COLOCADO DE FORMA CORRETA NO CODIGO
  expect(wrapper.state('createdAt')).toEqual(now);
});

test('CALENDAR FOCUS', () => {
  const focused = true;
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find(SingleDatePicker).prop('onFocusChange')({ focused });
  expect(wrapper.state('calendarFocused')).toBe(focused);
});

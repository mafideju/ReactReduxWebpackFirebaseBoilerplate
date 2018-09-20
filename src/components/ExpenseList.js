import React from 'react';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import { Link } from 'react-router-dom';
import ExpenseListItem from './ExpenseListItem';

export const ExpenseList = props => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Despesa</div>
      <div className="show-for-desktop">Despesa</div>
      <div className="show-for-desktop">Quantia</div>
    </div>
    {props.expenses.length === 0 ? (
      <h3 className="form__error">
        Adicione Uma Despesa para começar a{' '}
        <Link to="/create">Controlar Seus Gastos</Link>
      </h3>
    ) : (
      props.expenses.map(expense => {
        return <ExpenseListItem key={expense.id} {...expense} />;
      })
    )}
  </div>
);

const mapStateToProps = state => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  };
};

export default connect(mapStateToProps)(ExpenseList);

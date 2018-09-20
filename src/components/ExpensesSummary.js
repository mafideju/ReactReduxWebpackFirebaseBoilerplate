import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import { Link } from 'react-router-dom';
import selectExpenses from '../selectors/expenses';
import GetExpensesTotal from '../selectors/GetExpensesTotal';

export const ExpensesSummary = ({ expenseCount, expensesTotal }) => {
  const pluralItem = expenseCount === 1 ? 'item' : 'items';
  const pluralDividido = expenseCount === 1 ? 'em apenas' : 'divididos em';
  const totalGastos = numeral(expensesTotal / 100).format('$0,0.00');
  return (
    <div className="page-header">
      <div className="content-container">
        <h2 className="page-header__title">
          Total de{' '}
          <span className="page-header__title--highlight">R{totalGastos}</span>{' '}
          Reais em gastos {pluralDividido}{' '}
          <span className="page-header__title--highlight">{expenseCount}</span>{' '}
          {pluralItem}.
        </h2>
        <div>
          <Link
            className="button button--animated__left button--expense"
            to="/create"
          >
            Novo Gasto
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);
  return {
    expenseCount: visibleExpenses.length,
    expensesTotal: GetExpensesTotal(visibleExpenses)
  };
};

export default connect(mapStateToProps)(ExpensesSummary);

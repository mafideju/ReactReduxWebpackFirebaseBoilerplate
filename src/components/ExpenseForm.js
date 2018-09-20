import 'react-dates/initialize';
import React, { Component } from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

// const date = new Date();
// const now = moment();
// console.log(now.format('DD MMM YYYY H:mm'));

class ExpenseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: props.expense ? props.expense.description : '',
      note: props.expense ? props.expense.note : '',
      amount: props.expense ? (props.expense.amount / 100).toString() : '',
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      error: ''
    };
  }

  onDescriptionChange = e => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };

  onNoteChange = e => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };

  onAmountChange = e => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };

  onDateChange = createdAt => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };

  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };

  onSubmit = e => {
    e.preventDefault();
    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({
        error: 'Complete os Campos do Formulário para Validar a Requisição'
      }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note
      });
    }
  };

  render() {
    return (
      <div>
        <form className="form" onSubmit={this.onSubmit}>
          {this.state.error && (
            <h4 className="form__error">{this.state.error}</h4>
          )}
          <input
            type="text"
            className="text-input"
            placeholder="Descrição"
            autoFocus
            value={this.state.description}
            onChange={this.onDescriptionChange}
          />
          <input
            type="text"
            className="text-input"
            placeholder="Valor"
            value={this.state.amount}
            onChange={this.onAmountChange}
          />
          <SingleDatePicker
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            displayFormat={'DD/MM/YYYY'}
            isOutsideRange={() => false}
          />

          <textarea
            className="text-area"
            placeholder="Detalhes da Despesa"
            value={this.state.note}
            onChange={this.onNoteChange}
          />
          <div>
            <button className="button button--expense button--expense__edit">
              Adicionar Despesa
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default ExpenseForm;

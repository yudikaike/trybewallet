import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../../ExpensesForm.css';

import { setExpense, editTargetId, editExpense } from '../../actions';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onClickButton = this.onClickButton.bind(this);
  }

  onChangeInput({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  onClickButton() {
    const { expenseDispatch, editExpenseDispatch, editIdDispatch, editId } = this.props;
    const { id, value, currency, method, tag, description } = this.state;

    const REQUEST_URL = 'https://economia.awesomeapi.com.br/json/all';

    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((data) => {
        if (editId !== '') {
          editExpenseDispatch({
            id: editId,
            value,
            currency,
            method,
            tag,
            description,
            exchangeRates: data,
          });
          editIdDispatch('');
        } else {
          expenseDispatch({
            id,
            value,
            currency,
            method,
            tag,
            description,
            exchangeRates: data,
          });
          this.setState((prevState) => ({
            id: prevState.id + 1,
          }));
        }
      });

    this.setState({
      value: '',
      description: '',
    });
  }

  render() {
    const { currencies, editId } = this.props;
    const { value, currency, method, tag, description } = this.state;
    const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <div className="ExpensesForm">
        <div>
          <label htmlFor="value">
            Valor:
            <input
              type="text"
              id="value"
              data-testid="value-input"
              name="value"
              value={ value }
              onChange={ this.onChangeInput }
            />
          </label>
        </div>

        <div>
          <label htmlFor="currency">
            Moeda:
            <select
              id="currency"
              data-testid="currency-input"
              name="currency"
              value={ currency }
              onChange={ this.onChangeInput }
            >
              {currencies
                .map((currencyCode, index) => (
                  <option key={ index }>{ currencyCode }</option>
                ))}
            </select>
          </label>
        </div>

        <div>
          <label htmlFor="method">
            Método de pagamento:
            <select
              id="method"
              data-testid="method-input"
              name="method"
              value={ method }
              onChange={ this.onChangeInput }
            >
              {methods
                .map((paymentMethod, index) => (
                  <option key={ index }>{ paymentMethod }</option>
                ))}
            </select>
          </label>
        </div>

        <div>
          <label htmlFor="tag">
            Categoria:
            <select
              id="tag"
              data-testid="tag-input"
              name="tag"
              value={ tag }
              onChange={ this.onChangeInput }
            >
              {tags
                .map((categoryTag, index) => (
                  <option key={ index }>{ categoryTag }</option>
                ))}
            </select>
          </label>
        </div>

        <div>
          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              id="description"
              data-testid="description-input"
              name="description"
              value={ description }
              onChange={ this.onChangeInput }
            />
          </label>
        </div>

        <div>
          <button
            type="button"
            onClick={ this.onClickButton }
          >
            { editId !== '' ? 'Editar despesa' : 'Adicionar despesa' }
          </button>
        </div>
      </div>
    );
  }
}

Form.propTypes = {
  currencies: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  expenseDispatch: PropTypes.func.isRequired,
  editExpenseDispatch: PropTypes.func.isRequired,
  editIdDispatch: PropTypes.func.isRequired,
  editId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editId: state.wallet.editId,
});

const mapDispatchToProps = (dispatch) => ({
  expenseDispatch: (payload) => dispatch(setExpense(payload)),
  editIdDispatch: (payload) => dispatch(editTargetId(payload)),
  editExpenseDispatch: (payload) => dispatch(editExpense(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);

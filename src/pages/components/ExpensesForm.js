import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../../ExpensesForm.css';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };
    this.onChangeInput = this.onChangeInput.bind(this);
  }

  onChangeInput({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { currencies } = this.props;
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
          <button type="button">Adicionar despesa</button>
        </div>
      </div>
    );
  }
}

Form.propTypes = {
  currencies: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps, null)(Form);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../../Header.css';

class Header extends Component {
  constructor() {
    super();
    this.totalExpense = this.totalExpense.bind(this);
  }

  totalExpense() {
    const { userExpenses } = this.props;

    return userExpenses
      .map(({
        value,
        currency,
        exchangeRates,
      }) => {
        const { ask } = Object
          .values(exchangeRates)
          .find(({ code }) => code === currency);
        return value * ask;
      })
      .reduce((total, currentValue) => total + currentValue, 0).toFixed(2);
  }

  render() {
    const { userEmail } = this.props;
    return (
      <div className="Header">
        <div data-testid="email-field">{ userEmail }</div>
        <div data-testid="total-field">{ this.totalExpense() }</div>
        <div data-testid="header-currency-field">BRL</div>
      </div>
    );
  }
}

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  userExpenses: PropTypes.arrayOf(
    PropTypes.object,
  ),
};

Header.defaultProps = {
  userExpenses: [],
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  userExpenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Header);

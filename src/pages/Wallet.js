import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from './components/Header';
import { setCurrency } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      currencies: [],
    };
  }

  componentDidMount() {
    const REQUEST_URL = 'https://economia.awesomeapi.com.br/json/all';
    const { setCurrencyDispatch } = this.props;

    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          currencies: Object.keys(data).filter((currencyCode) => currencyCode !== 'USDT'),
        }, () => {
          const { currencies } = this.state;
          setCurrencyDispatch(currencies);
        });
      });
  }

  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

Wallet.propTypes = {
  setCurrencyDispatch: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setCurrencyDispatch: (payload) => dispatch(setCurrency(payload)),
});

export default connect(null, mapDispatchToProps)(Wallet);

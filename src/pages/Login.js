import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setUserEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isButtonDisabled: true,
    };
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onClickButton = this.onClickButton.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
  }

  onChangeInput({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, () => this.handleValidation());
  }

  onClickButton() {
    const { email } = this.state;
    const { setUserEmailDispatch, history } = this.props;

    setUserEmailDispatch(email);
    history.push('/carteira');
  }

  handleValidation() {
    const { email, password } = this.state;
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+/i;
    /* Expressão regular para a validação de e-mail do Stack Overflow.
    (https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail). */
    const minLength = 6;

    if (emailRegex.test(email) && password.length >= minLength) {
      this.setState({
        isButtonDisabled: false,
      });
    } else {
      this.setState({
        isButtonDisabled: true,
      });
    }
  }

  render() {
    const { email, password, isButtonDisabled } = this.state;
    return (
      <div>
        <label htmlFor="email-input">
          E-mail:
          <input
            type="text"
            id="email-input"
            data-testid="email-input"
            onChange={ this.onChangeInput }
            value={ email }
            name="email"
          />
        </label>
        <label htmlFor="password-input">
          Password:
          <input
            type="password"
            id="password-input"
            data-testid="password-input"
            onChange={ this.onChangeInput }
            value={ password }
            name="password"
          />
        </label>
        <button
          type="button"
          disabled={ isButtonDisabled }
          onClick={ this.onClickButton }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  setUserEmailDispatch: PropTypes.func.isRequired,
  history: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
  ]).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setUserEmailDispatch: (payload) => dispatch(setUserEmail(payload)),
});

export default connect(null, mapDispatchToProps)(Login);

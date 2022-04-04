import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, editTargetId } from '../../actions';

class ExpensesTable extends Component {
  constructor() {
    super();
    this.findExchangeRate = this.findExchangeRate.bind(this);
    this.renderTableData = this.renderTableData.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
  }

  onClickDelete({ target: { value } }) {
    const { deleteExpenseDispatch } = this.props;

    deleteExpenseDispatch(parseInt(value, 10));
  }

  onClickEdit({ target: { value } }) {
    const { editIdDispatch } = this.props;

    editIdDispatch(parseInt(value, 10));
  }

  findExchangeRate(expense) {
    const { currency, exchangeRates } = expense;

    return Object.values(exchangeRates).find(({ code }) => code === currency);
  }

  renderTableData(expense) {
    const { description, tag, method, value, id } = expense;
    const { name, ask } = this.findExchangeRate(expense);

    const parsedValue = parseFloat(value).toFixed(2);
    const parsedName = name.split('/')[0];
    const parsedAsk = parseFloat(ask).toFixed(2);
    const parsedConversion = (parseFloat(value) * parseFloat(ask)).toFixed(2);

    return (
      <tr key={ id }>
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>{ parsedValue }</td>
        <td>{ parsedName }</td>
        <td>{ parsedAsk }</td>
        <td>{ parsedConversion }</td>
        <td>Real</td>
        <td>
          <button
            type="button"
            data-testid="edit-btn"
            value={ id }
            onClick={ this.onClickEdit }
          >
            Editar
          </button>
          <button
            type="button"
            data-testid="delete-btn"
            value={ id }
            onClick={ this.onClickDelete }
          >
            Excluir
          </button>
        </td>
      </tr>
    );
  }

  render() {
    const { userExpenses } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { userExpenses.map((expense) => this.renderTableData(expense)) }
        </tbody>
      </table>
    );
  }
}

ExpensesTable.propTypes = {
  userExpenses: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  deleteExpenseDispatch: PropTypes.func.isRequired,
  editIdDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpenseDispatch: (payload) => dispatch(deleteExpense(payload)),
  editIdDispatch: (payload) => dispatch(editTargetId(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);

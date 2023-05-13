import React, { useReducer, createContext } from "react";
import contextReducer from "./transactionContextReducer";
import axios from "axios";

const initialState = [];
export const ExpenseTrackerContext = createContext(initialState);

export const Provider = props => {
  // reducer is function that specifies how we'll be changing our state
  const [transactions, dispatch] = useReducer(contextReducer, initialState);

  // Action creators
  async function getTransactions(id) {
    try {
      let results = await axios.get(
        "https://aj3011-expense-tracker.onrender.com/api/v1/transactions"
      );

      // results.data. data -> The other .data is used for getting data field from the object.

      results.data.data = results.data.data.filter(t => t.userId === id);
      dispatch({
        type: "GET_TRANSACTIONS",
        payload: results.data.data
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error
      });
    }
  }

  // Once this function is called, dispatch an id
  async function deleteTransaction(id) {
    try {
      await axios.delete(
        `https://aj3011-expense-tracker.onrender.com/api/v1/transactions/${id}`
      );
      dispatch({ type: "DELETE_TRANSACTION", payload: id });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error
      });
    }
  }

  async function addTransaction(transaction) {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post(
        "https://aj3011-expense-tracker.onrender.com/api/v1/transactions",
        transaction,
        config
      );
      dispatch({ type: "ADD_TRANSACTION", payload: res.data.data });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error
      });
    }
  }

  let balance = transactions.reduce((acc, currVal) => {
    return currVal.type === "Expense"
      ? acc - currVal.amount
      : acc + currVal.amount;
  }, 0);

  return (
    <ExpenseTrackerContext.Provider
      value={{
        getTransactions,
        deleteTransaction,
        addTransaction,
        transactions,
        balance
      }}
    >
      {props.children}
    </ExpenseTrackerContext.Provider>
  );
};

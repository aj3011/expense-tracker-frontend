const contextReducer = (state, action) => {
  let transactions;
  switch (action.type) {
    case "GET_TRANSACTIONS":
      transactions = action.payload;
      return transactions;
    case "DELETE_TRANSACTION":
      transactions = state.filter(t => t._id !== action.payload);

      return transactions;

    case "ADD_TRANSACTION":
      transactions = [action.payload, ...state];

      return transactions;

    case "TRANSACTION_ERROR":
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
};

export default contextReducer;

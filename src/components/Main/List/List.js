import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  List as MUIList,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
  Slide
} from "@material-ui/core";
import { ExpenseTrackerContext } from "../../../context/transactionContext";
import { Delete, MoneyOff } from "@material-ui/icons";
import useStyles from "./styles";
import { numberWithCommas } from "../../../utils/formatAmount";
import formatDate from "../../../utils/formatDate";
//Adding download functionality
import { CSVLink } from "react-csv";
import { db } from "../../../Authentication/firebase";
import AuthContext from "../../../Authentication/Context/authContext";

function List() {
  const [currency, setCurrency] = useState("");
  const { currentUser, lastLoggedInUser } = useContext(AuthContext);
  const classes = useStyles();
  const { deleteTransaction, transactions, getTransactions } = useContext(
    ExpenseTrackerContext
  );

  const currencySetter = useCallback(id => {
    db.collection("users")
      .doc(id)
      .get()
      .then(({ _delegate }) => {
        const { currency: cc } = _delegate._document.data.value.mapValue.fields;
        setCurrency(cc.stringValue);
      });
  }, []);

  useEffect(() => {
    if (!currentUser) {
      currencySetter(lastLoggedInUser.uid);
      getTransactions(lastLoggedInUser.uid);
    } else {
      currencySetter(currentUser.uid);
      getTransactions(currentUser.uid);
    }
  }, []);

  //setting up structure for data
  const headers = [
    { label: "Type", key: "type" },
    { label: "Amount", key: "amount" },
    { label: "Category", key: "category" },
    { label: "Date", key: "date" }
  ];

  //specifying parameters for the report
  const csvReport = {
    fileName: "Report.csv",
    headers: headers,
    data: transactions
  };

  return (
    <div>
      <MUIList dense={false} className={classes.list}>
        {transactions.map(transaction => (
          <Slide
            direction="down"
            in
            mountOnEnter
            unmountOnExit
            key={transaction.id}
          >
            <ListItem>
              <ListItemAvatar>
                <Avatar
                  className={
                    transaction.type === "Income"
                      ? classes.avatarIncome
                      : classes.avatarExpense
                  }
                >
                  <MoneyOff />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={transaction.category}
                secondary={`${currency}  ${numberWithCommas(transaction.amount)}
                    - ${formatDate(transaction.date)}`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="details"
                  onClick={() => {
                    deleteTransaction(transaction._id);
                  }}
                >
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </Slide>
        ))}
      </MUIList>
      <CSVLink style={{ margin: "0 100px" }} {...csvReport}>
        Export to CSV
      </CSVLink>
    </div>
  );
}

export default List;

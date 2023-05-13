import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
  Divider
} from "@material-ui/core";
import useStyles from "./styles";
import Form from "./Form/Form";
import List from "./List/List";
import { ExpenseTrackerContext } from "../../context/transactionContext";
import InfoCard from "../InfoCard";
import { numberWithCommas } from "../../utils/formatAmount";
import AuthContext from "../../Authentication/Context/authContext";
import { db } from "../../Authentication/firebase";

function Main() {
  const classes = useStyles();
  const [currency, setCurrency] = useState("");
  const { balance } = useContext(ExpenseTrackerContext);
  const { currentUser, lastLoggedInUser } = useContext(AuthContext);

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
    } else {
      currencySetter(currentUser.uid);
    }
  }, []);

  return (
    <div>
      <Card className={classes.root}>
        <CardHeader title="Expense Tracker" subheader="Powered by Speechly" />
        <CardContent>
          <Typography align="center" variant="h5">
            Total Balance {currency} {numberWithCommas(balance)}
          </Typography>
          <Typography
            variant="subtitle1"
            style={{ lineHeight: "1.5em", marginTop: "20px" }}
          >
            <InfoCard />
          </Typography>
          <Divider className={classes.divider} />
          <Form />
        </CardContent>
        <CardContent className={classes.CardContent}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <List />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}

export default Main;

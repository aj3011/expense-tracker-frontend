import React, { useEffect, useState, useCallback } from "react";
import { Card, CardHeader, CardContent, Typography } from "@material-ui/core";
import { Doughnut } from "react-chartjs-2";
import useStyles from "./styles";
import useTransactions from "../useTransactions";
import { numberWithCommas } from "../../utils/formatAmount";
import { db } from "../../Authentication/firebase";
import { useContext } from "react";
import AuthContext from "../../Authentication/Context/authContext";

function Details(props) {
  const [currency, setCurrency] = useState("");
  const classes = useStyles();
  const title = props.title;
  const { total, chartData } = useTransactions(title);
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
      <Card className={title === "Income" ? classes.income : classes.expense}>
        <CardHeader title={title} />
        <CardContent>
          <Typography variant="h5">
            {currency} {numberWithCommas(total)}
          </Typography>
          <Doughnut data={chartData} />
        </CardContent>
      </Card>
    </div>
  );
}

export default Details;

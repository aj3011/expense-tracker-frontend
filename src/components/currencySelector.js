import React from "react";

import { useContext } from "react";
import { ExpenseTrackerContext } from "../context/transactionContext";

import {
  TextField,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";

import { currencies } from "../../client/src/constants/Currencies";
function CurrencySelector() {
  const { setCurr } = useContext(ExpenseTrackerContext);
  return (
    <div>
      <InputLabel>Select Your Currency</InputLabel>
      <Select
        onChange={e => {
          setCurr(e.target.value);
        }}
      >
        {currencies.map(c => (
          <MenuItem key={c.name} value={c.symbol}>
            {`${c.symbol} : ${c.name}`}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}

export default CurrencySelector;

import React from "react";

const isIncome = Math.round(Math.random());

function InfoCard() {
  return (
    <div styles={{ textAlign: "center", padding: "0 10%" }}>
      Try saying: <br />
      Add {isIncome ? "Income " : "Expense "}
      for {isIncome ? "$100 " : "$50 "}
      in Category {isIncome ? "Business " : "House "}
      for {isIncome ? "Monday " : "Tuesday "} ...
    </div>
  );
}

export default InfoCard;

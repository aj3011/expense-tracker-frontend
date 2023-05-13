import { useContext } from "react";
import { ExpenseTrackerContext } from "../context/transactionContext";

import {
  incomeCategories,
  expenseCategories,
  resetCategories
} from "../constants/categories";

const useTransactions = title => {
  resetCategories();
  const { transactions } = useContext(ExpenseTrackerContext);

  // categories of a single type -> Income/Expense
  const transactionsPerType = transactions;

  // 0 is the initial value
  let total = 0;
  const categories = title === "Income" ? incomeCategories : expenseCategories;

  transactionsPerType.forEach(t => {
    // Find returns multiple entries
    const category = categories.find(c => c.type === t.category);
    if (category) category.amount += +t.amount;
  });

  const filteredCategories = categories.filter(c => c.amount > 0);

  filteredCategories.forEach(c => (total += c.amount));

  // React chartjs doughnut documentation : https://react-chartjs-2.js.org/examples/doughnut-chart/
  const chartData = {
    labels: filteredCategories.map(c => c.type),
    datasets: [
      {
        data: filteredCategories.map(c => c.amount),
        backgroundColor: filteredCategories.map(c => c.color)
      }
    ]
  };
  return { filteredCategories, total, chartData };
};

export default useTransactions;

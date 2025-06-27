import { useEffect, useState } from "react";
import API from "../api/api";

type Expense = {
  _id: string;
  amount: number;
  category: string;
  description?: string;
  date: string;
  payment_method?: string;
};

const ExpenseList = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const fetchExpenses = async () => {
    // const res = await API.get("/expenses/");
    // setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div>
      <h3 className="text-xl font-bold">Expenses</h3>
      <ul className="space-y-1">
        {expenses.map((exp) => (
          <li key={exp._id} className="border p-2">
            ₹{exp.amount} - {exp.category} -{" "}
            {new Date(exp.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;

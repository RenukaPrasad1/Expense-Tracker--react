import { useState } from "react";
import API from "../api/api";

const ExpenseForm = ({ onAdd }: { onAdd: () => void }) => {
  const [form, setForm] = useState({
    amount: "",
    category: "",
    description: "",
    date: "",
    payment_method: "Cash",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await API.post("/expenses/", form);
    onAdd();
    setForm({ amount: "", category: "", description: "", date: "", payment_method: "Cash" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input className="border" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="Amount" />
      <input className="border" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Category" />
      <input className="border" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" />
      <input className="border" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
      <select className="border" value={form.payment_method} onChange={(e) => setForm({ ...form, payment_method: e.target.value })}>
        <option value="Cash">Cash</option>
        <option value="UPI">UPI</option>
        <option value="Card">Card</option>
      </select>
      <button className="bg-blue-500 text-white px-4 py-2" type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
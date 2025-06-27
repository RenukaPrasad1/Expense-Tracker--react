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
   <form onSubmit={handleSubmit} className="bg-gray-300 rounded-xl p-6 shadow-md border">
  <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">➕ Add New Expense</h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label className="block text-sm text-black mb-1">Amount (₹)</label>
      <input type="number" className="w-full border  text-black rounded p-2" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
    </div>
    <div>
      <label className="block text-sm text-black mb-1">Category</label>
      <input className="w-full border rounded p-2 text-black" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
    </div>
    <div className="md:col-span-2">
      <label className="block text-sm text-black mb-1">Description</label>
      <input className="w-full border rounded p-2 text-black" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
    </div>
    <div>
      <label className="block text-sm text-black mb-1">Date</label>
      <input type="date" className="w-full border rounded p-2 text-black" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
    </div>
    <div>
      <label className="block text-sm text-black mb-1">Payment Method</label>
      <select className="w-full border rounded p-2 text-black" value={form.payment_method} onChange={(e) => setForm({ ...form, payment_method: e.target.value })}>
        <option value="Cash">Cash</option>
        <option value="UPI">UPI</option>
        <option value="Card">Card</option>
      </select>
    </div>
  </div>

  <div className="text-center mt-6">
    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded">
      Add Expense
    </button>
  </div>
</form>


  );
};

export default ExpenseForm;
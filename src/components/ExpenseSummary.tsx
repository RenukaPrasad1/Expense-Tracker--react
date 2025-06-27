import { useEffect, useState } from "react";
import API from "../api/api";

const ExpenseSummary = () => {
  const [summary, setSummary] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchSummary = async () => {
      const res = await API.get("/expenses/summary");
      setSummary(res.data);
    };
    fetchSummary();
  }, []);

  return (
    <div className="bg-white border rounded-xl p-6 shadow-md">
  <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Summary by Category</h3>
  <ul className="space-y-2">
    {Object.entries(summary).map(([cat, total]) => (
      <li key={cat} className="flex justify-between border-b py-1 text-sm text-gray-700">
        <span className="capitalize">{cat}</span>
        <span className="font-medium">₹{total}</span>
      </li>
    ))}
  </ul>
</div>


  );
};

export default ExpenseSummary;

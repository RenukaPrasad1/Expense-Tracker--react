import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ExpenseSummary = () => {
  const [summary, setSummary] = useState<Record<string, number>>({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSummary = async () => {
      // const res = await API.get("/expenses/summary");
      // setSummary(res.data);
      setSummary({
        food: 1200,
        travel: 800,
        shopping: 1900,
      });
    };
    fetchSummary();
  }, []);

  return (
    <div className="bg-white h-screen w-screen border rounded-xl p-6 shadow-md">
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        ← Back to Dashboard
      </button>
      <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
        Summary by Category
      </h3>
      <ul className="space-y-2">
        {Object.entries(summary).map(([cat, total]) => (
          <li
            key={cat}
            className="flex justify-between border-b py-1 text-sm text-gray-700"
          >
            <span className="capitalize">{cat}</span>
            <span className="font-medium">₹{total}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseSummary;

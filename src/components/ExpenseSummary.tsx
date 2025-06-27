import { useEffect, useState } from "react";
import API from "../api/api";

const ExpenseSummary = () => {
  const [summary, setSummary] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchSummary = async () => {
      // const res = await API.get("/expenses/summary");
      // setSummary(res.data);
    };
    fetchSummary();
  }, []);

  return (
    <div>
      <h3 className="text-xl font-bold">Summary by Category</h3>
      {Object.entries(summary).map(([cat, total]) => (
        <p key={cat}>
          {cat}: ₹{total}
        </p>
      ))}
    </div>
  );
};

export default ExpenseSummary;

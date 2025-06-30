import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ExpenseHistoryTable = () => {
  const navigate = useNavigate();

  const dummyData = [
    {
      category: "Food",
      description: "Lunch at restaurant",
      date: "2025-06-26",
      payment_method: "UPI",
      amount: 450,
    },
    {
      category: "Transport",
      description: "Cab to work",
      date: "2025-06-25",
      payment_method: "Cash",
      amount: 120,
    },
    {
      category: "Shopping",
      description: "T-shirt from Amazon",
      date: "2025-06-24",
      payment_method: "Card",
      amount: 999,
    },
  ];

  return (
    <div className="bg-white w-screen pt-6 h-screen border rounded-xl p-6 shadow-md overflow-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">📋 Expenses</h2>
        <button
          onClick={() => navigate("/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add
        </button>
      </div>

      <table className="w-full text-sm text-left text-gray-700">
        <thead className="text-xs text-gray-500 uppercase bg-gray-50">
          <tr>
            <th className="px-4 py-3">Type of Expense</th>
            <th className="px-4 py-3">Description</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Payment Method</th>
            <th className="px-4 py-3 text-right">Amount (₹)</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((item, index) => (
            <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 capitalize">{item.category}</td>
              <td className="px-4 py-3">{item.description}</td>
              <td className="px-4 py-3">
                {new Date(item.date).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">{item.payment_method}</td>
              <td className="px-4 py-3 text-right font-medium text-blue-600">
                ₹{item.amount}
              </td>
              <td className="px-4 py-3 text-right space-x-4">
                <button className="text-green-600 hover:text-green-800">
                  <FaEdit />
                </button>
                <button className="text-red-600 hover:text-red-800">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseHistoryTable;

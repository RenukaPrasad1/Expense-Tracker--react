// type Expense = {
//   _id: string;
//   amount: number;
//   category: string;
//   description?: string;
//   date: string;
//   payment_method?: string;
// };

const ExpenseList: React.FC<any> = ({ expenses }) => {
  return (
    <div className="bg-white border rounded-xl p-6 shadow-md">
      <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
        Expense History
      </h3>
      <ul className="space-y-3">
        {expenses &&
          expenses.map((exp: any) => (
            <li key={exp._id} className="border p-3 rounded-md bg-gray-50">
              <p className="text-sm text-gray-700 font-medium">
                {exp.category} - ₹{exp.amount}
              </p>
              <p className="text-xs text-gray-500">{exp.description}</p>
              <p className="text-xs text-gray-400">
                {new Date(exp.date).toLocaleDateString()}
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ExpenseList;

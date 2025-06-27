import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseSummary from "../components/ExpenseSummary";
import { FaUserCircle } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="min-h-screen w-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="text-xl font-bold text-blue-600">💸 ExpenseTrackr</div>

          <div>
            <FaUserCircle className="text-2xl text-gray-600" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        <ExpenseForm onAdd={() => window.location.reload()} />
        <div className="grid md:grid-cols-2 gap-6">
          <ExpenseList />
          <ExpenseSummary />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseSummary from "../components/ExpenseSummary";

const Dashboard = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <ExpenseForm onAdd={() => window.location.reload()} />
      <ExpenseList />
      <ExpenseSummary />
    </div>
  );
};

export default Dashboard;

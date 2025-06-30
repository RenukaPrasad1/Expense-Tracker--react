import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useAuth } from "./context/AuthContext";
import Dashboard from "./pages/dashboard";
import ExpenseHistoryTable from "./components/ExpenseHistoryTable";
import ExpenseSummary from "./components/ExpenseSummary";
import ExpenseList from "./components/ExpenseList";

const App = () => {
  const { isAuthenticated } = useAuth();
  // const isAuthenticated = true
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/add" element={isAuthenticated ? <Dashboard /> : <LoginPage />} />
        <Route
          path="/dashboard"
          element={<ExpenseHistoryTable />}
        />
        <Route
          path="/ExpenseSummary"
          element={<ExpenseSummary />}
        />
        <Route
          path="/ExpenseList"
          element={<ExpenseHistoryTable/>}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

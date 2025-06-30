// Dashboard.tsx
import { useEffect, useRef, useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
// import ExpenseList from "../components/ExpenseList";
import ExpenseSummary from "../components/ExpenseSummary";
import { FaUserCircle, FaBars } from "react-icons/fa";
import { getExpenses } from "../api/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getExpenses();
        if (data) {
          setData(data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [data]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen w-screen bg-white flex">
      {/* Side Navbar */}
      <aside className={`w-64 bg-black h-screen shadow-lg p-4 transition-transform ${sideNavOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:relative z-20 h-full`}>
        <h2 className="text-lg font-bold mb-4 p-6">💸 ExpenseTrackr</h2>
        <ul className="space-y-4 text-sm">
          <li onClick={() => navigate("/dashboard")} className="cursor-pointer text-xl hover:text-blue-600">Dashboard</li>
          <li onClick={() => navigate("/ExpenseSummary")} className="cursor-pointer text-xl hover:text-blue-600">Summary</li>
          <li onClick={() => navigate("/ExpenseList")} className="cursor-pointer text-xl hover:text-blue-600">Expenses</li>
        </ul>
      </aside>

      <div className="flex-1">
        {/* Header */}
        <header className="bg-white border-b shadow-sm sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => setSideNavOpen(!sideNavOpen)} className="md:hidden text-xl">
                <FaBars />
              </button>
            </div>

            <div
              className="relative flex gap-2 text-black items-center justify-center cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              ref={dropdownRef}
            >
              <FaUserCircle className="text-4xl text-gray-600" />
              <div>
                <h2>{user?.username}</h2>
                <h4 className="text-sm text-gray-500">{user?.email}</h4>
              </div>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 top-14 bg-white border shadow-lg rounded-md w-40 py-2 z-50">
                  <div
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 bg-white hover:bg-gray-100"
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 py-10 space-y-8">
          <ExpenseForm />
          <div className="grid md:grid-cols-2 gap-6">
            {/* <ExpenseList expenses={data} /> */}
            <ExpenseSummary />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

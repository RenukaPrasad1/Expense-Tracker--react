import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/api";
import { useSnackbar } from "notistack";

const LoginPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    console.log(form);

    try {
      const res = await login(form);
      enqueueSnackbar({ message: "Login successful", variant: "success" });
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Login failed:", error);
      setErrorMessage(error?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Login to Your Account
        </h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <label htmlFor="email" className="text-black font-medium">
            Email
          </label>
          <input
            id="email"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-black"
            placeholder="Enter your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            type="email"
            required
          />

          <label htmlFor="password" className="text-black font-medium">
            Password
          </label>
          <input
            id="password"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-black"
            placeholder="Enter your password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <button
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition duration-300 disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {errorMessage && (
            <p className="text-red-500 text-center mt-2">{errorMessage}</p>
          )}
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <span
            className="text-green-500 hover:underline cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

import { useState } from "react";
import { signUp } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const LoginPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    console.log(form);

    try {
      const res = await signUp(form);
      console.log(res?.user);
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
        <form onSubmit={handleRegister} className="flex flex-col gap-5">
          <label htmlFor="" className="text-black ">
            User Name
          </label>
          <input
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-black"
            placeholder="User Name"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            type="text"
            required
          />
          <label htmlFor="" className="text-black ">
            Email
          </label>
          <input
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-black"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            type="email"
            required
          />
          <label htmlFor="" className="text-black ">
            Password
          </label>
          <input
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-black"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition duration-300"
            type="submit"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <span
            className="text-green-500 hover:underline cursor-pointer"
            onClick={() => navigate("/")}
          >
            Log In
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

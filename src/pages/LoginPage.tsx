import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await API.post("/auth/login", form);
    localStorage.setItem("token", res.data.access_token);
    navigate("/dashboard");
  };

  return (
    <form onSubmit={login} className="space-y-2">
      <input className="border" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input className="border" placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button className="bg-green-500 text-white px-4 py-2" type="submit">Login</button>
    </form>
  );
};

export default LoginPage;

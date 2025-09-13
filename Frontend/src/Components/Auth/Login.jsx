import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../Service/Auth.service.js";

function Login() {
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const f1 = async () => {
      const res = await loginUser({ text, password });
      if (res) {
        navigate("/");
      }
    };
    f1();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1B1F3B] to-[#4D869C] text-white relative">
      {/* Home Button */}
      <button
        className="absolute top-6 right-6 bg-[#3A7CA5] px-6 py-3 rounded-full text-white font-semibold shadow-md transition-all hover:bg-[#81c3d7] hover:scale-105"
        onClick={() => navigate("/")}
      >
        Home
      </button>

      <div className="bg-[#253054] p-10 py-20 rounded-2xl w-96 border border-[#4D869C] shadow-lg shadow-[#3A7CA5]/50">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Email or username"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#4D869C]/30 text-white focus:outline-none focus:ring-2 focus:ring-[#81c3d7]"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#4D869C]/30 text-white focus:outline-none focus:ring-2 focus:ring-[#81c3d7]"
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-[#3A7CA5] text-white font-bold rounded-lg hover:bg-[#81c3d7] transition-all shadow-lg shadow-[#3A7CA5]/50"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-3 text-sm">
          <span
            className="text-[#81c3d7] cursor-pointer hover:underline"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </span>
        </p>

        <p className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <span
            className="text-[#81c3d7] cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;

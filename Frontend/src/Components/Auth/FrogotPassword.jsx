import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotpassService } from "../../Service/Auth.service.js";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotpassService(email);
    console.log("Sending reset password email to:", email);
    setMessage(`An email has been sent to ${email} with reset instructions.`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1B1F3B] to-[#4D869C] text-white relative">
      {/* Home Button */}
      <button
        className="absolute top-6 right-6 bg-[#3A7CA5] px-6 py-3 rounded-lg text-white font-semibold shadow-md transition-all hover:bg-[#81c3d7] hover:scale-105"
        onClick={() => navigate("/")}
      >
        Home
      </button>

      <div className="bg-[#253054] p-10 py-20 rounded-2xl shadow-xl w-96">
        <h2 className="text-3xl font-bold text-center mb-6">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#4D869C]/30 text-white focus:outline-none focus:ring-2 focus:ring-[#81c3d7]"
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-[#3A7CA5] text-white font-bold rounded-lg hover:bg-[#81c3d7] transition-all"
          >
            Send Reset Link
          </button>
        </form>

        {message && (
          <div className="mt-4 text-center text-green-400">
            <p>{message}</p>
          </div>
        )}

        <p className="text-center mt-4 text-sm">
          Remember your password?{" "}
          <Link
            to="/login"
            className="text-[#81c3d7] cursor-pointer hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
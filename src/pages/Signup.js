import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    console.log({ email, password });
    // TODO: integrate backend API
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSignup} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <input type="email" placeholder="Email" className="w-full p-2 mb-3 border" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="w-full p-2 mb-3 border" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">Signup</button>
      </form>
    </div>
  );
}

export default Signup;

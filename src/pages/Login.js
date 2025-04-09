import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log({ email, password });
    localStorage.setItem("token", "mock-jwt-token");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-100">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input type="email" placeholder="Email" className="w-full p-2 mb-3 border hover:border-blue-600" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="w-full p-2 mb-3 border hover:border-blue-600" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-blue-600">Login</button>
        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 underline hover:text-red-600">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;

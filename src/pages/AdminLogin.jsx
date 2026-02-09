import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase"; 

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    // success
    sessionStorage.setItem("admin", "true");
    navigate("/admin-panel-secret");
  };

  return (
    <div style={{ padding: 40, color: "white" }}>
      <h2>🔐 Admin Access</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Enter</button>
    </div>
  );
}

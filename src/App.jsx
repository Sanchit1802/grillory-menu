import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { supabase } from "./lib/supabase";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";

export default function App() {
  const navigate = useNavigate();
  const timerRef = useRef(null);

  useEffect(() => {
    const logoutUser = async () => {
      await supabase.auth.signOut();
      navigate("/admin-login", { replace: true });
    };

    const resetTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(logoutUser, 10 * 30 * 1000);
    };

    // activity events
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);
    window.addEventListener("scroll", resetTimer);

    resetTimer(); // start timer initially

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("scroll", resetTimer);
    };
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin-panel" element={<AdminPanel />} />
    </Routes>
  );
}
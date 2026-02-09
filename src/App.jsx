import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main website */}
        <Route path="/" element={<Home />} />

        {/* Hidden admin */}
        <Route path="/admin-grillory-786" element={<AdminLogin />} />
        <Route path="/admin-panel-secret" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

import { Routes, Route, useNavigate } from "react-router-dom";

import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Loading from "./pages/Loading";
import Auth from "./pages/Auth";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<Landing onLogin={() => navigate("/auth")} />} />
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/loading"
        element={
          <ProtectedRoute>
            <Loading />
          </ProtectedRoute>
        }
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

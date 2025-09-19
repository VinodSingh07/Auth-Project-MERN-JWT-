import React from "react";
import { Routes, Route } from "react-router-dom";
// import ResetPassword from "./components/ResetPassword";

// Pages
import Home from "./Home";
import Signup from "./Pages/Auth/Signup";
import Signin from "./Pages/Auth/Signin";
import ProtectedRoute from "./Auth/ProtectedRoute";

const AppRouter = () => {
  return (
    <Routes>
      {/* ✅ Protect Home */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/signup" element={<Signup />} />
      {/* <Route path="/reset-password/:token" element={<ResetPassword />} /> */}
      <Route path="/signin" element={<Signin />} />
    </Routes>
  );
};

export default AppRouter;

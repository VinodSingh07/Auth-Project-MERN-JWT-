// src/components/ResetPassword.js
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        { newPassword }
      );
      toast.success(res.data.message);
      navigate("/signin");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error resetting password");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit} className="col-md-6 offset-md-3">
        <div className="mb-3">
          <label className="form-label">New Password</label>
          <input
            type="password"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={8}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;

// src/components/Signin.js
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [showForgot, setShowForgot] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      toast.success("Login successful! 🎉");
      localStorage.setItem("token", res.data.token);
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.error || "Something went wrong");
    }
  };

  // ✅ Forgot Password submit
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        {
          email: forgotEmail,
        }
      );
      toast.success(res.data.message || "Password reset email sent!");
      setShowForgot(false);
      setForgotEmail("");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error sending reset email");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Login</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />

        {/* Checkbox */}
        <div className="form-check mb-3 d-flex align-items-center">
          <input
            type="checkbox"
            className="form-check-input me-2"
            id="loginCheck"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="loginCheck">
            I agree to enable login
          </label>
        </div>

        <button
          type="submit"
          className={`btn w-100 ${isChecked ? "btn-primary" : "btn-secondary"}`}
          disabled={!isChecked}
          style={styles.button}
        >
          Log In
        </button>

        {/* ✅ Forgot Password link */}
        <p
          style={{ marginTop: "10px", cursor: "pointer", color: "blue" }}
          onClick={() => setShowForgot(true)}
        >
          Forgot Password?
        </p>
      </form>

      {/* ✅ Forgot Password Modal */}
      {showForgot && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3>Reset Password</h3>
            <form onSubmit={handleForgotPassword}>
              <input
                type="email"
                placeholder="Enter your email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                style={styles.input}
                required
              />
              <button type="submit" className="btn btn-primary w-100 mt-2">
                Send Reset Link
              </button>
              <button
                type="button"
                className="btn btn-secondary w-100 mt-2"
                onClick={() => setShowForgot(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    textAlign: "center",
  },
  title: { marginBottom: "20px" },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  input: { padding: "10px", fontSize: "16px" },
  button: { padding: "10px", fontSize: "16px", borderRadius: "5px" },
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    width: "300px",
  },
};

export default Signin;

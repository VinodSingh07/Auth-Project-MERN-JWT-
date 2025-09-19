// src/components/SignupForm.js
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        email,
        password,
      });

      toast.success(res.data.message || "User created successfully 🎉");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Error creating user. Please try again."
      );
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Signup</h1>
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
          placeholder="Password (min 8 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
          minLength={8}
        />

        <button
          type="submit"
          className="btn btn-primary w-100"
          style={styles.button}
        >
          Sign Up
        </button>
      </form>

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default SignupForm;

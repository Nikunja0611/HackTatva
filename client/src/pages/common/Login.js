import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("participant");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();

    // Here you can call backend API for authentication
    // Example:
    // const res = await axios.post("/api/login", { email, password, role });

    // For now, assume success:
    setMsg("✅ Successful login");

    setTimeout(() => {
      if (role === "participant") {
        navigate("/events"); // Redirect to Event.js
      } else {
        navigate("/create-event"); // Redirect to CreateEvent.js
      }
    }, 1500);
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={onSubmit} className="login-form">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />

          <div className="role-select">
            <label>
              <input
                type="radio"
                value="participant"
                checked={role === "participant"}
                onChange={(e) => setRole(e.target.value)}
              />
              Participant
            </label>
            <label>
              <input
                type="radio"
                value="organiser"
                checked={role === "organiser"}
                onChange={(e) => setRole(e.target.value)}
              />
              Organiser
            </label>
          </div>

          <button className="btn">Login</button>
        </form>

        {msg && <p className="msg">{msg}</p>}
      </div>

      {/* CSS inside same file */}
      <style>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #6a11cb, #2575fc);
          font-family: Arial, sans-serif;
        }
        .login-card {
          background: #fff;
          padding: 30px 25px;
          border-radius: 12px;
          box-shadow: 0px 8px 20px rgba(0,0,0,0.2);
          width: 100%;
          max-width: 400px;
          text-align: center;
        }
        .login-card h2 {
          margin-bottom: 20px;
          color: #333;
        }
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .login-form input {
          padding: 12px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 14px;
        }
        .role-select {
          display: flex;
          justify-content: space-around;
          margin: 10px 0;
          font-size: 14px;
          color: #444;
        }
        .btn {
          padding: 12px;
          background: #2575fc;
          color: #fff;
          font-weight: bold;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s;
        }
        .btn:hover {
          background: #1a5edb;
        }
        .msg {
          margin-top: 15px;
          color: green;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}

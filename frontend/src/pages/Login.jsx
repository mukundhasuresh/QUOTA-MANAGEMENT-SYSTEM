import { useState } from "react";
import api from "../api/api";

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");

  const handleSubmit = async () => {
    try {
      if (isRegister) {
        // REGISTER
        await api.post("/auth/register", {
          name,
          email,
          password,
          role
        });
        alert("Registration successful. Please login.");
        setIsRegister(false);
      } else {
        // LOGIN
        const res = await api.post("/auth/login", {
          email,
          password
        });

        localStorage.setItem("token", res.data.token);

        const payload = JSON.parse(
          atob(res.data.token.split(".")[1])
        );

        window.location =
          payload.role === "ADMIN" ? "/admin" : "/user";
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ width: "380px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Quota System
        </h2>

        {isRegister && (
          <input
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {isRegister && (
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "12px",
              borderRadius: "6px"
            }}
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        )}

        <button onClick={handleSubmit} style={{ width: "100%" }}>
          {isRegister ? "Register" : "Login"}
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "15px",
            cursor: "pointer",
            color: "#2563eb"
          }}
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister
            ? "Already have an account? Login"
            : "New user? Register"}
        </p>
      </div>
    </div>
  );
}

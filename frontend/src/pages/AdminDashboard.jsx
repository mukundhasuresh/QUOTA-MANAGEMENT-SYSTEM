import { useState, useEffect } from "react";
import api from "../api/api";

export default function AdminDashboard() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    api.get("/admin/reports").then(res => setReports(res.data));
  }, []);

  return (
    <div className="container">
      <div className="card" style={{ width: "600px" }}>
        <h2>Admin Reports</h2>

        {reports.map(user => (
          <p key={user.id}>
            {user.name} — {user.quota_used}/{user.quota_limit}
          </p>
        ))}
      </div>
    </div>
  );
}

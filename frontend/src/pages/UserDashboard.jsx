import { useEffect, useState } from "react";
import api from "../api/api";

export default function UserDashboard() {
  const [quota, setQuota] = useState({ limit: 0, used: 0 });

  useEffect(() => {
    api.get("/requests/quota").then(res => {
      setQuota({
        limit: res.data.quota_limit,
        used: res.data.quota_used
      });
    });
  }, []);

  const sendRequest = async () => {
    try {
      await api.post("/requests");
      alert("Request accepted");
      setQuota(q => ({ ...q, used: q.used + 1 }));
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const remaining = quota.limit - quota.used;

  return (
    <div className="container">
      <div className="card" style={{ width: "420px" }}>
        <h2>User Dashboard</h2>

        <p>
          Remaining Quota: <b>{remaining}</b>
        </p>

        <button
          onClick={sendRequest}
          disabled={remaining <= 0}
          style={{
            opacity: remaining <= 0 ? 0.6 : 1,
            cursor: remaining <= 0 ? "not-allowed" : "pointer"
          }}
        >
          Submit Request
        </button>
      </div>
    </div>
  );
}

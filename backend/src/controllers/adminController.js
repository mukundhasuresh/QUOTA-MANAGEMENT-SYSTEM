const pool = require("../config/db");

// ✅ Set quota (ADMIN)
exports.setQuota = async (req, res) => {
  const { userId } = req.params;
  const { quota } = req.body;

  await pool.query(
    "UPDATE users SET quota_limit = $1 WHERE id = $2",
    [quota, userId]
  );

  res.json({ message: "Quota updated" });
};

// ✅ Usage report (ADMIN)
exports.getUsageReport = async (req, res) => {
  const result = await pool.query(`
    SELECT 
      u.id,
      u.name,
      u.email,
      u.quota_limit,
      u.quota_used,
      COUNT(r.id) AS total_requests
    FROM users u
    LEFT JOIN requests r ON u.id = r.user_id
    GROUP BY u.id
  `);

  res.json(result.rows);
};

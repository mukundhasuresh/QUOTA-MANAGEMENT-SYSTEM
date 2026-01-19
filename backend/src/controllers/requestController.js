const pool = require("../config/db");

exports.submitRequest = async (req, res) => {
  const userId = req.user.id;

  const userRes = await pool.query(
    "SELECT quota_limit, quota_used FROM users WHERE id=$1",
    [userId]
  );

  const user = userRes.rows[0];

  if (user.quota_used >= user.quota_limit) {
    return res.status(403).json({
      message: "Quota exhausted. Request denied."
    });
  }

  await pool.query(
    "INSERT INTO requests (user_id, request_type) VALUES ($1,$2)",
    [userId, "GENERAL"]
  );

  await pool.query(
    "UPDATE users SET quota_used = quota_used + 1 WHERE id=$1",
    [userId]
  );

  res.json({ message: "Request accepted" });
};

exports.getQuota = async (req, res) => {
  const result = await pool.query(
    "SELECT quota_limit, quota_used FROM users WHERE id=$1",
    [req.user.id]
  );
  res.json(result.rows[0]);
};

const pool = require("../config/db");
const { hashPassword, comparePassword } = require("../utils/hash");
const { generateToken } = require("../utils/jwt");

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  const hashed = await hashPassword(password);

  const user = await pool.query(
    "INSERT INTO users (name,email,password,role) VALUES ($1,$2,$3,$4) RETURNING *",
    [name, email, hashed, role]
  );

  res.json(user.rows[0]);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const userRes = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  if (!userRes.rows.length)
    return res.status(401).json({ message: "Invalid credentials" });

  const user = userRes.rows[0];

  const valid = await comparePassword(password, user.password);
  if (!valid)
    return res.status(401).json({ message: "Invalid credentials" });

  const token = generateToken(user);
  res.json({ token });
};

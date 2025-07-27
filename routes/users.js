const express = require("express");
const router = express.Router();
const db = require("../config/database");

//Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //Find user
    const [users] = await db.execute("SELECT id, email, role FROM users WHERE email = ? AND password = ?", [email, password]);

    if (users.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = users[0];
    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Check user not found in DB
router.get("/:id", async (req, res) => {
  try {
    const [users] = await db.execute("SELECT id, email, role FROM users WHERE id = ?", [req.params.id]);

    if (users.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(users[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

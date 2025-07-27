const express = require("express");
const router = express.Router();
const db = require("../config/database");

//Get all issues
router.get("/", async (req, res) => {
  try {
    const [issues] = await db.execute(`
      SELECT i.*, u.email as userEmail 
      FROM issues i 
      LEFT JOIN users u ON i.userEmail = u.email
      ORDER BY i.submittedTime DESC
    `);

    res.json(issues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Create new issue
router.post("/", async (req, res) => {
  try {
    const { title, description, category, priority, location, userEmail } = req.body;

    const [result] = await db.execute("INSERT INTO issues (title, description, location, userEmail, category, status) VALUES (?, ?, ?, ?, ?, ?)", [title, description, location, userEmail, category, "new"]);

    // Get the created issue
    const [issues] = await db.execute("SELECT * FROM issues WHERE id = ?", [result.insertId]);

    res.json({
      success: true,
      issue: issues[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Update issue
router.put("/:id", async (req, res) => {
  try {
    const { title, description, category, status, location, updateBy, latestUpdate } = req.body;

    // const [result] = await db.execute("UPDATE issues SET title = ?, description = ?, category = ?, status = ?, location = ?, updateBy = ?, latestUpdate = ?, updateTime = NOW() WHERE id = ?", [title || null, description || null, category || null, status || null, location || null, updateBy || null, latestUpdate || null, req.params.id]);
        const [result] = await db.execute("UPDATE issues SET status = ?, updateBy = ?, latestUpdate = ?, updateTime = NOW() WHERE id = ?", [status || null, updateBy || null, latestUpdate || null, req.params.id]);
    // Get the updated issue
    const [issues] = await db.execute("SELECT * FROM issues WHERE id = ?", [req.params.id]);

    res.json({
      success: true,
      issue: issues[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Delete issue
router.delete("/:id", async (req, res) => {
  try {
    await db.execute("DELETE FROM issues WHERE id = ?", [req.params.id]);
    res.json({ success: true, message: "Issue deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const pool = require("../config/db.config.js");

// Create a new module
router.post("/modules", (req, res) => {
  const {
    courseId,
    moduleName,
    moduleDescription,
    moduleDuration,
    moduleStatus,
  } = req.body;
  const sql =
    "INSERT INTO modules (courseId, moduleName, moduleDescription, moduleDuration, moduleStatus) VALUES (?, ?, ?, ?, ?)";
  pool.query(
    sql,
    [courseId, moduleName, moduleDescription, moduleDuration, moduleStatus],
    (err, result) => {
      if (err) {
        console.error("Error creating module:", err);
        return res.status(500).json({ error: "Error creating module" });
      }
      res.status(201).json({
        moduleId: result.insertId,
        message: "Module created successfully",
      });
    }
  );
});

// Get all modules
router.get("/modules", (req, res) => {
  const sql = "SELECT * FROM modules";
  pool.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching modules:", err);
      return res.status(500).json({ error: "Error fetching modules" });
    }
    res.status(200).json(result);
  });
});

// Get a single module by moduleId
router.get("/modules/:moduleId", (req, res) => {
  const moduleId = req.params.moduleId;
  const sql = "SELECT * FROM modules WHERE moduleId = ?";
  pool.query(sql, [moduleId], (err, result) => {
    if (err) {
      console.error("Error fetching module:", err);
      return res.status(500).json({ error: "Error fetching module" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "Module not found" });
    }
    res.status(200).json(result[0]);
  });
});

// Update a module by moduleId
router.put("/modules/:moduleId", (req, res) => {
  const moduleId = req.params.moduleId;
  const {
    courseId,
    moduleName,
    moduleDescription,
    moduleDuration,
    moduleStatus,
  } = req.body;
  const sql =
    "UPDATE modules SET courseId = ?, moduleName = ?, moduleDescription = ?, moduleDuration = ?, moduleStatus = ? WHERE moduleId = ?";
  pool.query(
    sql,
    [
      courseId,
      moduleName,
      moduleDescription,
      moduleDuration,
      moduleStatus,
      moduleId,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating module:", err);
        return res.status(500).json({ error: "Error updating module" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Module not found" });
      }
      res.status(200).json({ message: "Module updated successfully" });
    }
  );
});

// Delete a module by moduleId
router.delete("/modules/:moduleId", (req, res) => {
  const moduleId = req.params.moduleId;
  const sql = "DELETE FROM modules WHERE moduleId = ?";
  pool.query(sql, [moduleId], (err, result) => {
    if (err) {
      console.error("Error deleting module:", err);
      return res.status(500).json({ error: "Error deleting module" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Module not found" });
    }
    res.status(200).json({ message: "Module deleted successfully" });
  });
});

module.exports = router;

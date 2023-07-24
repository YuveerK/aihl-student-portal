const express = require("express");
const router = express.Router();
const pool = require("../config/db.config.js");

// Create a new enrollment
router.post("/enrollments", (req, res) => {
  const { learnerId, courseId, enrollmentDate, status } = req.body;
  const sql =
    "INSERT INTO enrollments (learnerId, courseId, enrollmentDate, status) VALUES (?, ?, ?, ?)";
  pool.query(
    sql,
    [learnerId, courseId, enrollmentDate, status],
    (err, result) => {
      if (err) {
        console.error("Error creating enrollment:", err);
        return res.status(500).json({ error: "Error creating enrollment" });
      }
      res.status(201).json({
        enrollmentId: result.insertId,
        message: "Enrollment created successfully",
      });
    }
  );
});

// Get all enrollments
router.get("/enrollments", (req, res) => {
  const sql = "SELECT * FROM enrollments";
  pool.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching enrollments:", err);
      return res.status(500).json({ error: "Error fetching enrollments" });
    }
    res.status(200).json(result);
  });
});

// Get a single enrollment by enrollmentId
router.get("/enrollments/:enrollmentId", (req, res) => {
  const enrollmentId = req.params.enrollmentId;
  const sql = "SELECT * FROM enrollments WHERE enrollmentId = ?";
  pool.query(sql, [enrollmentId], (err, result) => {
    if (err) {
      console.error("Error fetching enrollment:", err);
      return res.status(500).json({ error: "Error fetching enrollment" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "Enrollment not found" });
    }
    res.status(200).json(result[0]);
  });
});

// Update an enrollment by enrollmentId
router.put("/enrollments/:enrollmentId", (req, res) => {
  const enrollmentId = req.params.enrollmentId;
  const { learnerId, courseId, enrollmentDate, status } = req.body;
  const sql =
    "UPDATE enrollments SET learnerId = ?, courseId = ?, enrollmentDate = ?, status = ? WHERE enrollmentId = ?";
  pool.query(
    sql,
    [learnerId, courseId, enrollmentDate, status, enrollmentId],
    (err, result) => {
      if (err) {
        console.error("Error updating enrollment:", err);
        return res.status(500).json({ error: "Error updating enrollment" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Enrollment not found" });
      }
      res.status(200).json({ message: "Enrollment updated successfully" });
    }
  );
});

// Delete an enrollment by enrollmentId
router.delete("/enrollments/:enrollmentId", (req, res) => {
  const enrollmentId = req.params.enrollmentId;
  const sql = "DELETE FROM enrollments WHERE enrollmentId = ?";
  pool.query(sql, [enrollmentId], (err, result) => {
    if (err) {
      console.error("Error deleting enrollment:", err);
      return res.status(500).json({ error: "Error deleting enrollment" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Enrollment not found" });
    }
    res.status(200).json({ message: "Enrollment deleted successfully" });
  });
});

module.exports = router;

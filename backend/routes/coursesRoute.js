const express = require("express");
const router = express.Router();
const pool = require("../config/db.config.js");

// Create a new course
router.post("/courses", (req, res) => {
  const {
    courseName,
    courseDescription,
    courseDuration,
    courseStartDate,
    courseEndDate,
    courseCapacity,
  } = req.body;
  const sql =
    "INSERT INTO courses (courseName, courseDescription, courseDuration, courseStartDate, courseEndDate, courseCapacity) VALUES (?, ?, ?, ?, ?, ?)";
  pool.query(
    sql,
    [
      courseName,
      courseDescription,
      courseDuration,
      courseStartDate,
      courseEndDate,
      courseCapacity,
    ],
    (err, result) => {
      if (err) {
        console.error("Error creating course:", err);
        return res.status(500).json({ error: "Error creating course" });
      }
      res.status(201).json({
        courseId: result.insertId,
        message: "Course created successfully",
      });
    }
  );
});

// Get all courses
router.get("/courses", (req, res) => {
  let { offset, limit } = req.query;
  // Query to get the total count of records
  let countQuery = "SELECT COUNT(*) as total_count FROM courses";

  // Query to retrieve paginated data
  let dataQuery =
    "SELECT * FROM courses order by createdAt desc LIMIT ? OFFSET ?";

  // Execute the count query to get the total count
  pool.query(countQuery, (countErr, countResult) => {
    if (countErr) {
      console.log(countErr);
      res.status(400).json(countErr);
      return;
    }

    // Extract the total count from the countResult
    const totalCount = countResult[0].total_count;

    // Execute the data query with limit and offset
    pool.query(
      dataQuery,
      [parseInt(limit), parseInt(offset)],
      (dataErr, data) => {
        if (dataErr) {
          console.log(dataErr);
          res.status(400).json(dataErr);
        } else {
          // Return the paginated data and total count as the response
          res.status(200).json({
            total_count: totalCount,
            data: data,
          });
        }
      }
    );
  });
});

// Get a single course by courseId
router.get("/courses/:courseId", (req, res) => {
  const courseId = req.params.courseId;
  const sql = "SELECT * FROM courses WHERE courseId = ?";
  pool.query(sql, [courseId], (err, result) => {
    if (err) {
      console.error("Error fetching course:", err);
      return res.status(500).json({ error: "Error fetching course" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json(result[0]);
  });
});

// Update a course by courseId
router.put("/courses/:courseId", (req, res) => {
  const courseId = req.params.courseId;
  const {
    courseName,
    courseDescription,
    courseDuration,
    courseStartDate,
    courseEndDate,
    courseCapacity,
  } = req.body;
  const sql =
    "UPDATE courses SET courseName = ?, courseDescription = ?, courseDuration = ?, courseStartDate = ?, courseEndDate = ?, courseCapacity = ? WHERE courseId = ?";
  pool.query(
    sql,
    [
      courseName,
      courseDescription,
      courseDuration,
      courseStartDate,
      courseEndDate,
      courseCapacity,
      courseId,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating course:", err);
        return res.status(500).json({ error: "Error updating course" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Course not found" });
      }
      res.status(200).json({ message: "Course updated successfully" });
    }
  );
});

// Delete a course by courseId
router.delete("/courses/:courseId", (req, res) => {
  const courseId = req.params.courseId;
  const sql = "DELETE FROM courses WHERE courseId = ?";
  pool.query(sql, [courseId], (err, result) => {
    if (err) {
      console.error("Error deleting course:", err);
      return res.status(500).json({ error: "Error deleting course" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  });
});

module.exports = router;

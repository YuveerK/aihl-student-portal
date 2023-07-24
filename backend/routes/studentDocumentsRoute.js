const router = require("express").Router();
const pool = require("../config/db.config.js");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "student-documents");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + file.originalname;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

// Create a new file record
router.post("/upload", upload.single("file"), (req, res) => {
  const { learnerId, documentName, category } = req.body;
  const documentPath = req.file.path;

  const sql =
    "INSERT INTO student_documents (learnerId, documentName, documentPath, category) VALUES (?, ?, ?, ?)";

  pool.query(
    sql,
    [learnerId, documentName, documentPath, category],
    (err, result) => {
      if (err) {
        console.error("Error uploading file:", err);
        return res.status(500).json({ error: "Error uploading file" });
      }
      res.status(200).json({ message: "File uploaded successfully" });
    }
  );
});

// Read all file records for a specific learnerId
router.get("/files/:learnerId", (req, res) => {
  let { offset, limit } = req.query;
  let learnerId = req.params.learnerId;

  // Query to get the total count of records
  let countQuery =
    "SELECT COUNT(*) as total_count FROM student_documents where learnerId = ?";

  // Query to retrieve paginated data
  let dataQuery =
    "SELECT * FROM student_documents where learnerId = ? order by createdAt desc LIMIT ? OFFSET ?";

  // Execute the count query to get the total count
  pool.query(countQuery, [learnerId], (countErr, countResult) => {
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
      [learnerId, parseInt(limit), parseInt(offset)],
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

// Update file record by studentDocumentId
router.put("/files/:studentDocumentId", upload.single("file"), (req, res) => {
  const studentDocumentId = req.params.studentDocumentId;
  const { learnerId, documentName, category } = req.body;
  const documentPath = req.file ? req.file.path : null; // New documentPath if a new file is uploaded

  // Step 1: Retrieve the existing documentPath
  const getExistingDocumentPathSql =
    "SELECT documentPath FROM student_documents WHERE studentDocumentId=?";
  pool.query(getExistingDocumentPathSql, [studentDocumentId], (err, result) => {
    if (err) {
      console.error("Error retrieving existing documentPath:", err);
      return res.status(500).json({ error: "Error updating file" });
    }

    const existingDocumentPath = result[0] ? result[0].documentPath : null;

    // Step 2: Remove the old file if a new file is uploaded
    if (req.file && existingDocumentPath) {
      fs.unlink(existingDocumentPath, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Error removing old file:", unlinkErr);
        }
      });
    }

    // Step 3: Update the file record in the database
    const updateFileSql =
      "UPDATE student_documents SET learnerId=?, documentName=?, documentPath=?, category=? WHERE studentDocumentId=?";
    pool.query(
      updateFileSql,
      [learnerId, documentName, documentPath, category, studentDocumentId],
      (updateErr) => {
        if (updateErr) {
          console.error("Error updating file:", updateErr);
          return res.status(500).json({ error: "Error updating file" });
        }
        res.status(200).json({ message: "File updated successfully" });
      }
    );
  });
});

// Delete file record by studentDocumentId
router.delete("/files/:studentDocumentId", (req, res) => {
  const studentDocumentId = req.params.studentDocumentId;

  const sql = "DELETE FROM student_documents WHERE studentDocumentId=?";

  pool.query(sql, [studentDocumentId], (err, result) => {
    if (err) {
      console.error("Error deleting file:", err);
      return res.status(500).json({ error: "Error deleting file" });
    }
    res.status(200).json({ message: "File deleted successfully" });
  });
});

module.exports = router;

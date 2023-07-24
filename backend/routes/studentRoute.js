const router = require("express").Router();
const pool = require("../config/db.config");

// GET /learner
router.get("/get-learner", (req, res) => {
  let { offset, limit } = req.query;

  // Query to get the total count of records
  let countQuery = "SELECT COUNT(*) as total_count FROM learner";

  // Query to retrieve paginated data
  let dataQuery =
    "SELECT * FROM learner order by createdAt desc LIMIT ? OFFSET ?";

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

// GET /learner/:learnerId
router.get("/:learnerId", (req, res) => {
  const { learnerId } = req.params;

  // Query to retrieve a specific student by learnerId
  const query = "SELECT * FROM learner WHERE learnerId = ?";

  pool.query(query, [learnerId], (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    } else {
      if (result.length === 0) {
        res.status(404).json({ message: "Student not found" });
      } else {
        res.status(200).json(result[0]);
      }
    }
  });
});

// POST /learner
router.post("/add-student", (req, res) => {
  const {
    firstName,
    middleName,
    surname,
    idNumber,
    passportNumber,
    dob,
    primaryContactDetails,
    secondaryContactDetails,
    email,
    race,
    gender,
    age,
    youthYesNo,
    disability,
    citizenship,
    learnerProvince,
    learnerDistrictMunicipality,
    learnerResidentialArea,
    ruralUrban,
  } = req.body;

  // Query to insert a new student into the database
  const query =
    "INSERT INTO learner (firstName, middleName, surname, idNumber, passportNumber, dob, primaryContactDetails, secondaryContactDetails, email, race, gender, age, youthYesNo, disability, citizenship, learnerProvince, learnerDistrictMunicipality, learnerResidentialArea, ruralUrban) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  pool.query(
    query,
    [
      firstName,
      middleName,
      surname,
      idNumber,
      passportNumber,
      dob,

      primaryContactDetails,
      secondaryContactDetails,
      email,
      race,
      gender,
      age,
      youthYesNo,
      disability,
      citizenship,
      learnerProvince,
      learnerDistrictMunicipality,
      learnerResidentialArea,
      ruralUrban,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).json(err);
      } else {
        res.status(201).json({ message: "Student created successfully" });
      }
    }
  );
});

// PUT /learner/:learnerId
router.put("/update-student/:learnerId", (req, res) => {
  const { learnerId } = req.params;
  const {
    firstName,
    middleName,
    surname,
    idNumber,
    passportNumber,
    dob,
    primaryContactDetails,
    secondaryContactDetails,
    email,
    race,
    gender,
    age,
    youthYesNo,
    disability,
    citizenship,
    learnerProvince,
    learnerDistrictMunicipality,
    learnerResidentialArea,
    ruralUrban,
  } = req.body;

  // Query to update a specific student by learnerId
  const query =
    "UPDATE learner SET firstName = ?, middleName = ?, surname = ?, idNumber = ?, passportNumber = ?, dob = ?, primaryContactDetails = ?, secondaryContactDetails = ?, email = ?, race = ?, gender = ?, age = ?, youthYesNo = ?, disability = ?, citizenship = ?, learnerProvince = ?, learnerDistrictMunicipality = ?, learnerResidentialArea = ?, ruralUrban = ? WHERE learnerId = ?";

  pool.query(
    query,
    [
      firstName,
      middleName,
      surname,
      idNumber,
      passportNumber,
      dob,
      primaryContactDetails,
      secondaryContactDetails,
      email,
      race,
      gender,
      age,
      youthYesNo,
      disability,
      citizenship,
      learnerProvince,
      learnerDistrictMunicipality,
      learnerResidentialArea,
      ruralUrban,
      learnerId,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).json(err);
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ message: "Student not found" });
        } else {
          res.status(200).json({ message: "Student updated successfully" });
        }
      }
    }
  );
});

// DELETE /learner/:learnerId
router.delete("/:learnerId", (req, res) => {
  const { learnerId } = req.params;

  // Query to delete a specific student by learnerId
  const query = "DELETE FROM learner WHERE learnerId = ?";

  pool.query(query, [learnerId], (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ message: "Student not found" });
      } else {
        res.status(200).json({ message: "Student deleted successfully" });
      }
    }
  });
});

module.exports = router;

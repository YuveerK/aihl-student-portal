const express = require("express");
const cors = require("cors");
const app = express();
const studentRoute = require("./routes/studentRoute");
const studentDocumentsRoute = require("./routes/studentDocumentsRoute");
const coursesRoute = require("./routes/coursesRoute");
const modulesRoute = require("./routes/modulesRoute");
const enrollmentsRoute = require("./routes/enrollmentsRoute");
const path = require("path");
app.use(express.json({ limit: "100MB" }));
app.use(
  cors({
    origin: [
      "http://169.1.238.73:3000",
      "http://192.168.50.24:3000",
      "http://localhost:3000",
      "http://169.1.238.73",
      "http://192.168.50.24",
      "http://localhost",
    ],
  })
);
app.use(
  "/student-documents",
  express.static(path.join(__dirname, "student-documents"))
);

app.listen(2000, () => {
  console.log("listening");
});

app.use(coursesRoute);
app.use(studentDocumentsRoute);
app.use(modulesRoute);
app.use(enrollmentsRoute);
app.use(studentRoute);

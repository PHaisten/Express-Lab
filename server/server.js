const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");
let app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "../public")));

app.use((req, res, next) => {
  console.log(`${req.url}`);
  next();
});

app.post("/contact-form", (req, res, next) => {
  console.log(req.body.name);
  console.log(req.body.email);
  res.send("Thank you for sending a contact form!");
  next();
});

app.use((req, res, next) => {
  fs.appendFileSync(
    "info.json",
    `\n ${req.url}\n ${req.body.name} \n ${req.body.email}`
  );
  next();
});

// app.get("/", (req, res) => {
//   res.send("Hello from the web server side...");
// });

app.listen(3000, console.log("Server is running"));

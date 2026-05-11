require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;
const { loggs } = require("./middleware/logevents");
const errorLogger = require("./middleware/errorLogger");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/DBconnection");
const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");
const varifyJWT = require("./middleware/varifyJwt");

connectDB();

app.use(cors(corsOptions));

app.use(loggs);

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieparser());

app.use("/register", require("./routes/api/register"));
app.use("/login", require("./routes/api/login"));
app.use("/refresh", require("./routes/api/refresh"));
app.use(varifyJWT);
app.use("/get", require("./routes/api/textEditor"));

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});
app.use(errorLogger);

mongoose.connection.once("open", () => {
  console.log("connected to DB");

  app.listen(port, () => {
    console.log(`server running on ${port}`);
  });
});

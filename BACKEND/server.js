const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  //useCreateIndex: true,
  //useNewUrlParser: true,
  //useUnifiedTopology: true,
  //useFindSndModify: false,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongodb Connection Success!");
});

//import routes
const productRouter = require("./routes/products.js");
const userRouter = require("./routes/users");

//define routes
app.use("/product", productRouter);
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is up and running on port : ${PORT}`);
});

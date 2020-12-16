import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
// -- Importing Routes
import router from "./routes/posts.js";

// -- Starting the server
const app = express();
dotenv.config();

// -- Middlewares
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// -- Routes

app.use("/posts", router);

app.get("/", (req, res) => {
  res.send("Welcome To Memories Application");
});

const PORT = process.env.PORT || 5000;

// -- Connecting to the Database and Listinening to the server
mongoose
  .connect(process.env.CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((err) => console.log(err.message));

// -- Catching errors flag
mongoose.set("useFindAndModify", false);

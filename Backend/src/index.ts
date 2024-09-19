import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
  console.log("DataBase Connection successful");
});

const app = express();
app.use(express.json());
app.use(cors());

app.get("/test", async (req, res) => {
  res.json({ msg: "Hello" });
});

app.listen(7000, () => {
  console.log("Server is running on port 7000");
});

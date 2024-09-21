import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoutes from "./routes/myUserRoutes";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
  console.log("DataBase Connection successful");
});

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/my/user", myUserRoutes);
app.listen(7000, () => {
  console.log("Server is running on port 7000");
});

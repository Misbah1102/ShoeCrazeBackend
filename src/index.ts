import express from "express";
import dotenv from "dotenv";
dotenv.config();


import cors from "cors";

import shoeRouter from './router/shoes.router';
import userRouter from './router/user.router';

import { dbConnect } from "./configs/database.config";
dbConnect();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);


app.use("/api/shoes" , shoeRouter);
app.use("/api/users", userRouter);
app.use(express.json());

const port = 3000;
app.listen(port, () => {
  console.log("website served on http://localhost:" + port);
});

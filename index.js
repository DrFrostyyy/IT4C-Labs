// index.js
import express from "express";
import dotenv from "dotenv";
import postRoutes from "./src/routes/post.routes.js";
import morgan from 'morgan';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.json());

app.use("/posts", postRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
app.get("/", (req, res) => {
  res.send(
    "Name: Jana Cornejo, Section: IT4C, Program: Information Technology"
  );
});

app.get("/hello/:name", (req, res) => {
  const name = req.params.name;
  res.send(`Hello ${name}`);
});

app.get("/foo/", (req, res) => {
  console.log(req.query);
});

app.get("/IT", (req, res) => {
  console.log(req.body);
});

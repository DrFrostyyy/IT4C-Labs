import express from "express";
import morgan from "morgan";
import config from "./src/config/index.js"; 
import postRoutes from "./src/routes/post.routes.js";

const app = express();

// Environment-specific logging
if (config.nodeEnv === "development") {
  app.use(morgan("dev"));
} else if (config.nodeEnv === "production") {
  app.use(morgan("combined"));  
}

app.use(express.json());

// Routes
app.use("/posts", postRoutes);

app.get("/", (req, res) => {
  res.send("Name: Jana Cornejo, Section: IT4C, Program: Information Technology");
});

app.get("/hello/:name", (req, res) => {
  res.send(`Hello ${req.params.name}`);
});

app.get("/foo", (req, res) => {
  console.log(req.query);
  res.send("Check console for query params");
});

app.get("/IT", (req, res) => {
  console.log(req.body);
  res.send("Check console for body data");
});

app.listen(config.port, () => {
  console.log(
    `🚀 Server is running in ${config.nodeEnv} mode at http://localhost:${config.port}`
  );
});

import express from 'express';
import postRoutes from './src/routes/post.routes.js';
import config from "./src/config/index.js";
import { testConnection } from './src/config/db.js';
import { errorHandler } from './src/middlewares/errorHandler.middleware.js';

const app = express();
const port = 3000;

app.use(express.json());

// Mount the post routes
app.use('/posts', postRoutes);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    testConnection(); // Test the database connection on startup
});


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

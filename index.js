import express from 'express';
import postRoutes from './src/routes/post.routes.js';
import commentRoutes from './src/routes/comment.routes.js';
import userRoutes from './src/routes/user.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import config from './src/config/index.js';
import { testConnection } from './src/config/db.js';
import { errorHandler } from './src/middlewares/errorHandler.middleware.js';
import dotenv from 'dotenv';
dotenv.config(); 
const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/users', userRoutes);
app.use(errorHandler);


app.get('/', (req, res) => {
  res.send('Name: Jana Cornejo, Section: IT4C, Program: Information Technology');
});
app.get('/hello/:name', (req, res) => {
  res.send(`Hello ${req.params.name}`);
});
app.get('/foo', (req, res) => {
  console.log(req.query);
  res.send('Check console for query params');
});
app.get('/IT', (req, res) => {
  console.log(req.body);
  res.send('Check console for body data');
});


app.use(errorHandler);


app.listen(config.port, () => {
  console.log(`🚀 Server running in ${config.nodeEnv} mode at http://localhost:${config.port}`);
  testConnection();
});

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import workspaceRoutes from './routes/workspaceRoutes.js';
import boardRoutes from './routes/boardRoutes.js';
import columnRoutes from './routes/columnRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
// config setup (env variables configuration)
 dotenv.config();
 
 connectDB();

  const app = express ();
  const PORT = process.env.PORT|| 5000;

  //middlewares

  app.use(cors());
  app.use(express.json());
  

  app.use('/api/auth',authRoutes);
  app.use('/api/workspace',workspaceRoutes);
  app.use('/api/board', boardRoutes);
  app.use('/api/column', columnRoutes);
  app.use('/api/task', taskRoutes);

 app.get('/',(req,res)=>{
    res.send('DevFlow API Server running successfully');

 });
 app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
 })
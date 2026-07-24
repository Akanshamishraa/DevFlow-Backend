import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import workspaceRoutes from './routes/workspaceRoutes.js';
import boardRoutes from './routes/boardRoutes.js';
import columnRoutes from './routes/columnRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import documentRoutes from './routes/documentRoutes.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
 dotenv.config();
 
 connectDB();
  const app = express ();
  const httpServer = createServer(app);
  const io=new Server(httpServer,{
   cors:{
      origin:"*",
      methods:["GET","POST","PUT","DELETE"]
   }
  });
   // WebSocket Connection Event Listener
  io.on('connection', (socket) => {
      console.log(`WebSocket connected: ${socket.id}`);

      // A. Join workspace room
      socket.on('join_workspace', (workspaceId) => {
          socket.join(workspaceId);
          console.log(`Socket ${socket.id} joined Workspace Room: ${workspaceId}`);
      });

      // B. Listen for changes and broadcast to all OTHER members in same room
      socket.on('workspace_changed', (workspaceId) => {
          console.log(`Workspace ${workspaceId} changed. Broadcasting update...`);
          socket.to(workspaceId).emit('workspace_updated');
      });

      socket.on('disconnect', () => {
          console.log(`WebSocket disconnected: ${socket.id}`);
      });
  });
 
  const PORT = process.env.PORT|| 5000;

  //middlewares

  app.use(cors());
  app.use(express.json());
  

  app.use('/api/auth',authRoutes);
  app.use('/api/workspace',workspaceRoutes);
  app.use('/api/board', boardRoutes);
  app.use('/api/column', columnRoutes);
  app.use('/api/task', taskRoutes);
  app.use('/api/document', documentRoutes);

 app.get('/',(req,res)=>{
    res.send('DevFlow API Server running successfully');

 });
 httpServer.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
 })
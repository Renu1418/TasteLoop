import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js'
import foodRoutes from './routes/food.routes.js'

import cors from 'cors';


const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://tasteloop-frontend.onrender.com",
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));


// middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth',authRoutes);
app.use('/api/food',foodRoutes);



export default app;


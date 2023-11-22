import dotenv from 'dotenv';
import express from 'express';
import { verifyToken } from './src/middlewares/authMiddleware.js';
import User from './src/models/usertemp.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// allows us to parse json
app.use(express.json());

// Routes
app.use('/api', authRouter);
app.use('/api/users', userRouter);
app.use('/api/events', eventRouter);
app.use('/api/institutions', institutionRouter);
app.use('/api/eventInterests', eventInterestRouter);

app.get('/', (req, res) => res.json({ message: 'Hello API World!' }));

// testing if getting data from users table from connected db
const testFun = async () => {
  const user = await User.findById(1);
  console.log('User:', user);
};
testFun();

app.listen(port, () =>
  console.log(`API server ready on http://localhost:${port}`)
);

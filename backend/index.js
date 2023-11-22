import dotenv from 'dotenv';
import express from 'express';
<<<<<<< HEAD
import User from './src/models/usertemp.js'
import Events from './src/models/events.js';
import eventRouter from './src/routes/eventsRoutes.js';
=======
import { verifyToken } from './src/middlewares/authMiddleware.js';
import User from './src/models/usertemp.js';

dotenv.config();
>>>>>>> 5f4d4410afc4f01eef0d9d4cf1b7d371ef75532e

const app = express();
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// allows us to parse json
app.use(express.json());

<<<<<<< HEAD
app.use(eventRouter);
app.get('/', (req,res) => res.json({message : "Hello API World!"}));
=======
// Routes
app.use('/api', authRouter);
app.use('/api/users', userRouter);
app.use('/api/events', eventRouter);
app.use('/api/institutions', institutionRouter);
app.use('/api/eventInterests', eventInterestRouter);

app.get('/', (req, res) => res.json({ message: 'Hello API World!' }));
>>>>>>> 5f4d4410afc4f01eef0d9d4cf1b7d371ef75532e

// testing if getting data from users table from connected db
// const testFun = async () => {
//     const user = await User.findById(1);
//     console.log("User:", user);
// }
// testFun();
const testFun = async () => {
<<<<<<< HEAD
    const event = await Events.findById(1);
    console.log("Events:", event);
}
=======
  const user = await User.findById(1);
  console.log('User:', user);
};
>>>>>>> 5f4d4410afc4f01eef0d9d4cf1b7d371ef75532e
testFun();

app.listen(port, () =>
  console.log(`API server ready on http://localhost:${port}`)
);

import express from 'express';
import User from './src/models/usertemp.js'
import Events from './src/models/events.js';
import eventRouter from './src/routes/eventsRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

// allows us to parse json 
app.use(express.json());

app.use(eventRouter);
app.get('/', (req,res) => res.json({message : "Hello API World!"}));

// testing if getting data from users table from connected db
// const testFun = async () => {
//     const user = await User.findById(1);
//     console.log("User:", user);
// }
// testFun();
const testFun = async () => {
    const event = await Events.findById(1);
    console.log("Events:", event);
}
testFun();

app.listen(port, () => console.log(`API server ready on http://localhost:${port}`));

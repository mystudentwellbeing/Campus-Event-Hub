import express from 'express';
const app = express();
const port = 3000;

// allows us to parse json 
app.use(express.json());

app.get('/', (req,res) => res.json({message : "Hello API World!"}));

app.listen(port, () => console.log(`API server ready on http://localhost:${port}`));

// backend/app.js
import express from 'express';
import cors from 'cors';
import traductorenRouter from '../apis/traductoren.js';
import traductoresRouter from '../apis/traductores.js';


const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.use('/api', traductorenRouter);
app.use('/api', traductoresRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

export default app;

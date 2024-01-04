import express from 'express'
import cherio from 'cherio'
const app = express()

const PORT = 3001;
app.listen(PORT,()=>{
    console.log('server listening on port', PORT);
});
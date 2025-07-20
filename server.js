import express from 'express'
import connectToDb from './config/db.js';
import dotenv from 'dotenv';
import router from './routes/route.js';
import cors from 'cors'

dotenv.config();
const app = express();
connectToDb();
app.use(express.json());
app.use(cors());

app.use('/',router);

const PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
    console.log(`Server is running at PORT ${PORT}`)
})
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { pool, checkConnection } from './config/db.js';
import createAllTables from './utils/dbUtils.js';

dotenv.config();
const app = express();
app.use(cors());

const PORT = process.env.SERVER_PORT || 5000;
app.use(express.json());


app.get('/', (req, res) => {
    res.send({ status: 'success', message: 'Welcome to the SQL Database Server!' });
});



app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    try {
        await checkConnection();
        await createAllTables();
    }
    catch (error) {
        console.error('Failed to establish database connection on server start:', error);
    }
});
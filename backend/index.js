import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

app.use(cors());

// app.use('/api/名稱', 路徑)

const server = app.listen(process.env.PORT, '0.0.0.0', () =>
    console.log(`Server running on port http://localhost:${process.env.PORT}`),
);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log('Failed to connect to MongoDB');
        console.log(error.message);
    });
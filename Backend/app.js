require('dotenv').config();  // Load environment variables at the top

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const { readdirSync } = require('fs');
const app = express();

const PORT = process.env.PORT || 5000;  // Default to 5000 if PORT is not set

const db = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Db Connected');
    } catch (error) {
        console.error('DB Connection Error:', error.message);  // Log full error message
    }
};

module.exports = { db };

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)));

const server = () => {
    db();
    app.listen(PORT, () => {
        console.log('listening to port:', PORT);
    });
};

server();

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9900;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.json({ 
        message: 'Student Registration API is running!',
        status: 'OK'
    });
});

// Kiểm tra database connection
app.get('/api/dbcheck', async (req, res) => {
    try {
        const db = require('./config/db.config');
        const [rows] = await db.query('SELECT 1 as connection_test');
        res.json({ 
            status: 'success', 
            message: 'Database connected successfully',
            test: rows[0]
        });
    } catch (error) {
        res.status(500).json({ 
            status: 'error', 
            message: error.message 
        });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
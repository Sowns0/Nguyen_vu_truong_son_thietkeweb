const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const studentRoutes = require('./routes/student.routes');
app.use('/api/students', studentRoutes);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.json({ 
        message: 'Student Registration API is running!',
        status: 'OK'
    });
});

// Test Database
app.get('/api/dbcheck', async (req, res) => {
    try {
        const db = require('./config/db.config');
        const [rows] = await db.query('SELECT 1 as test');
        res.json({ status: 'success', message: 'Database connected', data: rows[0] });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// Enrollment Routes
const enrollmentRoutes = require('./routes/enrollment.routes');
app.use('/api/enrollments', enrollmentRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
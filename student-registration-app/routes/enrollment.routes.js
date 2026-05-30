const express = require('express');
const router = express.Router();
const Enrollment = require('../models/enrollment.model');

// Get all
router.get('/', async (req, res) => {
    try {
        const enrollments = await Enrollment.getAll();
        res.json(enrollments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create
router.post('/', async (req, res) => {
    try {
        await Enrollment.create(req.body);
        res.status(201).json({ message: 'Đăng ký môn học thành công!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update
router.put('/:sid/:mid/:acadYear', async (req, res) => {
    try {
        await Enrollment.update(req.params.sid, req.params.mid, req.params.acadYear, req.body);
        res.json({ message: 'Cập nhật thành công!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete
router.delete('/:sid/:mid/:acadYear', async (req, res) => {
    try {
        await Enrollment.delete(req.params.sid, req.params.mid, req.params.acadYear);
        res.json({ message: 'Xóa đăng ký thành công!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
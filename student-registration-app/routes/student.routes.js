const express = require('express');
const router = express.Router();
router.use(express.json());
const Student = require('../models/student.model');

// GET all
router.get('/', async (req, res) => {
    try {
        const students = await Student.getAll();
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET by ID
router.get('/:sid', async (req, res) => {
    try {
        const student = await Student.getById(req.params.sid);
        if (!student) return res.status(404).json({ message: 'Not found' });
        res.json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST create
router.post('/', async (req, res) => {
    try {
        console.log('Body:', req.body);
        await Student.create(req.body);
        res.status(201).json({ message: 'Student created' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }x
});

// PUT update
router.put('/:sid', async (req, res) => {
    try {
        await Student.update(req.params.sid, req.body);
        res.json({ message: 'Student updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE
router.delete('/:sid', async (req, res) => {
    try {
        await Student.delete(req.params.sid);
        res.json({ message: 'Student deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
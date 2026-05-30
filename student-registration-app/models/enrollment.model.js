const db = require('../config/db.config');

class Enrollment {
    // Get all enrollments
    static async getAll() {
        const [rows] = await db.query(`
            SELECT se.*, s.SNAME, m.MNAME 
            FROM STUDENT_ENROLEMENT se
            JOIN STUDENT s ON se.SID = s.SID
            JOIN MODULES m ON se.MID = m.MID
            ORDER BY se.ACAD_YEAR DESC
        `);
        return rows;
    }

    // Get by ID
    static async getById(sid, mid, acadYear) {
        const [rows] = await db.query(`
            SELECT * FROM STUDENT_ENROLEMENT 
            WHERE SID = ? AND MID = ? AND ACAD_YEAR = ?
        `, [sid, mid, acadYear]);
        return rows[0];
    }

    // Create new enrollment
    static async create(data) {
        const { SID, MID, ACAD_YEAR } = data;
        const [result] = await db.query(`
            INSERT INTO STUDENT_ENROLEMENT (SID, MID, ACAD_YEAR) 
            VALUES (?, ?, ?)
        `, [SID, MID, ACAD_YEAR]);
        return result;
    }

    // Update
    static async update(sid, mid, acadYear, data) {
        const { ACAD_YEAR: newAcadYear } = data;
        const [result] = await db.query(`
            UPDATE STUDENT_ENROLEMENT 
            SET ACAD_YEAR = ? 
            WHERE SID = ? AND MID = ? AND ACAD_YEAR = ?
        `, [newAcadYear, sid, mid, acadYear]);
        return result;
    }

    // Delete
    static async delete(sid, mid, acadYear) {
        const [result] = await db.query(`
            DELETE FROM STUDENT_ENROLEMENT 
            WHERE SID = ? AND MID = ? AND ACAD_YEAR = ?
        `, [sid, mid, acadYear]);
        return result;
    }
}

module.exports = Enrollment;
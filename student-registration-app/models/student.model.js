const db = require('../config/db.config');

const Student = {
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM STUDENT');
        return rows;
    },
    getById: async (sid) => {
        const [rows] = await db.query('SELECT * FROM STUDENT WHERE SID = ?', [sid]);
        return rows[0];
    },
    create: async (data) => {
        const { SID, SNAME, EMAIL, Tutor_Id } = data;
        const [result] = await db.query(
            'INSERT INTO STUDENT (SID, SNAME, EMAIL, Tutor_Id) VALUES (?, ?, ?, ?)',
            [SID, SNAME, EMAIL, Tutor_Id]
        );
        return result;
    },
    update: async (sid, data) => {
        const { SNAME, EMAIL, Tutor_Id } = data;
        const [result] = await db.query(
            'UPDATE STUDENT SET SNAME = ?, EMAIL = ?, Tutor_Id = ? WHERE SID = ?',
            [SNAME, EMAIL, Tutor_Id, sid]
        );
        return result;
    },
    delete: async (sid) => {
        const [result] = await db.query('DELETE FROM STUDENT WHERE SID = ?', [sid]);
        return result;
    }
};

module.exports = Student;
const db = require('../../DBconfig/dbConfig');

const loginRegistrationModel = {
    createUser: async (email, passwordHash) => {
        try {
            const [rows] = await db.execute('CALL sp_insert_user_profile(?, ?)',
                [email, passwordHash]);

            console.log(rows, "DB Response");
            if (rows.length === 0 || rows[0].error_message) {
                throw new Error(rows[0]?.error_message || 'Failed to create user.');
            }
            console.log(rows, "Full DB Response");
            return rows[0][0];

        } catch (error) {
            console.error('Error in createUser:', error.message);
            throw error;
        }
    },

    userLogin: async (email) => {
        try {
            const [resultSets] = await db.execute('CALL sp_user_login(?)', [email]);

            const rows = resultSets[0] || [];
            if (rows.length === 0) {
                throw new Error('User not found for the specified email.');
            }
            console.log(rows, "Full DB ResponseModel");
            return rows[0];
        } catch (err) {
            console.error('Error in userLogin model:', err.message);
            throw err;
        }
    },
};

module.exports = loginRegistrationModel;
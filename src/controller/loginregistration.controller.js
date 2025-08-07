const loginRegistrationModel = require('../model/loginregistration.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const loginRegistrationController = {
    createUser: async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Email and password are required',
                });
            }

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const result = await loginRegistrationModel.createUser(email, hashedPassword);
            return res.status(200).json({
                success: true,
                message: result.action
            });

        } catch (error) {
            console.error('Error in createUser:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                data: null
            });
        }
    },

    userLogin: async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Email and password are required',
                });
            }

            const user = await loginRegistrationModel.userLogin(email);
            
            if (!user || !user.user_id) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found.'
                });
            }

            bcrypt.compare(password, user.password_hash, (err, isMatch) => {
                if (err) {
                    console.error("Bcrypt Error:", err);
                    return res.status(500).json({
                        success: false,
                        message: 'Error validating credentials.'
                    });
                }

                if (!isMatch) {
                    return res.status(401).json({
                        success: false,
                        message: 'Invalid password'
                    });
                }

                const token = jwt.sign(
                    { 
                        userId: user.user_id,
                        email: user.email 
                    }, 
                    process.env.ACCESS_TOKEN_SECRET, 
                    { expiresIn: '1h' }
                );

                res.status(200).json({
                    success: true,
                    message: 'User login successful',
                    auth_token: token,
                    user: {
                        user_id: user.user_id,
                        email: user.email
                    }
                });
            });

        } catch (error) {
            console.error('Error in userLogin controller:', error.message);
            const status = error.message.includes('not found') ? 404 : 500;
            return res.status(status).json({
                success: false,
                message: error.message
            });
        }
    },
};

module.exports = loginRegistrationController;
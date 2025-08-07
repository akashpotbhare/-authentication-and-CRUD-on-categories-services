const bcrypt = require('bcrypt');
const db = require('./DBconfig/dbConfig');

async function setupAdminUser() {
    try {
        const email = 'admin@codesfortomorrow.com';
        const password = 'Admin123!@#';
        
        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        // Check if user already exists
        const [existingUsers] = await db.execute(
            'SELECT user_id FROM tbl_user_profiles WHERE email = ?',
            [email]
        );
        
        if (existingUsers.length > 0) {
            console.log('Admin user already exists. Updating password...');
            await db.execute(
                'UPDATE tbl_user_profiles SET password_hash = ? WHERE email = ?',
                [hashedPassword, email]
            );
        } else {
            console.log('Creating admin user...');
            await db.execute(
                'INSERT INTO tbl_user_profiles (email, password_hash) VALUES (?, ?)',
                [email, hashedPassword]
            );
        }
        
        console.log('Admin user setup completed successfully!');
        console.log('Email:', email);
        console.log('Password:', password);
        
        process.exit(0);
    } catch (error) {
        console.error('Error setting up admin user:', error);
        process.exit(1);
    }
}

setupAdminUser(); 
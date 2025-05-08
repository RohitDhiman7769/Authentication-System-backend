import db from '../config/database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const registerUserData = async (data, callback) => {
  const { username, userEmail, userPassword } = data;

  try {
    db.query('SELECT * FROM users WHERE user_email = ? OR user_name = ?',[userEmail, username],async (err, results) => {
        if (err) return callback(err);
// 
        if (results.length > 0) {
          return callback(null, { status:200, message: 'User already registered' });
        }

        const hashedPassword = await bcrypt.hash(userPassword, 10);
   
        const createdAt = new Date();

        db.query(
          'INSERT INTO users (user_name, user_email, password, created_at) VALUES (?, ?, ?, ?)',
          [username, userEmail, hashedPassword, createdAt],
          (err, result) => {
            if (err) return callback(err);
            callback(null, { status: 200, userId: result.insertId, message: 'User registered successfully'  });
          }
        );
      }
    );
  } catch (error) {
    callback(error);
  }
};



export const userLoginData = async (data, callback) => {
    const { username, userPassword } = data;
  
    try {
      db.query(
        'SELECT * FROM users WHERE user_email = ? OR user_name = ?',
        [username, username],
        async (err, results) => {
          if (err) return callback(err);
  
          if (results.length === 0) {
            return callback(null, { status: 401, message: 'User not found' });
          }
  
          const user = results[0];
  
          // Compare password
          const isMatch = await bcrypt.compare(userPassword,user.password);
          if (!isMatch) {
            return callback(null, { status: 401, message: 'Incorrect password' });
          }
  
          // Generate JWT token
          const token = jwt.sign(
            { id: user.id, email: user.user_email, name: user.user_name },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
          );
  
          callback(null, {
            status: 200,
            message: 'Login successful',
            token,
            user: {
              id: user.id,
              name: user.user_name,
              email: user.user_email,
              created_at: user.created_at,
            }
          });
        }
      );
    } catch (error) {
      callback(error);
    }
  };
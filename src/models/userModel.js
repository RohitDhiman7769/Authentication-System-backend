import db from '../config/database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

/**
 * 
 * @param {*} data get user sign up data and store into database
 * @param {*} callback sent error and result data into call back 
 */
export const registerUserData = async (data, callback) => {
    console.log('**************',data)
  const { username, userEmail, userPassword } = data;

  try {
    db.query('SELECT * FROM users WHERE user_email = ? OR user_name = ?',[userEmail, username],async (err, results) => {
        if (err) return callback(err);
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
            callback(null, { status: 200, userId: result.insertId, message: 'User registered successfully',redirectTo: '/login'  });
          }
        );
      }
    );
  } catch (error) {
    callback(error);
  }
};



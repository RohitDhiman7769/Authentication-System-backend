import { registerUserData } from '../models/userModel.js'
import db from '../config/database.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

/**
 * 
 * @param {*} req get user regster data 
 * @param {*} res send result as a response
 */
export const registerUser = (req, res) => {
  registerUserData(req.body, (err, users) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(users);
  });
};


/**
 * 
 * @param {*} req get user emial and password for login
 * @param {*} res send result 
 */
export const loginUser = (req, res) => {
  console.log(req.session)

  const { username, userPassword } = req.body;
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
        const isMatch = await bcrypt.compare(userPassword, user.password);
        if (!isMatch) {
          return callback(null, { status: 401, message: 'Incorrect password' });
        }

        // Generate JWT token
        const token = jwt.sign(
          { id: user.id, email: user.user_email, name: user.user_name },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );

        const userInfo = {
          id: user.id,
          name: user.user_name,
          email: user.user_email,
          token: token,
          created_at: user.created_at,
        }
        req.session.user = userInfo;

        console.log('999999999999999',req.session.user)

        return res.json({ success: true, redirectTo: '/profile' });
      }
    );
  } catch (error) {
    console.log(error)
  }


};

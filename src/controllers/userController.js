import {registerUserData, userLoginData} from '../models/userModel.js'

export const registerUser = (req, res) => {
    registerUserData(req.body,(err, users) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(users);
  });
};

export const loginUser = (req, res) => {
    userLoginData(req.body,(err, users) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(users);
  });
};
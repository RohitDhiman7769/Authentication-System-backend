import express from 'express'
const router = express.Router();
import { registerUser, loginUser } from '../controllers/userController.js';


// Render login page
router.get('/login', (req, res) => {
    console.log('1234567890',req.session.user)
    if (req.session.user) {
        res.redirect('/profile')
        return
    }
    res.render('login', { error: null });
});

// user login api
router.post('/log-in', loginUser);

// render sign up page 
router.get('/signup', (req, res) => {
    if (req.session.user) {
        res.redirect('/profile')
        return
    }
    res.render('signup', { error: null });
});

// user sign up api
router.post('/sign-up', registerUser);

// get user page and data from session
router.get('/profile', (req, res) => {
    if (!req.session.user) {
        res.redirect('/login')
    }
    res.render('profile', { user: req.session.user });
});

// logut api remove data from session and redirect on login page
router.get('/log-out', (req, res) => {
    req.session.destroy();
    return res.json({ success: true, redirectTo: '/login' });
});

export default router;
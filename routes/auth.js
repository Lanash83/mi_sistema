// routes/auth.js
const express = require('express');
const router = express.Router();

// Simula un "registro" y "autenticación" de usuarios
const users = {}; // Usar base de datos en producción

router.post('/register', (req, res) => {
    const { username, password, area } = req.body;
    users[username] = { password, area };
    res.redirect('/');
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (users[username] && users[username].password === password) {
        req.session.user = { username, area: users[username].area };
        res.redirect('/dashboard');
    } else {
        res.redirect('/');
    }
});

module.exports = router;

const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'..', '..', 'frontend', 'index.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname,'..', '..', 'frontend', 'template', 'login.html'));
});

router.get('/jeux', (req, res) => {
    res.sendFile(path.join(__dirname,'..', '..', 'frontend', 'template', 'jeux.html'));
});

module.exports = router;

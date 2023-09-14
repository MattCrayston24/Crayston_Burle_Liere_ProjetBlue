const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs');



router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'..', '..', 'frontend', 'index.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname,'..', '..', 'frontend', 'template', 'login.html'));
});

router.get('/jeux', (req, res) => {
    res.sendFile(path.join(__dirname,'..', '..', 'frontend', 'template', 'jeux.html'));
});

router.post('/storeData', (req, res) => {
    const player = req.body;
    req.session.player = player; 

    
    fs.writeFile('playerData.json', JSON.stringify(player), (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Une erreur s\'est produite lors de l\'écriture des données dans le fichier');
        } else {
            res.send('Données stockées avec succès');
        }
    });
});



module.exports = router;

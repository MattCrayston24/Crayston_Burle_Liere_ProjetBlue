const express = require('express');
const session = require('express-session');
const app = express();
const port = 3000;
const path = require('path');
const routes = require('./routes/routes.js');
const cors = require('cors');

app.use(express.json()); // Pour le parsing de JSON
app.use(session({
    secret: 'test',
    resave: false,
    saveUninitialized: true,
}));


app.use("/static",express.static(path.join(__dirname, './javascript')));

app.use('/', routes);

app.use(express.static(path.join(__dirname, '../frontend')));

app.use(cors(
    {
        origin: '*'
    }
));

app.listen(port, () => console.log(`Server listening on port ${port}`));

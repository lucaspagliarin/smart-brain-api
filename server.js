const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');
const users = require('./controllers/users.js');


const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'lucas.123',
        database: 'smart-brain'
    }
});


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => users.handleUsers(req, res, db))

app.post('/signin', (req, res) => signin.handleSignIn(req, res, db, bcrypt))

app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt))

app.get('/profile/:id', (req, res) => profile.handleProfile(req, res, db))

app.put('/image', (req, res) => image.handleImage(req, res, db))

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(5500);
'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const app = express()
const port = 3000

app.use(express.static('public'))
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
    secret: 'sxjbijxixszaixsax76x87a6sxbash',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

const addBugRoutes = require('./routes/bug.routes')
const addUserRoutes = require('./routes/user.routes')

addBugRoutes(app);
addUserRoutes(app);


app.listen(port, () => console.log(`Bugs Backend is listening on port ${port}!`))
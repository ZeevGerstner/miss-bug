'use strict'

const userService = require('../services/user.service')

function requireAuth (req, res, next) {
    const user = req.session.loggedinUser;
    if (!user || !user.isAdmin) return res.status(401).send("Something broke!");
    else next();
}

module.exports = (app) => {
    app.post('/login', (req, res) => {
        const { username, pass } = req.body;
        userService.checkUser(username, pass)
            .then(user => {
                req.session.loggedinUser = user;
                return res.json(user);
            })
            .catch(err => res.status(401).send(err))

    });
    app.post('/signup', (req, res) => {
        const user = req.body;
        userService.add(user)
            .then(addedUser => res.json(addedUser))
    });

    app.post('/logout', (req, res) => {
        req.session.destroy();
        res.end();
    });

    app.get("/user", requireAuth, (req, res) => {
        userService.query().then(users => res.json(users));
    });

    app.delete('/user/:userId', (req, res) => {
        const userId = req.params.userId;
        userService.remove(userId)
            .then(() => res.end())
    });


    app.get('/user/:userId', (req, res) => {
        const userId = req.params.userId;
        userService.getById(userId)
            .then(user => res.json(user))
    });
}
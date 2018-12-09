'use strict'


const bugService = require('../services/bug.service')

function requireAuth(req, res, next) {
    const user = req.session.loggedinUser
    if (!user) return res.status(401).send('Something broke!')
    else next()
}

module.exports = (app) => {
    app.get(`/bug`, (req, res) => {
        bugService.query(req.query).then(bugs => res.json(bugs)) 
    });

    app.get('/bug/:bugId', requireAuth, (req, res) => {
        const bugId = req.params.bugId;
        bugService.getById(bugId)
            .then(bug => res.json(bug))
    });

    app.delete('/bug/:bugId', requireAuth, (req, res) => {
        const {loggedinUser} = req.session
        const bugId = req.params.bugId;
        
        bugService.remove(bugId, loggedinUser)
            .then(() => res.end())
    });


    app.post('/bug', requireAuth, (req, res) => {
        const bug = req.body;
        const {loggedinUser} = req.session
        bug.creator = {name:loggedinUser.username, _id:loggedinUser.id};
        bugService.add(bug)
            .then(addedBug => res.json(addedBug))
    });

    app.put('/bug/:bugId', requireAuth, (req, res) => {
        const bug = req.body;
        const {loggedinUser} = req.session
        bugService.update(bug, loggedinUser)
            .then(updatedBug => res.json(updatedBug))
    });
}
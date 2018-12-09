'use strict'
const fs = require('fs')

module.exports = {
    query,
    getById,
    remove,
    add,
    update
}

var bugs = _createBugs();

function query (filter) {
    var filteredBugs = bugs.filter(bug => bug.title.includes(filter.q))
    return Promise.resolve(filteredBugs);
}

function add (bug) {
    bug.id = _makeId()
    bugs.push(bug)
    _saveBugsToFile();
    return Promise.resolve(bug)
}

function update (bug, user) {
    var bugIdx = bugs.findIndex(currBug => currBug.id === bug.id && (currBug.creator._id === user.id || user.isAdmin));
    if (bugIdx === -1) return Promise.reject('Not Found');
    bugs.splice(bugIdx, 1, bug);
    _saveBugsToFile();
    return Promise.resolve(bug)
}

function getById (id) {
    var bug = bugs.find(bug => bug.id === id);
    if (bug) return Promise.resolve(bug);
    else return Promise.reject('Unknown Bug');
}

function remove (id, user) {
    var bugIdx = bugs.findIndex(bug => bug.id === id && (bug.creator._id === user.id || user.isAdmin));
    if (bugIdx === -1) return Promise.reject('Not Found');
    bugs.splice(bugIdx, 1)
    _saveBugsToFile();
    return Promise.resolve();
}

function _makeId (length = 3) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _createBugs () {
    var bugs = require('../data/bug.json')
    return bugs;
}

function _createBug (title) {
    return {
        id: _makeId(),
        title,
        description: 'problem when clicking Save',
        severity: 3,
        creator: {}
    }
}

function _saveBugsToFile () {
    fs.writeFileSync('data/bug.json', JSON.stringify(bugs, null, 2));
}

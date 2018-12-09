'use strict'

const fs = require('fs')

module.exports = {
  checkUser,
  add,
  query,
  remove,
  getById
};

var users = _createUsers();

function query() {
  return Promise.resolve(users);
}

function add(user) {
    user.id = _makeId()
    user.isAdmin = false
    users.push(user)
    _saveUsersToFile();
    return Promise.resolve(user)
}

function checkUser(username, pass) {
    var user = users.find(user => {
        return user.username === username && user.pass === pass;
    })
    return user ? Promise.resolve(user) : Promise.reject('Invalid user/password');
}


function remove(id) {
    var userIdx = users.findIndex(user => user.id === id);
    if (userIdx === -1) return Promise.reject('Not Found');
    users.splice(userIdx, 1)
    _saveUsersToFile();
    return Promise.resolve();
}

function getById(id) {
  var user = users.find(user => user.id === id);
  if (user) return Promise.resolve(user);
  else return Promise.reject("Unknown User");
}

function _createUsers() {
    var users = require('../data/user.json')
    return users;
}

function _saveUsersToFile() {
    fs.writeFileSync('data/user.json', JSON.stringify(users, null, 2));
}


function _makeId(length = 3) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}
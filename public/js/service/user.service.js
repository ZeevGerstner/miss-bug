'use strict'

export default {
  checkUser,
  add,
  logout,
  getLoggedinUser,
  query,
  getById,
  remove
};

function checkUser(username, pass) {
    return axios.post('/login', { username, pass })
        .then(res => {
            sessionStorage.loggedinUser = JSON.stringify(res.data)
            return res.data;
        })
}
function getLoggedinUser() {
    if (!sessionStorage.loggedinUser) return null;
    return JSON.parse(sessionStorage.loggedinUser);
}

function logout() {
    return axios.post('/logout')
        .then(()=>{
            sessionStorage.removeItem('loggedinUser');
        })
}


function add(user) {
    return axios.post('/signup', user)
        .then(res => res.data)
}


function query() {
  return axios.get("/user").then(res => res.data);
}

function getById(id) {
  return axios.get(`/user/${id}`).then(res => res.data);
}


function remove(userId) {
    return axios.delete(`/user/${userId}`);
}
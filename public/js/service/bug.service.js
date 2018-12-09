'use strict'

export default {
    query,
    getById,
    remove,
    add,
    update
}

function query(filter=null) {
    if(!filter) {
        filter = {
            byTitle:''
        }
    };
    return axios.get(`/bug?q=${filter.byTitle}&offset=30&limit=10`)
        .then(res => res.data)
}

function getById(id) {
    return axios.get(`/bug/${id}`)
        .then(res => res.data)
}

function remove(id) {
    return axios.delete(`/bug/${id}`)
}

function add(bug) {
    return axios.post('/bug', bug)
        .then(res => res.data)
}

function update(bug) {
    return axios.put(`/bug/${bug.id}`, bug)
        .then(res => res.data)
}




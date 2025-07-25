import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    const nonExisting = {
        id: 10000,
        name: 'This note is not saved to server',
        important: true,
    }
    console.log("getallReq", request);
    console.log("getAllRes", request.then(response => response.data.concat(nonExisting)));
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (updateObject) => {
    console.log("id", updateObject.id);
    console.log("event", updateObject);
    const request = axios.put(`${baseUrl}/${updateObject.id}`, updateObject)
    return request.then(response => response.data)
}


export default {
    getAll,
    create,
    deletePerson,
    update
}
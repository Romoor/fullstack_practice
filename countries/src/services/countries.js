import axios from 'axios'

const getAll = () => {
    const request = axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    const nonExisting = {
        id: 10000,
        content: 'This country is not saved to server',
        important: true,
    }
    return request.then(response => response.data)
}

export default { getAll }
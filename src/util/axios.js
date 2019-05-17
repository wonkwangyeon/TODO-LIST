import axios from 'axios'

const request = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 2000
})

export default request
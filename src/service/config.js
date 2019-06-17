import axios from 'axios'

export const httpUsers = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
})

export const httpReservation = axios.create({
    baseURL: 'https://my-json-server.typicode.com/alunardi/agenda-consulta/reservation'
})

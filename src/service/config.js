import axios from 'axios'

export const httpUsers = axios.create({
  baseURL: process.env.API_USER
})

export const httpReservation = axios.create({
  baseURL: process.env.API_RESERVATION
})

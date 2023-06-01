import axios from 'axios'

export const api = axios.create({
  // while testing, change localhost to your backend IP
  baseURL: 'http://localhost:3333',
})

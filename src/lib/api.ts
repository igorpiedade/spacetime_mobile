import axios from 'axios'

export const api = axios.create({
  // while testing, change localhost to your backend IP
  baseURL: 'http://192.168.1.100:3333',
})

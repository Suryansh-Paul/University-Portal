import axios from 'axios'

// Base URL for your Spring Boot backend.
// Change this to match your backend server address and port.
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // ← update if your Spring Boot port differs
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api

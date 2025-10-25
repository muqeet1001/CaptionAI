import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'https://captionai-6wq0.onrender.com'

export const api = axios.create({
  baseURL: `${API_URL}`,
  withCredentials: true,
})

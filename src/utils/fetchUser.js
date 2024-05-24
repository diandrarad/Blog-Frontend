import axios from 'axios'
import config from '../config'

export const fetchUser = async () => {
  const token = localStorage.getItem('token')
  if (!token) return null

  try {
    const { data } = await axios.get(`${config.API_BASE_URL}/users/profile`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    return data
  } catch (error) {
    console.error('Error fetching user:', error)
    return null
  }
}
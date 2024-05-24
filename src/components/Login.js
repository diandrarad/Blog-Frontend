import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import config from '../config'

const Login = () => {
  const navigate = useNavigate()
  // const [error, setError] = useState("")
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${config.API_BASE_URL}/users/login`,{ email, password }, {
        headers: {
        'Content-Type': 'application/json'
        }
      })
      localStorage.setItem('token', response.data.token)
      navigate("/")
    } catch (error) {
      // setError('Invalid email or password')
    }
  };

  return (
    <div className="container mx-auto p-8 text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 rounded bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 rounded bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-500 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
};

export default Login
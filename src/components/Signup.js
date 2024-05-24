import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import config from '../config'

const Signup = () => {
  const navigate = useNavigate()
  // const [error, setError] = useState("")
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSignup = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      // setError('Passwords do not match')
      return
    }
    try {
      const response = await axios.post(`${config.API_BASE_URL}/users/register`, { username, email, password }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
        }
      })
      localStorage.setItem('token', response.data.token)
      navigate("/login")
    } catch (error) {
      // setError('Error creating account')
    }
  };

  return (
    <div className="container mx-auto p-8 text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6">Signup</h1>
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full p-2 rounded bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 rounded bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 rounded bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="w-full p-2 rounded bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-500 transition duration-300"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  )
};

export default Signup
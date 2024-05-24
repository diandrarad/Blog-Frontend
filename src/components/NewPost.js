import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import config from '../config'

const NewPost = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState(null)
  const history = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(
        `${config.API_BASE_URL}/posts`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      history('/')
    } catch (err) {
      setError(err.response || 'Something went wrong. Please try again.')
    }
  }

  return (
    <div className="container mx-auto p-8 text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Create New Post</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-3">
            <label htmlFor="title" className="block text-lg font-medium mb-2">Title</label>
            <input
              type="text"
              id="title"
              className="w-full p-3 rounded bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="block text-lg font-medium mb-2">Content</label>
            <textarea
              id="content"
              className="w-full p-3 rounded bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="10"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white rounded hover:bg-blue-500 transition duration-300"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  )
}

export default NewPost

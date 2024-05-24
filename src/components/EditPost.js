import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import config from '../config'

const EditPost = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState({ title: '', content: '' })
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`${config.API_BASE_URL}/posts/${id}`)
        setPost({ title: data.title, content: data.content })
      } catch (error) {
        setError('Error fetching post')
      }
    }
    fetchPost()
  }, [id])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setPost({ ...post, [name]: value })
  }

  const handleUpdatePost = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`${config.API_BASE_URL}/posts/${id}`, post, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
        }
      })
      navigate(`/posts/${id}`)
    } catch (error) {
      setError('Error updating post')
    }
  }

  return (
    <div className="container mx-auto p-8 text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg mx-auto">
        <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleUpdatePost} className="space-y-4">
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleInputChange}
            placeholder="Title"
            className="w-full p-2 rounded bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            name="content"
            value={post.content}
            onChange={handleInputChange}
            placeholder="Content"
            rows="10"
            className="w-full p-2 rounded bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-500 transition duration-300"
          >
            Update Post
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditPost
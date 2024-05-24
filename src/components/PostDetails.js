import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import config from '../config'

const PostDetails = () => {
  const { id } = useParams()
  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await axios.get(`${config.API_BASE_URL}/posts/${id}`, {
        headers: {
        'Content-Type': 'application/json'
        }
      })
      setPost(data)
    }

    const fetchComments = async () => {
      const { data } = await axios.get(`${config.API_BASE_URL}/comments/post/${id}`, {
        headers: {
        'Content-Type': 'application/json'
        }
      })
      setComments(data)
    }

    fetchPost()
    fetchComments()
  }, [id])

  const submitComment = async (e) => {
    e.preventDefault()
    await axios.post(`${config.API_BASE_URL}/comments/post/${id}`, { content: comment, user: 'Anonymous' }, {
      headers: {
      'Content-Type': 'application/json'
      }
    })
    setComment('')
    const { data } = await axios.get(`${config.API_BASE_URL}/comments/post/${id}`, {
      headers: {
      'Content-Type': 'application/json'
      }
    })
    setComments(data)
  }

  return (
    <div className="container mx-auto p-8 text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="mb-8">{post.content}</p>
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>
        <div className="space-y-4 mb-8">
          {comments.map(comment => (
            <div key={comment._id} className="bg-gray-700 p-4 rounded-lg">
              <p className="text-lg">{comment.content}</p>
              <p className="text-sm text-gray-400">- {comment.user}</p>
            </div>
          ))}
        </div>
        {localStorage.getItem('token') ? (
          <form onSubmit={submitComment} className="space-y-4">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment"
              className="w-full p-2 rounded bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-500 transition duration-300"
            >
              Submit
            </button>
          </form>
        ) : (
          <Link to="/login">
            <button className="w-full p-2 rounded bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300">
              Log in to comment
            </button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default PostDetails
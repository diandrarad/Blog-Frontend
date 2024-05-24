import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { fetchUser } from '../utils/fetchUser'
import config from '../config'

const PostList = () => {
  // const token = localStorage.getItem('token')
  const [posts, setPosts] = useState([])
  const [isAuthor, setIsAuthor] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const user = await fetchUser()
      if (user && user.role === 'author') {
        setIsAuthor(true)
        const { data } = await axios.get(`${config.API_BASE_URL}/posts/all`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
          }
        })
        setPosts(data)
      } else {
        const { data } = await axios.get(`${config.API_BASE_URL}/posts/`, {
          headers: {
          'Content-Type': 'application/json'
          }
        })
        setPosts(data)
      }
    }
    fetchData()
  }, [])

  const togglePublish = async (postId) => {
    try {
      const { data } = await axios.put(`${config.API_BASE_URL}/posts/${postId}/publish`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setPosts(posts.map(post => (post._id === postId ? data : post)))
    } catch (error) {
      console.error('Error toggling publish status:', error)
    }
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Posts</h1>
      {posts.length > 0 ? (
        isAuthor && localStorage.getItem('token') ? (
          <table className="min-w-full bg-gray-800 text-white">
            <thead>
              <tr>
                <th className="py-2 px-4">Title</th>
                <th className="py-2 px-4">Author</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id} className="hover:bg-gray-700">
                  <td className="py-2 px-4">{post.title}</td>
                  <td className="py-2 px-4">{post.author.username}</td>
                  <td className="py-2 px-4">{post.published ? 'Published' : 'Unpublished'}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => togglePublish(post._id)}
                      className="py-1 px-3 bg-blue-600 text-white rounded hover:bg-blue-500 transition duration-300"
                    >
                      {post.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <Link
                      to={`/posts/${post._id}/edit`}
                      className="ml-2 py-1 px-3 bg-green-600 text-white rounded hover:bg-green-500 transition duration-300"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-gray-800 rounded-lg shadow-lg p-6 hover:bg-gray-700 transition duration-300"
              >
                <h2 className="text-2xl font-semibold mb-4">{post.title}</h2>
                <p className="mb-4">{post.content}</p>
                <Link
                  to={`/posts/${post._id}`}
                  className="inline-block mt-4 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-500 transition duration-300"
                >
                  Read More
                </Link>
              </div>
            ))}
          </div>
        )
      ) : (
        <p className="text-center text-gray-400">Loading...</p>
      )}
    </div>
  )
}

export default PostList
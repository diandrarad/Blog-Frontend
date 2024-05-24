import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import PostList from './components/PostList'
import PostDetails from './components/PostDetails'
import Login from './components/Login'
import Signup from './components/Signup'
import Profile from './components/Profile'
import EditPost from './components/EditPost'

const App = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<PostList />} exact />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/posts/:id/edit" element={<EditPost />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
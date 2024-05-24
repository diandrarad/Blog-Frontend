import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"

const Navbar = () => {
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate("/")
  }

  return (
    <nav className="bg-gray-900 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white">
          MyBlog
        </Link>
        <div className="relative">
          {localStorage.getItem('token') ? (
            <>
              <button
                onClick={toggleDropdown}
                className="py-2 px-4 bg-gray-800 text-white rounded hover:bg-gray-700 transition duration-300"
              >
                Profile
              </button>
              {isDropdownOpen && (
                <div onClick={toggleDropdown} className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 text-gray-800">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">Profile</Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="space-x-4">
              <Link to="/login" className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-500 transition duration-300">
                Login
              </Link>
              <Link to="/signup" className="py-2 px-4 bg-green-600 text-white rounded hover:bg-green-500 transition duration-300">
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
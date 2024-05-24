import React, { useEffect, useState } from 'react'
import { fetchUser } from '../utils/fetchUser'

const Profile = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUser()
      setUser(data)
    }
    fetchData()
  }, [])

  return (
    <div className="m-auto text-white flex items-center justify-center">
      <div className="bg-gray-900 rounded-lg shadow-lg max-w-md w-full mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Profile</h1>
        {user ? (
          <div>
            <div className="text-center">
              <h2 className="text-2xl font-semibold">{user.username}</h2>
              <p className="text-gray-400">{user.email}</p>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4">
              <div className="p-4 bg-gray-800 rounded-lg shadow-inner">
                <h3 className="text-xl font-bold mb-2">Role</h3>
                <p className="text-gray-300">{user.role}</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-400">Loading...</p>
        )}
      </div>
    </div>
  )
}

export default Profile
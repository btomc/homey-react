import { useState } from 'react'
import { getAuth } from 'firebase/auth'
import { useNavigate, Link } from 'react-router-dom'

const Profile = () => {
  const auth = getAuth()
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })

  const { name, email } = formData

  const navigate = useNavigate()

  const onLogout = () => {
    auth.signOut()
    navigate(0)
  }

  return (
    <div>
      <header>
        <p>My Profile</p>
        <button type='button' onClick={onLogout}>
          Logout
        </button>
      </header>
    </div>
  )
}

export default Profile

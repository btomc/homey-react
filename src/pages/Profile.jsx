import { useState } from 'react'
import { getAuth, updateProfile } from 'firebase/auth'
// import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import Input from '../components/Input'
import Button from '../components/Button'
import Heading from '../components/Heading'

const Profile = () => {
  const auth = getAuth()
  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })

  const { name, email } = formData

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // Update display name in firebase
        await updateProfile(auth.currentUser, {
          displayName: name,
        })
        // Update in firestore
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          name,
        })
      }
    } catch (error) {
      toast.error('Could not update profile details')
    }
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  // console.log(auth.currentUser)

  return (
    <div className='min-h-[600px] py-5 px-10'>
      <div className='flex items-center'>
        <Heading>My Profile</Heading>
      </div>

      <div className='w-full md:w-[50%] '>
        <div className='flex justify-between items-center py-4'>
          <p className='text-lg font-medium'>Personal Details</p>
          <Button
            onClick={() => {
              changeDetails && onSubmit()
              setChangeDetails((prevState) => !prevState)
            }}
          >
            {changeDetails ? 'Done' : 'Change'}
          </Button>
        </div>

        {/* User info */}
        <div>
          <form>
            <div className='mb-3'>
              <Input
                type='text'
                id='name'
                className={!changeDetails ? 'profileName' : 'profileNameActive'}
                disabled={!changeDetails}
                value={name}
                onChange={onChange}
              />
            </div>
            <Input
              type='text'
              id='email'
              className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
              disabled={!changeDetails}
              value={email}
              onChange={() => {}}
            />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile

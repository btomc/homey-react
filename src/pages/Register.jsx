import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { db } from '../firebase.config'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import VisibilityIcon from '../assets/visibilityIcon.svg'
import Input from '../component/Input'
import Button from '../component/Button'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import OAuth from '../component/OAuth'

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const { email, password, name } = formData

  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      const user = userCredential.user

      updateProfile(auth.currentUser, {
        displayName: name,
      })

      const formDataCopy = { ...formData }
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      navigate('/')
    } catch (error) {
      toast.error('Something went wrong. Try again')
    }
  }

  return (
    <div className='justify-center flex flex-col items-center outline-none focus:outline-none bg-[#293843]/80 z-20'>
      <div className='mt-6 w-full sm:w-[500px] md:w-[60%] min-h-[600px] flex flex-col gap-y-4 items-center z-40 text-black bg-light-100/90 rounded mb-6'>
        <h2 className='text-3xl font-semibold mt-8 pt-4'>Welcome to Homey!</h2>
        <p className='text-base text-black/50'>Create an account</p>
        <form onSubmit={onSubmit} className='px-10 pb-8 pt-4 w-full'>
          <div className='my-4 w-full'>
            <label className='text-lg'>Name</label>
            <Input
              type='text'
              id='name'
              required
              placeholder='Enter your name'
              value={name}
              onChange={onChange}
            />
          </div>
          <div className='my-4 w-full'>
            <label className='text-lg'>Email Address</label>
            <Input
              type='email'
              id='email'
              required
              placeholder='Enter your email'
              value={email}
              onChange={onChange}
            />
          </div>
          <div className='mt-4 mb-8'>
            <label className='text-lg'>Password</label>
            <div className='relative'>
              <Input
                type={showPassword ? 'text' : 'password'}
                id='password'
                required
                value={password}
                placeholder='Enter your password'
                onChange={onChange}
              />
              <img
                onClick={() => setShowPassword((prevState) => !prevState)}
                className='absolute cursor-pointer top-[-4%] right-[1%] p-4 text-black z-50'
                src={VisibilityIcon}
                alt='show password'
              />
            </div>
          </div>

          <Button big full>
            Register
          </Button>

          <div className='mt-6'>
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-gray-300' />
              </div>

              <div className='relative flex justify-center text-sm'>
                <span className='bg-light-200 px-4 text-gray-500 text-base'>
                  Or
                </span>
              </div>
            </div>

            {/* Register with Google */}
            <OAuth />

            <div className='flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500'>
              <p>Already have an account?</p>
              <Link to='/sign-in' className='underline cursor-pointer'>
                Log in
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register

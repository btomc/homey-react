import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import VisibilityIcon from '../assets/visibilityIcon.svg'
import Input from '../components/Input'
import Button from '../components/Button'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import OAuth from '../components/OAuth'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData

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

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      if (userCredential.user) {
        navigate('/')
      }
    } catch (error) {
      toast.error('Wrong User Credentials')
    }
  }

  return (
    <div className='justify-center flex flex-col items-center outline-none focus:outline-none bg-[#293843]/80 z-20 py-4'>
      <div className='mt-6 w-full sm:w-[500px] md:w-[60%] min-h-[600px] flex flex-col gap-y-4 items-center z-40 text-black bg-light-100/90 rounded mb-6'>
        <h2 className='text-3xl font-semibold mt-8 pt-4'>Welcome back!</h2>
        <p className='text-base text-black/50'>Login to your account</p>
        <form onSubmit={onSubmit} className='px-10 pb-8 pt-4 w-full'>
          <div className='my-4 w-full'>
            <label className='text-lg'>Email Address</label>
            <Input
              type='email'
              id='email'
              placeholder='Enter your email'
              required
              value={email}
              onChange={onChange}
            />
          </div>
          <div className='mt-4 mb-3'>
            <label className='text-lg'>Password</label>
            <div className='relative'>
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                required
                id='password'
                placeholder='Enter your email'
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
          <div className='w-full flex justify-end mb-6'>
            <Link
              to='/forgot-password'
              className='text-primary-300 text-base font-semibold'
            >
              Forgot Password
            </Link>
          </div>
          <Button big full>
            Login
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

            {/* Login with Google */}
            <OAuth />

            <div className='flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500'>
              <p>New to Homey?</p>
              <Link to='/sign-up' className='underline cursor-pointer'>
                Create an account
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login

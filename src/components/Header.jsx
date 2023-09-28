import { useState } from 'react'
import { getAuth } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import { BiSolidHomeSmile } from 'react-icons/bi'
import { HiUserCircle } from 'react-icons/hi2'
import { MdOutlineAddHome } from 'react-icons/md'
import { FiLogOut } from 'react-icons/fi'
import userPhoto from '../assets/placeholder.jpg'
import { useAuthStatus } from '../hooks/useAuthStatus'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { loggedIn, checkingStatus } = useAuthStatus()
  // const [user, setUser] = useState()

  const auth = getAuth()

  const navigate = useNavigate()

  const onLogout = () => {
    auth.signOut()
    navigate(0)
  }

  const toggleOpen = () => {
    setIsOpen((value) => !value)
  }

  return (
    <header className='w-full py-3 px-10 bg-dark-500 flex justify-between items-center border-b-2 border-solid border-slate-700'>
      <Link to='/' className='text-light-100 flex items-center'>
        <BiSolidHomeSmile className='text-primary-100' size={38} />
        <span className='text-2xl ml-1'>Homey</span>
      </Link>

      <nav className='text-light-100 flex gap-6 text-lg items-center z-50'>
        <Link
          to='/category/rent'
          className='ml-4 border-b-2 border-transparent hover:border-b-2 hover:border-primary-100 hover:border-solid hover:ease-out'
        >
          Rent
        </Link>
        <Link
          to='/category/sale'
          className='ml-4 border-b-2 border-transparent hover:border-b-2 hover:border-primary-100 hover:border-solid hover:ease-out'
        >
          Sell
        </Link>
        <Link
          to='/offers'
          className='ml-4 border-b-2 border-transparent hover:border-b-2 hover:border-primary-100 hover:border-solid hover:ease-out'
        >
          Offers
        </Link>
        {loggedIn || checkingStatus ? (
          <div className='relative z-50'>
            <div
              onClick={toggleOpen}
              className='h-[2.5rem] w-[2.5rem] rounded-full'
            >
              <img
                src={userPhoto}
                alt='user'
                className='rounded-full cursor-pointer'
              />
            </div>
            {/* <p className='cursor-pointer'>{user.displayName}</p> */}
            {isOpen && (
              <div className='absolute top-[50px] right-0 bg-dark-400 rounded-md py-4 px-5 w-[200px] overflow-hidden'>
                {/* <h3 className='text-center mb-4'>{user.displayName}</h3> */}
                <div
                  className='flex flex-col items-center justify-center
                '
                >
                  <Link
                    to='/my-listings'
                    className='flex items-center justify-start py-2 hover:text-primary-300'
                  >
                    <MdOutlineAddHome
                      size={28}
                      className='max-w-[20px] mr-2 transition duration-500 mb-[2px]'
                    />
                    <span className='max-w-[100px] mr-2 transition duration-500'>
                      Listings
                    </span>
                  </Link>
                  <Link
                    to='/profile'
                    className='flex items-center justify-center py-2 hover:text-primary-300'
                  >
                    <HiUserCircle
                      size={28}
                      className='max-w-[20px] mr-2 transition duration-500'
                    />
                    <span className='max-w-[100px] mr-2 transition duration-500'>
                      Profile
                    </span>
                  </Link>
                  <button
                    onClick={onLogout}
                    className='flex items-center justify-center py-2 hover:text-primary-300 w-full transition duration-500'
                  >
                    <FiLogOut className='max-w-[20px] mr-2' />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link
            to='/sign-in'
            className='ml-4 px-4 py-1.5 rounded border-2 border-transparent bg-primary-100 transition duration-200 ease-out hover:border-primary-100 hover:bg-transparent hover:ease-out'
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  )
}

export default Header

import { useRef, useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import { BiSolidHomeSmile } from 'react-icons/bi'
import { HiUserCircle } from 'react-icons/hi2'
import { HiPlus, HiMenuAlt2 } from 'react-icons/hi'
import { MdOutlineAddHome } from 'react-icons/md'
import { FiLogOut } from 'react-icons/fi'
import userPhoto from '../assets/placeholder.jpg'
import { useAuthStatus } from '../hooks/useAuthStatus'
import DropdownMenu from './DropdownMenu'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)
  const { loggedIn, checkingStatus } = useAuthStatus()

  const auth = getAuth()

  const navigate = useNavigate()
  // let menuRef = useRef()

  const onLogout = () => {
    auth.signOut()
    navigate(0)
  }

  const toggleOpen = () => {
    setIsOpen((isOpen) => !isOpen)
  }

  const toggleOpenMenu = () => {
    setOpenMenu((openMenu) => !openMenu)
  }

  // useEffect(() => {
  //   let handler = (e) => {
  //     if (!menuRef.current.contains(e.target)) {
  //       setIsOpen(false)
  //       // setOpenMenu(false)
  //     }
  //   }

  //   document.addEventListener('mousedown', handler)

  //   return () => {
  //     document.removeEventListener('mousedown', handler)
  //   }
  // }, [menuRef])

  return (
    <header className='w-full py-3 px-10 bg-dark-500 flex justify-between items-center border-b-2 border-solid border-slate-700'>
      {/* Logo */}
      <Link to='/' className='hidden text-light-100 sm:flex items-center'>
        <BiSolidHomeSmile className='text-primary-300' size={38} />
        <span className='text-2xl ml-1'>Homey</span>
      </Link>

      <nav className='text-light-100 flex justify-between w-full sm:justify-end gap-5 text-lg items-center z-50'>
        <div className='relative'>
          {/* Mobile Menu */}
          <div
            onClick={toggleOpenMenu}
            className='flex justify-center items-center sm:hidden cursor-pointer hover:bg-light-50/30 p-2 rounded-full'
          >
            <HiMenuAlt2 size={30} />
          </div>
          {openMenu && (
            <div className='sm:hidden absolute top-[50px] -left-10 xs:left-0 bg-dark-400  rounded-md py-4 px-8 overflow-hidden'>
              <div
                className='flex flex-col items-center min-w-[250px] xs:w-[300px] space-y-3 py-4 
                '
              >
                <Link
                  to='/'
                  className='flex items-center py-2 hover:text-primary-300'
                >
                  <span className='max-w-[100px] mr-2 transition duration-500'>
                    Home
                  </span>
                </Link>
                <Link
                  to='/category/rent'
                  className='flex items-center py-2 hover:text-primary-300'
                >
                  <span className='max-w-[100px] mr-2 transition duration-500'>
                    Rent
                  </span>
                </Link>
                <Link
                  to='/category/sale'
                  className='flex items-center py-2 hover:text-primary-300'
                >
                  <span className='max-w-[100px] mr-2 transition duration-500'>
                    Sale
                  </span>
                </Link>
                <Link
                  to='/offers'
                  className='flex items-center py-2 hover:text-primary-300'
                >
                  <span className='max-w-[100px] mr-2 transition duration-500'>
                    Offers
                  </span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Desktop Menu */}
        <div className='hidden sm:flex sm:gap-6'>
          <Link
            to='/'
            className='sm:hidden ml-4 border-b-2 border-transparent hover:border-b-2 hover:border-primary-100 hover:border-solid hover:ease-out'
          >
            Home
          </Link>
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
            Sale
          </Link>
          <Link
            to='/offers'
            className='mx-4 border-b-2 border-transparent hover:border-b-2 hover:border-primary-100 hover:border-solid hover:ease-out'
          >
            Offers
          </Link>
        </div>

        {/* Logged user menu */}
        {loggedIn || checkingStatus ? (
          <div className='relative z-50'>
            <div className='flex'>
              <Link
                to='/create-listing'
                className='flex items-center justify-center mr-3 rounded-full bg-primary-400 h-[2.5rem] w-[2.5rem] cursor-pointer'
              >
                <HiPlus size={26} className='text-white' />
              </Link>
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
            </div>
            {/* <p className='cursor-pointer'>{user.displayName}</p> */}
            {isOpen && (
              <DropdownMenu active>
                {/* <h3 className='text-center mb-4'>{user.displayName}</h3> */}
                <div
                  className='flex flex-col 
                '
                >
                  <Link
                    to='/my-listings'
                    className='flex items-center py-2 hover:text-primary-300'
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
                    className='flex items-center  py-2 hover:text-primary-300'
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
                    className='flex items-center  py-2 hover:text-primary-300 w-full transition duration-500'
                  >
                    <FiLogOut className='max-w-[20px] mr-2' />
                    <span>Logout</span>
                  </button>
                </div>
              </DropdownMenu>
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

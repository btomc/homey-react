import React from 'react'
import { Link } from 'react-router-dom'
import { BiSolidHomeSmile } from 'react-icons/bi'

const Header = () => {
  return (
    <header className='fixed top-0 left-0 w-full py-5 px-10 bg-dark-200 flex justify-between items-center backdrop-blur border-b-2 border-solid border-light-500 z-50'>
      <Link to='/' className='text-light-100 flex items-center'>
        <BiSolidHomeSmile className='text-primary-100' size={38} />
        <span className='text-2xl ml-1'>Homey</span>
      </Link>

      <nav className='text-light-100 flex gap-6 text-lg items-center'>
        <Link className='ml-4 border-b-2 border-transparent hover:border-b-2 hover:border-primary-100 hover:border-solid hover:ease-out'>
          Rent
        </Link>
        <Link className='ml-4 border-b-2 border-transparent hover:border-b-2 hover:border-primary-100 hover:border-solid hover:ease-out'>
          Sell
        </Link>
        <Link className='ml-4 border-b-2 border-transparent hover:border-b-2 hover:border-primary-100 hover:border-solid hover:ease-out'>
          Offers
        </Link>
        <Link className='ml-4 border-b-2 border-transparent hover:border-b-2 hover:border-primary-100 hover:border-solid hover:ease-out'>
          Login
        </Link>
      </nav>
    </header>
  )
}

export default Header

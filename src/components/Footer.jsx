import { FaFacebook, FaInstagram } from 'react-icons/fa'
import { GrPinterest, GrLinkedinOption } from 'react-icons/gr'

const Footer = () => {
  return (
    <div className='bg-dark-400 px-10'>
      <div className=' flex flex-col lg:flex-row items-center justify-between'>
        {/* Social Media */}
        <div className='flex pt-6 pb-4 px-0 text-2xl'>
          <a
            className='bg-light-50 p-2 rounded-full text-dark-400 no-underline  transition duration-200 ease-out hover:text-dark-300 hover:ease-out'
            href='//www.facebook.com/'
            target='_blank'
            rel='noreferrer'
          >
            <FaFacebook />
          </a>
          <a
            className='bg-light-50 p-2 rounded-full text-dark-400 ml-4 no-underline  transition duration-200 ease-out hover:text-dark-300'
            href='//www.instagram.com/?hl=en'
            target='_blank'
            rel='noreferrer'
          >
            <FaInstagram />
          </a>
          <a
            className='bg-light-50 p-2 rounded-full text-dark-400 ml-4 no-underline  transition duration-200 ease-out hover:text-dark-300'
            href='//www.pinterest.com/'
            target='_blank'
            rel='noreferrer'
          >
            <GrPinterest />
          </a>
          <a
            className='bg-light-50 p-2 rounded-full text-dark-400 ml-4 no-underline  transition duration-200 ease-out hover:text-dark-300'
            href='//www.pinterest.com/'
            target='_blank'
            rel='noreferrer'
          >
            <GrLinkedinOption />
          </a>
        </div>
        <div className='text-light-50 flex flex-col items-center sm:items-start sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 py-4 lg:py-0'>
          <p>About us</p>
          <p>Support</p>
          <p>Privacy policy</p>
          <p>Terms of services</p>
          <p>Contact us</p>
        </div>
      </div>

      {/* Copyright */}
      <div className='text-center px-0 pt-4 pb-5 flex flex-col text-light-50/90 font-light'>
        <small className='mb-1'>
          Copyright &copy; {new Date().getFullYear()} Homey
        </small>

        <small className='text-xs'>All rights reserved</small>
      </div>
    </div>
  )
}

export default Footer

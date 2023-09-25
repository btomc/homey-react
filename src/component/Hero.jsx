import bg from '../assets/homey-7.jpg'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='bg-secondary-600 flex justify-center items-center h-[90vh] relative text-gray-50 overflow-hidden before:content before:absolute before:top-0 before:bottom-0 before:right-0 before:left-0 before:bg-gradient-purple  to-secondary-600  z-10'>
      {/* Bg Image */}
      <div className='absolute top-0 bottom-0 right-0 left-0 w-full h-full overflow-hidden z-[-1]'>
        <img
          src={bg}
          alt='home'
          className='bg-dark-400 w-full h-full object-cover brightness-90'
        />
      </div>
      {/* Content */}
      <div className='flex items-center justify-center z-20 '>
        <div className='h-[200px] flex flex-col items-center justify-start'>
          <h1 className='text-5xl text-center mb-6 font-semibold tracking-wide'>
            There's no place like home
          </h1>
          <p className='text-3xl mb-2'>Find a home that is perfect for you</p>
          <div className='mt-4 flex gap-4 text-lg'>
            <Link
              to='/category/rent'
              className='bg-primary-100 py-4 px-8 rounded-md'
            >
              Rent
            </Link>
            <Link
              to='/category/sell'
              className='bg-primary-100 py-4 px-8 rounded-md'
            >
              Sell
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero

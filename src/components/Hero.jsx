import bg from '../assets/homey-3.jpg'
import { Link } from 'react-router-dom'
import Button from './Button'

const Hero = () => {
  return (
    <div className='bg-dark-300 flex justify-center items-center h-[90vh] relative text-gray-50 overflow-hidden'>
      {/* Bg Image */}
      <div className='absolute top-0 bottom-0 right-0 left-0 w-full h-full overflow-hidden z-[1]'>
        <img
          src={bg}
          alt='home'
          className='w-full h-full object-cover brightness-90 z-[-1] overflow-hidden'
        />
      </div>
      {/* Content */}
      <div className='flex items-center justify-center z-10 '>
        <div className='h-[200px] flex flex-col items-center justify-start'>
          <h1 className='text-5xl text-center mb-6 font-semibold tracking-wide'>
            There's no place like home
          </h1>
          <p className='text-3xl mb-2'>Find a home that is perfect for you</p>
          <div className='mt-4 flex gap-4 text-lg'>
            <Link to='/category/rent'>
              <Button big>Rent</Button>
            </Link>
            <Link to='/category/sale'>
              <Button big>Sell</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
import React from 'react'
import { BiLoaderAlt } from 'react-icons/bi'

const Spinner = () => {
  return (
    <div className='fixed top-0 right-0 left-0 bottom-0 bg-dark-200 z-[5000] flex justify-center items-center border-transparent'>
      <BiLoaderAlt className='w-16 h-16 animate-spin text-primary-100' />
    </div>
  )
}

export default Spinner

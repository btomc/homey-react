import React from 'react'
import Heading from '../components/Heading'
import Button from '../components/Button'
import { MdOutlineAddHome } from 'react-icons/md'
import { Link } from 'react-router-dom'

const Listings = () => {
  return (
    <div className='min-h-[600px] py-5 px-10'>
      <div className='flex items-center justify-between'>
        <Heading>My Listings</Heading>
        <Link to='/create-listing'>
          <Button>
            <MdOutlineAddHome size={22} className='mr-2 mb-[2px]' />
            Create Listing
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Listings

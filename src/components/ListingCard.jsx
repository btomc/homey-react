import { Link } from 'react-router-dom'
import { IoBed } from 'react-icons/io5'
import { FaBath } from 'react-icons/fa'
import { RiShieldStarFill } from 'react-icons/ri'

const ListingCard = ({ listing, id }) => {
  // console.log(listing)
  return (
    <div className='flex flex-col justify-center items-start gap-y-1 p-4 rounded-lg max-w-[272px]  relative transition-all duration-300 ease-in z-0 hover:scale-[1.025] hover:cursor-pointer hover:bg-gradient-to-r from-white to-[rgba(136,160,255,0.21)] hover:shadow-[0_72px_49px_-51px_rgba(136,160,255,0.21)] border border-solid border-slate-200'>
      {listing.offer && (
        <RiShieldStarFill
          size={28}
          className='text-primary-100 absolute top-[25px] right-[25px] z-10'
        />
      )}
      <Link
        to={`/category/${listing.type}/${id}`}
        className='w-[15rem] h-[10rem] rounded-lg'
      >
        <img
          src={listing.imageUrls[0]}
          alt={listing.name}
          className='w-full h-full rounded-lg object-cover'
        />
      </Link>
      <div className='w-full mt-2'>
        <p className='truncate text-primary-100 text-lg font-semibold'>
          {listing.name}
        </p>
      </div>
      <div className='w-full mb-2'>
        <p className='truncate text-sm'>
          {listing.city}, {listing.country}
        </p>
      </div>
      <div className='flex justify-between w-full'>
        <p>
          {/* <span>$</span> */}
          <span className='font-semibold flex items-center gap-2'>
            {listing.offer ? (
              <span className='text-red-600'>
                $
                {listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </span>
            ) : (
              <span className='text-black'>
                $
                {listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </span>
            )}
            <span className='font-medium'>
              {listing.type === 'rent' && ' / Month'}
            </span>
          </span>
        </p>

        <div className='flex gap-4'>
          <span className='flex items-center gap-1'>
            <IoBed size={20} className='text-slate-400' />
            <p className=''>
              {listing.bedrooms > 1 ? `${listing.bedrooms}` : '1'}
            </p>
          </span>
          <span className='flex items-center gap-1'>
            <FaBath size={16} className='text-slate-400' />
            <p className=''>
              {listing.bathrooms > 1 ? `${listing.bathrooms}` : '1'}
            </p>
          </span>
        </div>
      </div>
    </div>
  )
}

export default ListingCard

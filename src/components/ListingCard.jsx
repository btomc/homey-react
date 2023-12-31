import { Link } from 'react-router-dom'
import { IoBed } from 'react-icons/io5'
import { FaBath } from 'react-icons/fa'
import { RiShieldStarFill } from 'react-icons/ri'
import { FaTrash } from 'react-icons/fa'

const ListingCard = ({ listing, id, onDelete, marginSmall }) => {
  // console.log(listing)
  return (
    <div
      className={`flex flex-col justify-center items-start  p-4 rounded-lg w-[272px]  relative transition-all duration-300 ease-in z-0 hover:scale-[1.025] hover:cursor-pointer hover:bg-gradient-to-r from-white to-[rgba(136,160,255,0.21)] hover:shadow-[0_72px_49px_-51px_rgba(136,160,255,0.21)] border border-solid border-slate-200 ${
        marginSmall ? 'mx-1' : 'my-4 sm:mx-3'
      }`}
    >
      {listing.offer && (
        <div className='absolute top-[25px] right-[25px] z-20 shadow-2xl bg-white/80 rounded-full w-10 h-10 flex justify-center items-center'>
          <RiShieldStarFill size={28} className='text-primary-100' />
        </div>
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
      <div className='w-full mt-3'>
        <p className='truncate text-primary-100 text-lg font-semibold'>
          {listing.name}
        </p>
      </div>
      <div className='w-full mb-3 mt-1'>
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

        <div className='flex'>
          <span className='flex items-center mr-3'>
            <IoBed size={20} className='text-slate-400 mr-1' />
            <p className=''>
              {listing.bedrooms > 1 ? `${listing.bedrooms}` : '1'}
            </p>
          </span>
          <span className='flex items-center'>
            <FaBath size={16} className='text-slate-400 mr-1' />
            <p className=''>
              {listing.bathrooms > 1 ? `${listing.bathrooms}` : '1'}
            </p>
          </span>
        </div>
      </div>

      {onDelete && (
        <div className='mt-2'>
          <FaTrash
            className='text-red-500 hover:text-red-500/50'
            size={18}
            onClick={() => onDelete(listing.id, listing.name)}
          />
        </div>
      )}
    </div>
  )
}

export default ListingCard

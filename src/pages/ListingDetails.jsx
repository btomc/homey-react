import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config'
import { PiShareFatFill } from 'react-icons/pi'
import { IoLocationSharp } from 'react-icons/io5'
import { FaParking } from 'react-icons/fa'
import { TbSofa } from 'react-icons/tb'
import { IoBed } from 'react-icons/io5'
import { FaBath } from 'react-icons/fa'
import { RiShieldStarFill } from 'react-icons/ri'
import Spinner from '../components/Spinner'
import Button from '../components/Button'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

const ListingDetails = () => {
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [shareLinkCopied, setShareLinkCopied] = useState(false)

  const navigate = useNavigate()
  const params = useParams()
  const auth = getAuth()

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, 'listings', params.listingId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        console.log(docSnap.data())
        setListing(docSnap.data())
        setLoading(false)
      }
    }

    fetchListing()
  }, [navigate, params.listingId])

  if (loading) {
    return <Spinner />
  }

  return (
    <div className='min-h-[600px] h-full py-5 px-10 flex flex-col'>
      <div className='relative pt-6'>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={1}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          navigation
          className='lg:h-[690px] xl:h-[770px] 2xl:h-[850px]'
        >
          {listing.imageUrls.map((url, index) => {
            return (
              <SwiperSlide key={index}>
                <div
                  style={{
                    background: `url(${listing.imageUrls[index]}) center no-repeat`,
                    backgroundSize: 'cover',
                    minHeight: '30rem',
                  }}
                  className='relative w-full h-full rounded'
                ></div>
              </SwiperSlide>
            )
          })}
        </Swiper>

        {listing.offer && (
          <div className='absolute top-[38px] right-[76px] z-20 shadow-2xl bg-white/80 rounded-full w-12 h-12 flex justify-center items-center'>
            <RiShieldStarFill size={32} className='text-primary-100' />
          </div>
        )}
        <div
          className='absolute cursor-pointer top-[38px] right-[16px] z-20 shadow-2xl bg-white rounded-full w-12 h-12 flex justify-center items-center'
          onClick={() => {
            navigator.clipboard.writeText(window.location.href)
            setShareLinkCopied(true)
            setTimeout(() => {
              setShareLinkCopied(false)
            }, 2000)
          }}
        >
          <PiShareFatFill size={22} className='text-primary-100' />
        </div>
        {shareLinkCopied && (
          <p className='absolute top-[98px] right-[16px] z-20 bg-white rounded-2xl py-2 px-4 font-medium'>
            Link Copied!
          </p>
        )}
      </div>
      <div className='flex flex-col md:flex-row mt-8'>
        <div className='w-full md:w-[50%]'>
          <div className='flex items-center gap-5'>
            <div className='flex gap-2 items-center'>
              <p className='text-base py-2 px-3 bg-primary-300 text-white rounded-full mb-1'>
                For {listing.type === 'rent' ? 'Rent' : 'Sale'}
              </p>
            </div>

            {listing.offer && (
              <p className='mx-4 font-semibold text-red-800'>
                $
                {(listing.regularPrice - listing.discountedPrice)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                discount
              </p>
            )}
          </div>
          <div className='text-3xl py-3'>
            {listing.offer ? (
              <div className='flex gap-2 items-center'>
                <span className='text-red-600 mr-2'>
                  $
                  {listing.discountedPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </span>
                {listing.type === 'rent' ? (
                  <span className='text-lg mr-2'> / Month</span>
                ) : (
                  ''
                )}
                <span className='text-black text-base font-medium line-through'>
                  $
                  {listing.regularPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </span>
              </div>
            ) : (
              <span className='text-black'>
                $
                {listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </span>
            )}
          </div>
          <p className='text-primary-100 text-2xl font-medium mr-10'>
            {listing.name}
          </p>

          <ul className='my-4 flex flex-col gap-3'>
            <li className='flex gap-3 items-center'>
              <IoBed size={26} className='text-slate-400' />
              {listing.bedrooms > 1
                ? `${listing.bedrooms} Bedrooms`
                : '1 Bedroom'}
            </li>
            <li className='flex gap-3 items-center'>
              <FaBath size={24} className='text-slate-400' />
              {listing.bathrooms > 1
                ? `${listing.bathrooms} Bathrooms`
                : '1 Bathroom'}
            </li>
            <li>
              {listing.parking && (
                <p className='flex gap-3 items-center'>
                  <FaParking size={26} className='text-slate-400' /> Parking
                  Spot
                </p>
              )}
            </li>
            <li>
              {listing.furnished && (
                <p className='flex gap-3 items-center'>
                  <TbSofa size={26} className='text-slate-400' /> Furnished
                </p>
              )}
            </li>
          </ul>

          <div className='mr-10'>
            <p>{listing.description}</p>

            <p className='my-7 flex items-center'>
              <IoLocationSharp size={26} className='text-primary-100 mr-2' />
              {listing.address}, {listing.city}, {listing.country}
            </p>

            {auth.currentUser?.uid !== listing.userRef && (
              <Link
                to={`/contact/${listing.userRef}?listingName=${listing.name}&listingLocation=${listing.location}`}
                className='mt-2'
              >
                <Button full big marginVer>
                  Contact Landlord
                </Button>
              </Link>
            )}
          </div>
        </div>
        {/* MAP */}
        <div className='bg-green-500 w-full  md:w-[50%]'>
          <p>Map</p>
        </div>
      </div>
    </div>
  )
}

export default ListingDetails

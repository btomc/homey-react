import {
  collection,
  getDocs,
  query,
  limit,
  orderBy,
  where,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

import Spinner from '../components/Spinner'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ListingCard from './ListingCard'
import Heading from './Heading'
import { sliderSettings } from '../utils/slider'

const SliderOffers = () => {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)

  //   const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get reference
        const listingsRef = collection(db, 'listings')

        // Create a query
        const q = query(
          listingsRef,
          where('offer', '==', true),
          orderBy('timestamp', 'desc'),
          limit(6)
        )

        // Execute query
        const querySnap = await getDocs(q)

        const listings = []

        querySnap.forEach((doc) => {
          //   console.log(doc.data())
          return listings.push({
            id: doc.id,
            data: doc.data(),
          })
        })

        setListings(listings)
        setLoading(false)
      } catch (error) {
        toast.error('Could not fetch listings')
      }
    }

    fetchListings()
  }, [])

  if (loading) {
    return <Spinner />
  }

  return (
    listings && (
      <div className='pb-5 px-10 mb-4'>
        <Heading>Special Offers</Heading>

        <Swiper navigation {...sliderSettings} modules={[Navigation]}>
          {listings.map(({ data, id }) => (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}
              className='mt-4 mx-4 xl:mx-1 w-[272px] max-w-[272px]'
            >
              <ListingCard listing={data} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    )
  )
}

export default SliderOffers

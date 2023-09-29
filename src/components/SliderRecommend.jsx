import { collection, getDocs, query, limit, orderBy } from 'firebase/firestore'
import { db } from '../firebase.config'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

import Spinner from '../components/Spinner'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ListingCard from './ListingCard'
import Heading from './Heading'
import { sliderSettings } from '../utils/slider'

const SliderRecommend = () => {
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchListings = async () => {
      const listingsRef = collection(db, 'listings')
      const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(6))
      const querySnap = await getDocs(q)

      let listings = []

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      console.log(listings)
      setListings(listings)
      setLoading(false)
    }
    fetchListings()
  }, [])

  if (loading) {
    return <Spinner />
  }

  return (
    listings && (
      <div className='py-5 px-10 mb-4'>
        <Heading>Recommended</Heading>

        <Swiper navigation {...sliderSettings}>
          {listings.map(({ data, id }) => (
            <SwiperSlide
              key={id}
              //   id={listing.id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}
              className='mt-4 mx-4 xl:mx-1'
            >
              <ListingCard listing={data} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    )
  )
}

export default SliderRecommend

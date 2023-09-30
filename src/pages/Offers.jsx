import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

import Heading from '../components/Heading'
import ListingCard from '../components/ListingCard'

const Offers = () => {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)

  const params = useParams()

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
          limit(10)
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

  return (
    <div className='min-h-[600px] pt-5 px-10 pb-10'>
      <div className='flex items-center mb-4'>
        <Heading>Special Offers</Heading>
      </div>

      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <div className='flex flex-wrap gap-4'>
            {listings.map((listing) => (
              <ListingCard
                listing={listing.data}
                id={listing.id}
                key={listing.id}
              />
            ))}
          </div>
        </>
      ) : (
        <p>There are no offers.</p>
      )}
    </div>
  )
}

export default Offers

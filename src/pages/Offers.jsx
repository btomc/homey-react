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
  getCountFromServer,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

import Heading from '../components/Heading'
import ListingCard from '../components/ListingCard'
import Button from '../components/Button'

const Offers = () => {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastFetchedListing, setLastFetchedListing] = useState(null)
  const [count, setCount] = useState(null)

  const params = useParams()

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get reference
        const listingsRef = collection(db, 'listings')

        const countQuery = query(listingsRef, where('offer', '==', true))
        const countDocs = await getCountFromServer(countQuery)
        setCount(countDocs.data().count)

        // Create a query
        const q = query(
          listingsRef,
          where('offer', '==', true),
          orderBy('timestamp', 'desc'),
          limit(10)
        )

        // Execute query
        const querySnap = await getDocs(q)

        const lastVisible = querySnap.docs[querySnap.docs.length - 1]
        setLastFetchedListing(lastVisible)

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

  // Pagination / Load More
  const onFetchMoreListings = async () => {
    try {
      // Get reference
      const listingsRef = collection(db, 'listings')

      // Create a query
      const q = query(
        listingsRef,
        where('offer', '==', true),
        orderBy('timestamp', 'desc'),
        startAfter(lastFetchedListing),
        limit(10)
      )

      // Execute query
      const querySnap = await getDocs(q)

      const lastVisible = querySnap.docs[querySnap.docs.length - 1]
      setLastFetchedListing(lastVisible)

      const listings = []

      querySnap.forEach((doc) => {
        //   console.log(doc.data())
        return listings.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      setListings((prevState) => [...prevState, ...listings])
      setLoading(false)
    } catch (error) {
      toast.error('Could not fetch listings')
    }
  }

  return (
    <div className='min-h-[600px] pt-5 px-10 pb-10'>
      <div className='flex items-center mb-4'>
        <Heading>Special Offers</Heading>
      </div>

      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <div className='flex flex-wrap'>
            {listings.map((listing) => (
              <ListingCard
                listing={listing.data}
                id={listing.id}
                key={listing.id}
              />
            ))}
          </div>
          <br />
          <br />

          {/* Load More Button */}
          {lastFetchedListing && listings?.length < count && (
            <div className='flex justify-center items-center'>
              <Button onClick={onFetchMoreListings}>Load More</Button>
            </div>
          )}
        </>
      ) : (
        <p>There are no current offers.</p>
      )}
    </div>
  )
}

export default Offers

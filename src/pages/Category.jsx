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
import Spinner from '../component/Spinner'
import Heading from '../component/Heading'

const Category = () => {
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
          where('type', '==', params.categoryName),
          orderBy('timestamp', 'desc'),
          limit(10)
        )

        // Execute query
        const querySnap = await getDocs(q)

        const listings = []

        querySnap.forEach((doc) => {
          // console.log(doc.data())
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
  }, [params.categoryName])

  return (
    <div className='min-h-[600px] mb-32 py-5 px-10'>
      <div className='flex items-center'>
        <Heading>
          {params.categoryName === 'rent'
            ? 'Places for rent'
            : 'Places for sale'}
        </Heading>
      </div>

      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <div>
            <div className='flex flex-wrap gap-4'>
              {listings.map((listing) => (
                <h3>{listing.data.name}</h3>
              ))}
            </div>
          </div>
        </>
      ) : (
        <p>No listings for {params.categoryName}</p>
      )}
    </div>
  )
}

export default Category
import { useEffect, useState } from 'react'
import {
  doc,
  collection,
  getDocs,
  query,
  where,
  limit,
  startAfter,
  getCountFromServer,
  orderBy,
  deleteDoc,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import Heading from '../components/Heading'
import Button from '../components/Button'
import ListingCard from '../components/ListingCard'
import { MdOutlineAddHome } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'

const Listings = () => {
  const auth = getAuth()
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState(null)
  const [lastFetchedListing, setLastFetchedListing] = useState(null)
  const [count, setCount] = useState(null)

  useEffect(() => {
    const fetchUserListings = async () => {
      const listingsRef = collection(db, 'listings')

      const countQuery = query(
        listingsRef,
        where('userRef', '==', auth.currentUser.uid)
      )
      const countDocs = await getCountFromServer(countQuery)
      setCount(countDocs.data().count)

      const q = query(
        listingsRef,
        where('userRef', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc'),
        limit(10)
      )

      const querySnap = await getDocs(q)

      const lastVisible = querySnap.docs[querySnap.docs.length - 1]
      setLastFetchedListing(lastVisible)

      let listings = []

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      setListings(listings)
      setLoading(false)
    }
    fetchUserListings()
  }, [auth.currentUser.uid])

  // Pagination / Load More
  const onFetchMoreListings = async () => {
    try {
      // Get reference
      const listingsRef = collection(db, 'listings')

      // Create a query
      const q = query(
        listingsRef,
        where('userRef', '==', auth.currentUser.uid),
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

  if (loading) {
    return <Spinner />
  }

  const onDelete = async (listingId) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await deleteDoc(doc(db, 'listings', listingId))
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingId
      )
      setListings(updatedListings)
      toast.success('Successfully deleted listing')
    }
  }

  return (
    <div className='min-h-[600px] pt-5 px-10 pb-10'>
      <div className='flex flex-col xs:flex-row gap-y-4 items-center justify-between mb-4'>
        <Heading>My Listings</Heading>
        <Link to='/create-listing'>
          <Button>
            <MdOutlineAddHome size={22} className='mr-2 mb-[2px]' />
            Create Listing
          </Button>
        </Link>
      </div>
      <div className='mt-8 xs:mt-0 flex flex-wrap gap-4'>
        {!loading && listings?.length > 0 ? (
          <div className='flex flex-col'>
            <div className='flex flex-wrap gap-4'>
              {listings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                  onDelete={() => onDelete(listing.id)}
                />
              ))}
            </div>
            <br />
            <br />

            {/* Load More Button */}
            {lastFetchedListing && listings?.length < count && (
              <div className='flex justify-center items-center w-full'>
                <Button onClick={onFetchMoreListings}>Load More</Button>
              </div>
            )}
          </div>
        ) : (
          <p>You have no listings.</p>
        )}
      </div>
    </div>
  )
}

export default Listings

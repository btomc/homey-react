import { useEffect, useState } from 'react'
import {
  doc,
  collection,
  getDocs,
  query,
  where,
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

  useEffect(() => {
    const fetchUserListings = async () => {
      const listingsRef = collection(db, 'listings')

      const q = query(
        listingsRef,
        where('userRef', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc')
      )

      const querySnap = await getDocs(q)

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
    <div className='min-h-[600px] py-5 px-10'>
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
        {!loading && listings?.length > 0 && (
          <>
            {listings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing.data}
                id={listing.id}
                onDelete={() => onDelete(listing.id)}
              />
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default Listings

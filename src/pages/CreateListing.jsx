import { useState, useEffect, useRef } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import Input from '../components/Input'
import Button from '../components/Button'

const CreateListing = () => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    type: 'rent',
    name: '',
    description: '',
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: '',
    city: '',
    country: '',
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    images: {},
  })

  const {
    type,
    name,
    description,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    city,
    country,
    offer,
    regularPrice,
    discountedPrice,
    images,
  } = formData

  const auth = getAuth()
  const navigate = useNavigate()
  const isMounted = useRef(true)

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid })
        } else {
          navigate('/sign-in')
        }
      })
    }

    return () => {
      isMounted.current = false
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted])

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }

  const onMutate = (e) => {
    let boolean = null

    if (e.target.value === 'true') {
      boolean = true
    }

    if (e.target.value === 'false') {
      boolean = false
    }

    // File
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }))
    }

    // Text/Booleans/Numbers
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }))
    }
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <div className='justify-center flex flex-col items-center outline-none focus:outline-none bg-[#293843]/80 z-20'>
      <div className='mt-6 w-full sm:w-[500px] md:w-[60%] min-h-[600px] flex flex-col gap-y-4 items-center z-40 text-black bg-light-100/90 rounded mb-6'>
        <h2 className='text-3xl font-semibold mt-8 pt-4'>Create a listing</h2>
        <p className='text-base text-black/50'>Fill out this form</p>
        <form onSubmit={onSubmit} className='px-10 pb-8 pt-4 w-full'>
          <div className='mb-4'>
            <label className='text-lg'>Sell / Rent</label>
            <div className='flex gap-2 mt-2'>
              {type === 'sale' ? (
                <Button onClick={onMutate} type='button' id='type' value='sale'>
                  Sell
                </Button>
              ) : (
                <Button
                  onClick={onMutate}
                  type='button'
                  id='type'
                  value='sale'
                  secondary
                >
                  Sell
                </Button>
              )}

              {type === 'rent' ? (
                <Button onClick={onMutate} type='button' id='type' value='rent'>
                  Rent
                </Button>
              ) : (
                <Button
                  onClick={onMutate}
                  type='button'
                  id='type'
                  value='rent'
                  secondary
                >
                  Rent
                </Button>
              )}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className='text-lg'>Name</label>
            <Input
              type='text'
              id='name'
              value={name}
              onChange={onMutate}
              required
              marginVer
            />
          </div>

          {/* Description */}
          <div>
            <label className='text-lg'>Description</label>
            <textarea
              type='text'
              id='description'
              value={description}
              onChange={onMutate}
              required
              className='p-3 rounded text-base outline-none border-2 border-solid border-slate-200 focus:border-solid w-full z-30 mt-2 mb-4 focus:border-primary-100'
            />
          </div>

          {/* Bedrooms */}
          <div>
            <label className='text-lg'>Bedrooms</label>
            <Input
              type='number'
              id='bedrooms'
              value={bedrooms}
              onChange={onMutate}
              required
              min='1'
              max='50'
              marginVer
            />
          </div>

          {/* Bathrooms */}
          <div>
            <label className='text-lg'>Bathrooms</label>
            <Input
              type='number'
              id='bathrooms'
              value={bathrooms}
              onChange={onMutate}
              required
              min='1'
              max='50'
              marginVer
            />
          </div>

          {/* Parking spot */}
          <div className='mb-4'>
            <label className='text-lg'>Parking spot</label>
            <div className='flex gap-2 mt-2'>
              {parking ? (
                <Button
                  onClick={onMutate}
                  type='button'
                  id='parking'
                  value='true'
                >
                  Yes
                </Button>
              ) : (
                <Button
                  onClick={onMutate}
                  type='button'
                  id='parking'
                  value='true'
                  secondary
                >
                  Yes
                </Button>
              )}

              {!parking && parking !== null ? (
                <Button
                  onClick={onMutate}
                  type='button'
                  id='parking'
                  value='false'
                >
                  No
                </Button>
              ) : (
                <Button
                  onClick={onMutate}
                  type='button'
                  id='parking'
                  value='false'
                  secondary
                >
                  No
                </Button>
              )}
            </div>
          </div>

          {/* Furnished */}
          <div className='mb-4'>
            <label className='text-lg'>Furnished</label>
            <div className='flex gap-2 mt-2'>
              {furnished ? (
                <Button
                  onClick={onMutate}
                  type='button'
                  id='furnished'
                  value='true'
                >
                  Yes
                </Button>
              ) : (
                <Button
                  onClick={onMutate}
                  type='button'
                  id='furnished'
                  value='true'
                  secondary
                >
                  Yes
                </Button>
              )}

              {!furnished && furnished !== null ? (
                <Button
                  onClick={onMutate}
                  type='button'
                  id='furnished'
                  value='false'
                >
                  No
                </Button>
              ) : (
                <Button
                  onClick={onMutate}
                  type='button'
                  id='furnished'
                  value='false'
                  secondary
                >
                  No
                </Button>
              )}
            </div>
          </div>

          {/* Address */}
          <div>
            <label className='text-lg'>Address</label>
            <Input
              type='text'
              id='address'
              value={address}
              onChange={onMutate}
              required
              marginVer
            />
          </div>

          {/* City */}
          <div>
            <label className='text-lg'>City</label>
            <Input
              type='text'
              id='city'
              value={city}
              onChange={onMutate}
              required
              marginVer
            />
          </div>

          {/* Country */}
          <div>
            <label className='text-lg'>Country</label>
            <Input
              type='text'
              id='country'
              value={country}
              onChange={onMutate}
              required
              marginVer
            />
          </div>

          {/* Offer */}
          <div className='mb-4'>
            <label className='text-lg'>Offer</label>
            <div className='flex gap-2 mt-2'>
              {offer ? (
                <Button
                  onClick={onMutate}
                  type='button'
                  id='offer'
                  value='true'
                >
                  Yes
                </Button>
              ) : (
                <Button
                  onClick={onMutate}
                  type='button'
                  id='offer'
                  value='true'
                  secondary
                >
                  Yes
                </Button>
              )}

              {!offer && offer !== null ? (
                <Button
                  onClick={onMutate}
                  type='button'
                  id='offer'
                  value='false'
                >
                  No
                </Button>
              ) : (
                <Button
                  onClick={onMutate}
                  type='button'
                  id='offer'
                  value='false'
                  secondary
                >
                  No
                </Button>
              )}
            </div>
          </div>

          {/* Regular Price */}
          <div>
            <label className='text-lg'>Regular Price</label>
            <div className='flex items-center justify-between'>
              <Input
                type='number'
                id='regularPrice'
                value={regularPrice}
                onChange={onMutate}
                required
                min='50'
                max='100000000'
                marginVer
              />
              {type === 'rent' && (
                <p className='text-primary-100 font-semibold ml-2 min-w-[100px]'>
                  $ / Month
                </p>
              )}
            </div>
          </div>

          {/* Discounted Price */}
          {offer && (
            <>
              <label className='text-lg'>Discounted Price</label>
              <Input
                type='number'
                id='discountedPrice'
                value={discountedPrice}
                onChange={onMutate}
                min='50'
                max='750000000'
                required={offer}
                marginVer
              />
            </>
          )}

          {/* Images */}
          <div className='mb-4'>
            <label className='text-lg'>Images</label>
            <p className='text-sm my-2 text-black/50'>
              The first image will be the cover (max 5).
            </p>
            <Input
              type='file'
              id='images'
              onChange={onMutate}
              required
              marginVer
              max='5'
              multiple
              accept='.jpg,.png,.jpeg'
            />
          </div>

          <Button type='submit' full big>
            Create Listing
          </Button>
        </form>
      </div>
    </div>
  )
}

export default CreateListing

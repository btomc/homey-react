import { useState, useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Button from '../components/Button'
import Input from '../components/Input'
import Heading from '../components/Heading'

import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

function Contact() {
  const [landlord, setLandlord] = useState(null)
  const [listing, setListing] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const params = useParams()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    landlord: params.landlordId,
    listing: searchParams.get('listingName'),
  })
  const { name, email, message } = formData

  useEffect(() => {
    const getLandlord = async () => {
      const docRef = doc(db, 'users', params.landlordId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setLandlord(docSnap.data())
      } else {
        toast.error('Could not get landlord data')
      }
    }

    getLandlord()
  }, [params.landlordId])

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    console.log(formData)

    const formDataCopy = {
      ...formData,
      timestamp: serverTimestamp(),
    }

    const docRef = await addDoc(
      collection(db, 'messages'),
      formDataCopy,
      landlord
    )

    setLoading(false)

    toast.success('Message sent.')
    navigate(`/`)
  }

  console.log(formData)

  return (
    <div className='min-h-[600px] py-5 px-10'>
      <div className='flex items-center'>
        <Heading>Contact Landlord</Heading>
      </div>

      {landlord !== null && (
        <main>
          <div className='mb-4'>
            <p>
              Contact <span className='text-primary-300'>{landlord?.name}</span>
            </p>
          </div>

          <form className='' onSubmit={handleSendMessage}>
            <div className='max-w-[600px]'>
              <input
                id='landlord'
                value={landlord}
                onChange={onChange}
                className='hidden'
              />

              <input
                id='listing'
                value={listing}
                onChange={onChange}
                className='hidden'
              />
              <div className='mb-4'>
                <label>Name</label>
                <Input id='name' value={name} onChange={onChange} required />
              </div>
              <div>
                <label>Email Address</label>
                <Input id='email' value={email} onChange={onChange} required />
              </div>
              <div className='flex flex-col my-4'>
                <label htmlFor='message' className='mb-1'>
                  Message
                </label>
                <textarea
                  name='message'
                  id='message'
                  className='outline-none border-2 border-solid border-slate-200 focus:border-solid focus:border-primary-100 rounded p-3'
                  value={message}
                  onChange={onChange}
                  required
                  rows={7}
                ></textarea>
              </div>
            </div>

            <Button type='submit' primary disabled={loading}>
              Send Message
            </Button>
          </form>
        </main>
      )}
    </div>
  )
}

export default Contact

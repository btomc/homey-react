import { getAuth } from 'firebase/auth'
import Spinner from '../components/Spinner'
import { useEffect, useState } from 'react'
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  deleteDoc,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Heading from '../components/Heading'
import MessageCard from '../components/MessageCard'

const Messages = () => {
  const auth = getAuth()
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState(null)

  useEffect(() => {
    const fetchUserMessages = async () => {
      const messagesRef = collection(db, 'messages')

      const q = query(
        messagesRef,
        where('landlord', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc')
      )

      const querySnap = await getDocs(q)

      let messages = []

      querySnap.forEach((doc) => {
        return messages.push({
          id: doc.id,
          data: doc.data(),
          timestamp:
            new Date(doc.data().timestamp?.seconds * 1000) || undefined,
        })
      })

      setMessages(messages)
      setLoading(false)
    }

    fetchUserMessages()
  }, [auth.currentUser.uid])

  console.log(messages)

  if (loading) {
    return <Spinner />
  }

  const onDelete = async (messageId) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await deleteDoc(doc(db, 'messages', messageId))
      const updatedMessages = messages.filter(
        (message) => message.id !== messageId
      )
      setMessages(updatedMessages)
      toast.success('Successfully deleted message')
    }
  }

  return (
    <div className='min-h-[600px] pt-5 px-10 pb-10'>
      <div className='flex flex-col xs:flex-row gap-y-4 items-center justify-between mb-4'>
        <Heading>My Messages</Heading>
      </div>
      <div className='mt-8 xs:mt-0 flex flex-wrap'>
        {!loading && messages?.length > 0 ? (
          <div className='flex flex-col'>
            <div className='flex flex-wrap'>
              {messages?.map((message) => (
                <MessageCard
                  key={message.id}
                  message={message.data}
                  id={message.id}
                  onDelete={() => onDelete(message.id)}
                  timestamp={message.timestamp}
                />
              ))}
            </div>
          </div>
        ) : (
          <p>You have no messages.</p>
        )}
      </div>
    </div>
  )
}

export default Messages

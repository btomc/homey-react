import React from 'react'
import { FaTrash } from 'react-icons/fa'
import moment from 'moment/moment'
import { Timestamp } from 'firebase/firestore'

const MessageCard = ({ message, id, onDelete, timestamp }) => {
  return (
    <div
      className={`flex flex-col items-start p-5 rounded-lg w-full sm:w-[480px] min-h-[300px] relative transition-all duration-300 ease-in z-0 hover:scale-[1.025] hover:cursor-pointer hover:bg-gradient-to-r from-white to-[rgba(136,160,255,0.21)] hover:shadow-[0_72px_49px_-51px_rgba(136,160,255,0.21)] border border-solid border-slate-300/80
       my-2 sm:mr-4`}
    >
      <p className='text-primary-400 font-semibold text-lg'>
        {message.listing}
      </p>
      <div className='text-sm mt-4'>
        <div className='flex mb-2 text-gray-700 text-xs'>
          <p className='mr-4'>{timestamp.toLocaleDateString()}</p>
          <p>{timestamp.toLocaleTimeString()}</p>
        </div>
        <p>
          Name: <span className='text-gray-600'> {message.name}</span>
        </p>
        <p className='mt-2'>
          Email: <span className='text-gray-600'>{message.email}</span>
        </p>

        <br />
      </div>
      <p className=''>{message.message}</p>

      {onDelete && (
        <div className='mt-4 h-full flex items-end'>
          <FaTrash
            className='text-red-500 hover:text-red-500/50'
            size={18}
            onClick={() => onDelete(message.id)}
          />
        </div>
      )}
    </div>
  )
}

export default MessageCard

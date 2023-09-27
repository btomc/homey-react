import React from 'react'

const Button = ({ children, disabled, type, onClick, big, full }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`border-0 text-white bg-primary-100  cursor-pointer transition duration-200 ease-out  outline-none flex items-center justify-center decoration-0  text-base rounded hover:bg-primary-700  hover:ease-out ${
        big ? 'py-3.5 px-6 text-lg' : 'px-4 py-2'
      } ${full ? 'w-full' : 'max-w-[200px]'} `}
    >
      {children}
    </button>
  )
}

export default Button

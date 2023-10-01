const Button = ({
  children,
  disabled,
  type,
  onClick,
  big,
  full,
  value,
  id,
  secondary,
  light,
  marRight,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      id={id}
      value={value}
      disabled={disabled}
      className={`border-0  cursor-pointer transition duration-200 ease-out  outline-none flex items-center justify-center decoration-0  text-base rounded   hover:ease-out ${
        big ? 'py-3.5 px-6 text-lg' : 'px-4 py-2'
      } ${full ? 'w-full' : 'max-w-[200px]'} ${
        secondary
          ? 'text-gray-600 bg-transparent hover:bg-gray-300/70 border-2 border-solid border-gray-300 '
          : 'text-white bg-primary-100 hover:bg-primary-700'
      } ${light ? 'bg-primary-300 hover:bg-[#3353d6]' : ''} ${
        marRight ? 'mr-4' : 'mr-0'
      } `}
    >
      {children}
    </button>
  )
}

export default Button

const DropdownMenu = ({ children, active }) => {
  return (
    <div
      className={`absolute top-[50px] right-0 bg-dark-400 rounded-md py-4 px-8 overflow-hidden ${
        active
          ? 'opacity-100 visible translate-y-0  transition-transform duration-500'
          : 'opacity-0 hidden -translate-y-5  transition-transform duration-500'
      } `}
    >
      {children}
    </div>
  )
}

export default DropdownMenu

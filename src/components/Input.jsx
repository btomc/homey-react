const Input = ({
  type,
  id,
  placeholder,
  value,
  onChange,
  required,
  name,
  checked,
  onFocusLight,
}) => {
  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      required={required}
      name={name}
      checked={checked}
      onChange={onChange}
      className={`p-3 rounded text-base outline-none border-2 border-solid border-slate-200 focus:border-solid focus:border-primary-100 w-full z-30 ${
        onFocusLight ? 'focus:border-slate-400' : 'focus:border-primary-100'
      }`}
    />
  )
}

export default Input

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
  min,
  max,
  marginVer,
  multiple,
  accept,
  marginTop,
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
      min={min}
      max={max}
      multiple={multiple}
      accept={accept}
      className={`p-3 rounded text-base outline-none border-2 border-solid border-slate-200 focus:border-solid w-full z-30 ${
        onFocusLight ? 'focus:border-slate-400' : 'focus:border-primary-100'
      } ${marginVer ? 'mt-2 mb-4' : ''} ${marginTop ? 'mt-2' : ''}`}
    />
  )
}

export default Input

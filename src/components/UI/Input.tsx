import React from 'react';

interface InputProps {
  className?: string,
  placeholder?: string,
  labelText?: string,
  type?: React.HTMLInputTypeAttribute,
  id?: string,
  inlineLabel?: boolean, // label will be in one line with input

  value?: string
  
  shouldValidate?: boolean,
  valid?: boolean
  required?: boolean,
  touched?: boolean
  errorMessage?: string,
  minLength?: number,
  maxLength?: number,

  onChange?: (event:React.ChangeEvent) => void
};

const Input:React.FC<InputProps> = (props) => {
  const { 
    className,
    placeholder,
    labelText,
    type = 'text',
    id,
    inlineLabel,
    
    value,
    
    shouldValidate,
    valid,
    required=false,
    touched,
    errorMessage,
    minLength,
    maxLength,

    onChange,
  } = props

  const invalid = false
  const htmlFor = id || `${type}-${Math.random()}`

  return (
    <div className={`input__wrapper ${invalid ? 'invalid' : ''} ${inlineLabel ? 'inlineLabel' : ''}`}>
      {labelText && <label className='input--label text' htmlFor={htmlFor}>{labelText}</label>}
      <input 
        id={htmlFor}
        type={type}
        className={`input ${className ? className : ''}`}
        required={required}
        value={value}
        placeholder={placeholder ? placeholder : ''}
        onChange={onChange}
      />
      {invalid && <span className='input--error' >{errorMessage || 'Введите корректное значение'}</span>}
    </div>
  )
}

export default Input;

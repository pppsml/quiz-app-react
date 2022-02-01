import React, { memo } from 'react';

interface InputProps {
  className?: string,
  placeholder?: string,
  name?: string,
  labelText?: string,
  type?: React.HTMLInputTypeAttribute,
  id?: string,
  inputTitle?: string,
  inlineLabel?: boolean, // label will be in one line with input

  value?: string
  
  shouldValidate?: boolean,
  valid?: boolean
  required?: boolean,
  touched?: boolean
  errorMessage?: string,

  onChange?: (event:React.ChangeEvent<HTMLInputElement>) => void
};

const Input = memo(function Input (props:InputProps):any {
  const { 
    className,
    placeholder,
    name,
    labelText,
    type = 'text',
    id,
    inlineLabel,
    inputTitle,
    
    value,
    
    shouldValidate,
    valid,
    required=false,
    touched,
    errorMessage,

    onChange,
  } = props

  const isValid = true
  const htmlFor = id || `${type}-${Math.random()}`

  return (
    <>
      {inputTitle && <p className='text tal'>{inputTitle}</p>}
      <div className={`input__wrapper ${!isValid ? 'invalid' : ''} ${inlineLabel ? 'inlineLabel' : ''}`}>
        {labelText && <label className='input--label text' htmlFor={htmlFor}>{labelText}</label>}
        <input 
          id={htmlFor}
          type={type}
          name={name}
          className={`input ${className ? className : ''}`}
          required={required}
          value={value}
          placeholder={placeholder ? placeholder : ''}
          onChange={onChange}
        />
        {!isValid && <span className='input--error' >{errorMessage || 'Введите корректное значение'}</span>}
      </div>
    </>
  )
})

export default Input;

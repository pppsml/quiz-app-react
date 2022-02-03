import React, { memo } from 'react';

interface InputProps {
  className?: string,
  placeholder?: string,
  name?: string,
  labelText?: string,
  type?: React.HTMLInputTypeAttribute,
  id?: string,
  inputTitle?: string,
  hoverTitle?: string,
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
    hoverTitle,
    
    value,
    
    shouldValidate,
    valid,
    required=false,
    touched,
    errorMessage,

    onChange,
  } = props

  const isInvalid = !valid && shouldValidate && touched
  const htmlFor = id || `${type}-${Math.random()}`

  return (
    <>
      {inputTitle && <p className='text tal'>{inputTitle}</p>}
      <div 
        className={`input__wrapper ${isInvalid ? 'invalid' : ''} ${inlineLabel ? 'inlineLabel' : ''} ${className ? className : ''}`} 
        title={hoverTitle || ' '}
      >
        {labelText && <label className='input__label text' htmlFor={htmlFor}>{labelText}</label>}
        <input 
          id={htmlFor}
          type={type}
          name={name}
          className={`input ${type === 'radio' ? 'input__radio' : ''}`}
          required={required}
          value={value}
          placeholder={placeholder ? placeholder : ''}
          onChange={onChange}
        />
        { type === 'radio' && <label className='input__label text' htmlFor={htmlFor}></label> }
        {isInvalid && type !== 'radio' && <span className='input__error' >{errorMessage || 'Введите корректное значение'}</span>}
      </div>
    </>
  )
})

export default Input;

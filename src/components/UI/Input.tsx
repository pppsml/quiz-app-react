import React, { memo } from 'react';

interface InputProps {
  className?: string,
  placeholder?: string,
  name?: string,
  label?: string,
  type?: React.HTMLInputTypeAttribute,
  checked?: boolean,
  id?: string,
  inputTitle?: string,
  hoverTitle?: string,
  inlineLabel?: boolean, // label will be in one line with input
  autoComplete?: 'on' | 'off',

  value?: string
  
  validation?: {},
  shouldValidate?: boolean,
  isValid?: boolean
  required?: boolean,
  touched?: boolean
  error?: string,

  onChange?: (event:React.ChangeEvent<HTMLInputElement>) => void
};

const Input = memo(function Input (props:InputProps):any {
  const { 
    className,
    placeholder,
    name,
    label,
    type = 'text',
    checked,
    id,
    inlineLabel = false,
    inputTitle,
    hoverTitle = '',
    autoComplete = 'on',
    
    value = '',
    validation,
    
    shouldValidate = !!validation,
    isValid = true,
    required = false,
    touched,
    error,

    onChange,
  } = props

  const formattedValue = value.trim().replace(/ +/g, ' ')

  const isInvalid = !isValid && shouldValidate && touched
  const htmlFor = id || `${type}-${Math.random()}`

  return (
    <>
      {inputTitle && <p className='text tal'>{inputTitle}</p>}
      <div 
        className={`input__block ${isInvalid ? 'invalid' : ''} ${inlineLabel ? 'inlineLabel' : ''} ${className ? className : ''}`} 
        title={hoverTitle}
      >
        {
          label 
          && <label className='input__label text' htmlFor={htmlFor}>
            {label}
            {required && <span style={{color: 'red',}}>*</span>}
          </label>
        }
        <div className="input__wrapper">
          <input 
            checked={checked}
            autoComplete={autoComplete}
            id={htmlFor}
            type={type}
            name={name}
            className='input'
            required={required}
            value={value}
            placeholder={placeholder ? placeholder : ''}
            onChange={onChange}
            />
          { 
            (type === 'text' || type === 'email')
            && <span className='input__length text text-minimal tar'>{formattedValue.length}</span>
          }
          { type === 'radio' || type === 'checkbox' ? <label tabIndex={1} className='input__label text' htmlFor={htmlFor}></label> : null }
        </div>
        {isInvalid && type !== 'radio' && <span className='input__error' >{error || 'Введите корректное значение'}</span>}
      </div>
    </>
  )
})

export default Input;

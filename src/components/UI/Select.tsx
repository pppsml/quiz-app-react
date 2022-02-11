import React from 'react';

interface selectOption {
  text: string,
  value?: string | number | undefined,
}

interface Props {
  id?: string,
  options: selectOption[],
  className?: string,
  labelText?: string,
  inlineLabel?: boolean,
  name?: string,
  value?: string | number,
  onChange?: (event:React.ChangeEvent<HTMLSelectElement>) => void
};

const Select:React.FC<Props> = ({
  id,
  options,
  className,
  labelText,
  inlineLabel,
  name,
  value,
  onChange,
}) => {

  const htmlFor = id || `select-${Math.random()}`

  return <div className={`select__wrapper ${inlineLabel ? 'inlineLabel' : ''} ${className || ''}`} >
    {labelText && <label className='text' htmlFor={htmlFor}>{labelText}</label>}
    <select value={value} onChange={onChange} name={name || ''} id={htmlFor}>
      {options.map(({value, text}, index) => (
        <option key={`${text}-${index}`} value={value}>{text}</option>
      ))}
    </select>
  </div>
}

export default Select;

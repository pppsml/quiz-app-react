import { IFormControls, IInputControlProps, IInputValidationControls } from './types'

/**
 * 
 * @param num 
 * @param wordArray
 * @returns 
 */
export const getText = (num: number, wordArray: string[]):string => {
  const decNum = num % 100
  const digit = num % 10

  if (decNum >= 11 && decNum <= 19) return wordArray[2]

  if (digit === 1) return wordArray[0]
  if (digit >= 2 && digit <= 4) return wordArray[1]
  if (digit >= 5 && digit <= 9 || digit === 0) return wordArray[2]

  return 'Ошибка'
}

/**
 * 
 * @param number timestamp
 * @param string locale 'ru' | 'en'. default 'en'
 * @returns string date in format 'DD.MM.YYYY HH:mm' in ru locale. 'MM-DD-YYYY HH:mm' in en locale
 */
export const getDateFromTimestamp = (timestamp: number, locale: 'ru' | 'en' = 'en'):string => {
  const date = new Date(timestamp)

  const fullYear = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()

  const formattedMonth = month + 1 >= 10 ? month : `0${month}`
  const formattedDay = day + 1 >= 10 ? day : `0${day}`
  const formattedHour = hour + 1 >= 10 ? hour : `0${hour}`
  const formattedMinute = minute + 1 >= 10 ? minute : `0${minute}`

  switch (locale) {
    case 'ru':
      return `${formattedDay}.${formattedMonth}.${fullYear} ${formattedHour}:${formattedMinute}`
    case 'en':
      return `${formattedMonth}-${formattedDay}-${fullYear} ${formattedHour}:${formattedMinute}`
  }
}

export const validateInput = (value:string, validation?:IInputValidationControls ):boolean => {
  if (!validation) return true

  let isValid = true

  if (validation.required) {
    isValid = value.trim() !== '' && isValid
  }

  if (validation.minLength) {
    isValid = value.trim().replace(/ +/g, ' ').length >= validation.minLength && isValid
  }

  return isValid
}

export const checkAllInputsOnValid = (formControls: IFormControls):boolean => {
  let formIsValid = true

  Object.keys(formControls).forEach((controlName:string) => {
    formControls[controlName].inputs.forEach((inputControls:IInputControlProps) => {
      if (!inputControls.valid) {
        formIsValid = false
      }
    })
  })

  console.log(formIsValid)

  return formIsValid
}

export const createFormControls = (controls:IInputControlProps, count:number = 1):IInputControlProps[] => {
  const formControls:IInputControlProps[] = []

  for (let i = 0; i < count; i++) {
    formControls.push({
      ...controls
    })
  }

  return formControls
}
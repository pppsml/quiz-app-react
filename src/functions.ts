import { ICorrectAnswers, IFormControls, IInputControlProps, IInputValidationControls } from './types'

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

interface validateInputsReturns {
  isValid: boolean,
  errorMessage?: string
}

export const validateInput = (value:string, validation?:IInputValidationControls ):validateInputsReturns => {
  if (!validation) return {
    isValid: true,
  }

  let isValid = true
  let errorMessage:any = ''
  const formattedValue = value.trim().replace(/ +/g, ' ')

  if (validation.required) {
    isValid = !!formattedValue && isValid
    errorMessage = !isValid && 'Поле не может быть пустым'
  }

  if (validation.minLength) {
    isValid = formattedValue.length >= validation.minLength && isValid
    errorMessage = !isValid && errorMessage || `Минимальное количество символов: ${validation.minLength} (${formattedValue.length})`
  }

  if (validation.regExp) {
    // todo
    console.log(validation.regExp)
  }

  return {
    isValid,
    errorMessage,
  }
}

export const checkAllInputsOnValid = (formControls: IFormControls, controlsForValidate: string[]):boolean => {
  let formIsValid = true

  controlsForValidate.forEach((controlName:string) => {
    formControls[controlName].inputs.forEach((inputControls:IInputControlProps) => {
      if (!inputControls.valid) {
        formIsValid = false
      }
    })
  })

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

export const generateId = (timestamp:number, additionalLength:number):string => {
  let id = timestamp.toString()
  const startCharcodes:number[] = [65, 97]

  for (let i = 0; i < additionalLength; i++) {
    id += String.fromCharCode(startCharcodes[Math.floor(Math.random() * startCharcodes.length)] + Math.floor(Math.random() * 26))
  }

  return id
}

export const checkUserAnswerOnCorrectly = (userAnswers:ICorrectAnswers, correctAnswers:ICorrectAnswers):boolean => {
  let isCorrect:boolean = true

  if (Object.keys(userAnswers).length !== Object.keys(correctAnswers).length) isCorrect = false

  Object.keys(userAnswers).forEach(key => {
    if (userAnswers[key] !== correctAnswers[key]) isCorrect = false
  })

  return isCorrect
}
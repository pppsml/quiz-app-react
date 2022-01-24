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
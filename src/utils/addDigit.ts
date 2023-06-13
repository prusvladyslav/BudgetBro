export const addDigit = (value: string, currentValue: string): string  => {
  if ((currentValue === '0' || !currentValue) && value === '.') {
    return `0.`
  }
  if (currentValue === '0') {
    return value
  }
  if (/\./.test(currentValue) && value === '.'){
    return currentValue
  }
  if (/\./.test(currentValue) && currentValue.split('.')[1].length >= 1){
    return currentValue
  }

  return `${currentValue}${value}`
};
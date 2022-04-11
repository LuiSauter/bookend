import { useEffect, useState } from 'react'

export const useDominanColor = (data = '') => {
  const [dominantColor, setDominantColor] = useState('')
  function componentToHex(c: number) {
    const hex = c.toString(16)
    return hex.length == 1 ? '0' + hex : hex
  }

  function rgbToHex(r: number, g: number, b: number) {
    const colorString =
      '#' + componentToHex(r) + componentToHex(g) + componentToHex(b)
    return setDominantColor(colorString)
  }

  useEffect(() => {
    let cleanup = true
    if (cleanup) {
      const colorArray = data.split(',').map((item: string) => Number(item))
      data !== '' && rgbToHex(colorArray[0], colorArray[1], colorArray[2])
    }
    return () => {
      cleanup = false
    }
  }, [data])

  return { dominantColor }
}
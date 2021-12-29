import { useEffect, useRef, useState } from 'react'

const useNearScreen = ({
  distance = '200px',
  externalRef,
  once = true,
} = {}) => {
  const [isNearScreen, setIsNearScreen] = useState(false)
  const fromRef = useRef()
  useEffect(() => {
    let observer
    const element = externalRef ? externalRef.current : fromRef.current
    const onChange = (entries, observer) => {
      const el = entries[0]
      if (el.isIntersecting) {
        setIsNearScreen(true)
        once && observer.disconnect()
      } else {
        !once && setIsNearScreen(false)
      }
    }
    // Resolver el valor si o si
    Promise.resolve(
      typeof IntersectionObserver !== 'undefined'
        ? IntersectionObserver
        : import('intersection-observer')
    ).then(() => {
      observer = new IntersectionObserver(onChange, {
        rootMargin: distance,
      })
      element && observer.observe(element)
    })
    return () => observer && observer.disconnect()
  })
  return { isNearScreen, fromRef }
}

export default useNearScreen
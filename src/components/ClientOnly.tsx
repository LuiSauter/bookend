import React, { useEffect, useState } from 'react'

interface Props {
  children: JSX.Element | JSX.Element[];
}

export default function ClientOnly({ children, ...delegated }: Props) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }
  return <div {...delegated}>{children}</div>
}

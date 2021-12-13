import React from 'react'

const Notfound = () => {
  return (
    <div className="h-full w-full bg-secondary p-6 rounded-xl">
      <h1 className="w-full text-center font-bold text-4xl text-fourth pb-6">
        Page 404 Not Found
      </h1>
      <img
        className="w-full"
        src="/images/page-not-found.svg"
        alt="bookend 404 page not found"
      />
    </div>
  )
}
export default Notfound
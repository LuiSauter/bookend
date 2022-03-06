import React, { useState } from 'react'
import { categorys } from 'src/assets/data/category'
import { useTranslate } from 'src/hooks/useTranslate'

const INITIAL_STATE = 5

const Category = () => {
  const [showMore, setShowMore] = useState(INITIAL_STATE)
  const translate = useTranslate()
  const handleShowMore = () => {
    showMore >= 15
      ? setShowMore(INITIAL_STATE)
      : setShowMore(showMore + INITIAL_STATE)
  }

  return (
    <ul className='relative w-full p-2 flex flex-col justify-center'>
      {categorys.slice(0, showMore).map((category: string, index: number) => (
        <li
          key={index}
          className='px-4 w-full py-1 flex flex-row flex-wrap justify-between dark:hover:bg-secondaryLigth hover:bg-sky-200/70 relative  rounded-lg'
        >
          <div>
            <span className='text-textGray mr-2'>#</span>
            {category}
          </div>
          <span className='text-textGray text-sm flex items-center'>
            {category.length} {translate.nav.book}
          </span>
        </li>
      ))}
      <button onClick={handleShowMore} className='hover:text-textGray'>
        {showMore >= 15
          ? translate.home.searchBook.seeLess
          : translate.home.searchBook.showMore.slice(0, -1)}
      </button>
    </ul>
  )
}

export default Category

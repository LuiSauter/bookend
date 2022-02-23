import React from 'react'
import { categorys } from 'src/assets/data/category'

const Category = () => {
  return (
    <ul className='relative w-full p-2'>
      {categorys.map((category: string, index: number) => (
        <li
          key={index}
          className='px-4 w-full py-1 flex flex-row flex-wrap justify-between dark:hover:bg-secondaryLigth hover:bg-sky-200 relative  rounded-lg'
        >
          <div>
            <span className='text-textGray mr-2'>#</span>
            {category}
          </div>
          <span className='text-textGray text-sm flex items-center'>
            {category.length} Books
          </span>
        </li>
      ))}
    </ul>
  )
}

export default Category

import React from 'react'

interface Props {
  books: Book[];
}

const Home = ({ books }: Props) => {
  // const [darkMode, setDarkMode] = useState(false)
  // const handleClick = () => {
  //   document.documentElement.classList.toggle('dark')
  //   setDarkMode(!darkMode)
  // }
  // const text = !darkMode ? 'dark mode' : 'light mode'
  return books.length === 0 ? <h1>No books</h1> : <h1>Books</h1>
}
export default Home

export const getServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/api/books')
  const books = await res.json()
  return {
    props: {
      books: books,
    },
  }
}

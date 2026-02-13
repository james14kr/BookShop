import React, { useEffect, useState } from 'react'
import { login } from '../../api/loginApi'
import Button from '../../components/common/Button'
import { useNavigate } from 'react-router-dom'
import { selectBook } from '../../api/bookApi'
import EachBook from '../../components/book/EachBook'
import styles from './BookList.module.css'

const BookList = () => {

  const [booklist, setBooklist] = useState([]);

  const getBook = async () => {
    const response = await selectBook();
    if(response){
      setBooklist(response.data);
    }
  }

  useEffect(() => {
    getBook()
  }, [])

  return (
    <div className={styles.productList}>
      {booklist.map(book => (
        <EachBook key={book.bookNum} book={book} />
      ))}
    </div>
  )
}

export default BookList
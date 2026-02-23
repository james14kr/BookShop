import React, { useEffect, useState } from 'react'
import { login } from '../../api/loginApi'
import Button from '../../components/common/Button'
import { useNavigate } from 'react-router-dom'
import { selectBook } from '../../api/bookApi'
import EachBook from '../../components/book/EachBook'
import styles from './BookList.module.css'

const BookList = () => {

  const [booklist, setBookList] = useState([]);

  const getBook = async () => {
    const response = await selectBook();
    if(response){
      setBookList(response.data);
    }
  }

  useEffect(() => {
    getBook()
  }, [])

  // const getList = async () => {
  //   const response = await getBookList();
  //   setBookList(response.data);
  //   console.log(response.data);
  // }

  return (
    <div className={styles.productList}>
      {booklist.map((book, i)=> (
        <EachBook key={i} book={book} />
      ))}
    </div>
  )
}

export default BookList
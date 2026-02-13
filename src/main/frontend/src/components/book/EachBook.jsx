import React from 'react'
import styles from './EachBook.Module.css'
import { data, useNavigate } from 'react-router-dom'

const EachBook = ({book}) => {
  const nav = useNavigate();

  const goDetail = () => {
    nav(`/books/${book.bookNum}`)
  }


  return (
    <div className={styles.productCard} onClick={goDetail}>
      <div className={styles.img_div}>
        <img src="/가장 빨리 만나는 자바_메인.jpg"/>
        <div className={styles.detail}>상세보기</div>
      </div>
      <div  className={styles.productInfo}>
        <p  className={styles.productName}>제목 : {book.bookTitle}</p>
        <p  className={styles.productPrice}>가격 : {book.bookPrice.toLocaleString()}원</p>
      </div>
    </div>
  )
}

export default EachBook


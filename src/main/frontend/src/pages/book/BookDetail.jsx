import React, { useEffect, useState } from 'react'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import styles from './BookDetail.module.css'
import { selectBookDetail } from '../../api/bookApi.js'
import { useParams } from 'react-router-dom'

const BookDetail = () => {

  const {bookNum} = useParams();
  console.log(bookNum);

  const [bookDetailData, setBookDetailData] = useState({});

  const getBookDetailData = async () => {
    const response = await selectBookDetail(bookNum);
    if(response){
      setBookDetailData(response.data);
    }
  }

  useEffect(() => {
    getBookDetailData();
  }, [])


  return (
    <div className={styles.container}>
        <div className={styles.bookDetailText}>
          <div>
            <img src="/모두의 딥러닝_메인.jpg" alt="도서 이미지" />
          </div>
          <div className={styles.infoBox}>
            <p className={styles.title}>{bookDetailData.bookTitle}</p>

            <p className={styles.meta}>저자 : {bookDetailData.author}</p>

            <p className={styles.price}>가격 : {bookDetailData.bookPrice}</p>

            <div className={styles.count}>
              <span>수량</span>
              <Input type="number" />
            </div>

            <p className={styles.total}>총 구매 가격 : ₩12,000</p>

            <div className={styles.btn_div}>
              <Button title="장바구니에 담기" variant="green" size="medium" />
              <Button title="바로 구매" size="medium" />
            </div>
          </div>
        </div>
        <div className={styles.bookDetailImg}>
          <img src="/모두의 딥러닝_상세.jpg"/>
        </div>
    </div>
  )
}

export default BookDetail
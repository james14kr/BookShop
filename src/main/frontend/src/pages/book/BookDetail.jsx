import React, { useEffect, useState } from 'react'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import styles from './BookDetail.module.css'
import { selectBookDetail } from '../../api/bookApi.js'
import { useNavigate, useParams } from 'react-router-dom'
import { insertCart } from '../../api/cartApi.js'

const BookDetail = () => {

  const nav = useNavigate();

  const { bookNum } = useParams()

  const [bookDetailData, setBookDetailData] = useState({
    bookImgList: []
  })

  const [count, setCount] = useState(1)

  // 상세 조회
  const getBookDetailData = async () => {
    try {
      const response = await selectBookDetail(Number(bookNum))
      if (response) {
        setBookDetailData(response.data)
        console.log(response.data)
      }
    } catch (error) {
      console.error("상세 조회 에러", error)
    }
  }

  useEffect(() => {
    if (bookNum) {
      getBookDetailData()
    }
  }, [bookNum])

  // 총 가격 계산
  const totalPrice = bookDetailData.bookPrice ? bookDetailData.bookPrice * count : 0

  //장바구니 등록 
  const handleInsertCart = async () => {
    try{
      const loginInfo = JSON.parse(sessionStorage.getItem("loginInfo"));
      
      if(!loginInfo){
        alert("로그인이 필요합니다.")
        nav('/login')
        return;
      }

      const cartData = {
        bookNum : bookDetailData.bookNum,
        cartCnt : count,
        memEmail : loginInfo.memEmail
      };

      console.log("장바구니 데이터 : " , cartData)


      await insertCart(cartData);

      alert("장바구니에 담겼습니다.");
      nav('/cart');


    }catch (e){
      console.error("카트 등록 에러", error)
    }
  }


  return (
    <div className={styles.container}>
      <div className={styles.bookDetailText}>
        
        {/* 메인 이미지 */}
        <div>
          {bookDetailData.bookImgList.length > 0 &&
            bookDetailData.bookImgList.map((e, i) => {
              if (e.isMain === 'Y') {
                return (
                  <img
                    key={i} // map에서는 key 필수
                    src={`http://localhost:8080/upload/${e.uploadFileName}`}
                    alt="메인 이미지"
                  />
                );
              } else {
                return null; // 조건에 안 맞으면 null 반환
              }
            })
          }
        </div>

        <div className={styles.infoBox}>
          <p className={styles.title}>
            {bookDetailData.bookTitle}
          </p>

          <p className={styles.meta}>
            저자 : {bookDetailData.author}
          </p>

          <p className={styles.price}>
            가격 : {bookDetailData.bookPrice?.toLocaleString()}
          </p>

          {/* 수량 */}
          <div className={styles.count}>
            <span>수량</span>
            <Input
              type="number"
              min={1}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
            />
          </div>

          {/* 총 가격 */}
          <p className={styles.total}>
            총 구매 가격 : {totalPrice.toLocaleString()}
          </p>

          <div className={styles.btn_div}>
            <Button title="장바구니에 담기" variant="green" size="medium" onClick={handleInsertCart} />
            <Button title="바로 구매" size="medium" />
          </div>
        </div>
      </div>

      {/* 상세 이미지 */}
      <div className={styles.bookDetailImg}>
        {bookDetailData.bookImgList.length > 0 &&
            bookDetailData.bookImgList.map((e, i) => {
              if (e.isMain === 'N') {
                return (
                  <img
                    key={i} // map에서는 key 필수
                    src={`http://localhost:8080/upload/${e.uploadFileName}`}
                    alt="메인 이미지"
                  />
                );
              } else {
                return null; // 조건에 안 맞으면 null 반환
              }
            })
          }
      </div>
    </div>
  )
}

export default BookDetail
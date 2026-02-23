import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button'
import { selectCartList } from '../../api/cartApi';
import styles from './Cart.module.css'

const Cart = () => {
  const nav = useNavigate()
  const [cartList, setCartList] = useState([])

  const loginInfo = JSON.parse(sessionStorage.getItem("loginInfo"))

  const getCartList = async () => {
    if (!loginInfo) return

    try {
      const response = await selectCartList(loginInfo.memEmail)
      setCartList(response?.data ?? []) // 안전하게 배열 보장
    } catch (e) {
      console.error("장바구니 리스트 조회 에러", e)
      setCartList([]) // 실패 시에도 빈 배열
    }
  }

  useEffect(() => {
    getCartList()
  }, [])

  return (
    <div className={styles.container}>
      <h2>장바구니</h2>

      {(!cartList || cartList.length === 0) ? (
        <p>장바구니에 담긴 상품이 없습니다.</p>
      ) : (
        <div>
          {cartList.map((e, i) => (
            <div key={i} className={styles.cartItem}>
              <p>도서명 : {e.bookTitle}</p>
              <p>가격 : {e.bookPrice?.toLocaleString()}원</p>
              <p>수량 : {e.cartCnt}</p>
              <p>총액 : {(e.bookPrice * e.cartCnt)?.toLocaleString()}원</p>
            </div>
          ))}
        </div>
      )}

      <div className={styles.btnBox}>
        <Button 
          title="계속 쇼핑하기"
          size="medium"
          onClick={() => nav('/')}
        />
      </div>
    </div>
  )
}

export default Cart
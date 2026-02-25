import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/common/Button'
import { selectCartList, insertCart, updateCartCount, deleteContent } from '../../api/cartApi'
import styles from './Cart.module.css'
import axios from 'axios'
import dayjs from 'dayjs'

const Cart = () => {
  const nav = useNavigate()
  const [cartList, setCartList] = useState([]) 
  const [checked, setChecked] = useState([])

  // 전체 합계 계산 
  const totalPrice = cartList
  ?.filter(item => checked.includes(item.cartNum))
  .reduce((sum, item) => sum + (item.bookPrice * item.cartCnt), 0) || 0

  // 로그인 체크 및 장바구니 데이터 조회
  useEffect(() => {
    const loginInfo = JSON.parse(sessionStorage.getItem("loginInfo"))
    if (!loginInfo) {
      alert("로그인이 필요합니다.")
      nav('/login')
      return
    }

    const fetchCartList = async () => {
      try {
        const response = await selectCartList(loginInfo.memEmail)
        console.log("장바구니 API 응답:", response)
        setCartList(response ?? [])
      } catch (error) {
        console.error("장바구니 조회 실패", error)
        setCartList([])
      }
    }

    fetchCartList()
  }, [nav])

  // 수량 변경
  const handleQuantityChange = async (cartNum, newCount) => {

    if(newCount < 0 ){
      return;
    }

    try {
      
      await updateCartCount({
        cartNum:cartNum,
        cartCnt:newCount
      })

      setCartList((prev) =>
      prev.map((item) =>
        item.cartNum === cartNum ? { ...item, cartCnt: newCount } : item
      )
    )
    } catch (error) {
      
    }
    
  }

  // 아이템 삭제
  const handleDelete = async (cartNum) => {
    try {
      await deleteContent(cartNum)
      setCartList((prev) => prev.filter((item) => item.cartNum !== cartNum))
    } catch (error) {
      console.error("장바구니 삭제 실패", error)
      alert("삭제 실패")
    }
  }

  return (
    <div className={styles.container}>
      <h2>장바구니</h2>

      {(!cartList || cartList.length === 0) ? (
        <p>장바구니에 담긴 상품이 없습니다.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <td>No</td>
              <td><input type="checkbox" /></td>
              <td>도서정보</td>
              <td>가격</td>
              <td>수량</td>
              <td>구매가격</td>
              <td>장바구니 등록 일자</td>
              <td>삭제</td>
            </tr>
          </thead>
          <tbody>
            {cartList.map((item , index) => (
              <tr key={item.cartNum}>
                <td>{index +1}</td>
                <td><input 
                      type="checkbox" 
                      checked={checked.includes(item.cartNum)}
                      onChange={e => {
                        if(e.target.checked){
                          setChecked(prev => [...prev, item.cartNum])
                        }else{
                          setChecked(prev => prev.filter(num => num !== item.cartCnt))
                        }
                      }}
                    />
                </td>
                <td className={styles.bookInfo}>
                  <img 
                    key={item.cartNum} 
                    src={`http://localhost:8080/upload/${item.uploadFileName}`} className={styles.bookImg}
                  />
                  {item.bookTitle}
                </td>
                <td>{item.bookPrice.toLocaleString()}원</td>
                <td>
                  <input 
                    type="number" 
                    min={1} 
                    value={item.cartCnt} 
                    onChange={(e) => handleQuantityChange(item.cartNum, Number(e.target.value))}/>
                </td>
                <td>
                  {(item.bookPrice * item.cartCnt).toLocaleString()}원
                </td>
                <td>{dayjs(item.cartDate).format('YYYY-MM-DD HH:mm')}</td>
                <td>
                  <Button title='삭제' onClick ={() => {handleDelete(item.cartNum)}}/>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={4}>전체 합계 : </td>
              <td colSpan={4}>{totalPrice.toLocaleString()}원</td>
            </tr>
          </tbody>
        </table>
      )}

      <div className={styles.btnBox}>
        <Button title="계속 쇼핑하기" size="medium" onClick={() => nav('/')} />
        <Button
          title="구매하기"
          size="medium"
          onClick={() => alert('구매 기능 구현 필요')}
        />
      </div>
    </div>
  )
}

export default Cart
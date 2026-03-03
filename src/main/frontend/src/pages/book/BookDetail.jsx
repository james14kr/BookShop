import React, { useEffect, useState } from 'react'
import styles from './BookDetail.module.css'
import { selectBookDetail } from '../../api/bookApi.js'
import { useNavigate, useParams } from 'react-router-dom'
import { insertCart } from '../../api/cartApi.js'
import { insertBuy } from '../../api/buyApi.js'

const BookDetail = () => {
  const nav = useNavigate()
  const { bookNum } = useParams()

  const [bookDetailData, setBookDetailData] = useState({ bookImgList: [] })
  const [count, setCount] = useState(1)
  const [loading, setLoading] = useState(true)
  const [cartLoading, setCartLoading] = useState(false)
  const [activeImg, setActiveImg] = useState(null)

  const getBookDetailData = async () => {
    try {
      setLoading(true)
      const response = await selectBookDetail(Number(bookNum))
      if (response) {
        setBookDetailData(response.data)
        const main = response.data.bookImgList?.find(e => e.isMain === 'Y')
        if (main) setActiveImg(main.uploadFileName)
      }
    } catch (error) {
      console.error("상세 조회 에러", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (bookNum) getBookDetailData()
  }, [bookNum])

  const totalPrice = bookDetailData.bookPrice ? bookDetailData.bookPrice * count : 0

  const handleInsertCart = async () => {
    try {
      const loginInfo = JSON.parse(sessionStorage.getItem("loginInfo"))
      if (!loginInfo) {
        alert("로그인이 필요합니다.")
        nav('/login')
        return
      }
      const cartData = {
        bookNum: bookDetailData.bookNum,
        cartCnt: count,
        memEmail: loginInfo.memEmail
      }
      if (cartData.cartCnt > 0) {
        setCartLoading(true)
        await insertCart(cartData)
        setCartLoading(false)
        const goToCart = window.confirm("장바구니에 담았습니다. 장바구니 페이지로 갈까요?")
        if (goToCart) nav('/cart')
        } else {
          alert("수량은 최소 1개 입니다.")
        }
    } catch (e) {
      console.error("카트 등록 에러", e)
      setCartLoading(false)
    }
  }

  const mainImg = bookDetailData.bookImgList.find(e => e.isMain === 'Y')
  const subImgs = bookDetailData.bookImgList.filter(e => e.isMain === 'N')

  if (loading) {
    return (
      <div className={styles.loadingWrap}>
        <span className={styles.spinner} />
      </div>
    )
  }

  const regBuy = () => {

    const memEmail = JSON.parse(sessionStorage.getItem("loginInfo")).memEmail

    const data = {
      buyPrice : totalPrice,
      memEmail :  memEmail,
      detailList : [
        {
          bookNum : bookDetailData.bookNum,
          buyCnt : count
        }
      ]
    }

    insertBuy(data)

  }

  return (
    <div className={styles.container}>

      {/* ── 상단: 메인 정보 영역 ── */}
      <div className={styles.topSection}>

        {/* 이미지 패널 */}
        <div className={styles.imgPanel}>
          {/* 메인 이미지 */}
          <div className={styles.mainImgWrap}>
            {(activeImg || mainImg) && (
              <img
                className={styles.mainImg}
                src={`http://localhost:8080/upload/${activeImg || mainImg?.uploadFileName}`}
                alt="도서 이미지"
              />
            )}
          </div>

          {/* 썸네일 리스트 */}
          {bookDetailData.bookImgList.length > 1 && (
            <div className={styles.thumbRow}>
              {bookDetailData.bookImgList.map((e, i) => (
                <div
                  key={i}
                  className={`${styles.thumb} ${activeImg === e.uploadFileName ? styles.thumbActive : ''}`}
                  onClick={() => setActiveImg(e.uploadFileName)}
                >
                  <img
                    src={`http://localhost:8080/upload/${e.uploadFileName}`}
                    alt={`썸네일 ${i + 1}`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 정보 패널 */}
        <div className={styles.infoPanel}>

          {/* 배지 */}
          <span className={styles.badge}>도서</span>

          {/* 제목 */}
          <h1 className={styles.bookTitle}>{bookDetailData.bookTitle}</h1>

          {/* 저자 */}
          <p className={styles.author}>
            <span className={styles.metaLabel}>저자</span>
            {bookDetailData.author}
          </p>

          {/* 구분선 */}
          <div className={styles.sep} />

          {/* 단가 */}
          <div className={styles.priceRow}>
            <span className={styles.metaLabel}>정가</span>
            <span className={styles.unitPrice}>
              {bookDetailData.bookPrice?.toLocaleString()}원
            </span>
          </div>

          {/* 수량 */}
          <div className={styles.qtyRow}>
            <span className={styles.metaLabel}>수량</span>
            <div className={styles.qtyControl}>
              <button
                className={styles.qtyBtn}
                onClick={() => setCount(c => Math.max(1, c - 1))}
              >−</button>
              <span className={styles.qtyValue}>{count}</span>
              <button
                className={styles.qtyBtn}
                onClick={() => setCount(c => c + 1)}
              >+</button>
            </div>
          </div>

          {/* 구분선 */}
          <div className={styles.sep} />

          {/* 총 가격 */}
          <div className={styles.totalRow}>
            <span className={styles.totalLabel}>총 결제금액</span>
            <span className={styles.totalPrice}>
              {totalPrice.toLocaleString()}
              <span className={styles.totalUnit}>원</span>
            </span>
          </div>

          {/* 버튼 영역 */}
          <div className={styles.btnGroup}>
            <button
              className={styles.cartBtn}
              onClick={handleInsertCart}
              disabled={cartLoading}
            >
              {cartLoading
                ? <span className={styles.spinnerDark} />
                : '🛒 장바구니에 담기'
              }
            </button>
            <button
              className={styles.buyBtn}
              onClick={regBuy}
            >
              바로 구매 →
            </button>
          </div>

        </div>
      </div>

      {/* ── 하단: 상세 이미지 ── */}
      {subImgs.length > 0 && (
        <div className={styles.detailSection}>
          <div className={styles.detailHeader}>
            <span className={styles.detailTitle}>상세 정보</span>
            <div className={styles.detailLine} />
          </div>
          <div className={styles.detailImgs}>
            {subImgs.map((e, i) => (
              <img
                key={i}
                className={styles.detailImg}
                src={`http://localhost:8080/upload/${e.uploadFileName}`}
                alt={`상세 이미지 ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  )
}

export default BookDetail
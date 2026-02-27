import React, { useState } from 'react'
import styles from './EachBook.module.css'
import { useNavigate } from 'react-router-dom'

const EachBook = ({ book }) => {
  const nav = useNavigate()
  const [hovered, setHovered] = useState(false)

  const goDetail = () => {
    nav(`/books/${book.bookNum}`)
  }

  return (
    <div
      className={`${styles.card} ${hovered ? styles.cardHovered : ''}`}
      onClick={goDetail}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── 이미지 영역 ── */}
      <div className={styles.imgWrap}>
        <img
          src={`http://localhost:8080/upload/${book.bookImgList[0].uploadFileName}`}
          alt={book.bookTitle}
          className={`${styles.img} ${hovered ? styles.imgZoomed : ''}`}
        />

        {/* 오버레이 */}
        <div className={`${styles.overlay} ${hovered ? styles.overlayVisible : ''}`}>
          <span className={styles.overlayText}>상세보기</span>
          <span className={styles.overlayArrow}>→</span>
        </div>

        {/* 골드 액센트 바 (하단) */}
        <div className={`${styles.accentBar} ${hovered ? styles.accentBarVisible : ''}`} />
      </div>

      {/* ── 정보 영역 ── */}
      <div className={styles.info}>
        <p className={styles.title}>{book.bookTitle}</p>
        <p className={styles.price}>{book.bookPrice.toLocaleString()}원</p>
      </div>
    </div>
  )
}

export default EachBook
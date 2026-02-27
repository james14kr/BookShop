import React from 'react'
import styles from './MyPageSide.module.css'

const MyPageSide = () => {
  return (
    <div className={styles.container}>
      <div>
        <h2>MY PAGE</h2>
        <ul>
          <li>
            <p>장바구니</p>
          </li>
          <li>
            <p>구매내역</p>
          </li>
          <li>
            <p>내정보수정</p>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default MyPageSide
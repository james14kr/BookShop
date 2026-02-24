import React from 'react'
import styles from './MyPageSide.module.css'

const MyPageSide = () => {
  return (
    <div className={styles.container}>
      <div>
        {/* <h5>마이페이지</h5> */}
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
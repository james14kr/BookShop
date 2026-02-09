import React from 'react'
import styles from './ManageSide.module.css'
import { 
  FaChartColumn, FaSquarePlus, FaCubesStacked, 
  FaFileArrowUp
} from "react-icons/fa6";

const ManageSide = () => {
  return (
    <div className={styles.container}>
      <div>
        <h5>상품관리</h5>
        <ul>
          <li>
            <FaChartColumn className={styles.icon}/>
            <p>카테고리관리</p>
          </li>
          <li>
            <FaSquarePlus className={styles.icon}/>
            <p>상품등록</p>
          </li>
          <li>
            <FaCubesStacked className={styles.icon}/>
            <p>상품재고관리</p>
          </li>
          <li>
            <FaFileArrowUp className={styles.icon}/>
            <p>상품정보수정</p>
          </li>
        </ul>
      </div>

      <div>
        <h5>구매관리</h5>
        <ul>
          <li>
            <FaChartColumn className={styles.icon}/>
            <p>구매내역조회</p>
          </li>
          <li>
            <FaSquarePlus className={styles.icon}/>
            <p>월별매출관리</p>
          </li>
          <li>
            <FaCubesStacked className={styles.icon}/>
            <p>주간매출관리</p>
          </li>
        </ul>
      </div>

      <div>
        <h5>회원관리</h5>
        <ul>
          <li>
            <FaChartColumn className={styles.icon}/>
            <p>회원정보조회</p>
          </li>
          <li>
            <FaSquarePlus className={styles.icon}/>
            <p>회원정보변경</p>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ManageSide
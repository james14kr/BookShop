import React, { useEffect, useState } from 'react'
import { getSummary } from '../../api/dashboardApi'
import styles from './DashBoard.module.css'

const DashBoard = () => {

  const[dashBoard, setDashBoard] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
     const response = await getSummary();
     if(response){
      setDashBoard(response.data)
     }
    }
    fetchSummary();
  }, [])

  console.log(dashBoard)

  return (
   <div className={styles.container}>

      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>DashBoard</h2>
        <p className={styles.pageSubtitle}>오늘의 현황을 확인하세요</p>
      </div>
      
      <div className={styles.cardGrid}>
      
        <div className={styles.card}>
          <div className={styles.cardIcon}>📕</div>
          <div className={styles.cardBody}>
            <span className={styles.cardLabel}>오늘의 주문</span>
            <span className={styles.cardValue}>
              {dashBoard ? dashBoard.todayOrderCount : '-'}
              <span className={styles.cardUnit}>건</span>
            </span>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardIcon}>📚</div>
          <div className={styles.cardBody}>
            <span className={styles.cardLabel}>이달의 주문</span>
            <span className={styles.cardValue}>
              {dashBoard ? dashBoard.monthOrderCount : '-'}
              <span className={styles.cardUnit}>건</span>
            </span>
          </div>
        </div>


      </div>
      
   </div>
  )
}

export default DashBoard
